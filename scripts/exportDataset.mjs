import ExcelJS from 'exceljs';
import JSZip from 'jszip';
import { readFile, writeFile, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, posix } from 'node:path';
import { pathToFileURL } from 'node:url';
import { isDeepStrictEqual } from 'node:util';
import { parse } from 'csv-parse/sync';
import { readDataset } from '../backend/src/seeds/readDataset.js';

const root = new URL('../', import.meta.url);
const mappings = [['Vehículos', 'vehicles.csv'], ['Sedes', 'dealerships.csv'], ['Talleres', 'workshops.csv']];
const checkOnly = process.argv.includes('--check');
if (process.argv.slice(2).some(argument => argument !== '--check')) throw new Error('Uso: npm run data:export [-- --check]');
const workbook = new ExcelJS.Workbook();
// ExcelJS necesita el espacio de nombres principal sin prefijo. La adaptación
// se aplica a una copia en memoria y conserva el Excel original.
const archive = await JSZip.loadAsync(await readFile(new URL('outputs/kelsets-tfm/KelseTS-datos.xlsx', root)));
for (const entry of Object.values(archive.files)) {
  if (entry.dir || !entry.name.startsWith('xl/')) continue;
  if (entry.name.endsWith('.rels')) {
    const xml = await entry.async('string');
    const sourceDirectory = posix.dirname(posix.dirname(entry.name));
    archive.file(entry.name, xml.replace(/Target="\/xl\/([^"]+)"/g, (_, path) => `Target="${posix.relative(sourceDirectory, `xl/${path}`)}"`));
    continue;
  }
  if (!entry.name.endsWith('.xml')) continue;
  const xml = await entry.async('string');
  if (xml.includes('xmlns:x="http://schemas.openxmlformats.org/spreadsheetml/2006/main"')) {
    archive.file(entry.name, xml.replaceAll('<x:', '<').replaceAll('</x:', '</').replaceAll('xmlns:x="http://schemas.openxmlformats.org/spreadsheetml/2006/main"', 'xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"'));
  }
}
await workbook.xlsx.load(await archive.generateAsync({ type: 'nodebuffer' }));
const temporary = await mkdtemp(join(tmpdir(), 'kelsets-csv-'));
try {
  const exports = [];
  for (const [sheetName, filename] of mappings) {
    const sheet = workbook.getWorksheet(sheetName);
    if (!sheet) throw new Error(`Falta la hoja ${sheetName}.`);
    const original = parse(await readFile(new URL(`data/csv/${filename}`, root), 'utf8'), { bom: true, skip_empty_lines: true });
    const headers = sheet.getRow(1).values.slice(1);
    if (!isDeepStrictEqual(headers, original[0])) throw new Error(`Cabeceras inesperadas en ${sheetName}. Conserva los nombres y el orden de las columnas.`);
    const rows = [headers];
    sheet.eachRow((row, number) => {
      if (number === 1) return;
      const values = headers.map((header, index) => {
        const value = row.getCell(index + 1).value;
        if (value === null || value === undefined) return '';
        if (value instanceof Date) return value.toISOString().slice(0, 10);
        if (['string', 'number', 'boolean'].includes(typeof value)) return String(value);
        throw new Error(`${sheetName}, fila ${number}, ${header}: usa un valor simple, sin fórmulas ni enlaces incrustados.`);
      });
      if (values.every(value => value === '')) return;
      if (row.cellCount > headers.length && row.values.slice(headers.length + 1).some(value => value != null && value !== '')) throw new Error(`Columnas adicionales en ${sheetName}, fila ${number}.`);
      rows.push(values);
    });
    const csv = rows.map(row => row.map(value => `"${String(value).replaceAll('"', '""')}"`).join(',')).join('\n') + '\n';
    await writeFile(join(temporary, filename), csv, 'utf8');
    exports.push({ filename, csv, count: rows.length - 1 });
  }
  const extracted = await readDataset(pathToFileURL(`${temporary}/`));
  if (checkOnly) {
    if (!isDeepStrictEqual(extracted, await readDataset())) throw new Error('El Excel y los CSV contienen datos diferentes. Revisa los cambios antes de exportarlos.');
    console.log('Excel y CSV coinciden en todos los datos y relaciones.');
  } else {
    for (const { filename, csv } of exports) await writeFile(new URL(`data/csv/${filename}`, root), csv, 'utf8');
    console.log('CSV exportados desde el Excel y validados antes de escribir.');
  }
  for (const { filename, count } of exports) console.log(`${filename}: ${count} registros`);
} finally {
  await rm(temporary, { recursive: true, force: true });
}
