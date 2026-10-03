# Drogowskazy HO · HR i lektury

Interaktywna mapa łącząca książki z drogowskazami prób na stopnie HO i HR (ZHR).
Hierarchia: **Obszar życia → Postawa / metoda → Drogowskaz → Książka**.

## Uruchomienie

```bash
npm install
npm run dev      # serwer deweloperski
npm run build    # statyczna strona w dist/ (działa z dowolnego katalogu)
npm test         # testy danych i układu mapy
```

## Co potrafi

- Mapa-siatka z przybliżaniem (kółko myszy, przyciski −/+, „Dopasuj”) i przesuwaniem (przeciąganie).
- Drzewo rozwija się poziomami: „+” przy obszarze → postawy, „+” przy postawie → drogowskazy i ich książki.
- Każdy element ma własny adres, np. `#/ksiazka/atomowe-nawyki`, `#/drogowskaz/zdr-sport-3`,
  i otwiera panel boczny z miejscem na pełny opis.
- Wyszukiwarka (tytuł, autor, tag, nazwa drogowskazu).
- „Biblioteczka”: filtr po tagach i po liczbie połączeń na mapie (2+, 3+, 4+).
  Książka otwarta z biblioteczki pokazuje tylko swoje ścieżki („Widok ścieżki”);
  kliknięcie drogowskazu na ścieżce pokazuje wszystkie jego książki.

## Dane

Wszystko jest w `src/data.ts`:

- `obszary` – przepisane z `project/uploads/vademecum.pdf`. Plik kończy się na s. 81, więc obszary
  *Rodzina*, *Pasje*, *Kultura* i *Przyroda* nie mają jeszcze postaw (`missing: true`).
- `ksiazki` – lektury z harcerskielektury.pl z dopasowaniem (`l`) i tagami (`tags`).
  Id drogowskazu to `<id postawy>-<numer>`, np. `zdr-sport-3`.

`npm test` sprawdza, czy każde powiązanie książki wskazuje istniejący element mapy.

## Źródło projektu

`project/` i `chats/` to eksport z Claude Design (prototyp `Mapa Drogowskazow.dc.html` i rozmowa projektowa).
