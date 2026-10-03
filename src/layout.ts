import { ancestors, descendants, type Model, type NodeType, type TreeType } from './model';

// Geometria kolumn mapy (w jednostkach mapy, przed skalowaniem).
export const X: Record<NodeType, number> = { obszar: 0, postawa: 300, drogowskaz: 640, ksiazka: 1140 };
export const W: Record<NodeType, number> = { obszar: 240, postawa: 280, drogowskaz: 340, ksiazka: 280 };
export const H: Record<NodeType, number> = { obszar: 64, postawa: 70, drogowskaz: 52, ksiazka: 44 };
const G: Record<TreeType, number> = { obszar: 22, postawa: 10, drogowskaz: 6 };
const CONTENT_W = 1420;
const PANEL_W = 420;

export interface Pos { y: number; h: number }
export interface PlacedBook { id: string; reps: string[]; d: number; y: number }
export interface Layout { pos: Record<string, Pos>; books: PlacedBook[]; minY: number; maxY: number }
export interface FocusSet { F: Set<string>; books: Set<string> }
export interface View { k: number; tx: number; ty: number }

/** „Widok ścieżki”: tylko węzły na drodze do zaznaczonego elementu i jego książki. */
export function focusSet(m: Model, sel: string | null, focusMode: boolean): FocusSet | null {
  if (!focusMode || !sel) return null;
  const F = new Set<string>();
  let books: Set<string>;
  if (m.B[sel]) {
    m.B[sel].links.forEach(l => {
      F.add(l);
      ancestors(m, l).forEach(a => F.add(a));
    });
    books = new Set([sel]);
  } else if (m.N[sel]) {
    descendants(m, sel).forEach(d => F.add(d));
    ancestors(m, sel).forEach(a => F.add(a));
    books = m.subBooks[sel];
  } else return null;
  return { F, books };
}

export function computeLayout(m: Model, expanded: Set<string>, FS: FocusSet | null): Layout {
  const N = m.N, F = FS && FS.F, pos: Record<string, Pos> = {};
  let y = 0;
  const place = (id: string) => {
    const n = N[id], h = H[n.type];
    const c = F ? n.children.filter(x => F.has(x)) : n.children;
    if ((F || expanded.has(id)) && c.length) {
      c.forEach(place);
      pos[id] = { y: (pos[c[0]].y + pos[c[c.length - 1]].y) / 2, h };
      y += G[n.type];
    } else {
      pos[id] = { y: y + h / 2, h };
      y += h + G[n.type];
    }
  };
  (F ? m.roots.filter(r => F.has(r)) : m.roots).forEach(place);
  const treeBottom = y;

  const open = (l: string) => (F ? F.has(l) && !!pos[l] : !!pos[l] && (N[l].type === 'drogowskaz' || expanded.has(l)));
  const books: PlacedBook[] = Object.values(m.B)
    .map(b => {
      const reps = b.links.filter(open);
      const d = reps.length ? reps.reduce((s, r) => s + pos[r].y, 0) / reps.length : treeBottom;
      return { id: b.id, reps, d, y: 0 };
    })
    .filter(b => b.reps.length && (!FS || FS.books.has(b.id)))
    .sort((a, b) => a.d - b.d);

  // Książki ustawiamy przy średniej wysokości ich węzłów, bez nachodzenia na siebie,
  // a potem przesuwamy całą kolumnę w górę, żeby nie „uciekała” w dół.
  const step = H.ksiazka + 8;
  let prev = -Infinity;
  books.forEach(b => {
    b.y = Math.max(b.d, prev + step);
    prev = b.y;
  });
  const off = books.reduce((s, b) => s + (b.y - b.d), 0) / Math.max(1, books.length);
  const minFirst = (books[0] ? books[0].d : 0) - 200;
  const shift = Math.min(off * 0.6, Math.max(0, (books[0] ? books[0].y : 0) - minFirst));
  books.forEach(b => {
    b.y -= shift;
    pos[b.id] = { y: b.y, h: H.ksiazka };
  });

  let minY = Infinity, maxY = -Infinity;
  Object.values(pos).forEach(p => {
    minY = Math.min(minY, p.y - p.h / 2);
    maxY = Math.max(maxY, p.y + p.h / 2);
  });
  return { pos, books, minY, maxY };
}

export function fitView(m: Model, L: Layout, vw: number, vh: number, o: { hasSel: boolean; focusMode: boolean; lib: boolean }): View {
  const panel = o.hasSel ? Math.min(PANEL_W, vw) : 0;
  let tMin = Infinity, tMax = -Infinity;
  Object.keys(L.pos).forEach(id => {
    if (m.N[id] || o.focusMode) {
      const p = L.pos[id];
      tMin = Math.min(tMin, p.y - p.h / 2);
      tMax = Math.max(tMax, p.y + p.h / 2);
    }
  });
  if (!isFinite(tMin)) return { k: 1, tx: 32, ty: 110 };
  const ch = tMax - tMin + 40;
  const left = o.lib ? Math.min(432, vw / 2) : 32;
  const k = Math.max(0.5, Math.min(1, (vw - panel - left - 32) / CONTENT_W, (vh - 160) / ch));
  return { k, tx: left, ty: 110 - (tMin - 30) * k };
}

export function ensureVisibleView(L: Layout, type: NodeType, id: string, v: View, vw: number, vh: number): View | null {
  const p = L.pos[id];
  if (!p) return null;
  const panel = Math.min(PANEL_W, vw);
  const cx = X[type] + W[type] / 2;
  const sx = cx * v.k + v.tx, sy = p.y * v.k + v.ty;
  if (sx < 40 || sx > vw - panel - 40 || sy < 90 || sy > vh - 60) {
    return { k: v.k, tx: (vw - panel) / 2 - cx * v.k, ty: vh / 2 - p.y * v.k };
  }
  return null;
}

export function zoomView(v: View, f: number, cx: number, cy: number): View {
  const nk = Math.max(0.15, Math.min(2.5, v.k * f));
  return { k: nk, tx: cx - (cx - v.tx) * (nk / v.k), ty: cy - (cy - v.ty) * (nk / v.k) };
}

export type EdgeStyle = 'krzywe' | 'kątowe';

export function edgePath(style: EdgeStyle, x1: number, y1: number, x2: number, y2: number): string {
  if (style === 'kątowe') {
    const mx = x1 + Math.min(30, (x2 - x1) / 2);
    return `M${x1} ${y1}H${mx}V${y2}H${x2}`;
  }
  const mx = (x1 + x2) / 2;
  return `M${x1} ${y1}C${mx} ${y1},${mx} ${y2},${x2} ${y2}`;
}
