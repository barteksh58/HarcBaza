import { useState, type RefObject } from 'react';
import { ancestors, descendants, plural, type Model, type TreeNode } from './model';
import { edgePath, H, W, X, type EdgeStyle, type Layout, type View } from './layout';

const SEL_OUTLINE = '2px solid oklch(0.66 0.14 60)';

interface Props {
  vpRef: RefObject<HTMLDivElement | null>;
  model: Model;
  layout: Layout;
  view: View;
  expanded: Set<string>;
  sel: string | null;
  edgeStyle: EdgeStyle;
  onPan: (tx: number, ty: number) => void;
  onSelect: (id: string) => void;
  onToggle: (id: string) => void;
}

export function MapCanvas({ vpRef, model, layout: L, view, expanded, sel, edgeStyle, onPan, onSelect, onToggle }: Props) {
  const [drag, setDrag] = useState<{ x: number; y: number; tx: number; ty: number } | null>(null);
  const { N, B } = model, pos = L.pos;
  const { k, tx, ty } = view;

  // Aktywna gałąź zaznaczonego elementu; reszta mapy jest przygaszona.
  let act: Set<string> | null = null, actB: Set<string> = new Set();
  if (sel && N[sel]) {
    const sub = descendants(model, sel);
    act = new Set([...sub, ...ancestors(model, sel)]);
    sub.forEach(x => N[x].books.forEach(b => actB.add(b)));
  } else if (sel && B[sel]) {
    actB = new Set([sel]);
    act = new Set();
    B[sel].links.forEach(l => { act!.add(l); ancestors(model, l).forEach(a => act!.add(a)); });
  }
  const op = (id: string) => (!act ? 1 : act.has(id) || actB.has(id) ? 1 : 0.18);
  const nodeStyle = (id: string, top: number) => ({ top, opacity: op(id), outline: id === sel ? SEL_OUTLINE : 'none' });

  const vis = Object.keys(pos).filter(id => N[id]);
  const ofType = (t: TreeNode['type']) => vis.filter(id => N[id].type === t);

  const toggleBtn = (n: TreeNode) =>
    n.children.length > 0 || n.books.length > 0 ? (
      <button className="toggle" onClick={e => { e.stopPropagation(); onToggle(n.id); }} aria-label={expanded.has(n.id) ? 'Zwiń' : 'Rozwiń'}>
        {expanded.has(n.id) ? '−' : '+'}
      </button>
    ) : null;

  const treeEdges = vis.filter(id => N[id].parent).map(id => {
    const p = N[id].parent!, t = N[p].type;
    const on = !act || (act.has(id) && act.has(p));
    return <path key={id} d={edgePath(edgeStyle, X[t] + W[t], pos[p].y, X[N[id].type], pos[id].y)} fill="none" stroke="oklch(0.42 0.08 150)" strokeWidth={1.4} strokeOpacity={on ? 0.45 : 0.07} />;
  });
  const bookEdges = L.books.flatMap(b => b.reps.map(r => {
    const t = N[r].type, on = !!act && actB.has(b.id) && act.has(r);
    return (
      <path key={r + '>' + b.id} d={edgePath(edgeStyle, X[t] + W[t] + (t !== 'drogowskaz' ? 12 : 0), pos[r].y, X.ksiazka, b.y)}
        fill="none" stroke="oklch(0.66 0.14 60)" strokeWidth={on ? 2 : 1.2} strokeOpacity={!act ? 0.4 : on ? 0.95 : 0.05} />
    );
  }));

  return (
    <div
      ref={vpRef}
      className={'viewport' + (drag ? ' dragging' : '')}
      style={{ backgroundSize: `${24 * k}px ${24 * k}px`, backgroundPosition: `${tx}px ${ty}px` }}
      onPointerDown={e => {
        if (e.button !== 0 || (e.target as HTMLElement).closest('[data-node]')) return;
        setDrag({ x: e.clientX, y: e.clientY, tx, ty });
      }}
      onPointerMove={e => { if (drag) onPan(drag.tx + e.clientX - drag.x, drag.ty + e.clientY - drag.y); }}
      onPointerUp={() => setDrag(null)}
      onPointerLeave={() => setDrag(null)}
    >
      <div className="world" style={{ transform: `translate(${tx}px,${ty}px) scale(${k})` }}>
        {isFinite(L.minY) && (
          <div className="col-heads" style={{ top: L.minY - 44 }}>
            <div style={{ left: 0, width: 240 }}>Obszar życia</div>
            <div style={{ left: 300, width: 280 }}>Postawa · metoda</div>
            <div style={{ left: 640, width: 340 }}>Drogowskaz</div>
            <div style={{ left: 1140, width: 280 }}>Książka</div>
          </div>
        )}
        <svg className="edges" width={1500} height={1}>
          {treeEdges}
          {bookEdges}
        </svg>

        {ofType('obszar').map(id => {
          const n = N[id];
          return (
            <div key={id} data-node className="node node-obszar" style={nodeStyle(id, pos[id].y - H.obszar / 2)} onClick={() => onSelect(id)}>
              <div className="name">{n.name}</div>
              <div className="meta">{(n.missing ? 'brak postaw w pliku · ' : '') + plural(model.subBooks[id].size)}</div>
              {toggleBtn(n)}
            </div>
          );
        })}

        {ofType('postawa').map(id => {
          const n = N[id];
          return (
            <div key={id} data-node className="node node-postawa" style={nodeStyle(id, pos[id].y - H.postawa / 2)} onClick={() => onSelect(id)}>
              <div className="name clamp2">{n.name}</div>
              <div className="meta">{(n.method ? 'metoda · ' : '') + plural(model.subBooks[id].size)}</div>
              {toggleBtn(n)}
            </div>
          );
        })}

        {ofType('drogowskaz').map(id => {
          const n = N[id];
          return (
            <div key={id} data-node className="node node-drogowskaz" style={nodeStyle(id, pos[id].y - H.drogowskaz / 2)} onClick={() => onSelect(id)}>
              <div className="diamond" />
              <div className="name clamp2">{n.name}</div>
              {n.hr && <div className="badge-hr">HR</div>}
              {n.books.length > 0 && <div className="count">{n.books.length}</div>}
            </div>
          );
        })}

        {L.books.map(b => (
          <div key={b.id} data-node className="node node-ksiazka" style={nodeStyle(b.id, b.y - H.ksiazka / 2)} onClick={() => onSelect(b.id)}>
            <div className="square" />
            <div className="text">
              <div className="name ellipsis">{B[b.id].name}</div>
              <div className="author ellipsis">{B[b.id].author}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
