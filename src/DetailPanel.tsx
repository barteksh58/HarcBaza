import { ancestors, getItem, hashFor, plural, type Book, type Model, type TreeNode } from './model';

interface Item { key: string; label: string; sub?: string; color: string; onClick?: () => void }
interface Section { title: string; items: Item[] }

const GREEN = 'oklch(0.42 0.08 150)';
const AMBER = 'oklch(0.66 0.14 60)';

interface Props {
  model: Model;
  id: string;
  onSelect: (id: string) => void;
  onClose: () => void;
  onTag: (tag: string) => void;
}

/** Podstrona elementu mapy – na razie panel boczny z miejscem na pełny opis. */
export function DetailPanel({ model, id, onSelect, onClose, onTag }: Props) {
  const { N, B } = model;
  const n: TreeNode | Book = getItem(model, id)!;
  const short = (s: string) => (s.length > 60 ? s.slice(0, 58) + '…' : s);
  const pathOf = (x: string) => ancestors(model, x).map(a => N[a].name.replace(/\.$/, ''));
  const bookItem = (b: string): Item => ({ key: b, label: B[b].name, sub: B[b].author, color: AMBER, onClick: () => onSelect(b) });

  const sections: Section[] = [];
  let meta: string | null = null, note: string | null = null, typeLabel: string;
  if (n.type === 'ksiazka') {
    typeLabel = 'Książka';
    meta = [n.author, n.cat].join(' · ');
    sections.push({
      title: 'Dopasowane elementy (' + n.links.length + ')',
      items: n.links.map(l => ({ key: l, label: N[l].name, sub: pathOf(l).map(short).join(' › ') || 'Obszar życia', color: GREEN, onClick: () => onSelect(l) })),
    });
    sections.push({ title: 'Źródło', items: [{ key: 'src', label: n.src, sub: 'Dopasowanie na podstawie opisów książki dostępnych w internecie', color: 'oklch(0.5 0.02 150)' }] });
  } else {
    typeLabel = { obszar: 'Obszar życia', postawa: n.method ? 'Metoda pracy' : 'Postawa', drogowskaz: 'Drogowskaz' }[n.type];
    if (n.children.length) {
      const t = n.type === 'obszar' ? (N[n.children[0]].method ? 'Metody pracy' : 'Postawy') : 'Drogowskazy';
      sections.push({
        title: t + ' (' + n.children.length + ')',
        items: n.children.map(c => ({ key: c, label: N[c].name, sub: model.subBooks[c].size ? plural(model.subBooks[c].size) : 'brak dopasowanych książek', color: GREEN, onClick: () => onSelect(c) })),
      });
    }
    const bs = [...model.subBooks[id]];
    sections.push({ title: (n.type === 'drogowskaz' ? 'Książki' : 'Wszystkie książki w gałęzi') + ' (' + bs.length + ')', items: bs.map(bookItem) });
    if (n.missing) note = 'Postawy i drogowskazy tego obszaru nie znalazły się w dostarczonym pliku (PDF kończy się na s. 81). Książki są na razie przypisane bezpośrednio do obszaru.';
  }

  const crumbs = n.type === 'ksiazka' ? [] : ancestors(model, id);
  const page = location.pathname.split('/').pop() || location.host;

  return (
    <aside className="panel">
      <div className="panel-head">
        <div className="panel-url ellipsis">{page + hashFor(model, id)}</div>
        <button className="close" onClick={onClose} aria-label="Zamknij">×</button>
      </div>
      <div className="panel-body">
        {crumbs.length > 0 && (
          <div className="crumbs">
            {crumbs.map(a => (
              <div key={a}><a onClick={() => onSelect(a)}>{short(N[a].name)}</a><span>›</span></div>
            ))}
          </div>
        )}
        <div className="title-block">
          <div className="type-row">
            <div className="type-label" style={{ color: n.type === 'ksiazka' ? 'oklch(0.55 0.13 60)' : GREEN }}>{typeLabel}</div>
            {n.type === 'drogowskaz' && n.hr && <div className="badge-hr">HR</div>}
          </div>
          <h1>{n.name}</h1>
          {meta && <div className="meta">{meta}</div>}
        </div>
        {n.type === 'ksiazka' && n.tags.length > 0 && (
          <div className="tag-btns">{n.tags.map(t => <button key={t} onClick={() => onTag(t)}>{t}</button>)}</div>
        )}
        {n.desc && <p className="desc">{n.desc}</p>}
        {note && <p className="note">{note}</p>}
        <div className="placeholder">miejsce na pełny opis elementu</div>
        {sections.map(s => (
          <div key={s.title} className="section">
            <div className="eyebrow">{s.title}</div>
            {s.items.map(it => (
              <div key={it.key} className={'item' + (it.onClick ? '' : ' static')} onClick={it.onClick}>
                <div className="dot" style={{ background: it.color }} />
                <div className="text">
                  <div className="label">{it.label}</div>
                  {it.sub && <div className="sub">{it.sub}</div>}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </aside>
  );
}
