// ─────────────────────────────────────────────────────────────────────────────
// AKTIVITY TÁBORA
//
// Každá aktivita má:
//   id              — unikátny identifikátor (napr. 'pon-pokladovka')
//   name            — názov aktivity
//   dayRef          — ID dňa (z days.js)
//   timeLabel       — štítok času (Doobedu / Poobedie / Večer / Nočná hra)
//   timeOfDay       — interný kód času: 'morning' | 'afternoon' | 'evening' | 'night'
//   type            — 'activity' | 'scenka'
//   time            — čas začiatku (HH:MM)
//   endTime         — čas konca (HH:MM alebo null)
//   location        — miesto konania
//   description     — popis aktivity (pozri nižšie ako písať dlhý text)
//   vedúciDna       — meno vedúceho dňa
//   vedúciProgramu  — meno vedúceho programu (alebo null)
//   animators       — pole { name, role? }
//   animatorsNote   — poznámka k animátorom (napr. 'Cca 10 animátorov')
//   materials       — pole stringov: pomôcky
//   hasScoring      — true ak aktivita má hodnotenie
//   scoring         — popis hodnotenia (alebo null)
//   hasMtzNote      — true ak je MTZ poznámka
//   mtzNote         — MTZ poznámka (alebo null)
//
// ─────────────────────────────────────────────────────────────────────────────
// AKO PÍSAŤ DLHÝ TEXT AKTIVITY (pole `description`)
//
// Použi multiline template string (backtick). Formát textu:
//
//   Normálny odsek — každá neprázdna línia je odsek.
//   Prázdny riadok oddeľuje odseky.
//
//   ## Nadpis sekcie
//   (riadok začínajúci ## je podnadpis)
//
//   - položka zoznamu
//   - ďalšia položka
//   (riadky začínajúce "- " sú zoznam)
//
// Príklad:
//   description: `
//   Skupinky hľadajú poklad podľa mapy.
//
//   ## Priebeh
//   - skupinky dostanú prvú indíciu
//   - postupne hľadajú ďalšie body
//   - cieľom je nájsť truhlicu
//
//   ## Poznámky
//   Dávaj pozor, aby deti nevybehli mimo priestoru.
//   `
//
// AKO PÍSAŤ POMÔCKY (pole `materials`)
//   Každá pomôcka je samostatný string v poli:
//   materials: [
//     'Mapa pokladu – 1 ks / skupinka',
//     'Tašky na poklad – 10 ks'
//   ]
// ─────────────────────────────────────────────────────────────────────────────

