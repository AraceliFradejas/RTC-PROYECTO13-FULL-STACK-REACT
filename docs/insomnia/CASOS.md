# Casos de validación

Resultados esperados; no representan una ejecución realizada.

| Nº | Caso | Petición | HTTP esperado |
| --- | --- | --- | --- |
| 01 | Salud e iniciar una ronda nueva | `GET /health` | 200 |
| 02 | Cerrar cualquier sesión anterior | `POST /auth/logout` | 200 |
| 03 | Sesión anónima rechazada | `GET /auth/me` | 401 |
| 04 | Directorio de sedes | `GET /dealerships` | 200 |
| 05 | Talleres públicos sin datos privados | `GET /workshops` | 200 |
| 06 | Catálogo y guardar vehículo disponible | `GET /vehicles` | 200 |
| 07 | Ficha del vehículo | `GET /vehicles/{{ _.vehicle_id }}` | 200 |
| 08 | Búsqueda libre | `GET /vehicles?q=Audi` | 200 |
| 09 | Filtro por marca | `GET /vehicles?brand=Porsche&page=1` | 200 |
| 10 | Página inválida | `GET /vehicles?page=0` | 400 |
| 11 | ID inválido | `GET /vehicles/no-es-un-id` | 400 |
| 12 | Vehículo inexistente | `GET /vehicles/000000000000000000000000` | 404 |
| 13 | Bloqueo de un origen no permitido | `POST /auth/login` | 403 |
| 14 | No se puede registrar un administrador | `POST /auth/register` | 400 |
| 15 | Registro de cliente | `POST /auth/register` | 201 |
| 16 | Registro duplicado | `POST /auth/register` | 409 |
| 17 | Mi sesión cliente | `GET /auth/me` | 200 |
| 18 | Bienvenida privada simulada | `GET /messages` | 200 |
| 19 | Cliente no revisa talleres | `GET /workshops/applications` | 403 |
| 20 | Cliente no sube imágenes | `POST /vehicles/{{ _.vehicle_id }}/image` | 403 |
| 21 | Cita fuera de fecha | `POST /appointments` | 400 |
| 22 | Solicitar mantenimiento | `POST /appointments` | 201 |
| 23 | La misma franja está ocupada | `POST /appointments` | 409 |
| 24 | Cliente no confirma la cita | `PATCH /appointments/{{ _.appointment_id }}` | 403 |
| 25 | Cliente no asigna talleres | `POST /appointments/{{ _.appointment_id }}/workshop` | 403 |
| 26 | Cerrar sesión cliente | `POST /auth/logout` | 200 |
| 27 | Contraseña incorrecta | `POST /auth/login` | 401 |
| 28 | Registro sin especialidades | `POST /auth/register` | 400 |
| 29 | Registro de taller | `POST /auth/register` | 201 |
| 30 | Guardar solicitud pendiente | `GET /workshops/me` | 200 |
| 31 | Mensaje de recepción del taller | `GET /messages` | 200 |
| 32 | Taller pendiente no accede a trabajos | `GET /workshops/jobs` | 403 |
| 33 | Taller no accede a agenda general | `GET /appointments` | 403 |
| 34 | Taller no puede aprobarse | `PATCH /workshops/{{ _.workshop_id }}/review` | 403 |
| 35 | Cerrar sesión taller | `POST /auth/logout` | 200 |
| 36 | Alta de otra solicitud para rechazo | `POST /auth/register` | 201 |
| 37 | Guardar segunda solicitud | `GET /workshops/me` | 200 |
| 38 | Cerrar segunda solicitud | `POST /auth/logout` | 200 |
| 39 | Team no entra por portal cliente | `POST /auth/login` | 403 |
| 40 | Entrar en Team | `POST /auth/login` | 200 |
| 41 | Consultar solicitudes | `GET /workshops/applications` | 200 |
| 42 | Aprobar taller | `PATCH /workshops/{{ _.workshop_id }}/review` | 200 |
| 43 | No aprobar dos veces | `PATCH /workshops/{{ _.workshop_id }}/review` | 409 |
| 44 | Rechazo exige motivo | `PATCH /workshops/{{ _.rejected_workshop_id }}/review` | 400 |
| 45 | Rechazar con motivo | `PATCH /workshops/{{ _.rejected_workshop_id }}/review` | 200 |
| 46 | Talleres asignables | `GET /workshops/assignable` | 200 |
| 47 | Asignar mantenimiento al taller aprobado | `POST /appointments/{{ _.appointment_id }}/workshop` | 200 |
| 48 | No asignar dos veces | `POST /appointments/{{ _.appointment_id }}/workshop` | 409 |
| 49 | Confirmar cita | `PATCH /appointments/{{ _.appointment_id }}` | 200 |
| 50 | Agenda de Team | `GET /appointments` | 200 |
| 51 | Imagen ausente rechazada sin llamar Cloudinary | `POST /vehicles/{{ _.vehicle_id }}/image` | 400 |
| 52 | Cerrar Team | `POST /auth/logout` | 200 |
| 53 | Entrar taller aprobado | `POST /auth/login` | 200 |
| 54 | Solo trabajos asignados sin email del cliente | `GET /workshops/jobs` | 200 |
| 55 | Taller aprobado tampoco ve agenda general | `GET /appointments` | 403 |
| 56 | Comunicaciones del taller | `GET /messages` | 200 |
| 57 | Cerrar taller aprobado | `POST /auth/logout` | 200 |
| 58 | Entrar taller rechazado | `POST /auth/login` | 200 |
| 59 | Rechazado sin agenda profesional | `GET /workshops/jobs` | 403 |
| 60 | Comunicación del rechazo | `GET /messages` | 200 |
| 61 | Cerrar taller rechazado | `POST /auth/logout` | 200 |
| 62 | Registrar segundo cliente | `POST /auth/register` | 201 |
| 63 | Agenda aislada | `GET /appointments` | 200 |
| 64 | No cancela cita de otro cliente | `PATCH /appointments/{{ _.appointment_id }}` | 409 |
| 65 | Bandeja aislada | `GET /messages` | 200 |
| 66 | Solicitar cita para completar | `POST /appointments` | 201 |
| 67 | Cerrar segundo cliente | `POST /auth/logout` | 200 |
| 68 | Entrar cliente inicial | `POST /auth/login` | 200 |
| 69 | Cancelar cita propia | `PATCH /appointments/{{ _.appointment_id }}` | 200 |
| 70 | Comunicaciones del cliente | `GET /messages` | 200 |
| 71 | Cerrar cliente inicial | `POST /auth/logout` | 200 |
| 72 | Team para completar visita | `POST /auth/login` | 200 |
| 73 | Confirmar segunda visita | `PATCH /appointments/{{ _.other_appointment_id }}` | 200 |
| 74 | Completar segunda visita | `PATCH /appointments/{{ _.other_appointment_id }}` | 200 |
| 75 | Cerrar sesión final | `POST /auth/logout` | 200 |
| 76 | Sin sesión no hay mensajes | `GET /messages` | 401 |
| 77 | Entrar Team para pruebas de imágenes | `POST /auth/login` | 200 |
| 78 | Subir imagen real de prueba (seleccionar archivo) | `POST /vehicles/{{ _.vehicle_id }}/image` | 200 |
