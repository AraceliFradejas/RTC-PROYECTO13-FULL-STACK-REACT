import { englishMessageTemplate } from './templates.en.js';
export function messageTemplate(type, data, { language = 'es' } = {}) {
  const content = language === 'en' ? englishMessageTemplate(type, data) : spanishMessageTemplate(type, data);
  return { ...content, language: language === 'en' ? 'en' : 'es' };
}
function spanishMessageTemplate(type, data) {
  const greeting = `Hola, ${data.name}.`;
  const templates = {
    'client.welcome': { subject: 'Bienvenida a KelseTS Cars', text: `${greeting}\n\nTu cuenta está creada. Puedes explorar el catálogo y solicitar una cita de prueba de conducción, asesoramiento o mantenimiento. Encontrarás las novedades de tus citas en tu área personal.`, actionPath: '/catalogo', actionLabel: 'Explorar vehículos' },
    'workshop.received': { subject: 'Hemos recibido la solicitud de tu taller', text: `${greeting}\n\nHemos recibido la solicitud de ${data.workshopName}. Revisaremos la ubicación y las especialidades antes de aprobar su incorporación. Mientras esté pendiente, la cuenta no tendrá acceso a citas ni a datos de clientes. Puedes consultar el estado aquí.`, actionPath: '/mi-cuenta', actionLabel: 'Consultar mi solicitud' },
    'workshop.approved': { subject: 'Tu taller ya forma parte de la red KelseTS', text: `${greeting}\n\nLa solicitud de ${data.workshopName} está aprobada. Tu perfil profesional ya está activo. Puedes consultar tu perfil y las citas de mantenimiento que KelseTS Cars Team asigne a tu taller. El seguimiento de reparaciones y siniestros se incorporará en la siguiente fase.`, actionPath: '/mi-cuenta', actionLabel: 'Ver mi perfil profesional' },
    'workshop.rejected': { subject: 'Resultado de la solicitud de tu taller', text: `${greeting}\n\nTras revisar la solicitud de ${data.workshopName}, no podemos aprobarla en este momento.\n\nMotivo: ${data.reason}\n\nPuedes consultar el resultado en tu cuenta.`, actionPath: '/mi-cuenta', actionLabel: 'Consultar el resultado' },
  };
  if (type === 'appointment.assigned' || type === 'workshop.assignment') {
    const date = data.dateLabel?.es ?? new Intl.DateTimeFormat('es-ES', { dateStyle: 'long', timeStyle: 'short', timeZone: 'Europe/Madrid' }).format(new Date(data.date));
    return { type, subject: type === 'appointment.assigned' ? 'Taller asignado a tu cita' : 'Nueva cita asignada a tu taller', text: `${greeting}\n\nKelseTS Cars Team ha asignado la cita de ${data.service} para ${data.vehicle} a ${data.workshopName}.\nSede coordinadora: ${data.dealership}.\n${date} (hora de Madrid)\n\nLa asignación organiza la atención; no confirma por sí sola la cita ni constituye un presupuesto de reparación. Consulta los detalles en tu cuenta.`, actionPath: '/mi-cuenta', actionLabel: 'Consultar la asignación' };
  }
  if (type.startsWith('appointment.')) {
    const labels = { pending: 'Solicitud de cita recibida', confirmed: 'Tu cita está confirmada', cancelled: 'Tu cita ha sido cancelada', completed: 'Tu visita ha finalizado' };
    const status = type.split('.')[1];
    if (!labels[status]) throw new Error('Tipo de comunicación desconocido.');
    const date = data.dateLabel?.es ?? new Intl.DateTimeFormat('es-ES', { dateStyle: 'long', timeStyle: 'short', timeZone: 'Europe/Madrid' }).format(new Date(data.date));
    const next = status === 'pending' ? 'La sede todavía debe confirmar tu solicitud.' : status === 'cancelled' ? 'La franja vuelve a estar disponible. Si lo necesitas, puedes solicitar otra cita.' : status === 'confirmed' ? 'Consulta los datos de tu visita en tu cuenta.' : 'Gracias por compartir este paso con KelseTS Cars.';
    return { type, subject: labels[status], text: `${greeting}\n\n${labels[status]}.\n${data.service} · ${data.vehicle}\n${data.dealership}\n${date} (hora de Madrid)\n\n${next}`, actionPath: '/mi-cuenta', actionLabel: 'Consultar mis citas' };
  }
  if (!templates[type]) throw new Error('Tipo de comunicación desconocido.');
  return { type, ...templates[type] };
}
