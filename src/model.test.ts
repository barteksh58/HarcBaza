import { describe, expect, it } from 'vitest';
import { DATA } from './data';
import { buildModel, idFromHash, plural } from './model';
import { computeLayout, focusSet } from './layout';

const m = buildModel(DATA);

describe('dane', () => {
  it('każde powiązanie książki wskazuje istniejący element mapy', () => {
    const missing = DATA.ksiazki.flatMap(b => b.l.filter(l => !m.N[l]).map(l => `${b.id} → ${l}`));
    expect(missing).toEqual([]);
  });
  it('id są unikalne', () => {
    const ids = [...DATA.ksiazki.map(b => b.id), ...Object.keys(m.N)];
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('model', () => {
  it('odmienia „książka”', () => {
    expect([1, 2, 5, 12, 22, 25].map(plural)).toEqual(['1 książka', '2 książki', '5 książek', '12 książek', '22 książki', '25 książek']);
  });
  it('czyta id z adresu', () => {
    expect(idFromHash('#/ksiazka/atomowe-nawyki')).toBe('atomowe-nawyki');
    expect(idFromHash('#/')).toBeNull();
  });
  it('drogowskazy mają id <postawa>-<nr>', () => {
    expect(m.N['zdr-sport-3'].parent).toBe('zdr-sport');
    expect(m.N['zdr-sport-3'].books).toContain('atomowe-nawyki');
  });
});

describe('układ', () => {
  it('po starcie widać tylko obszary', () => {
    const L = computeLayout(m, new Set(), null);
    expect(Object.keys(L.pos).sort()).toEqual([...m.roots].sort());
  });
  it('widok ścieżki książki pokazuje tylko ją i jej przodków', () => {
    const L = computeLayout(m, new Set(), focusSet(m, 'atomowe-nawyki', true));
    expect(L.books.map(b => b.id)).toEqual(['atomowe-nawyki']);
    expect(L.pos['zdr-sport-3']).toBeDefined();
    expect(L.pos['bog']).toBeUndefined();
  });
  it('książki nie nachodzą na siebie', () => {
    const L = computeLayout(m, new Set(Object.keys(m.N)), null);
    L.books.slice(1).forEach((b, i) => expect(b.y - L.books[i].y).toBeGreaterThanOrEqual(52 - 1e-9));
  });
});
