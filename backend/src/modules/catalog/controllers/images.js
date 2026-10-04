import { v2 as cloudinary } from 'cloudinary';
import { Vehicle } from '../models/Vehicle.js';
import { objectId } from '@kelsets-cars/contracts';
import { send, HttpError } from '../../../utils/errors.js';
export async function uploadVehicleImage(req, res) {
  const vehicle = await Vehicle.findById(objectId.parse(req.params.id));
  if (!vehicle) throw new HttpError(404, 'Vehículo no encontrado.');
  if (!req.file) throw new HttpError(400, 'Selecciona una imagen JPEG, PNG o WebP.');
  const buffer = req.file.buffer;
  const jpeg = buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  const png = buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  const webp = buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP';
  if (!(jpeg || png || webp)) throw new HttpError(400, 'El contenido no es una imagen admitida.');
  if (!process.env.CLOUDINARY_API_SECRET || !process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY) throw new HttpError(503, 'La subida de imágenes aún no está configurada.');
  cloudinary.config({ cloud_name: process.env.CLOUDINARY_CLOUD_NAME, api_key: process.env.CLOUDINARY_API_KEY, api_secret: process.env.CLOUDINARY_API_SECRET });
  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({ folder: 'kelsets-cars', resource_type: 'image', allowed_formats: ['jpg', 'png', 'webp'], transformation: [{ width: 1600, height: 1000, crop: 'limit' }] }, (error, result) => error ? reject(error) : resolve(result)).end(buffer);
  });
  const previousId = vehicle.imagePublicId;
  try { vehicle.image = result.secure_url; vehicle.imagePublicId = result.public_id; await vehicle.save(); }
  catch (error) { await cloudinary.uploader.destroy(result.public_id).catch(() => {}); throw error; }
  if (previousId?.startsWith('kelsets-cars/')) await cloudinary.uploader.destroy(previousId).catch(() => {});
  send(res, vehicle);
}