export const activities = [

  // ── PONDELOK ──────────────────────────────────────────────────────────────

  {
    id: 'pon-pokladovka',
    name: '"Pokladovka" + vyroba erbov, pokriku',
    dayRef: 'pondelok',
    timeLabel: 'Doobedu',
    timeOfDay: 'morning',
    type: 'activity',
    time: '10:30',
    endTime: '11:15',
    location: 'Vonku, chatky',
    detail: 'Skupinky hľadajú podľa mapy skryté meno a názov skupinky v chatách, potom vyrábajú erb a vymýšľajú pokrik skupinky.',
    description: `
Deti prídu do tábora, nechajú si veci pred jedálňou. Skupinky dostanú indície, podľa ktorých budú musieť uhádnuť miesto kde sa nachádza ďalšia obálka. V nej bude mapa s miestom ich chaty a tam nájdu ďalšie 3 obálky, každá s iným obsahom — názov skupinky, farba tímu a pokyn ku core timu. OBÁLKY MUSIA OTVÁRAŤ PODĽA ČÍSEL! Keď to nájdu, pôjdu za core timom, ktorý si zapíše ich poradie kvôli hodnoteniu a odovzdá im pomôcky na výrobu erbu, ktorý si následne idú robiť na chatky. Teraz bude aj čas a priestor pre tvorbu pokrikov, môžu si zahrať zoznamovačky.

## Názvy skupiniek
- **Trpaslíci** (chlapci, 4.–5. roč.) / **Nymfy** (dievčatá, 4.–5. roč.) — fialová
- **Orli** (chlapci, 6. roč.) / **Flóry** (dievčatá, 6. roč.) — ružová
- **Jazvce** (chlapci, 7. roč.) / **Foresty** (dievčatá, 7. roč.) — zelená
- **Kentauri** (chlapci, 8. roč.) / **Dryády** (dievčatá, 8. roč.) — hnedá/bordová
- **Kyklopi** (chlapci, 8.–9. roč.) / **Najády** (dievčatá, 8.–9. roč.) — modrá
    `,
    vedúciDna: 'Marta Baňošová FMA',
    vedúciProgramu: 'Barbora Bobaľová, Barbora Kridlová',
    animators: [],
    animatorsNote: 'Animátori pri skupinkách',
    materials: [
      'Mapy',
      'Kartony na erby',
      'Farebne písacie potreby'
    ],
    hasScoring: true,
    scoring: 'Kto prvy najde meno, pride ku Marte – ona zapise poradie. Vyhodnotenie bude plusové body.',
    hasMtzNote: true,
    mtzNote: `Core tím nech rozmiestni mapy, indície a mená skupiniek {dohodneme osobne} po chatkách ráno pred príchodom detí. Stačí na viditeľné miesto, najlepšie na každej chatke podobne.`
  },

  {
    id: 'pon-zoznamovacky',
    name: 'Zoznamovačky',
    dayRef: 'pondelok',
    timeLabel: 'Doobedu',
    timeOfDay: 'morning',
    type: 'activity',
    time: '11:15',
    endTime: '12:00',
    location: 'Vonku po areály, chatky',
    detail: 'Animátori hrajú so skupinkami vybrané spoznávacie hry – lentilková, 2 pravdy 1 lož, deka/plachta, pištolníci a ďalšie.',
    description: `
Na výber sú zoznamovačky a je na každom animátorovi, ktorú si pre svoje deti vyberie a bude s nimi hrať. Odporúčame skupinky chlapci + dievčatá dokopy, a určite spraviť aj viac týchto hier, nie len jednu.

## Lentilková
Celá skupinka má misku a v nej určité množstvo lentiliek. Misku necháme kolovať, nech si každý naberie koľko chce – zatiaľ nejesť!!!! A si poberú málo, môžeme dať kolovať ešte raz. Keď si už všetci pobrali, začne jeden o sebe rozprávať informácie, na každú farbu povie iný typ informácií, napr.
červená = Kmeňová príslušnosť (rodina)
zelená = Putovanie (najlepší výlet)
žltá = Zázraky (niečo, čo sa ti podarilo)
modrá = Suchou nohou (najväčší trapas)
oranžová = Mojžišov moment (hrdinstvo, keď niekomu pomohol)
ružová = obľúbené jedlo
hnedá = tvoje hobby
fialová = domáce zvieratko
Ak mám 2 žlté lentilky, musím povedať 2 rôzne záľuby.)
pomôcky: lentilky, miska, vysvetlivky (čo ktorá farba)

## 2 pravdy, 1 lož – verzia 1
Deťom sa rozdá po jeden lepiaci papierik a pero. Každé z nich musí o sebe napísať 1 lož a 2 pravdy (ak sú menšie deti, čo nebudú vedieť, animátori kľudne im pomôžte niečo vymyslieť ;)) → nech nehovoria iným čo píšu!!! Papieriky sa poskladajú a odovzdajú do krabičky. Deti si vylosujú cudzí papierik a podľa informácií na ňom hádajú, o koho zo skupiny ide. Každé dieťa si venuje len svojmu papieriku, a ak si myslí o danom človeku, že sa to týka jeho, nalepí mu papierik na chrbát. Hra končí, keď bude mať každý nejaký papierik na chrbte. Potom si ich čítame a opravuje zlé tipy, deti môžu zdieľať, ktorá z 3 informácií o nich je tá nepravdivá.
pomôcky: lepiace papieriky (farba pre skupinku, 6 ks farieb), písacie potreby (každému do skupinky), krabička (6 ks, ak budú čiapky tak stačí aj to)

## 2 pravdy, 1 lož – verzia 2
Deťom sa rozdá po jeden lepiaci papierik a pero. Každé z nich musí o sebe napísať 1 lož a 2 pravdy (ak sú menšie deti, čo nebudú vedieť, animátori kľudne im pomôžte niečo vymyslieť ;)) Deti sedia v kruhu, nezdieľajú medzi sebou čo píšu!!! Ak sú všetky hotové, po jednom čítajú čo napísali. Prvé dieťa prečíta 3 informácie, a ostatní sa radia, ktorá z nich je lož. Ak sa dohodnú, dieťa zakrúžkuje na svojom papieriku, ktorú informáciu ostatní zvolili ako klamstvo. Takto sa ide ďalej, pokým všetci nemajú zakrúžkovanú 1 informáciu. Potom sa znova ide od prvého a odhaľuje sa, či si ostatní tipli správne. Kľudne sa o tom môže rozbehnúť diskusia ak je čas, je to fajn na také rozprávanie, možno aj zasmijete a tak :D
pomôcky: lepiace papieriky (farba pre skupinku, 6 ks farieb), písacie potreby (každému do skupinky), krabička (6 ks, ak budú čiapky tak stačí aj to)

## Stena/Deka
Deti sedia na kope, pred nimi animátori držia deku/plachtu. Všetky deti zatvoria oči a animátori si zoberú 2/3 detí za deku a jedno z nich musí spoza deky vystrčiť ruku/nohu/kúsok hlavy/ukázať čiapku/topánku… Ostatné decká majú potom za úlohu rýchlo uhádnuť, ktoré z tých 2-3 detí za plachtou bolo (môžu sa poradiť, no majú na to max. 30 sekúnd – nech to má dynamiku)
pomôcky: deka/plachta (6 ks)

## Loptová
Jeden povie svoje meno a hodí loptu niekomu inému so slovami: „Lopta pre Lea!" Lea sa musí rýchlo ozvať a hodiť ďalšiemu: „Lopta pre Šimona!" Ak niekto zabudne meno – je to „hlad na púšti" a animátor mu dá výzvu (napr. zaspieva meno toho, koho zabudol).
pomôcky: mäkká loptička

## Pištolníci
Typickí pištolníci. Deti stoja v kruhu (na striedačku, chlapec-dievča), animátor je v strede kruhu. Animátor zakričí meno jedného dieťaťa (napr. „Peter!") a Peter si čupne. Tí, ktorí stoja vedľa Petra naľavo a napravo sa musia navzájom „zastreliť" prstami. Ten, kto strelí do toho druhého ako prvý je víťaz a porazený vypadáva z hry.
pomôcky: deti s prstami.

## Rovnaké vlastnosti
Animator povie tvrdenie:
Napr.: kto má rád fantasy, kto vie lyžovať, kto bol pri mori, kto vie variť, kto je ranné vtáča… Tí ľudia vstúpia do stredu kruhu, ktori to vedia. Vieme o sebe, kto ma podobne zaluby.

## Hľadám sám seba
Deti pomedzi seba chodia v dave a stretávajú sa. Filip sa stretne s Evou, Filip sa predstaví a potom sa predstaví Eva. Predstavujú sa svojim menom a vlastnosťou, zážitkom, tajomstvom. "som Filip a viem žonglovať" - "som Eva a mám rada vôňu benzínu". Filip a Eva teraz na seba berú vlastnosť toho druhého, čiže Filip sa bude predstavovať ako Eva a naopak. Filip sa stretne s Ruženou, a od tohto momentu sa predstavuje ako Ružena. . . takto to ide celý čas. Kto sa s kým stretne, s tým si vymení osobnosť. Individuál končí, keď sa stretne sám so sebou → nájde sa (ak sa originál Filipovi niekto predstaví ako Filip, ktorý vie žonglovať, Filip odíde z davu a sadne si vedľa na zem). Deti v dave teda majú za úlohu vymieňať si osobnosti, dokým nenájdu sami seba. - skor pre starsich

## Skupinkový "speed dating"
Sú dva rady oproti sebe [chlapci a dievčatá] prví ľudia v rade budu stat oproti sebe, animator bude citat otázky:
……. [moze si aj vymyslieť]
Ked obaja zodpovedaju, tak idu na koniec radu. Tak sa vystriedaju vsetci z oboch skupiniek.

## Pohyblivé meno
Deti stoja v kruhu. Prvé dieťa povie svoje meno a predvedie jednoduchý pohyb (napríklad potlesk, skok, chytí sa za ucho, brnkne si po nose, zatočí sa..). Ostatné deti zopakujú jeho meno aj pohyb. Potom je na rade ďalšie dieťa, ktoré pridá svoj vlastný pohyb. Hra pokračuje, až sa zapoja všetky deti.
pomocky: ziadne.
    `,
    vedúciDna: 'Marta Baňošová FMA',
    vedúciProgramu: 'Barbora Bobaľová, Barbora Kridlová',
    animators: [],
    animatorsNote: 'Animátori pri skupinkách',
    materials: [
      'Veľké balíky lentiliek {20ks}',
      'Misky',
      'Deky',
      'Lepiace papieriky',
      'Písacie potreby',
      'Lopty'
    ],
    hasScoring: false,
    scoring: null,
    hasMtzNote: true,
    mtzNote: 'Mokrý program: na chatkach, v altánku, hlavná chata'
  },

  {
    id: 'pon-skrinia',
    name: 'Celotáborová hra – objavenie skrine',
    dayRef: 'pondelok',
    timeLabel: 'Poobedie',
    timeOfDay: 'afternoon',
    type: 'activity',
    time: '15:45',
    endTime: null,
    location: 'Areál tábora, altánok',
    detail: 'Skupinky zbierajú 100 papierikov po areáli, vyhýbajú sa sluhom a plnia úlohy pri 5 predmetoch, aby otvorili skriňu do Narnie.',
    description: `
## Popis hry

Krátky úvod - vžitie do deja: Profesor má skriňu, ale nevie na čo slúži. Už pár rokov ju má v dome ale nikdy na ňu neupútaval pozornosť. Zistil, že potrebuje 5 predmetov na to, aby sa skriňa otvorila a aby sa dozvedel čo je v nej.

Priebeh hry: Hra začína vysvetlením pravidiel.
Po vysvetlení sa vyberie z každej skupinky jeden človek, ktorý príde vylosovať predmet, ktorý skupinka hľadá (chlapci a dievčatá hrajú spolu v skupinkách).
Skupinka bude musieť dokopy nájsť 100 papierikov s obrázkami ich predmetu.
Papieriky sú schované po celom areáli (nie vnútri budov, len vonku).
Ak má skupinka hľadať šál, tak nech hľadá len obrázok šálu - nič iné.
Úlohou detí je doniesť papieriky na ich kôpku do altánku (2 animátori v altánku tzv. sluhovia - kontrolujú len altánok a poriadok v ňom).

Deti vybehnú do areálu a hľadajú svoje obrázky. Je tu ale chyták - namrzení sluhovia a slúžky chcú, aby bolo v tábore ticho a kľud, nech má profesor pokoj. Budú behať po areáli a chytať deti. Ak chytia dieťa s papierikom v ruke, dieťa musí odovzdať papierik a slúžka/sluha pôjde papierik znova skryť niekde po areáli.
Ak dieťa nebude mať pri sebe papierik, slúžka/sluha mu dá krátky trest (napr. 5 klikov, drepy, zatočiť sa 6x na mieste…). Až po splnení trestu môže dieťa hľadať ďalej.

Dieťa môže vziať vždy len jeden papierik. Ak do altánku donesie viac ako jeden, alebo bude prichytené s viac ako jedným papierikom, sluhovia zoberú všetky papieriky celej skupinke a znova ich schovajú v areáli.

Celý priebeh hry kontroluje profesor. Buď je v altánku alebo sa prechádza po areáli a pozerá, či sú deti poslušné a hrajú čestne. Raz za čas môže dieťa zachrániť od sluhov/slúžiek, ak uvidí, že dieťa chytili a že ho idú potrestať. Ak bude vtedy nablízku, môže služobníka zastaviť a dieťa nechať odísť bez trestu alebo s papierikom v ruke - záleží ale kde sa vtedy profesor nachádza, nie každý môže mať to šťastie.

Po polhodine (alebo iný čas) sa v areáli začnú objavovať zvláštne postavy - ľudia, ktorí reprezentujú 5 predmetov každej skupinky. Niekto s červeným šálom okolo krku, niekto s kúskom papiera, niekto s vreckovými hodinkami…
Úlohou celej skupinky je osloviť tohto človeka a dať sa s ním do reči. Tento človek je ich kľúčom k otvoreniu skrine - musia získať predmet, ktorý vlastní, inak sa do skrine nedostanú.

Skupinka musí danému človeku ukázať svoje papieriky, a dokázať, že ich má presne 100. Ak ich nebude mať dosť, človek ich pošle hľadať ďalej.
Ak bude mať skupinka 100 papierikov, človek im dá úlohy, za ktoré budú môcť získať jeho predmet.

## Úlohy k predmetom

**Zväzok kľúčov**
- Animátor má zväzok viacerých kľúčov/kartičiek.
Úloha: Skupinka musí vyriešiť krátku hádanku alebo šifru a podľa nej vyberú správny kľúč. Napr. začneme hádankou kde odpoveď je kľúč, pokračujeme hádankami opisovaním kľúčov.

**Červený šál**
Úloha: Skupinka dostane šál. Všetci sa ho musia dotýkať a prejsť rýchlejším tempom určitú trasu medzi stromami bez pustenia. Ak sa pustia, idú od začiatku.

**Profesorova obálka**
- bude pripravený plagát na stene hlavnej chatky so šifrou, deti budú behať k nemu od toho betónového bazéna po jednom a odpisovať každé po 2 písmená - štafetovo
- animátor s profesorovou obálkou má v ruke papier a pero, ktorý obsahuje zašifrovanú správu, ktorú keď vylúštia, tak získajú profesorovu obálku
- šifra: ж ζℓѢζÅℓ Δ ζℓѢζÅℓ Δ ζℓѢζÅℓ ↘ ђѢ£‽ǾΩ ℅ℓ Φ ж ђѢÅ&ç‡ℓǺ ℓ℅Ǻℓζ Π ж ΘÅǺǾŁ Δ Θ¿℅ǺÅ Δ ÞЊĦЊѢ Φ ђѢ£‽ǾΩ ℗ÞЊ©Åℓ℗£ ℅ЩѢЊΘ¿ Δ ÞЊĦЊѢÅℓ℗£ ‡ĦÅ£ѢℓЩç ℓŁ ‽Њΐ℅&ſ ĦЊ©¿ Φ ж → niečo podobné vymyslíme, toto len pre inšpiráciu a predstavu

**Vreckové hodinky**
Úloha 1:
- Skupinka dostane: rozstrihané papieriky s časmi/symbolmi alebo kartičky s udalosťami. Musí ich správne zoradiť.

Úloha 2:
- na zemi sú rozložené „hodiny" (kamene, papiere s číslami).
- animátor hovorí indície: „Keď sa objavil Aslan (alebo iná postava?), čas sa pohol dopredu o tri hodiny." „Večná zima bola pred hostinou u Tumnusa."
- skupinka musí postupne nastaviť správny čas/pohybovať ručičkami.
- keď to vyriešia tak hodinky sa „rozbehnú" a deti dostanú predmet.

**Biela rukavica**
- aby deti získali rukavicu, musia prejsť "zamrznutým územím"
- vytvorí sa priestor/trasa

Pravidlá:
- na zemi sú papiere
- skupinka sa musí dostať z bodu A do B, ale nesmú sa dotknúť zeme mimo vyznačených miest, inak ich „ľad pohltí" a vracajú sa na začiatok.
- háčik v hre: majú málo „bezpečných kusov ľadu" (papierov), musia si ich posúvať, spolupracovať, plánovať
- ak je 20 detí v skupinke tak papierov je cca len 10-11, takže ich musia presúvať dopredu, pomáhať si…

## Koniec hry

Keď skupinka získa svoj predmet, uteká naspäť do altánku a čaká na ostatné skupinky.
Ak budú všetky skupinky so svojimi predmetmi v altánku, profesor skontroluje "pravosť" vecí, ktoré deti získali.
Spoločne s profesorom a svojimi predmetmi pôjdu skupinky ku skrini, ktorá sa vďaka daným predmetom otvorí - bude nejaký rituál k otvoreniu alebo len profesor otvorí dvere a vôjde spolu s deťmi cez skriňu do akože iného sveta?

## Pravidlá

- Keď ma chytí zlý, musím mu dať obrázok - inak skupinka dostane akože trest (domyslíme)
- Beháme INDIVIDUÁLNE
- Deti môžu brať len jeden obrázok ich predmetu, nie viac.
- Ak budú mať všetky obrázky - môžu ísť hľadať dobrého len ako celá skupinka.
- Ak ma chytí sluha, nesmiem mu ujsť lebo mi dá trest
    `,
    vedúciDna: 'Marta Baňošová FMA',
    vedúciProgramu: 'Nika Nováková, Kika Ondisková',
    animators: [
      { name: 'Mathias Mastiľák',            role: 'Hádanky' },
      { name: 'Nina Radová',               role: 'Hádanky' },
      { name: 'Paulínka Harajdová', role: 'Hádanky' },
      { name: 'Marína Holubová',    role: 'Hádanky' },
      { name: 'Kika Ondisková',     role: 'Hádanky' },
      { name: 'Dani Zuurbier',      role: 'Behač'   },
      { name: 'Hana Procházková',              role: 'Behač'   },
      { name: 'Erika Ficíková',              role: 'Behač'   },
      { name: 'Dianka Salanciová',  role: 'Behač'   },
      { name: 'Ondrej Mocák',       role: 'Behač'   },
      { name: 'Maroš Barňák',              role: 'Behač'   },
      { name: 'Filip Goffa',              role: 'Behač'   },
      { name: 'Barborka Bobaľová',  role: 'Behač'   },
      { name: 'Patrik Pekarovič',   role: 'Behač'   }
    ],
    animatorsNote: '5 hádankárov + 9 behačov',
    materials: [
      'Skriňa',
      'Červený šál',
      'Vreckové hodinky',
      'Zväzok kľúčov',
      'Biela rukavica',
      'Stará obálka',
      '100 papierikov s obrázkami každej veci (dokopy 500 ks)'
    ],
    hasScoring: true,
    scoring: 'Nehodnotí sa. Ak bude potrebné: 5b pre najrýchlejšiu skupinku, 4 pre druhú atď.',
    hasMtzNote: true,
    mtzNote: `Bude potrebné schovať 50 papierikov po celom areáli (nie do chatiek).

Mokrý program: formou hádanok a úloh pre skupinky samostatne získajú predmety potrebné na otvorenie skrine - doplniť.`
  },

  {
    id: 'pon-schovavacka',
    name: 'Schovávačka',
    dayRef: 'pondelok',
    timeLabel: 'Poobedie',
    timeOfDay: 'afternoon',
    type: 'activity',
    time: '14:30',
    endTime: null,
    location: 'Chatka a jej okolie (schováva sa len v chatke)',
    detail: 'Chatková schovávačka s tromi lajna­mi – hľadajúci má 3 minúty uhádnuť správne meno aj miesto každého skrytého.',
    description: `
Kto hrá: celá Chatka =20 osôb cca + animátori
Kde sa hrá: v chatke a jej okolí, schováva sa len v chatke!
Odkiaľ sa vyráža: od lampy pred chatou
Čas: 5 minút na schovanie (3+2), 3 minúty na hľadanie

## Pravidlá
Skupina sa rozdelí na 4 skupiny:
1. 3 ľudia s rozliškou (ako nájdení sa rátajú za 3 body)
2. 5 ľudia, ktorí sa neskrývajú na začiatku, ale až potom a to iba do skrýše, v ktorej už niekto aktuálne je, ten mu musí uvoľniť miesto a ísť sa skryť inam (=Druhá lajna)
3. všetci ostatní (=Prvá lajna)
4. 1 človek, ktorý hľadá ostatných

Cieľ:
Prvá lajna má 3 minúty na to, aby sa skryla. Za ňou ide Druhá lajna, ktorá má 2 minúty, aby sa skryla do skrýše, v ktorej je už niekto skrytý, títo odhalení majú potom zvyšný čas na to, aby sa skryli…
Po 5 minútach (3+2) odchádza od lampy ten, čo hľadá ľudí. Na ich nájdenie má 3 minúty. Má so sebou časovač, ktorý zazvoní, keď prejdú 3 minúty.
Človeka nájde iba vtedy, ak nahlas povie správne meno a miesto, kde sa daný človek skrýva. Ak sa pomýlil, neráta sa mu to.
V skrýši môže byť vždy iba 1 človek!
Bonus, ten, čo vybehne z chatky bez toho, žeby ho hľadajúci videl, keď bude pri lampe, zakričí jeho meno; síce získa iba 1 bod, ale neráta sa za nájdeného (možnosť pre tých, čo sa dobre nevedia/nemôžu skryť).
Okná sú celý čas zavreté, uteká sa len cez dvere!!!

## Body
Každý, kto nebol nájdený, získa 5 bodov.
Ten, čo hľadá, získa za každého nájdeného 1 bod, za nájdeného človeka s rozliškou získa 3 body a za nájdeného človeka, čo sa skrýval v druhej lajne, stráca 2 body.
Ten, čo vybehol z chatky bez odhalenia, získa symbolický 1 bod.

Problém: 2 skupinky budú spať na poschodí chatiek, kde sa nedá skrývať, čo s nimi?
    `,
    vedúciDna: null,
    vedúciProgramu: null,
    animators: [],
    animatorsNote: '1 hľadajúci na chatku + animátori pri skupinke',
    materials: [
      'Časovače – toľko kusov, koľko je chatiek',
      'Rozlišky 30 ks (stačí kus látky, reflexný pásik, hocijaké označenie)'
    ],
    hasScoring: true,
    scoring: 'Nenájdený: 5 bodov. Hľadajúci: +1 bod/nájdeného, +3 body/nájdeného s rozliškou, -2 body/nájdeného z druhej lajny. Utekajúci z chatky: 1 bod (symbolický).',
    hasMtzNote: false,
    mtzNote: null
  },

  {
    id: 'pon-scenky',
    name: 'Scénky skupiniek s Tumnusom',
    dayRef: 'pondelok',
    timeLabel: 'Večer',
    timeOfDay: 'evening',
    type: 'scenka',
    time: '20:00',
    endTime: '21:30',
    location: 'Altánok',
    detail: 'Každá skupinka vylosuje žáner a tému, za pol hodiny vymyslí scénku a predvedie ju ostatným – víťaza spomedzi nich vyberá Tumnus.',
    description: `
Každá skupinka si vytiahne žáner svojej scénky a tému. Potom budú mať pol hodinku (prípadne 45 min.) na vymyslenie scénky. Chlapci a dievčatá budú hrať scénky oddelene. Najprv sa zahrá jedna dievčenská a potom jedna chlapčenská scénka atď.

Tumnus vyberie jednu chlapčenskú a jednu dievčenskú skupinku, ktorá dostane bonusové body.
    `,
    vedúciDna: 'Marta Baňošová FMA, SDB Josky',
    vedúciProgramu: 'Dianka Salanciová, Kika Olajošová',
    animators: [],
    animatorsNote: 'Každý animátor pri svojej skupinke',
    materials: [
      'Mikrofón – 1 ks'
    ],
    hasScoring: true,
    scoring: 'Neboduje sa – Tumnus vyberie jednu chlapčenskú a jednu dievčenskú skupinku, ktorá dostane bonusové body.',
    hasMtzNote: true,
    mtzNote: 'Mokrý program: scénky sa hrajú v altánku, takže spokojne to tam môže byť.'
  },

  {
    id: 'pon-utok',
    name: 'Nočná hra – útek z Narnie pred čarodejnicou',
    dayRef: 'pondelok',
    timeLabel: 'Nočná hra',
    timeOfDay: 'night',
    type: 'activity',
    time: '21:30',
    endTime: null,
    location: 'Areál (5–7 r.), Lúka (8–9 r.)',
    detail: 'Mladší riešia hádanky v areáli a hľadajú svoju lampu; starší sa prebíjajú k skrini na lúke. Obom skupinám hrozia vlci s výzvami a zaväzovaním.',
    description: `
## 5 – 7 roční

4 vlci, jeden z animátorov pri skupinke, v areáli.

Každá skupinka na začiatku dostane hádanku, pomocou nej sa dostanú k ďalšej a ďalšej atď. Pri poslednej (animátor bude vedieť) dostanú hádanku, ktorá vedie k lampe (každá skupinka má svoju lampu). Rozsvietia ju, a potom príde pán Tumnus ukázať im, kde je skriňa. Počas toho ich budú chytať vlci, ktorí im budú dávať výzvy, ak to nesplnia, vlk jednému (podľa výberu vlka) zaviaže šatkou ústa, oči, ruky alebo nohy a skupinka ide ďalej aj so zaviazaným členom. (na miestach s hádankami ich chytiť nemôžu)

## 8 – 9 roční

x vlkov, 2 animátory pri lekárničkách, na lúke.

Skupinky budú na začiatku umiestnené na krajoch lúky, animátory s lekárničkami na kraji lúky v strede, obaja na opačnej strane.

Skupinky sa musia dostať na stred lúky kde bude umiestnená skriňa. Chytať ich budú vlci, ktorí ak niekoho chytia, dajú im výzvu, ktorú ak nesplnia, vlk jednému (podľa výberu vlka) zaviaže oči, ústa, ruky alebo nohy, skupinky musia ísť na miesta s lekárničkami, jednu si zobrať a ísť uzdraviť toho chyteného, ktorý musí čakať tam, kde ho vlk chytil. Keď ho uzdravia tak môžu pokračovať ďalej, ale ten jeden už ostáva zaviazaný.

## Mokrý program

Escape room na chatkách
    `,
    vedúciDna: 'Marta Baňošová FMA, SDB Josky',
    vedúciProgramu: 'Nina Radová, Adam Paško',
    animators: [
      { name: 'Nika Nováková' }, { name: 'Ján Falát' }, { name: 'Ema Taňkošová' }, { name: 'Maroš Barňák' },
      { name: 'Patrik Bača' }, { name: 'Boris Surničin' }, { name: 'Ján Katkovčin' },
      { name: 'Dávid Krivjanský' }, { name: 'Dani Zuurbier' }, { name: 'Peter Greňo' }
    ],
    animatorsNote: '4 vlci (5–7 r.) + vlci na lúke (8–9 r.) + animátori pri skupinkách (5–7 r.) + 2 animátori s lekárničkami (8–9 r.) + pán Tumnus',
    materials: [
      'Skrine',
      'Lampáše (každá skupinka svoju)',
      'Hádanky (séria na skupinku)',
      'Šatky na zaväzovanie',
      'Lekárničky (papieriky pre 8–9 r.)'
    ],
    hasScoring: false,
    scoring: null,
    hasMtzNote: false,
    mtzNote: null
  },

  // ── UTOROK ────────────────────────────────────────────────────────────────

  {
    id: 'uto-kralovnou',
    name: 'Program s Kráľovnou',
    dayRef: 'utorok',
    timeLabel: 'Doobedu',
    timeOfDay: 'morning',
    type: 'activity',
    time: '09:00',
    endTime: '12:00',
    location: 'Pred jedálňou, za hornými chatkami, za chlapčenskými chatkami, tráva pri altánku, altánok, lúka, ihrisko',
    detail: 'Deti si voľne vyberajú spomedzi stanovíšť – šerm, streľba, náramky, vyšívanie, méta, stolové hry a ďalšie.',
    description: `
Program prebieha formou voľných stanovíšť. Každé stanovište funguje samostatne a deti sa doň zapájajú dobrovoľne. Mimo stanovíšť budú animátori, ktorí vytvoria atmosféru a budú deti povzbudzovať.

Animátori na stanovištiach vysvetlia aktivitu a dohliadajú na jej priebeh. Program je oddychový, kreatívny aj športový – deti si vyberajú podľa záujmu. Deti môžu medzi stanovišťami ľubovoľne prechádzať počas celého programu. Stanoviská budú označené plagátmi a šípkami.

## Stanoviská
- Šermiarstvo
- Streľba (zo vzduchovky)
- Kohútie zápasy
- Cornhall
- Kvetinky (prechádzka na lúku)
- Pletenie vrkočov
- Náramky (korálkové aj pletené)
- Méta
- Vyšívanie (na šatky)
- Stolové hry
- Iné športy (futbal, ringo alebo volejbal – podľa záujmu)

## Mokrý program
Pár stanovíšť ostane: šermiarstvo, cornhall, pletenie vrkočov, náramky – altánok, jedáleň
    `,
    vedúciDna: 'Miška Blahová',
    vedúciProgramu: 'Sofia Dolobačová, Ema Taňkošová',
    animators: [
      { name: 'Tomáš Blaha',         role: 'Lúka'       },
      { name: 'Josky SDB',               role: 'Vzduchovka' },
      { name: 'TODO doplniť',        role: 'Vzduchovka' },
      { name: 'Patrik Pekarovič'                        },
      { name: 'Pavlínka Katkovčinová'                   },
      { name: 'Čaby',                role: 'Futbal'     },
      { name: 'Adam Paško',          role: 'Cornhole'   },
      { name: 'Nina Radová',                role: 'Meta'       },
      { name: 'Nika Nováková',                role: 'Meta'       },
      { name: 'Marína Holubová'                         },
      { name: 'Kika Olajošová'                          },
      { name: 'Kika Pichonská'                          },
      { name: 'Paulínka Harajdová'                      },
      { name: 'Peťo Hanzal'                             },
      { name: 'Andrea Spišáková'                                   },
      { name: 'Sofia Dolobačová'                        },
      { name: 'Mathias Mastiľák'                                 },
      { name: 'Filip Goffa'                                },
      { name: 'Barborka Bobaľová'                          },
      { name: 'Barborka Kridlová'                          },
      { name: 'Livia FMA'                                  }
    ],
    animatorsNote: 'cca 17 (1 – streľba/kohútie/cornhall/stolové/šport, 2 – šerm/vyšívanie/kvety/vrkoče/náramky/méta, z toho 2 dospelí)',
    materials: [
      'Dva penové meče',
      'Dve penové rúrky (rezance)',
      'Vzduchovka',
      'Terč / plechovka',
      'Karimatka',
      'Šesť šatiek',
      'Lano na označenie x2',
      'Cornhall',
      'Špagát',
      'Maličký nožík (iba pre animátora)',
      'Repelent',
      'Gumičky',
      'Kefa',
      'Všetko na náramky (korálky, šnúrky, nožnice, ...)',
      'Denko',
      'Krepák',
      'Tenisové loptičky',
      'Vyšívanie (nitky, 20 šatiek, nožnice, krúžky, ihly)',
      'Lopty na športy',
      'Ligretto, karty, Bang, Človeče',
      'Plagáty a šípky ku stanovištiam'
    ],
    hasScoring: false,
    scoring: null,
    hasMtzNote: true,
    mtzNote: 'Vedľa každého stanovišťa viditeľné číslo na kartóne. V areáli rozpis stanovíšť (ideálne pri vode pri jedálni).'
  },

  {
    id: 'uto-lucy-edmund',
    name: 'Lucy vs Edmund',
    dayRef: 'utorok',
    timeLabel: 'Poobedie',
    timeOfDay: 'afternoon',
    type: 'activity',
    time: '14:30',
    endTime: '17:00',
    location: 'Les za táborom + areál tábora',
    detail: 'Zástupcovia skupiniek bojujú v lese o prežitie, zvyšok skupinky plní úlohy na stanovištiach a zbiera peniaze na žolíkov – extra životy pre bojovníkov.',
    description: `
Celotáborová hra. Z každej skupinky je vybraný jeden zástupca (splátca), ktorý bojuje v lese. Ostatní chodia po stanovištiach v areáli a zbierajú peniaze na žolíkov pre svojho splátcu.

Zástupcovia sú rozdelení na dva tímy: **Edmund vs Lucy** (mix chlapcov a dievčat, aby to bolo rovnomerné). V lese však každý bojuje sám za seba.

## Skupinky v areáli – TRI OBLASTI

Skupinky prechádzajú oblasťami v poradí LOGIKA → POHYB → KREATIVITA (cyklicky, začínajú rôzne). Na každom stanovišti je animátor, ktorý zadá úlohu ešte nevyriešenú danou skupinkou.

### LOGIKA
- **Tip tip tip** – uhádnuť gesto animátora (2 body za osobu, limit 5 min)
- **Vybíjaná naslepo** – najvyšší má zaviazané oči, najnižší naviguje; 3 min na vybíjanie (3 body za osobu)
- **Mandela efekt** – 10 párov obrázkov, uhádnuť správny za 3 min (2 body za správnu odpoveď)
- **Sluch** – oslepená osoba hádne kto ju pozdravil (1 bod za prvý pokus)
- **Uzol** – rozviazať uzly za 5 min bez pustenia rúk (3 body za uzol)
- **Pantomíma** – koľko viet stihnú za 4 min (3 body za vetu)

### POHYB
- **Labyrint** – prejsť zakľukatené lano so zaviazanými očami (2 body za osobu)
- **Lezenie po lane** – každý člen skupinky (2 body hore, 1 bod za pokus)
- **Pohyb po deke** – pretočiť deku bez dotyku zeme (začínajú s 20b, prešľapy rátajú mínus)
- **Kto donesie najďalej** – doniesť predmet čo najďalej a vrátiť sa do 10 sek (2 opakowania)
- **Zviazané nohy** – štafeta dvojíc; čas určuje počet bodov (20b → mínus 2 každých 15 sek)
- **100 drepov** – celá skupinka dokopy (4 body)

### KREATIVITA
- **Zvalenie pohárov** – šiškou zvaliť poháre, 2 pokusy (2 body za osobu)
- **Zápalkové príklady** – presunúť zápalku aby sedel výsledok
- **Prešmyčky** – vyriešiť za 2 min (1 bod za prešmyčku)
- **Kreslenie na chrbát** – v rade prekresľovať obrázok prstom, posledný kreslí na papier (5/3/0 b)
- **Architekti** – postaviť vežu zo špajlí za 7 min (10 bodov za tím ak vydrží 10 s)
- **Elektrina** – posielať stisk rukou v rade, posledný chytí cukrík; 5 kôl (10 bodov za absolvovanie)

## Žolíci (extra životy pre splátcu v lese)
- Malý žolík (30 €) = +15 životov
- Veľký žolík (50 €) = +25 životov
- MEGA žolík (80 €) = návrat do hry (netreba oznamovať na začiatku)

Skupinka kúpi žolíka v obchode, zástupca ho odnesie na hranicu (bránu do lesa), splátca si ho vyzdvihne. Žolíci sú farebne označení. Obchodník si zapisuje čo komu predal.

## Zástupcovia v lese

Každý splátca má kartičku a začína so 100 bodmi života. Súboj nastane keď sa dvaja stretnú – zavolajú majstra, každý si vyberie 2 aktivity (spolu 4), hrajú ich.

**Aktivity pri súboji (v lese):**
- Strihaná (kameň-papier-nožnice, na 3 výhry)
- Čingčong
- Staring contest (kto sa skôr klipne/usmieje)
- Za koľko sekúnd spravíš 20 drepov (nejdú naraz)
- Odhoď-dones tenisák (súper musí doniesť tvoj tenisák)
- Kto ďalej doskočí (3 skoky každý)
- Odhad (odhadnúť číslo/dátum – kto bližšie)
- Preteky k bodu a späť
- Limbo (podliezanie pod palicu)
- Fľaša-fest (kto vydrží dlhšie s vystretou rukou)

**Výsledky súboja:**
- 4:0 → porazený stráca 30 bodov
- 3:1 → porazený stráca 15 bodov
- 2:2 → remíza, nikto nestráca, bez imunity

Po súboji má porazený 5-minútovú imunitu. Bojisko sa každú polhodinu zmenšuje (krepový papier). Po "smrti" splátca zapíše čas a pripojí sa k skupinke.

## Hodnotenie
- 100–10 bodov za splátcu podľa poradia v súbojoch
- Bonusové body za žolíkov zakúpených po "smrti" splátcu (každý žolík = 3 body)

## Mokrý program
- Pri poprchávení: hrajú v pršiplášťoch
- Pri silnom daždi: zápasy zástupcov v areáli s pršiplášťami; animátori chodia po chatkách so stanovišťami každých 15 min (6 animátorov – 3 dievčatá pre dievčenské chatky, 3 chlapci pre chlapčenské)
    `,
    vedúciDna: 'Miška Blahová',
    vedúciProgramu: 'Ondrej Mocák, Patrik Pekarovič',
    animators: [
      { name: 'Ondrej Mocák',     role: 'Kontrolor'  },
      { name: 'Kika Ondisková',   role: 'Majster'    },
      { name: 'Nika Nováková',             role: 'Majster'    },
      { name: 'Erika Ficíková',            role: 'Majster'    },
      { name: 'Ján Falát',      role: 'Majster'    },
      { name: 'Dávid Krivjanský',      role: 'Majster'    },
      { name: 'Adam Paško',       role: 'Obchodník'  },
      { name: 'Hana Procházková',            role: 'Stanovište' },
      { name: 'Nina Radová',             role: 'Stanovište' },
      { name: 'Patrik Bača',      role: 'Stanovište' }
    ],
    animatorsNote: '5 majstrov, 1 obchodník, min. 10 skupinkových, 3 na stanovištiach, 1 kontrolór (Ondrej)',
    materials: [
      'Gumičky 2x, šatky 4x',
      'Mandela efekt fotky (vytlačené)',
      'Pantomíma vety (vytlačené)',
      'Lano 2x',
      'Deky 2x',
      'Šnúrky (na zviazanie nôh)',
      '10 ks plastových pohárov',
      '2 balenia zápaliek',
      '90 ks papiera, 15 ks fixov',
      'Obrázky na prekreslenie (vytlačené)',
      'Dostatok špajlí, lepiaca páska, nožnice',
      'Vytlačené tabuľky na bodovanie',
      'Extra životy (žolíci)',
      '10x karta na zapisovanie (pre splátcov)',
      '5 červených + 5 modrých tenisových loptičiek',
      'Otázky na odhad s odpoveďami (vytlačené)',
      '5 ks palica/metla (limbo)',
      '10 ks malých fliaš s vodou',
      'Krepový papier (na označenie bojiska)',
      'Cukríky cca 50 ks (elektrina)'
    ],
    hasScoring: true,
    scoring: '100–10 b za splátcu podľa poradia; +3 b za každého žolíka zakúpeného po "smrti" splátcu. Súboj: 4:0 = -30 b, 3:1 = -15 b, 2:2 = remíza.',
    hasMtzNote: false,
    mtzNote: null
  },

  {
    id: 'uto-tumnus',
    name: 'Tumnus zmizol',
    dayRef: 'utorok',
    timeLabel: 'Večer',
    timeOfDay: 'evening',
    type: 'activity',
    time: '20:00',
    endTime: '21:30',
    location: 'Areál tábora + lesík pri bráničke',
    detail: 'Skupinky zbierajú snehové vločky na 6 stanovištiach a vymenia ich za mapu – podľa nej pátraju po dôkazoch o únose Tumnusa Bielou Čarodejnicou.',
    description: `
Pán Tumnus zmizol a my hľadáme dôkazy o tom, kde je. Skupinky (CH+D spolu) prechádzajú 6 stanoviskami a na každom získajú snehové vločky. Chodia random, nemajú rozpis – 1 stanovisko je vždy voľné, na ostatných 5 je vždy len 1 skupinka.

Za nazbierané vločky dostanú v altánku mapu areálu (nie úplne dokreslená). Podľa mapy nájdu 1 konkrétny dôkaz o zmiznutí Tumnusa. Keď skupinky dajú dôkazy dohromady, zistia, že ho uniesla Biela Čarodejnica.

**Dôkazy:** zatykač, ľadová koruna, odznak vlčej polície, Tumnusov šál, Tumnusova píšťalka

## Stanoviská

**1. Les má oči** – cukor káva čaj rum bum
Animátor je otočený chrbtom, hovorí "cukor káva čaj rum bum", potom sa otočí – kto sa pohne, vracia sa na začiatok. Animátor to deťom sťažuje – prechádza sa pomedzi nich, rozosmieva ich.

**2. Lúštenie mračikovského písma**
Skupinka dostane text v runovom písme s vysvetlivkami a musí ho rozlúštiť.

**3. Veci z Tumnusovho domu**
V lese za malou bráničkou sú poschovávané veci (topánka zavesená na strome, hrnček...). Začínajú pred bráničkou, majú jednu čelovku. Po jednom vybiehajú do lesa – keď nájde novú vec, vráti sa, nahlási ju, podá čelovku a ide ďalší. Hrá sa, pokým nenájdu všetky veci.
_Pozor: na začiatku nebude taká tma – treba veci poschovávať viac, neskôr stačí menej._

**4. Stopy**
Jeden z tímu si vytiahne meno zvieraťa a zahrá ho pantomímou. Zvyšok tímu musí uhádnuť zviera a priradiť stopu.
Zvieratá (28 lístkov):
1 – slon, 2 – vlk, 3 – jeleň, 4 – srna, 5 – ježko, 6 – kamzík, 7 – kurka, 8 – kačka, 9 – diviak, 10 – medveď, 11 – vydra, 12 – had, 13 – zajac, 14 – jaščurka, 15 – žaba, 16 – potkan, 17 – líška, 18 – kôň, 19 – krava, 20 – ťava, 21 – pavian, 22 – pavúk, 23 – hroch, 24 – lama, 25 – lev, 26 – morská korytnačka, 27 – suchozemská korytnačka, 28 – krokodíl

**5. Ľadové kryhy**
Dostať sa z bodu A do bodu B pomocou krýh (papier A4). Môžu stáť len na kryhách, krýh dostanú o jednu menej ako je členov skupinky.

**6. Bludisko**
Jeden člen tímu má zaviazané oči. Ostatní ho navigujú cez bludisko (konáre alebo švihadlá) len pomocou vopred dohodnutých zvieracích zvukov. Nesmú použiť ľudské slová – „steny majú uši".

## Mokrý program
Stanoviská rovnakého typu, ale prispôsobené – každý tím sám (CH a D osobitne) na svojej chatke.
- Po splnení dostanú od animátora útržok zo zatykača, na konci spoja tímy dokopy v altánku.
- Alternatíva 1: pozbierajú vločky a za ne kúpia dôkazy od náhodného človeka
- Alternatíva 2: za vločky podplatia svedka
- Verzia 2.0: premiestniť stanoviská do altánku, jedálne, kaplnky, chatky s terasou alebo terasy pri zdravotníčke
    `,
    vedúciDna: 'Miška Blahová',
    vedúciProgramu: 'Hana Procházková, Ján Katkovčin',
    animators: [
      { name: 'Braňo Kováč',       role: 'Stanoviská' },
      { name: 'Dianka Salanciová', role: 'Stanoviská' },
      { name: 'Boris Surničin',    role: 'Stanoviská' },
      { name: 'Mathias Mastiľák',           role: 'Stanoviská' },
      { name: 'Peťo Hanzal',       role: 'Stanoviská' },
      { name: 'Patrik Pekarovič',  role: 'Stanoviská' },
      { name: 'Nina Radová',              role: 'Altánok'   }
    ],
    animatorsNote: '6 na stanovištiach + 1 v altánku (rozdávanie máp)',
    materials: [
      'Dôkazy: zatykač, ľadová koruna, odznak vlčej polície, Tumnusov šál, Tumnusova píšťalka',
      'Mapy areálu (nie úplne dokreslené)',
      'Snehové vločky (pre skupinky)',
      'Veci z Tumnusovej chyže (topánka, hrnček, ...)',
      'Zatykač – verzia dážď',
      'Stopy zvierat (vytlačené/vystrihané)',
      'Papieriky s názvami zvierat',
      'Laná / konáre / švihadlá (bludisko)',
      'Papiere A4 (ľadové kryhy)',
      '1 čelovka (veci z Tumnusovho domu)',
      'Runové písmo s vysvetlivkami (vytlačené)',
      'Papiere, perá'
    ],
    hasScoring: false,
    scoring: null,
    hasMtzNote: false,
    mtzNote: null
  },

  // ── STREDA ────────────────────────────────────────────────────────────────

  {
    id: 'str-vylet',
    name: 'Výlet',
    dayRef: 'streda',
    timeLabel: 'Doobedu',
    timeOfDay: 'morning',
    type: 'activity',
    time: '09:00',
    endTime: '12:00',
    location: 'Cesta okolo kameňolomu',
    detail: 'Skupinky prechádzajú trasu okolo kameňolomu so 6 stanoviskami – stretávajú postavy z Narnie a plnia výzvy.',
    description: `
Vydávame sa na cestu Narniou. Cestou sa stretávame s dobrými aj zlými postavami. Trasa je rozdelená pre mladších (5.–7. ročník) a starších (8.–9. ročník). Chodia chlapci aj dievčatá spolu.

Skupinky vyrážajú z tábora v 10-minútových rozostupoch. Trasa vedie okolo kameňolomu a je na nej 6 stanovíšť, každé trvá 10 minút.

## Stanoviská

**1. Bobor**
- Mikádo – vytiahnuť čo najviac
- Jenga – vytiahnuť čo najviac za čas; penalizácia keď im to spadne – strhnúť polovicu bodov z tých čo vytiahli

**2. Maugrim (vlk)**
- 2 skupinky po 5 chlapcov a 5 dievčat budú proti sebe vo výzvach
- Preťahovanie lanom, člnkový beh (aj proti animátorom)

**3. Čarodejnica**
- Skupinky sa postavia do radu čelom oproti sebe
- Tri deti dostanú od animátora do úst citrón a ostatní budú hádať kto má citrón v ústach

**4. Líška**
- Hádanky, osemsmerovky, sudoku, príklady
- Cieľom je vyriešiť čo najviac úloh za 10 minút

**5. Kentaur**
- Streľba – každý musí vystreliť, počítajú sa body dokopy
- Luk, kuša, granát, prak (hobbyhorsing)

**6. Mikuláš**
- Spytko, meč, štít, skákanie vo vreci s mikulášskou čiapkou

## Mokrý program
Aktivity v tábore
    `,
    vedúciDna: 'Tomáš Blaha',
    vedúciProgramu: 'Adam Paško, Filip Goffa',
    animators: [
      { name: 'Kika Ondisková', role: 'Líška'    },
      { name: 'Ľuboš SDB',         role: 'Mikuláš'  },
      { name: 'Boris Surničin', role: 'Maugrim'  },
      { name: 'Pali SDB',        role: 'Bobor'    },
      { name: 'Števo SDB',      role: 'Kentaur'  },
      { name: 'TODO doplniť',   role: 'Čarodejnica' }
    ],
    animatorsNote: '8 animátorov na 6 stanovištiach',
    materials: [
      'Mikádo',
      'Jenga',
      'Lano (preťahovanie)',
      'Kužele (člnkový beh)',
      'Citróny',
      'Granát',
      'Prak',
      'Luk + kuša',
      'Meč, štít',
      'Spytko',
      'Vrece (skákanie)',
      'Mikulášska čiapka',
      'Hobbyhorsing',
      'Hádanky, osemsmerovky, sudoku, príklady (vytlačené)'
    ],
    hasScoring: true,
    scoring: 'Niektoré stanoviská sú bodované (Bobor – mikádo/jenga, Kentaur – streľba, Líška – úlohy).',
    hasMtzNote: false,
    mtzNote: null
  },

  {
    id: 'str-obnova',
    name: 'Duchovná obnova – Dievčatá',
    dayRef: 'streda',
    timeLabel: 'Poobedie',
    timeOfDay: 'afternoon',
    type: 'activity',
    time: '14:30',
    endTime: '17:00',
    location: 'Kaplnka / záhrada',
    detail: 'Aktivita vedie dievčatá k zamysleniu nad vlastným vnútrom prostredníctvom obrazu skrine. Pomocou kresby a následnej diskusie premýšľajú nad tým, čo by chceli vo svojom živote zmeniť, čo si zachovať a na čom chcú pracovať. Záver aktivity smeruje k spytovaniu svedomia a uvedomeniu si, že dobro nám pomáha bojovať proti zlu.',
    description: `
## Návrh pre modlitebný / core tím

- otázka pre modlitebný tím / core tím
- chceli by sme, aby sa ráno počas modlitby predstavila krabička, kde by deti počas dňa/tábora vhadzovali kamienky vždy, keď si všimnú, že im niekto druhý urobil dobrý skutok
- aby sa o tom potom dalo porozprávať v skupinkách v rámci obnovy
- krabička by sa potom v ten istý deň (alebo na konci tábora) mohla použiť ako obetný dar
- otázka znie: **súhlasíte s tým a dalo by sa to? Čo si myslíte?**
- **pozn.:** ak by sa to schválilo, tak by sa to tým pádom pridalo do obnovy ako krátka vsuvka

---

## Myšlienka dňa

> Obklopení dobrom môžeme bojovať proti zlu.

---

## Aktivita v kruhu – Mám rada ľudí (icebreaker)

### Priebeh

- všetci stoja v kruhu
- jeden stojí v strede kruhu medzi nimi
- ten v strede kruhu povie napr. „mám rada ľudí, ktorí majú modré oči" alebo „mám rada ľudí, ktorí radi pomáhajú"
- tí, ktorých sa to týka, musia zo svojho miesta v kruhu vybehnúť a vymeniť si miesto s iným, ktorý vybehol
- človek v strede sa tiež musí dostať späť do kruhu na niekoho miesto
- ten, ktorý sa nestihol niekam dostať, ostáva v strede kruhu a hovorí: „Mám rada ľudí, ktorí..."

---

## Kreslenie – Skriňa

### Pomôcky

- papier
- fixky
- farbičky
- perá

### Aktivita

Táto aktivita má pomôcť so zdieľaním sa, ak niektoré dievčatá nechcú hovoriť svoje myšlienky nahlas, ale radšej si to zapíšu alebo nakreslia.

Úlohou je nakresliť si skriňu takú, akú majú doma — čo majú v poličkách, či tam majú bordel alebo poriadok.

### Debata

- Chcem niečo upraviť na mojom šatníku?
- Pridať poličku?
- Vešiak?
- Zväčšiť ho?

---

## Krátka vsuvka

Animátorky začnú debatu alebo krátku vsuvku, v ktorej vysvetlia podobnosť medzi skriňou a naším vnútrom.

---

## Doplnenie skrine

Keď budú mať skriňu, dopíšu alebo dokreslia odpovede na tieto otázky.

### Čo by som chcela zo svojej skrine vyhodiť?

Čo ma trápi, nejaká moja zlá vlastnosť alebo zlozvyk, ktorého sa chcem zbaviť.

- cigarety
- nadávky
- ...

### Čo by som chcela upratať vo svojej skrini?

Čo je v mojej skrini v neporiadku? Čo by som chcela viac udržiavať? Chcem to mať v skrini, ale nie je to v poriadku. Chcem to „vyžehliť".

- plnenie školských povinností

### Čo by som chcela opraviť?

Nedajú sa mi kvôli tomu zatvoriť dvierka, vyrušuje ma to. Keď to raz opravím, tak ma to nebude rušiť.

- ospravedlniť sa
- niekomu odpustiť

Keď niekomu odpustím, opravím poličku a na tom vzťahu/poličke viem stavať nové ďalšie pekné veci.

---

## Spytovanie svedomia

Potom by nasledovalo spytovanie svedomia.

---

## Ako by mala vyzerať ideálna skriňa?

- skriňa s 10 prikázaniami – to dostanú

## Mokrý program

Program prebieha vo vnútorných priestoroch.
    `,
    vedúciDna: null,
    vedúciProgramu: null,
    animators: [],
    animatorsNote: null,
    materials: ['Papier', 'Fixky', 'Farbičky', 'Perá', 'Krabička s kamienkami', 'Obrázok ideálnej skrine'],
    hasScoring: false,
    scoring: null,
    hasMtzNote: false,
    mtzNote: null
  },

  {
    id: 'str-hladanie',
    name: 'Hľadanie Edmunda',
    dayRef: 'streda',
    timeLabel: 'Večer',
    timeOfDay: 'evening',
    type: 'activity',
    time: '20:00',
    endTime: '22:00',
    location: 'Areál + les / prípadne cesta',
    detail: 'Deti pátraju po uväznenom Edmundovi – v 1. fáze sa vyhýbajú vlkom a zbierajú indície, v 2. fáze naopak chytajú vlkov pre kúsky mapy.',
    description: `
Edmund je uväznený v tábore bielej čarodejnice a my ho chceme oslobodiť. Lenže do nášho tábora prenikli vlci ako sprisahatelia bielej čarodejnice. Našou úlohou bude vyhnať vlkov a nájsť Edmunda.

Hra sa bude hrať v 2 fázach:

## 1. FÁZA – vlci naháňajú nás

V areáli bude 7 okruhov, ktoré strážia 3 vlci. V týchto okruhoch budú indície, ktoré možno napomôžu nájsť Edmunda. V týchto okruhoch budú môcť vlci chytiť dieťa – akonáhle ho chytia, deti vyjdu z kruhu a čupnú si… a čakajú na oživenie. Mimo týchto okruhov ich však ešte chytajú ďalší vlci, ktorí im len uložia úlohu (zabehni okruh,...).

Deti behajú ako individuá, ale hrajú po skupinkách dievčatá a chlapci spolu.

Z týchto skupiniek sa vyberú ďalšie 2–4 deti (2ch. 2d.) – oživovatelia – ktoré budú môcť oživovať padnuté deti, ale nebudú môcť zbierať dôkazy. Oživiť môžu vrchnáčikom, ktorý môžu nájsť v altánku.

Po istom čase, alebo po nazbieraní všetkých dôkazov, sa začína:

## 2. FÁZA – my chytáme vlkov

Tu sa roly obrátia, a keďže sme my nabrali silu a odvahu, teraz je čas vyhnať týchto vlkov z tábora aby nám ukázali cestu k Edmundovi. Všetci vlci tým pádom utekajú pred deťmi, ktoré ich chytajú a budú:

Vlky pred deťmi utekajú, a tie ich ako celá skupinka chytajú. Ak ho chytia, musia ho priniesť do altánku. Následne v úvodzovkách vytĺču z neho informácie (nebude to tak ale chápeme sa) – čiže štýl bizónov.

Akonáhle ubehne čas / chytia sa všetci vlci / získa sa mapa, vydáva sa celý tábor za Edmundom, ktorý bude priviazaný o dajaky strom abo dačo a spoločne ho vyslobodíme.

## Mokrý program
Hry v altánku proti vlkom – niečo vymyslíme ešte.
    `,
    vedúciDna: 'Tomáš Blaha',
    vedúciProgramu: 'Tomáš Blaha',
    animators: [
      { name: 'Kika Ondisková',        role: 'Vlk' },
      { name: 'Peťo Hanzal',           role: 'Vlk' },
      { name: 'Nika Nováková',                  role: 'Vlk' },
      { name: 'Maroš Barňák',                 role: 'Vlk' },
      { name: 'Filip Goffa',                 role: 'Vlk' },
      { name: 'Barborka Bobaľová',     role: 'Vlk' },
      { name: 'Patrik Bača',           role: 'Vlk' },
      { name: 'Ján Falát',           role: 'Vlk' },
      { name: 'Dávid Krivjanský',           role: 'Vlk' },
      { name: 'Pavlínka Katkovčinová', role: 'Vlk' },
      { name: 'Hana Procházková',                 role: 'Utečenec' },
      { name: 'Paulínka Harajdová',    role: 'Utečenec' },
      { name: 'Boris Surničin',        role: 'Utečenec' },
      { name: 'TODO doplniť',          role: 'Utečenec' },
      { name: 'Ján Katkovčin',       role: 'Utečenec' }
    ],
    animatorsNote: '10 vlkov + 5 utečencov (oživujú padnuté deti)',
    materials: [
      '5x5 dôkazov (indície)',
      'Krabice na indície',
      'Laná',
      'Kúsky mapy (pre fázu 2)'
    ],
    hasScoring: false,
    scoring: null,
    hasMtzNote: true,
    mtzNote: 'Pripraviť normálne rovné miesta pre indície.'
  },

  // ── ŠTVRTOK ───────────────────────────────────────────────────────────────

  {
    id: 'stv-trening',
    name: 'Príprava na vojnu',
    dayRef: 'stvrtok',
    timeLabel: 'Doobedu',
    timeOfDay: 'morning',
    type: 'activity',
    time: '09:00',
    endTime: '11:30',
    location: 'Okolie areálu',
    detail: 'Skupinky absolvujú SPARTAN RACE dráhu okolo areálu a preukážu, že sú hodní stať sa členmi Aslanovej armády.',
    description: `
Cieľom programu je aby deti preukázali, že sú hodní stať sa členmi Aslanovej armády. Deti musia prejsť stanovenú dráhu v určitom čase – majú len 2 pokusy a musia zvládnuť všetky stanoviská.

Dráha začína pri východe z tábora a končí na rovnakom mieste. Na trase sú pripravené stanoviská, ktoré treba splniť. Animátor na každom stanovisku si zapisuje, či dieťa zvládlo. Ak nezvládne, ide trestný okruh. Bude sa stopovať čas.

Na začiatok dráhy sa vždy dostavia 2 skupinky (dievčenská a chlapčenská). Vybehne prvý, spustí sa čas; keď dobehne do nejakého stanoviska, pustí sa ďalší.

## Stanoviská SPARTAN RACE
- S Joskym na lane
- Gúľanie pneumatiky
- Podliezanie
- Vyliezť niekde
- Udržanie fliaš s vodou
- Švihadlo
- Rebrík
- Hod niečím ťažším
- Tlačenie naplneného fúrika
- Kliky / drepy
- Skákanie
- Nosenie vedier s vodou
- …

## Paralelne v tábore – vyzývačky
Pomedzi to prebiehajú vyzývačky (kto vydrží najdlhšie v planku, pretláčanie, stolička, …). Keď niekto skončí skôr ako animátor, dostane pohár vody.

## Mokrý program
Toto isté – vojaci musia byť tuff
    `,
    vedúciDna: 'Čaby',
    vedúciProgramu: 'Patrik Pekarovič, Dávid Bača',
    animators: [],
    animatorsNote: '15+ animátorov',
    materials: [
      'Lano (Josky)',
      'Švihadlo',
      'Pneumatika',
      'Veľa špagátu',
      'Lano na strom',
      'Fľaše s vodou',
      'Rebrík',
      'Niečo ťažšie na hádzanie',
      'Fúrik + niečo na jeho naplnenie',
      'Vedrá + voda',
      'Rozpis poradia skupiniek na SPARTAN RACE'
    ],
    hasScoring: true,
    scoring: 'Bodovanie – animátor na každom stanovisku zapisuje splnenie. Cieľom je prejsť celú dráhu v stanovenom čase.',
    hasMtzNote: true,
    mtzNote: 'Pomôžete nám pripraviť SPARTAN RACE dráhu.'
  },

  {
    id: 'stv-aslan',
    name: 'Stretnutie Aslan & čarodejnica TODO',
    dayRef: 'stvrtok',
    timeLabel: 'Poobedie',
    timeOfDay: 'afternoon',
    type: 'activity',
    time: '14:00',
    endTime: '17:00',
    location: 'Celý areál',
    detail: 'Dve veľké hry – Človeče nehnevaj sa a Loďky. Chlapci a dievčatá hrajú každú hru hodinu, potom sa vymenia.',
    description: `
Dve veľké hry, do ktorých je zapojený každý účastník. Chlapčenské a dievčenské skupinky hrajú každú hru hodinu, potom sa vymenia.

## Hra 1: Človeče, nehnevaj sa

Každá skupinka má svoj veľký domček v areáli (od jedálne po ihrisko), domčeky sú rozmiestnené po okruhu (nie pomedzi chatky). Každá skupinka dostane hraciu kocku, pri každej skupinke je animátor.

**Priebeh:**
Hráč hodí kockou a podľa čísla musí obehnúť príslušný počet okruhov. Po 30 sekundách hádže ďalší hráč z iného tímu – môže predchádzajúceho hráča chytiť. Ak je hráč chytený, vracia sa do domčeka na koniec radu.

**Čarodejnice (5 animátorov):** pohybujú sa po areáli a môžu zastaviť hráčov (v rade aj pri behu) a zadajú im úlohu/trest. Príklady úloh:
- Urob 10 kľukov / 15 drepov / 20 panákov
- Preskáč 15 metrov po jednej nohe
- Urob 5 žabích skokov / kráčaj 20 m ako kačka
- Otoč sa 10× okolo vlastnej osi a pokračuj
- Zaspievaj krátky úryvok pesničky
- Napodobňuj zviera 15 sekúnd
- Povedz 5 rozprávkových postáv / 5 zvierat na určené písmeno
- Povedz mená všetkých členov skupinky
- Dotkni sa 5 rôznych stromov a vráť sa späť

⚠️ Úlohy musia byť bezpečné, primerané veku a zábavné.

**Cieľ:** všetci členovia skupinky úspešne dokončia počet okruhov, ktoré im určila kocka, a vrátia sa do domčeka.

**Animátori:** 5 pri skupinkách + 5 čarodejníc + 1 hlavný = **11**

## Hra 2: Loďky

V strede hracej plochy je veľká mapa bojiska (kartón alebo plachta) s nepriateľskými loďami. Hra je rozdelená na 5 stanovíšť, na každom je animátor-veliteľ armády Bielej čarodejnice so špeciálnou schopnosťou (napr. strieľa dve strely naraz, ohnivé strely, ľadové strely).

Ak chcú deti vystreliť na loď, musia najprv splniť úlohu animátora na danom stanovišti (pohybová, vedomostná, logická alebo tímová). Ak sa nepodarí, skúsia ďalšiu úlohu. Po splnení môžu vystreliť – za zásah = body, za potopenie lode = bonusové body.

Vyhráva tím s najviac bodmi a potopených loďami po prejdení všetkých stanovíšť.

**Animátori: 5** (jeden na každom stanovišti)
    `,
    vedúciDna: 'Čaby',
    vedúciProgramu: 'Ján Falát, Mathias Mastiľák',
    animators: [
      { name: 'MTZ',                   role: 'Armáda čarodejníc' },
      { name: 'Adam Paško',            role: 'Ločkár'            },
      { name: 'Nina Radová',                  role: 'Ločkár'            },
      { name: 'Patrik Pekarovič',      role: 'Ločkár'            },
      { name: 'Barborka Kridlová',     role: 'Ločkár'            },
      { name: 'Pavlínka Katkovčinová', role: 'Ločkár'            }
    ],
    animatorsNote: '11 animátorov (Človeče) + 5 animátorov (Loďky)',
    materials: [
      '5× veľká hracia kocka',
      '5× označenie domčeka (vlajka / tabuľka / kužeľ / šatka vo farbe tímu)',
      'Papier a pero pre každú skupinku',
      'Stopky / mobil s časovačom',
      'Píšťalka',
      'Rekvizity pre čarodejnice (klobúky, plášte, metly, šatky...)',
      'Megafón (voliteľné)',
      'Kužele + stužky/pásky na vyznačenie trasy',
      'Mapa bojiska z kartónu alebo veľkej plachty (Loďky)',
      'Kužele na vyznačenie hracej plochy (Loďky)',
      'Fixky, lepiaca páska (Loďky)'
    ],
    hasScoring: true,
    scoring: 'Loďky: body za zásah lode, bonusové body za potopenie. Človeče: cieľom je dokončiť okruhy.',
    hasMtzNote: false,
    mtzNote: null
  },

  {
    id: 'stv-obeta',
    name: 'Obeta za Narniu',
    dayRef: 'stvrtok',
    timeLabel: 'Večer',
    timeOfDay: 'evening',
    type: 'activity',
    time: '20:00',
    endTime: '23:00',
    location: 'Areál, les, kameňolom',
    detail: 'Slávnostný sprievod s fakľami k obeti Aslana v kameňolome, potom nočná hra – mladšie deti hľadajú uviazaných animátorov a oslobodia ich rituálom.',
    description: `
## I. Prológ a príprava (nástup)

Program začína scénkou _(Marína, Paulína – vymyslieť!)_, v ktorej sa Aslan rozhodne priniesť najvyššiu obetu za záchranu Narnie. Deti sú vyzvané, aby ho sprevádzali na poslednej ceste k Kamennému stolu.

**Výroba fakieľ:** Deti si vlastnoručne vyrobia fakle – suchou palicou o šmirgľový papier, obvinutie parafínovou látkou, priviazanie špagátom. Namaľujeme sa farbami na tvár.

**Oheň:** Deti (rozdelené na chlapcov a dievčatá) musia oheň získať pomocou zápaliek pod dohľadom vedúcich.

**Sprievod:** Stretávame sa pri bránke namaľovaní, so zapálenými fakľami. V tichosti sa vydávame na pochod lesom, počas ktorého deti nachádzajú stopy Aslana v podobe kusov vlajky a približujú sa k lomu.

_Časový rámec: scénka 10 min / príprava 30 min / cesta 30 min / do 21:30 Aslan obetovaný_

## II. Obeta a modlitba pri ohni (kameňolom)

⚠️ **Vopred pripraviť fakle, ktoré budú na mieste horieť + ľudia + bubny a dramatická hudba!**

V kameňolome sa odohráva kľúčový moment. Deti stoja dole a pozerajú hore na tragickú scénu Aslanovej obety _(scénu obety vymyslieť)_. Animátor skupinky prevezme fakľu a po Aslanovej smrti ju uhasí.

Po obete nasleduje modlitba _(začne _______ – porieši modlitebný tím)_.

**Rozdelenie:** Po scénke staršie deti zostávajú v kameňolome, kde ich čaká samostatná Skúška odvahy. Mladšie deti sa presúvajú na nočnú hru do lesa.

## III. Nočná hra: Oslobodenie ochrancov (mladšie deti)

Po Aslanovej obete ostalo v lese uväznených 14 verných bojovníkov (animátorov), ktorých uväznila Biela čarodejnica.

**Rozdelenie:** 14 zmiešaných skupín (chlapci a dievčatá zvlášť). Mená sa čítajú pred začatím – dramaticky.

Každá skupinka dostane:
- 1 lampášik (sklenička so zapálenou sviečkou) + krabičku s 3 zápalkami (3 pokusy na obnovenie)
- Indíciu k svojmu animátorovi (kúsok látky – 7 farieb × 2: chlapci hľadajú chlapčenského animátora, dievčatá dievčenského)

Animátori (Duchovia lesa) môžu do lesa vyraziť po 15 s.

**⚠️ HLAVNÉ PRAVIDLO: V LESE MUSÍ BYŤ TICHO.**

**Priebeh hry:**
Cieľom je nájsť svojho animátora priviazaného k stromu (rozmiestnení podľa hrubej mapky). Skupinky idú smerom rovno od svojho štartu.

**Duchovia lesa (strašiaci):** Animátori v maskách so svietiacimi náramkami sa pohybujú po lese pomaly. Strašia, ale deti NEhonia.
- Pravidlo: ak deti stretnú Ducha, musia okamžite zastať, skamenieť a byť ticho. Nesmú utekať.
- Postih: ak sa niekto pohne / vykríkne → Duch dieťa krátkodobo „odnesie" nabok; zhasnutá sviečka alebo hendikep (šatka cez oči / zviazané ruky) – dieťa sa hneď vracia k tímu.

**Navigácia:** Skupinky vedia, že animátor nie je na druhej strane lesa (ide sa rovno). Cca 20 m od animátora nájdu pomôcku (farba/vzor ich indície) – signál, že sú blízko.

**Rituál oslobodenia:**
Po nájdení animátora pri strome je krabička s inštrukciami:
1. Obmotajte špagát okolo najbližších stromov a okolo vás – ochrana rituálu pred Duchmi
2. Zoberte prázdnu sklenenú nádobku, položte ju 2 kroky od animátora
3. Nalejte fľaštičku s bezfarebnou tekutinou
4. Najmladší člen: vrecko s bielymi krištálikmi rozmiešajte vo vode
5. Najstarší člen: sáčok s granulkami rozmiešajte v roztoku
6. Pridajte vrecúško s bylinkami
7. Ako posledné pridajte šumivú tabletu
8. Podajte elixír animátorovi – **vypije až do dna**
9. Chytia sa za ruky, povedia po rade svoje mená (aj animátora) a prednesú zaklínadlo:
_„Kruh je uzavretý. Tieň stráca moc a my ťa spolu zobúdzame."_

**Záver:** Animátor sa „prebudí", deti ho rozviažu a on ich bezpečne odvedie späť do tábora.

## Bezpečnostné pokyny
- Oheň: výroba a zapaľovanie fakieľ pod priamym dohľadom dospelých; pri ohni hasiaci prístroj alebo voda
- Strašenie: primerané, nie príliš intenzívne – tichý strach, NIE útek
- Terén: trasa vopred vyznačená policajnými páskami – ísť ZA pásky je prísne zakázané

## Mokrý program
Scénka Aslanovej obety sa odohráva, potom sa ide na futbalové ihrisko. Po obete nasleduje večerná modlitba a deti idú spať. V noci sú zobudené na Skúšku odvahy v jedálni.
    `,
    vedúciDna: 'Čaby',
    vedúciProgramu: 'Marína Holubová, Paulínka Harajdová',
    animators: [
      { name: 'Paulínka Harajdová',    role: 'Duch lesa'           },
      { name: 'Marína Holubová',       role: 'Duch lesa'           },
      { name: 'Nika Nováková',                  role: 'Duch lesa'           },
      { name: 'Baška Bobaľová',              role: 'Duch lesa'           },
      { name: 'Tomáš Blaha',           role: 'Duch lesa'           },
      { name: 'Adam Paško',            role: 'Duch lesa'           },
      { name: 'Ondrej Mocák',          role: 'Priviazaný bojovník' },
      { name: 'Hana Procházková',                 role: 'Priviazaný bojovník' },
      { name: 'Ema Taňkošová',                   role: 'Priviazaný bojovník' },
      { name: 'Patrik Pekarovič',      role: 'Priviazaný bojovník' },
      { name: 'Filip Goffa',                 role: 'Priviazaný bojovník' },
      { name: 'Andrea Spišáková',                 role: 'Priviazaný bojovník' },
      { name: 'Mathias Mastiľák',               role: 'Priviazaný bojovník' },
      { name: 'Peter Greňo',           role: 'Priviazaný bojovník' },
      { name: 'Kika Olajošová',        role: 'Priviazaný bojovník' },
      { name: 'Barborka Kridlová',     role: 'Priviazaný bojovník' },
      { name: 'Sofia Dolobačová',      role: 'Priviazaný bojovník' },
      { name: 'Patrik Bača',           role: 'Priviazaný bojovník' },
      { name: 'Ján Falát',           role: 'Priviazaný bojovník' },
      { name: 'Pavlínka Katkovčinová', role: 'Priviazaný bojovník' }
    ],
    animatorsNote: '6 Duchov lesa + 14 priviazaných bojovníkov',
    materials: [
      'Suché palice na fakle',
      'Šmirgľový papier',
      'Parafínová látka',
      'Špagát (fakle + rituál)',
      'Farby na tvár',
      'Zápalky (na oheň + lampášiky)',
      'Hasiaci prístroj / vedro vody (bezpečnosť)',
      'Fakle na mieste v kameňolome (vopred pripraviť)',
      'Bubny / dramatická hudba',
      '14× lampášik (sklenička + sviečka) + krabička so zápalkami (3 ks)',
      'Indície: kúsok látky – 7 farieb × 2 (chlapci + dievčatá)',
      '14× krabička s rituálovými inštrukciami',
      '14× prázdna sklenená nádobka',
      '14× fľaštička s bezfarebnou tekutinou',
      '14× vrecúško s bielymi krištálikmi',
      '14× sáčok s granulkami',
      '14× vrecúško s bylinkami',
      '14× šumivá tableta',
      'Masky pre Duchov lesa',
      'Svietiace náramky (pre Duchov lesa)',
      'Policajné pásky na vyznačenie trasy',
      'Hrubá mapka rozmiestnenia animátorov'
    ],
    hasScoring: false,
    scoring: null,
    hasMtzNote: true,
    mtzNote: 'Vopred pripraviť fakle na mieste v kameňolome. Zabezpečiť hasiaci prístroj / vodu pri ohni. Trasu vyznačiť policajnými páskami.'
  },

  {
    id: 'stv-skuska',
    name: 'Skúška odvahy',
    dayRef: 'stvrtok',
    timeLabel: 'Nočná hra',
    timeOfDay: 'night',
    type: 'activity',
    time: '21:45',
    endTime: '02:00',
    location: 'Kameňolom',
    detail: 'Skupinky chodia v dvojiciach po vyznačenej trase v tme, prenikajú k budovám a stiahnu sa bez odhalenia.',
    description: `
Deti chodia po dvojiciach. Jedna skupina potrebuje približne 10–15 minút. Rozdelia sa do dvojíc a pohybujú sa medzi budovami po dobre vyznačenej trase, aby sa nestratili.

Následne prídu do budovy, kde sa pripravuje útok. Potom sa musia stiahnuť bez toho, aby ich niekto odhalil alebo chytil.

## Mokrý program
Žiadny
    `,
    vedúciDna: 'Čaby',
    vedúciProgramu: 'Dávid Krivjanský, Dávid Bača',
    animators: [
      { name: 'Dávid Krivjanský' }, { name: 'Filip Goffa' }, { name: 'TODO doplniť' },
      { name: 'Boris Surničin' }, { name: 'Braňo Kováč' },
      { name: 'Dianka Salanciová' }, { name: 'Kika Ondisková' }
    ],
    animatorsNote: '5 animátorov + 2 vedúci = 7',
    materials: [
      'Reflektujúca farba'
    ],
    hasScoring: false,
    scoring: null,
    hasMtzNote: false,
    mtzNote: null
  },

  // ── PIATOK ────────────────────────────────────────────────────────────────

  {
    id: 'pia-priprava',
    name: 'Príprava na vojnu',
    dayRef: 'piatok',
    timeLabel: 'Doobedu',
    timeOfDay: 'morning',
    type: 'activity',
    time: '09:00',
    endTime: '11:30',
    location: 'Areál / okolie areálu',
    detail: 'Skupinky rotujú po 15 stanovištiach – strelba, šifry, fyzické výzvy a tímové úlohy. Za každé splnené stanovište získavajú hodnosť pred záverečnou bitkou.',
    description: `
Deti sa pripravujú na vojnu z hľadiska skillsov. Po skupinkách rotujú po stanovištiach a získavajú hodnosti.

## Stanoviská

- Vylúšti šifru
- Streľba luku
- Penové tyčky fight
- Prenášanie kapitána kotúľaním sa
- Prenášať poháre na doske
- Prechod mínovým poľom po slepiačky
- Prefukovanie loptičiek cez poháre s vodou
- Prehadzovanie loptičky v pohároch do cieľa
- Hod granátom
- Nosenie s kolesom loptičku
- Stabilizácia pohárov
- Kotúľanie pneumatiky
- Prehadzovanie lukakrhu
- Cornhole
- Ťahanie felície

## Mokrý program
To isté – vojaci musia byť schopní pracovať aj po daždi, musia byť tuff
    `,
    vedúciDna: 'Andrea Spišáková',
    vedúciProgramu: 'Dávid Bača, Ján Katkovčin',
    animators: [
      { name: 'Patrik Pekarovič',      role: 'NEGÁCIA' },
      { name: 'Ján Katkovčin',       role: 'NEGÁCIA' },
      { name: 'Peter Greňo',           role: 'NEGÁCIA' },
      { name: 'Ondrej Mocák',          role: 'NEGÁCIA' },
      { name: 'Adam Paško',            role: 'NEGÁCIA' },
      { name: 'Barborka Kridlová',     role: 'NEGÁCIA' },
      { name: 'Ema Taňkošová',                   role: 'NEGÁCIA' },
      { name: 'Pavlínka Katkovčinová', role: 'NEGÁCIA' },
      { name: 'Sofia Dolobačová',      role: 'NEGÁCIA' }
    ],
    animatorsNote: '15+ animátorov',
    materials: [
      'Papier, pero',
      'Luk a šípy',
      'Penové tyčinky',
      'Stôl, poháre',
      'Doska na lane',
      'Pingpongové loptičky',
      'Granáty alebo niečo na vrhanie',
      'Hulahop',
      'Pneumatiky',
      'Cornhole',
      'Felícia'
    ],
    hasScoring: true,
    scoring: 'Skupinky získavajú hodnosti podľa výsledkov na stanovištiach.',
    hasMtzNote: true,
    mtzNote: 'Pripraviť stanoviská.'
  },

  {
    id: 'pia-boj',
    name: 'Záverečný boj TODO',
    dayRef: 'piatok',
    timeLabel: 'Poobedie',
    timeOfDay: 'afternoon',
    type: 'activity',
    time: '14:30',
    endTime: '17:00',
    location: 'Kameňolom / les / lúka',
    detail: 'Deti hľadajú 3 predmety (koruna, žezlo, vlajka) v nepriateľskom území, pričom ich naháňa armáda ľadovej kráľovnej.',
    description: `
Deti hľadajú predmety, ktorých získaním porazia armádu ľadovej kráľovnej. Naháňa ich pritom jej armáda.

**Cieľ:** nájsť všetky 3 predmety – korunu, žezlo a vlajku.

## Formát hry
1 kolo = 6 minút behanie + 4 minúty oddych / trénovanie / osud

## Herná plocha
Rozdelená na 2 časti:
1. **Nepriateľské územie** – deti vybiehajú hľadať predmety, naháňa ich armáda kráľovnej
2. **Kemp** – deti trávia prestávky, zlepšujú si úroveň a čelia nástrahám osudu; každé kolo je špecifická úloha na zlepšenie úrovne

## Kartičky a čísla
Každé dieťa dostane kartičku s číslom **1** a farbou podľa schopnosti (Peter/Susan/Edmund/Lucy). Animátori majú kartičky s číslami **5–10** a po kolách si ich medzi sebou menia.

**Konfrontácia:** keď animátor chytí dieťa na nepriateľskom území, ukážu si navzájom karty:
- Dieťa má nižšie alebo rovné číslo → zostáva na mieste, odoberie sa mu kartička
- Dieťa má vyššie číslo → animátor ho pustí, kartička zostáva

## Schopnosti postáv
- **Peter (červený)** – keď ho chytí animátor, môže si zahrať kameň-papier-nožnice; ak vyhrá, unikne
- **Susan (modrá)** – 3× za hru si môže pri stretnutí vymeniť kartičku
- **Edmund (zelený)** – počas každej prestávky získa 2 levely, ale ak ho chytí animátor, príde o 1 level
- **Lucy (žltá)** – každé kolo dostane 3 kartičky, počas nasledujúceho kola môže oživovať mŕtvych

## Kód vo fľaši
Jeden z predmetov je schovaný v truhle s kódom/kľúčom. Kľúč je vo fľaši na dne nádoby – deti musia prelievať vodu z inej nádoby, kým fľaša nevypláva. V malom okruhu pri nádobe nemôžu animátori chytať deti. Za jedno kolo môžu prileliať vodu len raz (strážca studne – pri podvádzaní odleje 2 poháre späť). Za nalejenú vodu odovzdajú žetón z prestávky (vždy len jeden).

## Po 7. kole
Príde Aslan, oživí všetky deti a začne im dávať výhody.

## Kráľovnine kliatby / Aslanove kúzla
- Zjavenie mapy (v poslednom kole)

## Poznámky po hre (na dopracovanie)
- V kempe viac animátorov, viac výziev
- Viac predmetov na hľadanie
- Intervaly prispôsobiť a nastaviť dobre
- Chytači nech majú by default nižšie hodnoty
- Vlci berú kartičky, oživovací dávajú
- Schopnosti si rozdajú v skupinke, vrámci skupinky si môžu meniť
- V kempe mať osvieženie (je teplo)
    `,
    vedúciDna: 'Andrea Spišáková',
    vedúciProgramu: 'Peter Greňo, Nika Nováková, Čaby, Andrea Spišáková',
    animators: [],
    animatorsNote: null,
    materials: [
      'Kartičky s číslami pre deti (číslo 1, farebné – Peter/Susan/Edmund/Lucy)',
      'Kartičky pre animátorov (čísla 5–10)',
      '3 predmety: koruna, žezlo, vlajka',
      'Truhla s kódom/kľúčom',
      'Fľaša + nádoba s vodou + pohár (kód vo fľaši)',
      'Žetóny (prestávka medzi kolami)',
      'Pískorky (tréning v kempe)'
    ],
    hasScoring: true,
    scoring: 'Deti zbierajú levely v kempe, stratia ich pri chytení. Víťazí tím, ktorý nájde všetky 3 predmety.',
    hasMtzNote: true,
    mtzNote: 'MTZ je súčasťou zlej armády (spolu s ľuďmi zvonku).'
  },

  {
    id: 'pia-bal',
    name: 'Večerný bál',
    dayRef: 'piatok',
    timeLabel: 'Večer',
    timeOfDay: 'evening',
    type: 'activity',
    time: '20:00',
    endTime: '22:30',
    location: 'Altánok',
    detail: 'Organizovaná diskotéka s tančekmi, súťažami a kolektívnymi hrami – zakončená odpočítavaním, konfetami a svietiacimi náramkami.',
    description: `
Organizovaná diskotéka. Všetci animátori.

## Hry a program

**Dance battle** – dievčatá vs chlapci

**Chvíľková tancovačka** – moderátor hajpuje ľudí, nasleduje vláčik cez celý areál

**Zvieratká** – počas tanca dostanú pokyn byť zvieratkom (lev – revať, mačky, sovy, primárne zvieratká z lesa)

**Hľadanie predmetov** – pred diskotékou organizátori schováju po miestnosti 10–15 malých predmetov (zlatý kľúč, mini korunku, lampáš, leviu hrivu, prsteň, meč z kartónu). Počas jednej pesničky ich môžu deti hľadať. Na konci sa vyžrebujú malé odmeny alebo sladkosti.

**Skupinkové choreografie**
- Každá skupinka dostane 2 minúty na prípravu, potom 30–45 sekúnd na vlastnú choreografiu
- Môžu použiť: bojovnícke pózy, leví tanec, čarodejnícke kúzla, smiešne pohyby
- Porota hodnotí: originalitu, spoluprácu, energiu
- Odmena: titul _Najveselšie kráľovstvo Narnie_

**Záver diskotéky** – posledné pesničky bez prerušovania; môžeme zaradiť: spoločný vláčik, limbo, kruhové tance, skákanie podľa rytmu, obľúbené detské hity

**Záverečné odpočítavanie:** 10… 9… 8… → pri nule vyletia konfety alebo sa rozdajú svietiace náramky ako symbol ukončenia dobrodružstva

**Príchod Santa Clausa (Ľubo)** – každé dieťa dostane darček/balíček

## Po diskotéke – organizované voľno (pre tých čo chcú)
- Spoločenské hry
- Korálky
- Športy
- Kecačky
- Tancovačky (Just Dance)

## Mokrý program
To isté, len v kuchyni
    `,
    vedúciDna: 'Andrea Spišáková',
    vedúciProgramu: 'Andrea Spišáková',
    animators: [],
    animatorsNote: 'Všetci animátori',
    materials: [
      'Konfety',
      'Svietiace náramky',
      'Zlatý kľúč (rekvizita)',
      'Mini koruna (rekvizita)',
      'Lampáš (rekvizita)',
      'Lvia hriva (rekvizita)',
      'Prsteň (rekvizita)',
      'Meč z kartónu (rekvizita)',
      'Reproduktor / ozvučenie',
      'Dobrá nálada'
    ],
    hasScoring: false,
    scoring: null,
    hasMtzNote: true,
    mtzNote: 'DJ: Dávid, Patrik'
  },

];
