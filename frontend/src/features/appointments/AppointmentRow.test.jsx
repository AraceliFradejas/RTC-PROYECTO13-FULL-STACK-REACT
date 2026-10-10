import { afterEach, expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { LanguageProvider } from '../../shared/i18n/LanguageProvider.jsx';
import { SiteFooter } from '../../shared/components/SiteFooter.jsx';
import { AppointmentRow } from './AppointmentRow.jsx';

const appointment = {
  _id: 'demo-appointment',
  date: '2026-10-12T08:00:00Z',
  service: 'Asesoramiento',
  status: 'Pendiente',
  active: true,
  vehicle: { brand: 'Porsche', model: 'Taycan' },
  dealership: { city: 'Madrid' },
  user: { name: 'Cliente Demo' },
};
function render(component, language = 'es') {
  vi.stubGlobal('window', { localStorage: { getItem: () => language } });
  return renderToStaticMarkup(
    <MemoryRouter>
      <LanguageProvider>{component}</LanguageProvider>
    </MemoryRouter>,
  );
}
afterEach(() => vi.unstubAllGlobals());

it('el footer muestra solo el contenido del idioma elegido', () => {
  const spanish = render(<SiteFooter />);
  const english = render(<SiteFooter />, 'en');
  expect(spanish).toContain('El carácter se lleva dentro.');
  expect(english).not.toContain('El carácter se lleva dentro.');
  expect(english).toContain('Photography and credits');
  expect(spanish).not.toContain('Photography and credits');
});

it('el cliente puede cancelar una cita activa y no recibe controles internos', () => {
  const html = render(<AppointmentRow appointment={appointment} role="client" busy={null} />);
  expect(html).toContain('Cancelar cita');
  expect(html).not.toContain('Confirmar');
  expect(html).not.toContain('Marcar visita completada');
  expect(html).not.toContain('Cliente Demo');
});

it('los controles de Team corresponden al estado y desaparecen al completar la cita', () => {
  const pending = render(<AppointmentRow appointment={appointment} role="admin" busy={null} />);
  const confirmed = render(
    <AppointmentRow
      appointment={{ ...appointment, status: 'Confirmada' }}
      role="admin"
      busy={null}
    />,
  );
  const completed = render(
    <AppointmentRow
      appointment={{ ...appointment, status: 'Completada', active: false }}
      role="admin"
      busy={null}
    />,
  );
  expect(pending).toContain('Confirmar');
  expect(pending).not.toContain('Marcar visita completada');
  expect(confirmed).toContain('Marcar visita completada');
  expect(completed).not.toContain('<button');
});
