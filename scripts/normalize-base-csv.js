import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { parse } from 'csv-parse/sync';
const root = new URL('../', import.meta.url);
const source = new URL('DocBase/Base de datos de concesionario - Vehiculos.csv', root);
const rows = parse(await readFile(source, 'utf8'), { columns: true, bom: true, skip_empty_lines: true });
const photos = JSON.parse(await readFile(new URL('data/media/vehicles.json', root), 'utf8'));
const photoByModel = { 'Tesla Model S': 'tesla-model-s', 'Audi Q5': 'audi-q5', 'Mercedes S-Class': 'mercedes-s-class' };
const dealerKeys = ['madrid', 'barcelona', 'san-sebastian', 'malaga'];
const escape = value => `"${String(value ?? '').replaceAll('"', '""')}"`;
const fields = ['seedKey', 'brand', 'model', 'bodyType', 'year', 'mileage', 'condition', 'status', 'originalPrice', 'originalVin', 'acquiredAt', 'color', 'dealershipKey', 'photoKey', 'image', 'fuel', 'sourceUrl', 'demo'];
const output = rows.map((row, index) => {
  const key = photoByModel[`${row.Marca} ${row.Modelo}`];
  const photo = photos.find(value => value.key === key);
  return {
    seedKey: `base-${String(index + 1).padStart(3, '0')}`,
    brand: row.Marca === 'Mercedes' ? 'Mercedes-Benz' : row.Marca,
    model: row.Modelo, bodyType: row['Tipo de vehículo'], year: row['Año de fabricación'],
    mileage: Number(row.Kilometraje.replace(/[^\d]/g, '')), condition: row.Estado,
    status: row['Estado del vehículo'], originalPrice: row['Precio de venta'],
    originalVin: row['Número de identificación del vehículo (VIN)'],
    acquiredAt: row['Fecha de adquisición'], color: row.Color,
    dealershipKey: dealerKeys[index % dealerKeys.length], photoKey: key || '', image: photo?.src || '',
    fuel: row.Marca === 'Tesla' ? 'Eléctrico' : 'Por verificar',
    sourceUrl: photo?.sourceUrl || 'https://docs.google.com/spreadsheets/d/1eWsdvriKPBOs1JXID0gz8jhIuXKaK5XcUQdjbqcpVhI/edit', demo: true,
  };
});
await mkdir(new URL('data/csv/', root), { recursive: true });
await writeFile(new URL('data/csv/vehicles.csv', root), fields.map(escape).join(',') + '\n' + output.map(row => fields.map(field => escape(row[field])).join(',')).join('\n') + '\n');
console.log(`${output.length} registros de demostración normalizados. Las fotos no acreditan unidades reales.`);
