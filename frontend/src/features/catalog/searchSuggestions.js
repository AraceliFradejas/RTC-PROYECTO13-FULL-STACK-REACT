const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es').trim();
export function searchSuggestions(options, query) {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  const brands = [...new Set(options.map(option => option.brand))].map(label => ({ label, type: 'Marca' }));
  const models = options.map(({ brand, model }) => ({ label: `${brand} ${model}`, type: 'Modelo' }));
  return [...brands, ...models]
    .filter(option => terms.every(term => normalize(option.label).includes(term)))
    .sort((a, b) => Number(normalize(b.label).startsWith(normalize(query))) - Number(normalize(a.label).startsWith(normalize(query))) || (a.type === b.type ? a.label.localeCompare(b.label, 'es') : a.type === 'Marca' ? -1 : 1))
    .slice(0, 8);
}
