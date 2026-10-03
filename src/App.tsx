import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { DATA } from './data';
import { ancestors, buildModel, descendants, expandable, getItem, hashFor, idFromHash } from './model';
import { computeLayout, ensureVisibleView, fitView, focusSet, zoomView, type EdgeStyle, type View } from './layout';
import { MapCanvas } from './MapCanvas';
import { Library, type LibFilters } from './Library';
import { DetailPanel } from './DetailPanel';

// Odpowiedniki właściwości prototypu (startExpanded, edgeStyle).
const START_EXPANDED = false;
const EDGE_STYLE: EdgeStyle = 'krzywe';

const model = buildModel(DATA);

interface UIState extends View {
  expanded: Set<string>;
  sel: string | null;
  focusMode: boolean;
  query: string;
  lib: boolean;
  libF: LibFilters;
}

type After = { kind: 'fit' } | { kind: 'ensure'; id: string } | null;

export default function App() {
  const [s, setS] = useState<UIState>(() => ({
    k: 0.6, tx: 40, ty: 90,
    expanded: new Set(START_EXPANDED ? expandable(model) : []),
    sel: null, focusMode: false, query: '', lib: false,
    libF: { q: '', tags: [], minLinks: 1 },
  }));
  const vpRef = useRef<HTMLDivElement>(null);
  const after = useRef<After>(null);
  const focusNext = useRef(false);
  const appRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);

  // Okienka (wyniki, biblioteczka) zaczynają się tuż pod paskiem narzędzi, nawet gdy ten się zawija.
  useLayoutEffect(() => {
    const tb = toolbarRef.current!, app = appRef.current!;
    const ro = new ResizeObserver(() => app.style.setProperty('--below-toolbar', tb.offsetTop + tb.offsetHeight + 18 + 'px'));
    ro.observe(tb);
    return () => ro.disconnect();
  }, []);

  const update = useCallback((patch: Partial<UIState> | ((p: UIState) => Partial<UIState>), then?: After) => {
    if (then) after.current = then;
    setS(p => ({ ...p, ...(typeof patch === 'function' ? patch(p) : patch) }));
  }, []);

  const FS = useMemo(() => focusSet(model, s.sel, s.focusMode), [s.sel, s.focusMode]);
  const L = useMemo(() => computeLayout(model, s.expanded, FS), [s.expanded, FS]);

  const vpSize = () => {
    const r = vpRef.current?.getBoundingClientRect();
    return r ? { w: r.width, h: r.height } : { w: 1200, h: 800 };
  };

  // Dopasowanie widoku po zmianie stanu, gdy znamy już nowy układ mapy.
  useLayoutEffect(() => {
    const a = after.current;
    if (!a) return;
    after.current = null;
    const { w, h } = vpSize();
    if (a.kind === 'fit') {
      update(fitView(model, L, w, h, { hasSel: !!s.sel, focusMode: s.focusMode, lib: s.lib }));
    } else {
      const it = getItem(model, a.id);
      const v = it && ensureVisibleView(L, it.type, a.id, s, w, h);
      if (v) update(v);
    }
  });

  // Routing: każdy element ma własny adres #/<typ>/<id>.
  const fromHash = useCallback(() => {
    const id = idFromHash(location.hash);
    const forceFocus = focusNext.current;
    focusNext.current = false;
    if (!id || !getItem(model, id)) {
      update({ sel: null, focusMode: false });
      return;
    }
    setS(p => {
      const focusMode = forceFocus || p.focusMode;
      const exp = new Set(p.expanded);
      if (model.B[id]) {
        model.B[id].links.forEach(l => {
          ancestors(model, l).forEach(a => exp.add(a));
          if (!model.N[l].children.length) exp.add(l);
        });
      } else {
        ancestors(model, id).forEach(a => exp.add(a));
        if (model.N[id].children.length || model.N[id].books.length) exp.add(id);
      }
      after.current = focusMode ? { kind: 'fit' } : { kind: 'ensure', id };
      return { ...p, sel: id, expanded: exp, query: '', focusMode };
    });
  }, [update]);

  const select = useCallback((id: string) => {
    const h = hashFor(model, id);
    if (location.hash === h) fromHash();
    else location.hash = h;
  }, [fromHash]);

  useEffect(() => {
    if (idFromHash(location.hash)) fromHash();
    else after.current = { kind: 'fit' };
    update({});
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
  }, [fromHash, update]);

  // Kółko myszy: zoom wokół kursora; poziomy gest: przesuwanie.
  useEffect(() => {
    const el = vpRef.current!;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const r = el.getBoundingClientRect();
      if (e.ctrlKey || Math.abs(e.deltaY) >= Math.abs(e.deltaX)) {
        const f = Math.exp(-e.deltaY * (e.ctrlKey ? 0.01 : 0.0015));
        setS(p => ({ ...p, ...zoomView(p, f, e.clientX - r.left, e.clientY - r.top) }));
      } else setS(p => ({ ...p, tx: p.tx - e.deltaX }));
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const zoomBy = (f: number) => {
    const { w, h } = vpSize();
    setS(p => ({ ...p, ...zoomView(p, f, w / 2, h / 2) }));
  };

  const toggle = (id: string) => update(p => {
    const exp = new Set(p.expanded);
    if (exp.has(id)) descendants(model, id).forEach(d => exp.delete(d));
    else exp.add(id);
    return { expanded: exp, focusMode: false };
  });

  const closeSel = () => {
    history.replaceState(null, '', location.pathname + location.search);
    update({ sel: null, focusMode: false });
  };

  const q = s.query.trim().toLowerCase();
  const results = useMemo(() => {
    if (q.length < 2) return [];
    const all = [...Object.values(model.B), ...Object.values(model.N)];
    return all
      .filter(x => (x.name + ' ' + ('author' in x ? x.author : '') + ' ' + ('tags' in x ? x.tags.join(' ') : '')).toLowerCase().includes(q))
      .slice(0, 12);
  }, [q]);

  const sel = s.sel && getItem(model, s.sel) ? s.sel : null;

  return (
    <div className="app" ref={appRef}>
      <MapCanvas
        vpRef={vpRef} model={model} layout={L} view={s} expanded={s.expanded} sel={sel} edgeStyle={EDGE_STYLE}
        onPan={(tx, ty) => setS(p => ({ ...p, tx, ty }))} onSelect={select} onToggle={toggle}
      />

      <div ref={toolbarRef} className={'toolbar' + (sel ? ' with-panel' : '')}>
        <div className="brand">
          <div className="title">Drogowskazy HO · HR i lektury</div>
          <div className="sub">Vademecum ZHR · harcerskielektury.pl</div>
        </div>
        <div className="tools">
          <button className={'tbtn' + (s.lib ? ' on' : '')} onClick={() => update(p => ({ lib: !p.lib }))}>Biblioteczka</button>
          <div className="sep" />
          <button className="tbtn" onClick={() => update({ focusMode: false, expanded: new Set(expandable(model)) }, { kind: 'fit' })}>Rozwiń wszystko</button>
          <button className="tbtn" onClick={() => update({ focusMode: false, expanded: new Set() }, { kind: 'fit' })}>Zwiń</button>
          <div className="sep" />
          <button className="tbtn icon" onClick={() => zoomBy(0.8)} aria-label="Oddal">−</button>
          <div className="zoom-label">{Math.round(s.k * 100)}%</div>
          <button className="tbtn icon" onClick={() => zoomBy(1.25)} aria-label="Przybliż">+</button>
          <button className="tbtn" onClick={() => update({}, { kind: 'fit' })}>Dopasuj</button>
        </div>
        <input className="search" value={s.query} onChange={e => update({ query: e.target.value })} placeholder="Szukaj książki lub drogowskazu…" />
        {s.focusMode && (
          <div className="focus-chip">
            <span>Widok ścieżki</span>
            <button onClick={() => update({ focusMode: false }, sel ? { kind: 'ensure', id: sel } : null)}>Pokaż całą mapę</button>
          </div>
        )}
      </div>

      {results.length > 0 && (
        <div className="popover results">
          {results.map(x => (
            <div key={x.id} className="row" onClick={() => select(x.id)}>
              <div className="label">{x.name}</div>
              <div className="sub">{x.type === 'ksiazka' ? 'Książka · ' + x.author : { obszar: 'Obszar', postawa: 'Postawa', drogowskaz: 'Drogowskaz' }[x.type]}</div>
            </div>
          ))}
        </div>
      )}

      {s.lib && (
        <Library
          model={model} sel={sel} filters={s.libF}
          onFilters={f => update(p => ({ libF: { ...p.libF, ...f } }))}
          onClose={() => update({ lib: false })}
          onPick={id => { focusNext.current = true; select(id); }}
        />
      )}

      <div className="legend">
        <div><div className="lg-obszar" />Obszar</div>
        <div><div className="lg-postawa" />Postawa / metoda</div>
        <div><div className="lg-drog" />Drogowskaz</div>
        <div><div className="lg-book" />Książka</div>
        <div><div className="lg-hr">HR</div>głównie dla HR</div>
        <div className="hint">Kółko myszy: zoom · przeciągnij: przesuń</div>
      </div>

      {sel && (
        <DetailPanel
          model={model} id={sel} onSelect={select} onClose={closeSel}
          onTag={t => update({ lib: true, libF: { q: '', tags: [t], minLinks: 1 } })}
        />
      )}
    </div>
  );
}

