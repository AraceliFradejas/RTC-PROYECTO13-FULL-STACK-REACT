import { VEHICLE_IMAGE_MAX_BYTES, objectId } from '@kelsets-cars/contracts';
import { Vehicle } from '../models/Vehicle.js';
import { HttpError } from '../../../utils/errors.js';

export function cloudinaryImageUrl(publicId, cloudName) {
  if (!/^[a-zA-Z0-9_-]+$/.test(cloudName || '') || !/^kelsets-cars\/[a-zA-Z0-9/_-]+$/.test(publicId || '') || publicId.length > 250) {
    throw new HttpError(404, 'Fotografía no disponible.');
  }
  // El destino se construye desde nuestro identificador, nunca desde una URL enviada por el visitante.
  return `https://res.cloudinary.com/${cloudName}/image/upload/${publicId}`;
}

export function createImageDelivery({ findVehicle = id => Vehicle.findById(id).select('imagePublicId').lean(), fetchImage = fetch, cloudName = () => process.env.CLOUDINARY_CLOUD_NAME } = {}) {
  return async function getVehicleImage(req, res) {
    const vehicle = await findVehicle(objectId.parse(req.params.id));
    if (!vehicle) throw new HttpError(404, 'Vehículo no encontrado.');
    const url = cloudinaryImageUrl(vehicle.imagePublicId, cloudName());
    let response;
    try { response = await fetchImage(url, { signal: AbortSignal.timeout(10000), redirect: 'error' }); }
    catch { throw new HttpError(503, 'Fotografía no disponible.'); }
    const contentType = response.headers.get('content-type')?.split(';')[0];
    if (!response.ok || !['image/jpeg', 'image/png', 'image/webp'].includes(contentType)) {
      await response.body?.cancel();
      throw new HttpError(503, 'Fotografía no disponible.');
    }
    const chunks = []; let size = 0;
    for await (const chunk of response.body) {
      size += chunk.length;
      if (size > VEHICLE_IMAGE_MAX_BYTES) { throw new HttpError(503, 'Fotografía no disponible.'); }
      chunks.push(Buffer.from(chunk));
    }
    if (!size) throw new HttpError(503, 'Fotografía no disponible.');
    res.set('Cache-Control', 'public, max-age=300');
    res.type(contentType).send(Buffer.concat(chunks));
  };
}
export const getVehicleImage = createImageDelivery();
