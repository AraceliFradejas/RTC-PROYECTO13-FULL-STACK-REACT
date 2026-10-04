const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
export function renderEmail(message, { sandbox = false, webUrl } = {}) {
  if (!/^\/(?!\/)[a-zA-Z0-9/#?=&%-]*$/.test(message.actionPath)) throw new Error('Destino de comunicación no válido.');
  let actionUrl = message.actionPath;
  if (webUrl) {
    const base = new URL(webUrl);
    if (!['http:', 'https:'].includes(base.protocol) || base.username || base.password || base.search || base.hash || base.pathname !== '/') throw new Error('URL web de comunicación no válida.');
    actionUrl = new URL(message.actionPath, base).href;
  }
  const label = sandbox ? 'MUESTRA FICTICIA · MAILTRAP SANDBOX' : 'COMUNICACIÓN DE DEMOSTRACIÓN · SIN ENVÍO REAL';
  const footer = sandbox ? 'Muestra ficticia capturada en Mailtrap Sandbox. Sin entrega a buzones personales.' : 'Este mensaje no se ha enviado por correo.';
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escape(message.subject)}</title></head><body style="margin:0;background:#f7f6f2;color:#101919;font-family:Arial,sans-serif"><main style="max-width:600px;margin:24px auto;background:#fff"><header style="padding:32px;background:#101919;color:#fff;text-align:center"><div style="font:36px Georgia,serif">Kelse<span style="color:#c84c58;font-style:italic">TS</span></div><div style="font-size:11px;letter-spacing:5px">CARS</div></header><section style="padding:28px"><p style="font-size:12px;color:#53615d">${label}</p><h1 style="font:24px Georgia,serif;line-height:1.3;overflow-wrap:anywhere">${escape(message.subject)}</h1><div style="line-height:1.7;white-space:pre-line;overflow-wrap:anywhere">${escape(message.text)}</div><p style="margin-top:28px"><a href="${escape(actionUrl)}" style="display:inline-block;padding:14px 20px;background:#101919;color:white;text-decoration:none;border-radius:999px">${escape(message.actionLabel)}</a></p></section><footer style="padding:24px;color:#53615d;font-size:12px">KelseTS Cars · Proyecto académico. ${footer} Abrir el enlace no modifica citas ni solicitudes.</footer></main></body></html>`;
}
