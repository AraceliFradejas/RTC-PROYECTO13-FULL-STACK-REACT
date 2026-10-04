import { describe, expect, it } from 'vitest';
import { searchSuggestions } from './searchSuggestions.js';
const options = [
  { brand: 'Audi', model: 'Q5' },
  { brand: 'Audi', model: 'RS e-tron GT' },
  { brand: 'Porsche', model: 'Taycan' },
  { brand: 'Mercedes-Benz', model: 'EQS 450+' },
];
describe('sugerencias del catálogo', () => {
  it('sugiere una marca una sola vez junto a sus modelos', () => {
    const result = searchSuggestions(options, 'AU');
    expect(result[0]).toEqual({ label: 'Audi', type: 'Marca' });
    expect(result.map(item => item.label)).toEqual(['Audi', 'Audi Q5', 'Audi RS e-tron GT']);
  });
  it('encuentra modelos con términos separados sin distinguir acentos ni mayúsculas', () => {
    expect(searchSuggestions(options, ' ÁUDI   gt ').map(item => item.label)).toEqual(['Audi RS e-tron GT']);
    expect(searchSuggestions(options, 'tay').map(item => item.label)).toEqual(['Porsche Taycan']);
  });
  it('mantiene la búsqueda libre para entradas vacías o sin coincidencias', () => {
    expect(searchSuggestions(options, ' ')).toEqual([]);
    expect(searchSuggestions(options, '[.*')).toEqual([]);
  });
});
