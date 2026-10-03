// Dane mapy: obszary → postawy/metody → drogowskazy (z Vademecum ZHR, prób HO i HR)
// oraz książki (głównie harcerskielektury.pl) dopasowane do elementów mapy.
//
// Drogowskaz nie ma własnego id w danych – jego id to `<id postawy>-<numer od 1>`,
// np. "zdr-sport-3" to trzeci drogowskaz postawy "zdr-sport".
// Pola książki: t – tytuł, a – autor, c – kategoria, src – źródło, topic – krótki opis,
// tags – tagi jak w księgarniach, l – id elementów mapy (obszar, postawa lub drogowskaz).

export interface Drogowskaz { t: string; hr?: boolean }
export interface PostawaData { id: string; name: string; desc?: string; method?: boolean; d: (string | Drogowskaz)[] }
export interface ObszarData { id: string; name: string; intro?: string; missing?: boolean; postawy: PostawaData[] }
export interface KsiazkaData { id: string; t: string; a: string; c: string; src: string; topic: string; tags: string[]; l: string[] }
export interface ZhrData { obszary: ObszarData[]; ksiazki: KsiazkaData[] }

export const DATA: ZhrData = {
obszary: [
{id:"bog", name:"Bóg, wiara i duchowość", intro:"Każdy z nas będąc wiernym idei, która nas w ruchu harcerskim połączyła, powinien rozwijać swoją wrażliwość duchową i pogłębiać rozumienie zasad etycznych.", postawy:[
 {id:"bog-logos", name:"Poszukuję Logosu i transcendencji w świecie.", desc:"Poszukuję rozumienia głębokich prawd o początku i celu rzeczywistości oraz źródle dobra, prawdy i piękna.", d:[
  "Przeczytałem współczesną książkę lub wybrane teksty dotyczące sensu istnienia, harmonii przyrody lub stworzenia świata.",
  "Szukam odpowiedzi na pytania o to: czym jest dobro a czym zło, jaka jest relacja szczęścia i moralności, gdzie można znaleźć uniwersalne drogowskazy etycznego postępowania.",
  "Studiuję teksty traktujące o idei dobra, cnotach. Próbuję odnieść je do współczesnych wyzwań etycznych i własnego życia.",
  "Poznaję argumenty za istnieniem Boga (np. 5 dróg św. Tomasza z Akwinu, argumenty z przygodności bytu, argumenty ontologiczne, argument Kalam, argumenty z precyzyjnego dostrojenia itp.).",
  "Z otwartością badam cuda i objawienia.",
  "Śledzę podcasty/ czytam współczesne artykuły, w których poruszane są dylematy dotyczące wiedzy naukowej i wiary.",
  "Poznaję klasyczne dzieła i teksty traktujące o istocie Boga (np. Ojców Kościoła, Św. Tomasza z Akwinu). Szukam odpowiedzi na pytanie, co to znaczy, że Bóg jest prosty."]},
 {id:"bog-etyka", name:"Kieruję się zasadami etyki chrześcijańskiej.", desc:"Chrześcijanin zgłębia nauczanie moralne Kościoła i kształtuje swoje sumienie w oparciu o Dekalog i Przykazanie Miłości.", d:[
  "Poznaję postać Jezusa przez współczesne książki i komentarze do Biblii.",
  "Poznaję nauczanie Jezusa (np. przeczytałem Kazanie na Górze z Ewangelii według św. Mateusza).",
  "Czytam współczesne teksty dot. rozumienia zagadnień etycznych, szczególnie etyki chrześcijańskiej (np. L. Kołakowski).",
  "Regularnie słucham podcasterów i youtuberów tłumaczących moralność chrześcijańską.",
  "Poznaję stanowisko Kościoła katolickiego (i/lub mojego Kościoła) wobec współczesnych wyzwań bioetycznych. Umiem zająć w dyskusji stanowisko w podobnych sprawach.",
  "Studiuję koncepcje prawa naturalnego chrześcijańskich i niechrześcijańskich autorów.",
  "Pogłębiam rozumienie cnót kardynalnych (roztropność, sprawiedliwość, umiarkowanie, męstwo) – uczestniczę w dyskusjach, spotkaniach na ten temat.",
  "Potrafię przeanalizować postępowanie wg kryteriów oceny moralnej czynu (przedmiot, intencja i okoliczności).",
  "Zastanawiam się nad rolą sumienia w życiu człowieka (np. uczestniczę w dyskusjach).",
  "Poznaję zasady moralności seksualnej obowiązujące w moim Kościele. Wiem, co znaczy, że seksualność człowieka ma cel prokreacyjny i jednoczący."]},
 {id:"bog-kosciol", name:"Poznaję chrześcijaństwo i Kościół, rozwijam osobistą relację z Bogiem.", desc:"Doświadczenie różnych praktyk i form duchowych jest też drogą poznania kultury chrześcijańskiej i otwarcia się na działanie Boga dla tych, którzy go poszukują.", d:[
  "Uczestniczyłem przynajmniej raz (w życiu lub przynajmniej raz świadomie) w całym Triduum Paschalnym.",
  "Czytam literaturę chrześcijańską (np. św. Augustyna, Tolkiena, Chestertona, Lewisa, Cormaca McCarthy’ego).",
  "Odbyłem osobistą refleksyjną wędrówkę na łonie natury, w której zmierzyłem się z jednym z transcendentalnych pytań.",
  "Poznałem różnice doktrynalne między Kościołami chrześcijańskimi. Wiem, co łączy, a co różni chrześcijaństwo z innymi wielkimi religiami monoteistycznymi.",
  "Poznaję żywoty świętych, którzy mnie inspirują, odbyłem intelektualną i fizyczną pielgrzymkę śladem jednego z nich.",
  "Uczestniczyłem w kilkudniowej pieszej lub rowerowej pielgrzymce.",
  "Studiuję historię mojego Kościoła. Umiem zmierzyć się z pytaniami o błędy i niemoralne działania mojego Kościoła w przeszłości i współcześnie.",
  "Świadomie podejmuję się ćwiczeń duchowych – np. poszczę w wybranej intencji, regularnie odmawiam różaniec.",
  "Uczestniczyłem w zamkniętych rekolekcjach.",
  "Podjąłem się stałej pracy ze spowiednikiem."]},
 {id:"bog-wspolnota", name:"Jestem otwarty na wspólnotę duchową.", desc:"Wartości duchowe poznaje się przez dialog z bliźnimi, wspólne stawianie pytań i poszukiwanie odpowiedzi.", d:[
  "Brałem udział w służbie na wydarzeniu religijnym (np. Lednicy, ŚDM, Golgocie młodych itp).",
  "Potrafię w ramach działań drużyny opowiedzieć o wpływie kościoła na rozwój kultury – posługując się konkretnymi przykładami.",
  "Brałem udział w rekolekcjach dla poszukujących (np. Kurs Alfa itp.).",
  "Rozmawiałem z mnichem lub z siostrą klauzurową na temat ich sposobu życia, motywacji i wiary.",
  "Wziąłem udział w spotkaniu z osobą, która przeżyła nawrócenie.",
  "Zaangażowałem się we współtworzenie dzieła charytatywnego w mojej wspólnocie – parafii lub duszpasterstwie.",
  "Współtworzyłem rozbudowaną oprawę liturgii w mojej wspólnocie (np. podczas Triduum Paschalnego, Mszy Pasterskiej, procesji Bożego Ciała).",
  "Podjąłem się uczestnictwa w jednej z grup formacyjnych w moim Kościele.",
  "Potrafię się duchowo przygotować do poszczególnych części Mszy Świętej, wiem, co się dzieje w każdej z nich.",
  "Korzystam z lekcjonarza, potrafię odnaleźć właściwe czytania mszalne i zaśpiewać psalm.",
  "Potrafię modlić się Liturgią Godzin lub Lectio Divina."]},
 {id:"bog-pismo", name:"Poznaję Pismo Święte.", desc:"Biblia jest fascynującym literackim zapisem korzeni cywilizacji, w której wszyscy wyrastamy niezależnie od naszych przekonań religijnych.", d:[
  "Znam podstawową strukturę Nowego i Starego Testamentu, przeczytałem wybrane Ewangelie w całości.",
  "Śledzę, w jaki sposób treść Biblii była inspiracją do stworzenia innych wielkich dzieł literatury i sztuki.",
  "Przeczytałem wybrany, współczesny komentarz do Biblii (np. Rozmowy o Biblii, A. Świderkówna), uczestniczyłem w dyskusji na interesujący mnie temat z nią związany.",
  "Regularnie czytam Pismo Święte.",
  "Przeczytałem teksty biblijne mówiące o relacji między wiarą a uczynkami. Zapoznałem się z komentarzami mojego Kościoła do tych tekstów."]}
]},
{id:"sila", name:"Siła charakteru", intro:"Drogą do sprostania wymaganiom idei harcerskiej są ćwiczenia charakteru. Obszar opisuje metody pracy nad cnotami i wadami.", postawy:[
 {id:"sila-nawyk", name:"Wypracuj nawyk i zaplanuj pracę!", method:true, desc:"Wymyśl małe zadanie i podejmij dłuższe wyzwanie (np. 30- lub 60-dniowe), w ramach którego będziesz codziennie wykonywał to małe zadanie.", d:[]},
 {id:"sila-wyzwanie", name:"Podejmij wyzwanie i przełam się!", method:true, desc:"Możesz spróbować rzucić się na głęboką wodę i postawić się w sytuacji niekomfortowej, która pozwoli Ci spojrzeć na świat i na siebie innymi oczami.", d:[]},
 {id:"sila-towarzystwo", name:"Zmień/poszerz towarzystwo!", method:true, desc:"Czasami warto się zastanowić, czy nie wejść w nowe środowisko i nie poznać nowych ludzi, którzy pomogą nam w walce o cnotliwe życie.", d:[]},
 {id:"sila-mistrz", name:"Znajdź mistrza/brata!", method:true, desc:"Bardzo wartościowe na tej ścieżce jest znalezienie mistrza (kierownika duchowego, starszego brata itp.), z którym będziesz mógł regularnie pracować nad swoim charakterem.", d:[]},
 {id:"sila-poczytaj", name:"Poczytaj!", method:true, desc:"Wystaw się na próbę i zmierz się z innymi argumentami. Dzięki temu może Twoje następne decyzje będą oparte na głębszym rozumieniu świata.", d:[]}
]},
{id:"rozum", name:"Rozum i intelekt", intro:"Przykładamy wielką wagę do rozwoju intelektualnego – by sobie i innym służyć rozwagą i mądrymi decyzjami.", postawy:[
 {id:"rozum-metod", name:"Uczę się metodycznie i regularnie.", d:[
  "Mam stałe pory w ciągu dnia i tygodnia, kiedy regularnie się uczę (nie tylko do sprawdzianów).",
  "Potrafię zaplanować swoją naukę i zrealizować ten plan.",
  "Czytam książki zgodnie z ułożonym przeze mnie planem."]},
 {id:"rozum-szkola", name:"Szkoła i nauka są dla mnie ważne.", desc:"Przykładam się do swoich obowiązków szkolnych, korzystam z szans, które daje mi szkoła, uczestniczę w życiu szkolnym.", d:[
  "Wybrałem przedmioty szkolne, na których się szczególnie koncentruję i w których wychodzę poza minimum szkolne.",
  "Potrafię poprawić oceny z przedmiotu, z którego jestem słaby.",
  "Uczestniczę w życiu szkolnym (np. biorę udział w projektach szkolnych i kołach zainteresowań, jestem częścią samorządu szkolnego)."]},
 {id:"rozum-logika", name:"Myślę logicznie.", desc:"Staram się wyciągać wnioski, bazując na logicznych związkach między przesłankami rozumowania, a nie głównie na intuicji i odczuciach.", d:[
  "Potrafię napisać tekst, artykuł lub zrobić prezentację, w których przedstawiam swoją tezę i bronię jej argumentami.",
  "Potrafię rozbić argument na przesłanki, przeanalizować związki logiczne pomiędzy nimi i w ten sposób określić jego prawdziwość.",
  "Znam najczęstsze błędy w argumentacji (np. zwalczanie chochoła, błędne koło, mylenie przyczynowości z korelacją, fałszywa dychotomia)."]},
 {id:"rozum-kryt", name:"Zachowuję krytycyzm i pokorę intelektualną.", desc:"Badam argumenty swoje oraz innych, nie odrzucam ani nie akceptuję poglądów bez zrozumienia ich podstaw.", d:[
  "Potrafię poprowadzić dyskusję lub przeprowadzić burzę mózgów (zgodnie z metodyką jej prowadzenia).",
  "Potrafię poszukiwać potrzebnych mi informacji, korzystając ze zróżnicowanych źródeł.",
  "Potrafię zweryfikować, czy jakaś informacja jest prawdziwa czy fałszywa (fake news, deep fake).",
  "Potrafię w debacie bronić tezy, z którą się nie zgadzam."]},
 {id:"rozum-swiat", name:"Kształtuję swój światopogląd.", desc:"Zapoznaję się z różnymi światopoglądami i koncepcjami społeczno-gospodarczymi oraz potrafię je ocenić na bazie argumentów.", d:[
  "Potrafię zgłębić (np. przez przeczytanie książki) wybraną doktrynę społeczną lub kwestię społeczną.",
  "Potrafię nawiązywać relacje z ludźmi o poglądach sprzecznych z moimi lub będących w sytuacjach życiowych zupełnie innych niż moja."]},
 {id:"rozum-ciek", name:"Jestem dociekliwy i ciekawy świata.", d:[
  "Mam potrzebę i wolę poznawania nowych rzeczy dogłębnie, a nie jedynie powierzchownie.",
  "Wycieczki po Polsce i wyjazdy za granicę wykorzystuję do zaplanowanego poznania nowych rejonów, ludzi, zwyczajów itp.",
  "Umiem zadawać trafne pytania: przeprowadzić wywiad z ciekawą osobą lub przeprowadzić na potrzeby projektu badanie opinii.",
  "Otwieram się na dziedziny wiedzy, którymi się na co dzień nie interesuję, ale które mają obecnie znaczenie dla mojego życia rodzinnego, zawodowego lub społecznego.",
  "Potrafię odnaleźć i przeczytać artykuł naukowy dotyczący tematu, który mnie interesuje, oraz wziąć udział w wydarzeniu akademickim o takiej tematyce."]}
]},
{id:"zdrowie", name:"Zdrowie i sprawność fizyczna", intro:"Harcerz jest sprawny i dba o swoje zdrowie! Od tego będzie zależało, na ile będziemy w stanie pełnić w życiu służbę.", postawy:[
 {id:"zdr-sport", name:"Jestem wysportowany i sprawny fizycznie.", d:[
  "Potrafię zrealizować program treningowy.",
  "Planuję dzień tak, aby w wykonywanie codziennych obowiązków wplatać krótkie aktywności fizyczne.",
  "Mam wyrobiony nawyk regularnego podejmowania aktywności fizycznej. Jest ona częścią mojej tygodniowej rutyny.",
  "Potrafię zrealizować wyczyn fizyczny na poziomie mistrzowskim."]},
 {id:"zdr-zdrowie", name:"Dbam o swoje zdrowie.", d:[
  "Wiem, jaka jest moja właściwa waga, jaka jest odpowiednia dla mnie dieta i trzymam się jej.",
  "Znam dobre nawyki żywieniowe (regularne posiłki, odpowiednie składniki, unikanie „energetyków” itp.) i wcielam je w życie.",
  "Mam stałe godziny snu (min. 8 godzin dziennie).",
  "Rozumiem ryzyko stosowania jakichkolwiek środków psychoaktywnych i uzależniających."]},
 {id:"zdr-higiena", name:"Dbam o swoją higienę i dobry wygląd.", d:[
  "Regularnie się golę lub strzygę brodę, codziennie myję się i używam dezodorantu.",
  "Potrafię zająć się swoimi problemami dermatologicznymi."]},
 {id:"zdr-cyfra", name:"Zachowuję higienę cyfrową.", d:[
  "Wiem, jak działa uzależnienie od urządzeń ekranowych i jakie niesie skutki.",
  "Potrafię funkcjonować bez korzystania z jakichkolwiek mediów społecznościowych przez dłuższy czas (np. Wielki Post).",
  "Nie używam telefonu w czasie lekcji, posiłków rodzinnych, przechodząc przez przejście dla pieszych, prowadząc samochód, rower, po godz. 22.00 itd.",
  "Mierzę w aplikacji czas korzystania z urządzeń ekranowych, wyznaczam sobie limity i ich przestrzegam."]}
]},
{id:"sluzba", name:"Służba", intro:"Rozwój w tym obszarze dotyczy rozwijania jednej postawy – postawy służby, której drogowskazy zawarte są w Przyrzeczeniu Harcerskim.", postawy:[
 {id:"sluzba-p", name:"Mam szczerą wolę całym życiem pełnić służbę Bogu i Polsce, nieść chętną pomoc bliźnim i być posłusznym Prawu Harcerskiemu.", d:[
  "Służba harcerza orlego – „Nieść chętną pomoc bliźnim”.",
  {t:"Służba harcerza Rzeczypospolitej – „Całym życiem pełnić służbę Bogu i Polsce”.", hr:true},
  "Jeśli pełnisz służbę harcerską jako drużynowy albo przyboczny, możesz w ramach tego zadania zorganizować wartościową służbę z udziałem innych harcerzy."]}
]},
{id:"ojczyzna", name:"Małe ojczyzny, Polska i świat", intro:"Zawołanie „Czuwaj!” oznacza dla nas również: bądź wierny swojej wspólnocie oraz Polsce i szukaj przyjaciół na całym świecie!", postawy:[
 {id:"oj-hist", name:"Znam polską historię i jej wpływ na teraźniejszość.", d:[
  "Potrafię opisać historię Polski od czasu I-go rozbioru.",
  "Potrafię zorganizować akcję patriotyczną towarzyszącą świętu narodowemu.",
  "Znam polskie miasta, regiony i ich rolę w historii Polski, podczas ich odwiedzania świadomie pogłębiam tę wiedzę.",
  "Potrafię wygłosić referat lub zrobić prezentację na temat wybranej kontrowersji z historii Polski."]},
 {id:"oj-lok", name:"Jestem lokalnym patriotą.", d:[
  "Potrafię oprowadzić wycieczkę po miejscu mojego pochodzenia, prezentując elementy jego historii.",
  "Potrafię nawiązać współpracę drużyny z innymi organizacjami lub instytucjami działającymi lokalnie.",
  "Dokonałem pozytywnej zmiany w mojej lokalnej społeczności."]},
 {id:"oj-swiat", name:"Buduję braterstwo z ludźmi z Europy i z całego świata.", d:[
  "Potrafię godnie zaprezentować Polskę w międzynarodowym gronie.",
  "Potrafię zorganizować kilkudniową podróż do innego kraju, w ramach której poznam jego kulturę i historię.",
  "Potrafię porozumieć się po angielsku w codziennych sytuacjach.",
  "Uczę się wybranego języka obcego (innego niż angielski).",
  "Potrafię dyskutować w języku obcym.",
  "Potrafię ugościć obcokrajowca lub wspomóc imigranta w integracji w polskim społeczeństwie.",
  "Potrafię zorganizować działanie, które angażuje Polaków żyjących poza Polską."]},
 {id:"oj-obrona", name:"Jestem gotów do obrony ojczyzny.", d:[
  "Uczestniczę w działaniach Pogotowia Harcerek i Harcerzy.",
  "Umiem zachować spokój i opanowanie w sytuacji kryzysowej (np. w razie wypadku, ewakuacji).",
  "Przeszedłem kurs Sanitariusza HOPR.",
  "Potrafię strzelać z broni ostrej (wyłącznie na strzelnicy pod okiem instruktora strzeleckiego).",
  "Posiadam uprawnienia dronowe.",
  "Posiadam świadectwo operatora radiotelefonisty VHF.",
  "Zdałem kurs Kwalifikowanej Pierwszej Pomocy.",
  "Przeszedłem podstawowe szkolenie obronne (tzw. „szesnastka” WOT)."]},
 {id:"oj-obyw", name:"Jestem świadomym i aktywnym obywatelem.", d:[
  "Znam polskie partie polityczne, ich programy, profile ideowe i poglądy na najważniejsze kwestie społeczno-gospodarcze.",
  "Potrafię bronić swojego stanowiska w wybranej kwestii dotyczącej Polski w debacie z rówieśnikami.",
  "Mam doświadczenie zaangażowania w działalność samorządową, obywatelską lub polityczną.",
  "Uczestniczę w wyborach, decyzje podejmuję w duchu odpowiedzialności za Polskę."]}
]},
{id:"rodzina", name:"Rodzina i wybór drogi życiowej", missing:true, postawy:[]},
{id:"pasje", name:"Pasje i umiejętności", missing:true, postawy:[]},
{id:"kultura", name:"Kultura i komunikacja", missing:true, postawy:[]},
{id:"przyroda", name:"Przyroda i puszczaństwo", missing:true, postawy:[]}
],
ksiazki: [
{id:"atomowe-nawyki", tags:["Rozwój osobisty","Poradnik","Psychologia"], t:"Atomowe nawyki", a:"James Clear", c:"Psychologia", src:"Przykład z polecenia", topic:"Budowanie dobrych nawyków przez małe, codzienne zmiany i projektowanie otoczenia.", l:["sila-nawyk","zdr-sport-3","rozum-metod-1","zdr-cyfra-4"]},
{id:"dzieje-polski", tags:["Historia","Historia Polski","Literatura faktu"], t:"Dzieje Polski", a:"Andrzej Nowak", c:"Historia", src:"Vademecum", topic:"Wielotomowa synteza historii Polski.", l:["oj-hist-1","oj-hist-3"]},
{id:"rozmowy-o-biblii", tags:["Religia","Biblia","Literatura faktu"], t:"Rozmowy o Biblii", a:"Anna Świderkówna", c:"Duchowość", src:"Vademecum", topic:"Przystępny komentarz do ksiąg Starego i Nowego Testamentu.", l:["bog-pismo-3","bog-pismo-1"]},
{id:"7-nawykow", tags:["Rozwój osobisty","Poradnik","Biznes"], t:"7 nawyków skutecznego działania", a:"Stephen Covey", c:"Zarządzanie", src:"harcerskielektury.pl", topic:"Zasady proaktywności, planowania według priorytetów i współpracy.", l:["sila-nawyk","rozum-metod-2","rodzina"]},
{id:"ekstremalne-przywodztwo", tags:["Przywództwo","Biznes","Wojsko"], t:"Ekstremalne przywództwo", a:"Jocko Willink, Leif Babin", c:"Zarządzanie", src:"harcerskielektury.pl", topic:"Odpowiedzialność i samodyscyplina lidera na przykładach z pola walki.", l:["sila-wyzwanie","sila-nawyk","sluzba-p-3"]},
{id:"przechytrzyc-diabla", tags:["Rozwój osobisty","Motywacja"], t:"Przechytrzyć diabła", a:"Napoleon Hill", c:"Psychologia", src:"harcerskielektury.pl", topic:"Pokonywanie strachu, dryfowania i braku celu.", l:["sila-nawyk","sila-wyzwanie"]},
{id:"maksimum-osiagniec", tags:["Rozwój osobisty","Poradnik","Biznes"], t:"Maksimum osiągnięć", a:"Brian Tracy", c:"Zarządzanie", src:"harcerskielektury.pl", topic:"Wyznaczanie celów, zarządzanie czasem i samodyscyplina.", l:["sila-nawyk","rozum-metod-2"]},
{id:"dzikie-serce", tags:["Religia","Męskość","Psychologia"], t:"Dzikie serce. Tęsknoty męskiej duszy", a:"John Eldredge", c:"Psychologia", src:"harcerskielektury.pl", topic:"Chrześcijańskie spojrzenie na męskość, odwagę i powołanie.", l:["sila-wyzwanie","bog-kosciol-2","rodzina"]},
{id:"zelazny-jan", tags:["Męskość","Psychologia","Mitologia"], t:"Żelazny Jan", a:"Robert Bly", c:"Psychologia", src:"harcerskielektury.pl", topic:"Inicjacja i dojrzewanie mężczyzny odczytane przez baśń braci Grimm.", l:["sila-wyzwanie","rodzina"]},
{id:"together-is-better", tags:["Przywództwo","Motywacja"], t:"Together is better", a:"Simon Sinek", c:"Zarządzanie", src:"harcerskielektury.pl", topic:"Krótkie myśli o wspólnocie, zaufaniu i przywództwie.", l:["sila-towarzystwo","sluzba-p-3"]},
{id:"jak-zdobyc-przyjaciol", tags:["Komunikacja","Psychologia","Poradnik"], t:"Jak zdobyć przyjaciół i zjednać sobie ludzi", a:"Dale Carnegie", c:"Psychologia", src:"harcerskielektury.pl", topic:"Zasady budowania relacji i życzliwej komunikacji.", l:["sila-towarzystwo","kultura","rozum-swiat-2"]},
{id:"coaching-i-mentoring", tags:["Coaching","Biznes","Komunikacja"], t:"Coaching i mentoring", a:"E. Parsloe, M. Leedham, D. Newell", c:"Zarządzanie", src:"harcerskielektury.pl", topic:"Proces coachingowy, aktywne słuchanie i informacja zwrotna.", l:["sila-mistrz","rozum-ciek-3","sluzba-p-3"]},
{id:"wilk-ktory-nigdy-nie-spi", tags:["Biografia","Harcerstwo"], t:"Wilk, który nigdy nie śpi", a:"Walter Hansen", c:"Idea i Metoda", src:"harcerskielektury.pl", topic:"Biografia Roberta Baden-Powella.", l:["sila-mistrz","sluzba-p-3"]},
{id:"gawedy-z-druzynowym", tags:["Harcerstwo","Pedagogika"], t:"Gawędy z drużynowym", a:"Henryk Glass", c:"M. Harcerze", src:"harcerskielektury.pl", topic:"Gawędy o pracy drużynowego i wychowaniu przez przykład.", l:["sila-mistrz","sluzba-p-3"]},
{id:"listy-starego-diabla", tags:["Religia","Literatura piękna","Klasyka"], t:"Listy starego diabła do młodego", a:"C.S. Lewis", c:"Duchowość", src:"harcerskielektury.pl", topic:"Satyryczne listy o pokusach i walce z wadami.", l:["bog-kosciol-2","bog-etyka-7","sila-poczytaj"]},
{id:"ego-to-twoj-wrog", tags:["Rozwój osobisty","Filozofia","Psychologia"], t:"Ego to twój wróg", a:"Ryan Holiday", c:"Psychologia", src:"harcerskielektury.pl", topic:"Pokora i panowanie nad ambicją w duchu stoicyzmu.", l:["rozum-kryt","sila-poczytaj"]},
{id:"wedrowka-do-sukcesu", tags:["Harcerstwo","Rozwój osobisty","Klasyka"], t:"Wędrówka do sukcesu", a:"Robert Baden-Powell", c:"Idea i Metoda", src:"harcerskielektury.pl", topic:"Poradnik dla wędrowników o wyborze drogi życiowej i pułapkach dorosłości.", l:["rodzina","sila-poczytaj","sluzba-p-2"]},
{id:"36-dowodow", tags:["Religia","Esej"], t:"36 dowodów na istnienie diabła", a:"André Frossard", c:"Duchowość", src:"harcerskielektury.pl", topic:"Eseje o złu i wierze pisane przez konwertytę.", l:["bog-logos-4","bog-kosciol-2"]},
{id:"bog-i-nauka", tags:["Religia","Nauka","Filozofia"], t:"Bóg i nauka", a:"ks. prof. Michał Heller", c:"Duchowość", src:"harcerskielektury.pl", topic:"Relacja wiary i nauki oczami kosmologa i księdza.", l:["bog-logos-6","bog-logos-1"]},
{id:"jezus-z-nazaretu", tags:["Religia","Teologia","Biblia"], t:"Jezus z Nazaretu", a:"Joseph Ratzinger", c:"Duchowość", src:"harcerskielektury.pl", topic:"Teologiczne studium postaci i nauczania Jezusa.", l:["bog-etyka-1","bog-etyka-2"]},
{id:"teologia-ciala", tags:["Religia","Teologia","Rodzina"], t:"Elementarz teologii ciała wg Jana Pawła II", a:"Paweł Kopycki", c:"Duchowość", src:"harcerskielektury.pl", topic:"Wprowadzenie do nauczania Jana Pawła II o ciele i miłości.", l:["bog-etyka-10","rodzina"]},
{id:"porozumienie-bez-przemocy", tags:["Komunikacja","Psychologia","Poradnik"], t:"Porozumienie bez przemocy", a:"Marshall B. Rosenberg", c:"Psychologia", src:"harcerskielektury.pl", topic:"Metoda empatycznej komunikacji i rozwiązywania konfliktów.", l:["kultura","rozum-swiat-2","rozum-kryt-1","rodzina"]},
{id:"wywieranie-wplywu", tags:["Psychologia","Komunikacja","Nauka"], t:"Wywieranie wpływu na ludzi", a:"Robert Cialdini", c:"Psychologia", src:"harcerskielektury.pl", topic:"Mechanizmy perswazji i techniki manipulacji.", l:["rozum-kryt-3","rozum-logika-3","kultura"]},
{id:"myslenie-pytaniami", tags:["Coaching","Komunikacja","Biznes"], t:"Myślenie pytaniami", a:"Marilee Adams", c:"Zarządzanie", src:"harcerskielektury.pl", topic:"Jak zadawane pytania zmieniają myślenie i decyzje.", l:["rozum-ciek-3","rozum-kryt-1"]},
{id:"plec-mozgu", tags:["Psychologia","Nauka","Rodzina"], t:"Płeć mózgu", a:"Anne Moir", c:"Psychologia", src:"harcerskielektury.pl", topic:"Różnice w funkcjonowaniu mózgu kobiet i mężczyzn.", l:["rodzina","rozum-ciek-4"]},
{id:"jak-mowic-zeby-dzieci", tags:["Rodzina","Komunikacja","Poradnik","Pedagogika"], t:"Jak mówić, żeby dzieci nas słuchały", a:"Adele Faber, Elaine Mazlish", c:"Psychologia", src:"harcerskielektury.pl", topic:"Praktyczna komunikacja z dziećmi.", l:["rodzina","kultura"]},
{id:"rozwoj-dziecka", tags:["Psychologia","Pedagogika","Podręcznik"], t:"Rozwój dziecka. Wczesny wiek szkolny", a:"Anna Kamza", c:"Psychologia", src:"harcerskielektury.pl", topic:"Psychologia rozwoju dzieci w wieku 6–10 lat.", l:["rodzina","sluzba-p-3"]},
{id:"zaczynaj-od-dlaczego", tags:["Przywództwo","Biznes","Motywacja"], t:"Zaczynaj od dlaczego", a:"Simon Sinek", c:"Zarządzanie", src:"harcerskielektury.pl", topic:"Poszukiwanie celu i motywacji działania.", l:["rodzina","sluzba-p-3"]},
{id:"to-jedno", tags:["Biznes","Rozwój osobisty"], t:"To jedno, co powinieneś wiedzieć", a:"Marcus Buckingham", c:"Zarządzanie", src:"harcerskielektury.pl", topic:"Rozwijanie mocnych stron w pracy i życiu.", l:["rodzina","pasje"]},
{id:"liderzy-jedza-na-koncu", tags:["Przywództwo","Biznes"], t:"Liderzy jedzą na końcu", a:"Simon Sinek", c:"Zarządzanie", src:"harcerskielektury.pl", topic:"Przywództwo jako służba i troska o zespół.", l:["sluzba-p-2","sluzba-p-3"]},
{id:"cale-zycie-pod-wiatr", tags:["Wspomnienia","Historia","Harcerstwo"], t:"Całe życie pod wiatr", a:"Andrzej Glass", c:"Historia", src:"harcerskielektury.pl", topic:"Wspomnienia harcerskie na tle historii XX wieku.", l:["oj-hist-1","sila-mistrz"]},
{id:"kamienie-na-szaniec", tags:["Historia Polski","Literatura faktu","Harcerstwo","Klasyka"], t:"Kamienie na szaniec", a:"Aleksander Kamiński", c:"Historia", src:"harcerskielektury.pl", topic:"Harcerze Szarych Szeregów w okupowanej Warszawie.", l:["oj-hist-1","oj-obrona","sila-mistrz"]},
{id:"szare-szeregi", tags:["Historia Polski","Harcerstwo","Pedagogika"], t:"Szare Szeregi jako organizacja wychowawcza", a:"Tomasz Strzembosz", c:"Historia", src:"harcerskielektury.pl", topic:"Wychowanie w konspiracyjnym harcerstwie 1939–1945.", l:["oj-hist-1","oj-obrona"]},
{id:"calym-zyciem", tags:["Wspomnienia","Historia Polski","Harcerstwo"], t:"Całym życiem", a:"Stanisław Broniewski", c:"Idea i Metoda", src:"harcerskielektury.pl", topic:"Szare Szeregi i idea służby we wspomnieniach Naczelnika.", l:["sluzba-p-2","oj-hist-1","oj-obrona"]},
{id:"kiham", tags:["Historia","Harcerstwo","Źródła"], t:"KIHAM – zarys wydarzeń, wybór dokumentów i relacji", a:"Stanisław Czopowicz", c:"Historia", src:"harcerskielektury.pl", topic:"Kręgi Instruktorów Harcerskich im. A. Małkowskiego i odrodzenie harcerstwa.", l:["oj-hist-4","oj-hist-1"]},
{id:"harcerstwo-w-gdyni", tags:["Historia lokalna","Harcerstwo"], t:"Harcerstwo w Gdyni w okresie międzywojennym i w czasie okupacji", a:"Dariusz Małszycki", c:"Historia", src:"harcerskielektury.pl", topic:"Lokalna historia harcerstwa gdyńskiego.", l:["oj-lok-1","oj-hist-3"]},
{id:"refleksje-strzembosz", tags:["Harcerstwo","Pedagogika","Esej"], t:"Refleksje o harcerstwie i wychowaniu", a:"Tomasz Strzembosz", c:"Idea i Metoda", src:"harcerskielektury.pl", topic:"Eseje o wychowaniu harcerskim i jego historii.", l:["sluzba-p-3","oj-hist-4"]},
{id:"skauting-dla-chlopcow", tags:["Harcerstwo","Survival","Klasyka"], t:"Skauting dla chłopców", a:"Robert Baden-Powell", c:"Idea i Metoda", src:"harcerskielektury.pl", topic:"Klasyczny podręcznik technik i życia w terenie.", l:["przyroda","pasje","zdr-sport"]},
{id:"cuda-z-patykow", tags:["Pionierka","Survival","Poradnik"], t:"Cuda z patyków", a:"Tomasz Kucharzewski „Watra”", c:"Techniki", src:"harcerskielektury.pl", topic:"Pionierka i budowle obozowe.", l:["przyroda","pasje"]},
{id:"oboz-druzyny", tags:["Harcerstwo","Poradnik","Turystyka"], t:"Obóz drużyny harcerzy", a:"Marek Kamecki", c:"M. Harcerze", src:"harcerskielektury.pl", topic:"Organizacja obozu harcerskiego w lesie.", l:["sluzba-p-3","przyroda"]},
{id:"hsw", tags:["Harcerstwo","Pedagogika","Podręcznik"], t:"Harcerski System Wychowania", a:"Marek Gajdziński", c:"Idea i Metoda", src:"harcerskielektury.pl", topic:"Kompendium metody harcerskiej.", l:["sluzba-p-3"]},
{id:"stosowanie-metody", tags:["Harcerstwo","Pedagogika"], t:"Stosowanie metody harcerskiej w drużynie harcerzy", a:"Marek Kamecki", c:"Idea i Metoda", src:"harcerskielektury.pl", topic:"Praktyka metody w drużynie.", l:["sluzba-p-3"]},
{id:"o-metodzie", tags:["Harcerstwo","Pedagogika","Klasyka"], t:"O metodzie harcerskiej i jej stosowaniu", a:"Ewa Grodecka", c:"Idea i Metoda", src:"harcerskielektury.pl", topic:"Klasyczny wykład metody harcerskiej.", l:["sluzba-p-3"]},
{id:"narzedziownik", tags:["Harcerstwo","Poradnik"], t:"Narzędziownik drużynowego", a:"Marek Gajdziński", c:"M. Harcerze", src:"harcerskielektury.pl", topic:"Narzędzia pracy drużynowego.", l:["sluzba-p-3"]},
{id:"harcerstwo-to-gra", tags:["Harcerstwo","Pedagogika"], t:"Harcerstwo to gra", a:"Tomasz Maracewicz", c:"M. Harcerze", src:"harcerskielektury.pl", topic:"Gra jako podstawa pracy harcerskiej.", l:["sluzba-p-3"]},
{id:"wielka-gra-wodzow", tags:["Harcerstwo","Przywództwo"], t:"Wielka gra wodzów", a:"Tomasz Maracewicz", c:"Idea i Metoda", src:"harcerskielektury.pl", topic:"Praca z kadrą i zastępowymi.", l:["sluzba-p-3"]},
{id:"proby-wodzow", tags:["Harcerstwo","Pedagogika"], t:"Próby wodzów", a:"Leopold Ungehauer", c:"Idea i Metoda", src:"harcerskielektury.pl", topic:"Próby i stopnie w pracy z kadrą.", l:["sluzba-p-3"]},
{id:"wskazowki-skautmistrzow", tags:["Harcerstwo","Klasyka","Pedagogika"], t:"Wskazówki dla skautmistrzów", a:"Robert Baden-Powell", c:"Idea i Metoda", src:"harcerskielektury.pl", topic:"Podstawy pracy instruktora według założyciela skautingu.", l:["sluzba-p-3"]},
{id:"eksperyment-wedrowniczy", tags:["Harcerstwo","Pedagogika"], t:"Eksperyment wędrowniczy", a:"Andrzej Janowski", c:"M. Wędrownicy", src:"harcerskielektury.pl", topic:"Metoda wędrownicza z doświadczeń powojennych.", l:["sluzba-p-3"]},
{id:"wodzowie-i-wilki", tags:["Harcerstwo","Pedagogika"], t:"Wodzowie i wilki", a:"Andrzej Wysocki", c:"M. Wędrownicy", src:"harcerskielektury.pl", topic:"Praca z wędrownikami.", l:["sluzba-p-3"]},
{id:"propozycje-programowe", tags:["Harcerstwo","Pedagogika"], t:"Propozycje programowe dla drużyn harcerskich w szkołach średnich", a:"Wiesław Jasiński", c:"M. Wędrownicy", src:"harcerskielektury.pl", topic:"Program dla drużyn starszoharcerskich.", l:["sluzba-p-3"]},
{id:"pod-totemem-slonca", tags:["Harcerstwo","Obrzędowość"], t:"Pod totemem słońca", a:"Antoni Wasilewski", c:"Idea i Metoda", src:"harcerskielektury.pl", topic:"Obrzędowość i puszczańskie tradycje harcerskie.", l:["sluzba-p-3","przyroda"]},
{id:"obrzedowy-piec", tags:["Harcerstwo","Obrzędowość"], t:"Obrzędowy piec", a:"Marek Kudasiewicz", c:"Idea i Metoda", src:"harcerskielektury.pl", topic:"Obrzędowość w drużynie.", l:["sluzba-p-3"]},
{id:"krag-rady", tags:["Harcerstwo","Pedagogika","Klasyka"], t:"Krąg rady", a:"Aleksander Kamiński", c:"M. Zuchy", src:"harcerskielektury.pl", topic:"Metodyka pracy z zuchami.", l:["sluzba-p-3"]},
{id:"antek-cwaniak", tags:["Literatura dziecięca","Harcerstwo","Klasyka"], t:"Antek Cwaniak", a:"Aleksander Kamiński", c:"M. Zuchy", src:"harcerskielektury.pl", topic:"Opowieść o gromadzie zuchowej.", l:["sluzba-p-3"]},
{id:"ksiazka-wodza-zuchow", tags:["Harcerstwo","Pedagogika","Podręcznik"], t:"Książka wodza zuchów", a:"Aleksander Kamiński", c:"M. Zuchy", src:"harcerskielektury.pl", topic:"Podręcznik drużynowego zuchów.", l:["sluzba-p-3"]}
]};
