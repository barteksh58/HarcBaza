import { plural, type Model } from './model';

export interface LibFilters { q: string; tags: string[]; minLinks: number }

interface Props {
  model: Model;
  sel: string | null;
  filters: LibFilters;
  onFilters: (f: Partial<LibFilters>) => void;
  onClose: () => void;
  onPick: (id: string) => void;
}

export function Library({ model, sel, filters: { q, tags, minLinks }, onFilters, onClose, onPick }: Props) {
  const lq = q.trim().toLowerCase();
  const books = Object.values(model.B)
    .filter(b => b.links.length >= minLinks && tags.every(t => b.tags.includes(t)) && (!lq || (b.name + ' ' + b.author + ' ' + b.tags.join(' ')).toLowerCase().includes(lq)))
    .sort((a, b) => b.links.length - a.links.length || a.name.localeCompare(b.name, 'pl'));

  return (
    <div className="popover library">
      <div className="lib-head">
        <div className="lib-title">
          <h2>Biblioteczka</h2>
          <button className="close" onClick={onClose} aria-label="Zamknij">×</button>
        </div>
        <input className="lib-input" value={q} onChange={e => onFilters({ q: e.target.value })} placeholder="Tytuł, autor lub tag…" />
        <div className="group">
          <div className="eyebrow">Połączenia na mapie</div>
          <div className="seg">
            {[1, 2, 3, 4].map(m => (
              <button key={m} className={minLinks === m ? 'on' : ''} onClick={() => onFilters({ minLinks: m })}>{m === 1 ? 'Wszystkie' : m + '+'}</button>
            ))}
          </div>
        </div>
        <div className="group">
          <div className="group-head">
            <div className="eyebrow">Tagi</div>
            {tags.length > 0 && <button className="clear" onClick={() => onFilters({ tags: [] })}>wyczyść</button>}
          </div>
          <div className="chips">
            {model.tagCounts.map(([t, c]) => {
              const on = tags.includes(t);
              return (
                <button key={t} className={'chip' + (on ? ' on' : '')} onClick={() => onFilters({ tags: on ? tags.filter(x => x !== t) : [...tags, t] })}>
                  {t} {c}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="lib-count">{books.length ? plural(books.length) + ' · sortowane wg liczby połączeń' : 'Brak książek dla wybranych filtrów'}</div>
      <div className="lib-list">
        {books.map(b => (
          <div key={b.id} className="lib-book" style={{ outline: b.id === sel ? '2px solid oklch(0.66 0.14 60)' : 'none' }} onClick={() => onPick(b.id)}>
            <div className="text">
              <div className="name">{b.name}</div>
              <div className="author">{b.author}</div>
              <div className="mini-tags">{b.tags.map(t => <span key={t}>{t}</span>)}</div>
            </div>
            <div className="links-badge">
              <b>{b.links.length}</b>
              <small>połącz.</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
