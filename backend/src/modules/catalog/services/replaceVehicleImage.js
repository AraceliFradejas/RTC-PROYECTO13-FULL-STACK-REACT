// La ficha se guarda antes de retirar la imagen anterior para conservarla si falla Atlas.
export async function replaceVehicleImage(vehicle, uploaded, destroyImage) {
  const previous = { image: vehicle.image, imagePublicId: vehicle.imagePublicId };
  vehicle.image = uploaded.secure_url;
  vehicle.imagePublicId = uploaded.public_id;

  try {
    await vehicle.save();
  } catch (error) {
    vehicle.image = previous.image;
    vehicle.imagePublicId = previous.imagePublicId;
    await destroyImage(uploaded.public_id).catch(() => {
      console.warn('No se pudo retirar la nueva imagen después de un fallo al guardar.');
    });
    throw error;
  }

  if (previous.imagePublicId?.startsWith('kelsets-cars/')) {
    await destroyImage(previous.imagePublicId).catch(() => {
      console.warn('La nueva fotografía está guardada, pero no se pudo retirar la anterior.');
    });
  }
}
