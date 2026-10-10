import { useLanguage } from '../../shared/i18n/LanguageProvider.jsx';
import { useCallback, useEffect, useId, useMemo, useState } from 'react';
import { api } from '../../shared/services/api.js';
import { useResource } from '../../shared/hooks/useResource.js';
import { searchSuggestions } from './searchSuggestions.js';

export function CatalogSearch({ initialValue, onSearch }) {
  const { t } = useLanguage();
  const [text, setText] = useState(initialValue);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const id = useId();
  const resource = useResource(useCallback(signal => api.catalog.searchOptions({ signal }), []));
  useEffect(() => { setText(initialValue); setOpen(false); setActive(-1); }, [initialValue]);
  const suggestions = useMemo(() => searchSuggestions(resource.data || [], text), [resource.data, text]);
  const expanded = open && suggestions.length > 0;
  function choose(label) { setText(label); setOpen(false); setActive(-1); onSearch(label); }
  function keyDown(event) {
    if ((event.key === 'ArrowDown' || event.key === 'ArrowUp') && suggestions.length) {
      event.preventDefault(); setOpen(true);
      setActive(previous => event.key === 'ArrowDown' ? (previous + 1) % suggestions.length : previous <= 0 ? suggestions.length - 1 : previous - 1);
    } else if (event.key === 'Escape') { event.preventDefault(); setOpen(false); setActive(-1); }
    else if (event.key === 'Enter' && !event.nativeEvent.isComposing && expanded && active >= 0) { event.preventDefault(); choose(suggestions[active].label); }
  }
  return <form className="catalog-search" role="search" onSubmit={event => { event.preventDefault(); setOpen(false); onSearch(text); }}>
    <label htmlFor={`${id}-input`}>{t("Buscar por marca o modelo")}</label>
    <div className="catalog-search-row">
      <div className="catalog-autocomplete" onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) { setOpen(false); setActive(-1); } }}>
        <input id={`${id}-input`} type="search" name="q" role="combobox" aria-autocomplete="list" aria-expanded={expanded} aria-controls={expanded ? `${id}-list` : undefined} aria-activedescendant={expanded && active >= 0 ? `${id}-option-${active}` : undefined} autoComplete="off" value={text} onChange={event => { setText(event.target.value); setOpen(true); setActive(-1); }} onFocus={() => { setOpen(true); if (resource.status === 'error') resource.retry(); }} onKeyDown={keyDown} placeholder={t("Escribe una marca o modelo, por ejemplo Audi Q5")} maxLength={100} />
        {expanded && <ul className="catalog-suggestions" id={`${id}-list`} role="listbox" aria-label={t("Marcas y modelos sugeridos")}>
          {suggestions.map((option, index) => <li key={`${t(option.type)}-${option.label}`} id={`${id}-option-${index}`} role="option" aria-selected={index === active} onMouseDown={event => event.preventDefault()} onClick={() => choose(option.label)}><span>{option.label}</span><small>{t(option.type)}</small></li>)}
        </ul>}
      </div>
      <button className="button" type="submit">{t("Buscar")}</button>
    </div>
    {resource.status === 'error' && <p className="small">{t("Sugerencias no disponibles. Puedes buscar escribiendo el texto completo.")}</p>}
  </form>;
}
