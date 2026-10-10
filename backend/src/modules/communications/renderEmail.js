import { emailIdentity, getEmailFooter } from './emailBrand.js';
const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
export function renderEmail(message, { sandbox = false, webUrl, media, language = message.language || 'es' } = {}) {
  if (!/^\/(?!\/)[a-zA-Z0-9/#?=&%-]*$/.test(message.actionPath)) throw new Error('Destino de comunicación no válido.');
  let base;
  if (webUrl) {
    base = new URL(webUrl);
    if (!['http:', 'https:'].includes(base.protocol) || base.username || base.password || base.search || base.hash || base.pathname !== '/') throw new Error('URL web de comunicación no válida.');
  }
  const link = path => escape(base ? new URL(path, base).href : path);
  const english = language === 'en';
  const footer = getEmailFooter(language);
  const identity = emailIdentity(message.type, language);
  // La bandeja de la aplicación utiliza recursos locales; Sandbox los adjunta por CID.
  const logoSrc = media?.logoSrc || '/images/brand/logo-email.png';
  const heroSrc = media?.heroSrc || `/images/editorial/${identity.image}`;
  const label = english ? (sandbox ? 'FICTIONAL SAMPLE · MAILTRAP SANDBOX' : 'DEMONSTRATION MESSAGE · NO REAL DELIVERY') : sandbox ? 'MUESTRA FICTICIA · MAILTRAP SANDBOX' : 'COMUNICACIÓN DE DEMOSTRACIÓN · SIN ENVÍO REAL';
  const notice = english ? (sandbox ? 'Fictional sample captured in Mailtrap Sandbox. No delivery to personal inboxes.' : 'This message has not been sent by email.') : sandbox ? 'Muestra ficticia capturada en Mailtrap Sandbox. Sin entrega a buzones personales.' : 'Este mensaje no se ha enviado por correo.';
  return `<!doctype html>
<html lang="${english ? 'en' : 'es'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escape(message.subject)}</title></head>
<body style="margin:0;background:#f7f6f2;color:#101919;font-family:Arial,Helvetica,sans-serif">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f7f6f2"><tr><td align="center" style="padding:20px 12px">
<table role="presentation" width="600" cellspacing="0" cellpadding="0" style="width:100%;max-width:600px;background:#ffffff">
<tr><td align="center" style="padding:24px;background:#101919;border-bottom:3px solid #b3152b"><a href="${link('/')}" aria-label="${english ? 'KelseTS Cars, home' : 'KelseTS Cars, inicio'}"><img src="${escape(logoSrc)}" width="180" height="104" alt="KelseTS Cars" style="display:block;border:0;width:180px;height:auto"></a></td></tr>
<tr><td><img src="${escape(heroSrc)}" width="600" alt="${escape(identity.alt)}" style="display:block;border:0;width:100%;max-width:600px;height:auto"></td></tr>
<tr><td style="padding:24px 28px;background:#101919;color:#ffffff"><p style="margin:0 0 10px;font-size:11px;letter-spacing:2px;color:#e2bc7d">${identity.audience}</p><p style="margin:0;font:23px Georgia,'Times New Roman',serif;line-height:1.4">${identity.heading}</p></td></tr>
<tr><td style="padding:28px"><p style="font-size:11px;line-height:1.5;color:#53615d">${label}</p><h1 style="margin:20px 0;font:24px Georgia,'Times New Roman',serif;line-height:1.3;overflow-wrap:anywhere">${escape(message.subject)}</h1><div style="font-size:16px;line-height:1.7;white-space:pre-line;overflow-wrap:anywhere">${escape(message.text)}</div><p style="margin:28px 0 8px"><a href="${link(message.actionPath)}" style="display:inline-block;padding:15px 22px;background:#101919;color:#ffffff;text-decoration:none;border-radius:999px;font-size:14px;font-weight:bold">${escape(message.actionLabel)}</a></p></td></tr>
<tr><td style="padding:28px;background:#eeede7;border-top:1px solid #deddd5"><p style="margin:0 0 12px;font:20px Georgia,'Times New Roman',serif;line-height:1.5">${footer.motto}</p><p style="font-size:12px;line-height:1.6;color:#53615d">${footer.locations}</p><p style="font-size:13px;line-height:2"><a href="${link('/experiencia')}" style="color:#101919">${english ? 'Our essence' : 'Nuestra esencia'}</a> &nbsp;·&nbsp; <a href="${link('/sedes')}" style="color:#101919">${english ? 'Our locations' : 'Nuestras sedes'}</a> &nbsp;·&nbsp; <a href="${link('/mi-cuenta')}" style="color:#101919">${english ? 'My account' : 'Mi cuenta'}</a></p><p style="margin:18px 0 0;font-size:11px;line-height:1.6;color:#53615d">KelseTS Cars · ${english ? 'Fictional brand · Academic project.' : 'Marca ficticia · Proyecto académico.'}<br>${notice}<br>${english ? 'Opening the link does not change appointments or applications.' : 'Abrir el enlace no modifica citas ni solicitudes.'}</p></td></tr>
</table></td></tr></table></body></html>`;
}

export function renderEmailText(message, { sandbox = false, webUrl, language = message.language || 'es' } = {}) {
  // Reutilizar la validación de destinos antes de incluir los enlaces en texto.
  renderEmail(message, { sandbox, webUrl, language });
  const footer = getEmailFooter(language);
  const english = language === 'en';
  const link = path => webUrl ? new URL(path, webUrl).href : path;
  return `${english ? (sandbox ? 'Fictional sample for Mailtrap Sandbox.' : 'Demonstration message. No real delivery.') : sandbox ? 'Muestra ficticia para Mailtrap Sandbox.' : 'Comunicación de demostración. Sin envío real.'}\n\n${message.subject}\n\n${message.text}\n\n${message.actionLabel}: ${link(message.actionPath)}\n\nKelseTS Cars\n${footer.motto}\n${footer.locations}\n${english ? 'Our essence' : 'Nuestra esencia'}: ${link('/experiencia')}\n${english ? 'Our locations' : 'Nuestras sedes'}: ${link('/sedes')}\n${english ? 'My account' : 'Mi cuenta'}: ${link('/mi-cuenta')}\n\n${english ? 'Fictional brand · Academic project.' : 'Marca ficticia · Proyecto académico.'}\n${english ? 'Opening the link does not change appointments or applications.' : 'Abrir el enlace no modifica citas ni solicitudes.'}`;
}
