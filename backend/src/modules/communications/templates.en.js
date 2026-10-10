const services = { 'Prueba de conducción': 'Test drive', Asesoramiento: 'Advice', Mantenimiento: 'Maintenance' };
export function englishMessageTemplate(type, data) {
  const greeting = `Hello, ${data.name}.`;
  const templates = {
    'client.welcome': { subject: 'Welcome to KelseTS Cars', text: `${greeting}\n\nYour account is ready. Explore the catalogue and request a test drive, advice or maintenance appointment. You will find updates about your appointments in your personal area.`, actionPath: '/catalogo', actionLabel: 'Explore vehicles' },
    'workshop.received': { subject: 'We have received your workshop application', text: `${greeting}\n\nWe have received the application for ${data.workshopName}. We will review its location and specialties before approving the partnership. While the application is pending, the account will not have access to appointments or customer information. You can check its status here.`, actionPath: '/mi-cuenta', actionLabel: 'View my application' },
    'workshop.approved': { subject: 'Your workshop is now part of the KelseTS network', text: `${greeting}\n\nThe application for ${data.workshopName} has been approved. Your professional profile is active. You can view your profile and the maintenance appointments assigned to your workshop by KelseTS Cars Team. Repair and accident tracking will be added in the next phase.`, actionPath: '/mi-cuenta', actionLabel: 'View my professional profile' },
    'workshop.rejected': { subject: 'Your workshop application outcome', text: `${greeting}\n\nAfter reviewing the application for ${data.workshopName}, we cannot approve it at this time.\n\nReason: ${data.reason}\n\nYou can view the outcome in your account.`, actionPath: '/mi-cuenta', actionLabel: 'View the outcome' },
  };
  const date = () => data.dateLabel?.en ?? new Intl.DateTimeFormat('en-GB', { dateStyle: 'long', timeStyle: 'short', timeZone: 'Europe/Madrid' }).format(new Date(data.date));
  const service = services[data.service] ?? data.service;
  if (type === 'appointment.assigned' || type === 'workshop.assignment') {
    return { type, subject: type === 'appointment.assigned' ? 'A workshop has been assigned to your appointment' : 'A new appointment has been assigned to your workshop', text: `${greeting}\n\nKelseTS Cars Team has assigned the ${service} appointment for ${data.vehicle} to ${data.workshopName}.\nCoordinating location: ${data.dealership}.\n${date()} (Madrid time)\n\nThe assignment organises care; it does not confirm the appointment or constitute a repair quote. View the details in your account.`, actionPath: '/mi-cuenta', actionLabel: 'View the assignment' };
  }
  if (type.startsWith('appointment.')) {
    const labels = { pending: 'Appointment request received', confirmed: 'Your appointment is confirmed', cancelled: 'Your appointment has been cancelled', completed: 'Your visit has ended' };
    const status = type.split('.')[1];
    if (!labels[status]) throw new Error('Tipo de comunicación desconocido.');
    const next = status === 'pending' ? 'The location still needs to confirm your request.' : status === 'cancelled' ? 'The time slot is available again. You can request another appointment if you need one.' : status === 'confirmed' ? 'View your visit details in your account.' : 'Thank you for sharing this step with KelseTS Cars.';
    return { type, subject: labels[status], text: `${greeting}\n\n${labels[status]}.\n${service} · ${data.vehicle}\n${data.dealership}\n${date()} (Madrid time)\n\n${next}`, actionPath: '/mi-cuenta', actionLabel: 'View my appointments' };
  }
  if (!templates[type]) throw new Error('Tipo de comunicación desconocido.');
  return { type, ...templates[type] };
}
