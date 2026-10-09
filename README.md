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

Wymagany jest Node.js 24 (takiej samej wersji używa workflow).
Do odtwarzalnej instalacji zależności, tak jak na GitHub Actions, użyj `npm ci`.

## Publikacja na GitHub Pages

Aplikacja działa w przeglądarce i nie potrzebuje serwera aplikacyjnego.
GitHub Pages musi otrzymać **zbudowany katalog `dist/`**, a nie źródłowy
`index.html` odwołujący się do `/src/main.tsx`. Zajmuje się tym workflow
[`.github/workflows/pages.yml`](.github/workflows/pages.yml).

### Jednorazowe ustawienie przez właściciela repozytorium

1. Otwórz [Settings → Pages](https://github.com/barteksh58/HarcBaza/settings/pages).
2. W sekcji **Build and deployment** ustaw **Source: GitHub Actions**.
   Nie wybieraj publikowania z gałęzi ani katalogu `/docs`.
3. Połącz PR zawierający workflow z gałęzią `main`.
   Jeżeli PR został już połączony przed włączeniem Pages, otwórz
   **Actions → Build and deploy GitHub Pages → Run workflow**, wybierz `main`
   i uruchom workflow.
4. Poczekaj, aż zadania `build` i `deploy` zakończą się sukcesem. Gotowa strona:
   **https://barteksh58.github.io/HarcBaza/**.

Każdy kolejny push do `main` automatycznie aktualizuje stronę. PR-y uruchamiają
instalację, testy i build, ale nie publikują strony. Workflow używa wbudowanego
`GITHUB_TOKEN` — nie trzeba tworzyć własnych tokenów ani sekretów.

Konfiguracja Vite ma `base: './'`, więc pliki JS i CSS mają względne adresy
i działają pod `/HarcBaza/`. Nawigacja używa fragmentów adresu (`#/ksiazka/...`),
więc odświeżenie linku do książki nie wymaga przekierowań ani pliku `404.html`.

### Gdy publikacja nie działa

- **Błąd konfiguracji Pages / 404 w zadaniu `deploy`:** sprawdź, czy właściciel
  włączył Pages i wybrał źródło **GitHub Actions**.
- **Nieudane `build`:** otwórz logi kroku instalacji, testów lub kompilacji
  w zakładce **Actions**. Publikacja czeka na poprawne testy i build.
- **Biała strona lub żądanie `/src/main.tsx`:** sprawdź źródło publikacji.
  Workflow wysyła wyłącznie `dist/`; publikowanie plików z gałęzi `main`
  nie buduje aplikacji Vite.
- **Oczekujące wdrożenie:** sprawdź reguły środowiska **github-pages**
  w **Settings → Environments** i ewentualne wymagane zatwierdzenie.

### Fork a wspólna strona

Fork może służyć tylko do zgłoszenia PR do repozytorium Bartka. Po przyjęciu
PR strona jest publikowana z jego repozytorium; nie trzeba utrzymywać osobnej
kopii strony. Jeśli chcesz niezależny hosting, włącz Pages w ustawieniach
swojego forka i uruchom workflow na `main`. Przy nazwie repozytorium `HarcBaza`
adres będzie miał postać `https://<twoj-login>.github.io/HarcBaza/`.

Dokumentacja: [GitHub Pages i własne workflow](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
oraz [publikacja Vite](https://vite.dev/guide/static-deploy.html#github-pages).

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
