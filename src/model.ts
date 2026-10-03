import type { ZhrData } from './data';

export type TreeType = 'obszar' | 'postawa' | 'drogowskaz';
export type NodeType = TreeType | 'ksiazka';

export interface TreeNode {
  id: string;
  type: TreeType;
  name: string;
  desc?: string;
  missing?: boolean;
  method?: boolean;
  hr?: boolean;
  parent: string | null;
  children: string[];
  books: string[];
}

export interface Book {
  id: string;
  type: 'ksiazka';
  name: string;
  author: string;
  cat: string;
  src: string;
  desc: string;
  tags: string[];
  links: string[];
}

export interface Model {
  N: Record<string, TreeNode>;
  B: Record<string, Book>;
  roots: string[];
  /** Wszystkie książki w gałęzi (węzeł + potomkowie). */
  subBooks: Record<string, Set<string>>;
  /** Tagi posortowane malejąco wg liczby książek. */
  tagCounts: [string, number][];
}

export function buildModel(D: ZhrData): Model {
  const N: Record<string, TreeNode> = {};
  D.obszary.forEach(o => {
    N[o.id] = { id: o.id, type: 'obszar', name: o.name, desc: o.intro, missing: o.missing, parent: null, children: [], books: [] };
    o.postawy.forEach(p => {
      N[o.id].children.push(p.id);
      N[p.id] = { id: p.id, type: 'postawa', name: p.name, desc: p.desc, method: p.method, parent: o.id, children: [], books: [] };
      p.d.forEach((d, i) => {
        const id = p.id + '-' + (i + 1);
        N[p.id].children.push(id);
        N[id] = { id, type: 'drogowskaz', name: typeof d === 'string' ? d : d.t, hr: typeof d !== 'string' && !!d.hr, parent: p.id, children: [], books: [] };
      });
    });
  });

  const B: Record<string, Book> = {};
  D.ksiazki.forEach(b => {
    const links = b.l.filter(l => {
      if (N[l]) return true;
      console.warn('Brak węzła', l, b.id);
      return false;
    });
    B[b.id] = { id: b.id, type: 'ksiazka', name: b.t, author: b.a, cat: b.c, src: b.src, desc: b.topic, tags: b.tags || [], links };
    links.forEach(l => N[l].books.push(b.id));
  });

  const roots = D.obszary.map(o => o.id);
  const subBooks: Record<string, Set<string>> = {};
  const sb = (id: string): Set<string> => {
    const s = new Set(N[id].books);
    N[id].children.forEach(c => sb(c).forEach(x => s.add(x)));
    subBooks[id] = s;
    return s;
  };
  roots.forEach(sb);

  const counts: Record<string, number> = {};
  Object.values(B).forEach(b => b.tags.forEach(t => (counts[t] = (counts[t] || 0) + 1)));
  const tagCounts = Object.entries(counts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'pl'));

  return { N, B, roots, subBooks, tagCounts };
}

export function getItem(m: Model, id: string): TreeNode | Book | undefined {
  return m.N[id] || m.B[id];
}

export function ancestors(m: Model, id: string): string[] {
  const a: string[] = [];
  let p = m.N[id] ? m.N[id].parent : null;
  while (p) {
    a.unshift(p);
    p = m.N[p].parent;
  }
  return a;
}

export function descendants(m: Model, id: string, out = new Set<string>()): Set<string> {
  out.add(id);
  m.N[id].children.forEach(c => descendants(m, c, out));
  return out;
}

/** Węzły, które mają co rozwijać (dzieci lub książki). */
export function expandable(m: Model): string[] {
  return Object.keys(m.N).filter(id => m.N[id].children.length || m.N[id].books.length);
}

export function plural(n: number): string {
  if (n === 1) return '1 książka';
  const d = n % 10, t = n % 100;
  return n + (d >= 2 && d <= 4 && (t < 12 || t > 14) ? ' książki' : ' książek');
}

export const SLUG: Record<NodeType, string> = { obszar: 'obszar', postawa: 'postawa', drogowskaz: 'drogowskaz', ksiazka: 'ksiazka' };

export function hashFor(m: Model, id: string): string {
  return '#/' + SLUG[getItem(m, id)!.type] + '/' + encodeURIComponent(id);
}

export function idFromHash(hash: string): string | null {
  const match = hash.match(/^#\/(\w+)\/(.+)$/);
  if (!match) return null;
  try {
    return decodeURIComponent(match[2]);
  } catch {
    return null;
  }
}
