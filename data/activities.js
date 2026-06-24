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
    endTime: '11:30',
    location: 'Vonku, chatky',
    detail: 'Skupinky hľadajú podľa mapy skryté meno a názov skupinky v chatách, potom vyrábajú erb a vymýšľajú pokrik skupinky.',
    description: `
Deti prídu do tabora, mozu si nechat veci pred chatkami nech im nezavadzaju pri hladani. Skupinky sa presunú do chatiek kde zacnu hladat mapu, následne podla mapy budu hladat miesto kde sa bude nachadzat ich meno s ich nazvom skupinky. Ked to najdu, pojdu za core timom, ktory si zapise ich poradie kvoli hodnoteni a odovzdá im pomocky na vyrobu erbu ktory si následne idu robit na chatky (resp. si vyrobia svoj "znak", ktorý budú nosiť počas tábora). Teraz bude aj cas a priestor pre tvorbu pokrikov.

- nazvy skupiniek si animátori dohodnú na chatovej dielni spolocne
    `,
    vedúciDna: 'Marta',
    vedúciProgramu: 'Bašky',
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
    mtzNote: `Core tim nech rozmiestni mapy, indície a mena skupiniek {dohodneme osobne} po chatkách rano pred prichodom deti, staci na viditeľné miesto, najlepsie na každej chatke podobne.

Mokrý program: schova sa vsetko na chatke najdu, erb budu robit na chatke.`
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
    vedúciDna: 'Marta',
    vedúciProgramu: 'Bašky',
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
    time: '14:30',
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
    vedúciDna: 'Marta',
    vedúciProgramu: 'Niky, Kika Ond.',
    animators: [
      { name: 'Mathias',            role: 'Hádanky' },
      { name: 'Nina',               role: 'Hádanky' },
      { name: 'Paulínka Harajdová', role: 'Hádanky' },
      { name: 'Marína Holubová',    role: 'Hádanky' },
      { name: 'Kika Ondisková',     role: 'Hádanky' },
      { name: 'Adam Paško',         role: 'Behač'   },
      { name: 'Hanka',              role: 'Behač'   },
      { name: 'Erika',              role: 'Behač'   },
      { name: 'Dianka Salanciová',  role: 'Behač'   },
      { name: 'Ondrej Mocák',       role: 'Behač'   },
      { name: 'Maroš',              role: 'Behač'   },
      { name: 'Filip',              role: 'Behač'   },
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
    time: null,
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
    `,
    vedúciDna: 'Marta, Josky',
    vedúciProgramu: 'Dianka S., Kika Ol.',
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
    time: '22:00',
    endTime: null,
    location: 'Areál, Lúka',
    detail: 'Mladší riešia hádanky a záchranné misie v areáli; starší sa v skupinkách prebíjajú k skrini na lúke za prítomnosti vlkov.',
    description: `
## 5 – 7 roční

Budú v areáli, kde podľa hádaniek budú zisťovať ďalšie miesta kam majú ísť, na konci sa každá skupinka bude musieť dostať k svojej lampe a rozsvietiť ju, potom k ním príde pán Tumnus a ukáže im, kde je skriňa

Počas presunov medzi miestami ich môžu chytať vlci ktorí im zadajú úlohy, ktoré keď do časového limitu nesplnia, jedného zo skupinky si odvlečú (podľa výberu animátora) a páskou mu obviažu nohy alebo ruky alebo oči alebo ústa (podľa výberu animátora)

Skupinka musí prísť na miesto s lekárničkami, zobrať ju a prísť po vlkom zobratého člena tímu, ktorí už ostane tak obviazaný do konca hry až kým celá skupinka neprejde skriňou

## 8 a 9 roční

Budú na lúke, rozmiestnia sa do štyroch rohov a v strede lúky bude skriňa a okolo nej lampáše tak aby všetci na ňu v diaľke videli

Musia sa ako celá skupinka dostať k skrini

Budú ich chytať vlci a princíp bude tak ako pri 5-7 s tým, že nikam ho nevlečú ale zobraný člen ostane ležať na tom mieste a lekárničky budú mať každá skupinka na svojom štarte, takže sa po ne budú musieť za každým vraciať, obviazaný člen ostane obviazaný až do konca hry

## Mokrý program

Escape room na chatkách
    `,
    vedúciDna: 'Marta, Josky',
    vedúciProgramu: 'Nina, Pašky',
    animators: [
      { name: 'Nika' }, { name: 'Janko' }, { name: 'Ema' }, { name: 'Maroš' },
      { name: 'Patrik Bača' }, { name: 'Boris Surničin' }, { name: 'Janko Katkovčin' },
      { name: 'Filip Sukeľ' }, { name: 'Dano Chripák' }, { name: 'Peter Greňo' }
    ],
    animatorsNote: 'Cca 10 vlkov + pán Tumnus',
    materials: [
      'Skrine',
      'Lampáše',
      'Papieriky (ako lekárničky)',
      'Hádanky',
      'Lepiace pásky'
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
    time: '09:30',
    endTime: '12:00',
    location: 'Lúka + ihrisko',
    description: `
Skupinky súťažia na rôznych stanovištiach. Kráľovná (čarodejnica) hodnotí skupinky a rozhoduje o víťazoch.

## Stanovištia
- futbal
- vzduchovka
- cornhole
- meta
    `,
    vedúciDna: null,
    vedúciProgramu: 'Čaby',
    animators: [
      { name: 'Tomáš Blaha',         role: 'Lúka'       },
      { name: 'Josky',               role: 'Vzduchovka' },
      { name: 'Dano Chripák',        role: 'Vzduchovka' },
      { name: 'Patrik Pekarovič'                        },
      { name: 'Paulínka Katkovčinová'                   },
      { name: 'Čaby',                role: 'Futbal'     },
      { name: 'Adam Paško',          role: 'Cornhole'   },
      { name: 'Nina',                role: 'Meta'       },
      { name: 'Nika',                role: 'Meta'       },
      { name: 'Marína Holubová'                         },
      { name: 'Kika Olajošová'                          },
      { name: 'Kika Pichonská'                          },
      { name: 'Paulínka Harajdová'                      },
      { name: 'Peťo Hanzal'                             },
      { name: 'Ajka'                                    },
      { name: 'Sofia Dolobačová'                        },
      { name: 'Mathias'                                 },
      { name: 'Filip G.'                                }
    ],
    animatorsNote: 'Cca 17 animátorov',
    materials: [
      'Lopty (futbal) – 2 ks',
      'Cornhole sada – 1 sada',
      'Kužele (Meta) – 20 ks'
    ],
    hasScoring: true,
    scoring: 'Bodujú jednotlivé stanovištia – vedúci stanovišťa zaznamenáva výsledky.',
    hasMtzNote: false,
    mtzNote: null
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
    location: 'Areál chatovačky',
    description: `
Skupinky sú rozdelené na tím Lucy a tím Edmunda. Plnia úlohy u majstrov, nakupujú u obchodníka a súťažia o najlepšie výsledky.
    `,
    vedúciDna: null,
    vedúciProgramu: 'Ondrej Mocák',
    animators: [
      { name: 'Ondrej Mocák',     role: 'Kontrolor'  },
      { name: 'Kika Ondisková',   role: 'Majster'    },
      { name: 'Nika',             role: 'Majster'    },
      { name: 'Erika',            role: 'Majster'    },
      { name: 'Janko Falát',      role: 'Majster'    },
      { name: 'Filip Sukeľ',      role: 'Majster'    },
      { name: 'Adam Paško',       role: 'Obchodník'  },
      { name: 'Hanka',            role: 'Stanovište' },
      { name: 'Nina',             role: 'Stanovište' },
      { name: 'Patrik Bača',      role: 'Stanovište' }
    ],
    animatorsNote: '5 majstrov, 1 obchodník, 3 stanovištia, 1 kontrolor',
    materials: [
      'Žetóny / body – 200 ks',
      'Stôl pre obchodníka – 1 ks',
      'Tovar (rekvizity) – 1 sada'
    ],
    hasScoring: true,
    scoring: 'Tím s najviac bodmi od obchodníka na konci vyhráva.',
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
    location: 'Stanivská + altánok',
    description: `
Dramatická večerná aktivita – deti zistia, že Tumnus zmizol. Hľadajú stopy a riešia záhadu jeho zmiznutia.
    `,
    vedúciDna: null,
    vedúciProgramu: 'Braňo Kováč',
    animators: [
      { name: 'Braňo Kováč',       role: 'Stanivská' },
      { name: 'Dianka Salanciová', role: 'Stanivská' },
      { name: 'Boris Surničin',    role: 'Stanivská' },
      { name: 'Mathias',           role: 'Stanivská' },
      { name: 'Peťo Hanzal',       role: 'Stanivská' },
      { name: 'Patrik Pekarovič',  role: 'Stanivská' },
      { name: 'Nina',              role: 'Altánok'   }
    ],
    animatorsNote: '7 animátorov',
    materials: [
      'Sviečky – 20 ks',
      'Reproduktor – 1 ks'
    ],
    hasScoring: false,
    scoring: null,
    hasMtzNote: false,
    mtzNote: null
  },

  // ── STREDA ────────────────────────────────────────────────────────────────

  {
    id: 'str-vylet',
    name: 'Výlet – stanoviská',
    dayRef: 'streda',
    timeLabel: 'Doobedu',
    timeOfDay: 'morning',
    type: 'activity',
    time: '09:00',
    endTime: '12:00',
    location: 'Trasa okolo chatovačky',
    description: `
Skupinky prechádzajú trasu s 8 stanoviskami. Na každom stanovisku na nich čakajú postavy z Narnie a úlohy.
    `,
    vedúciDna: null,
    vedúciProgramu: null,
    animators: [
      { name: 'Kika Ondisková', role: 'Líška'    },
      { name: 'Ľuboš',         role: 'Mikuláš'  },
      { name: 'Boris Surničin', role: 'Maugrim'  },
      { name: 'Pali P.',        role: 'Bobor'    },
      { name: 'Števo SDB',      role: 'Kentaur'  }
    ],
    animatorsNote: '8 stanovísk (MTZ doplní zoznam)',
    materials: [
      'Mapy trasy – 10 ks',
      'Karty stanovísk – 8 sád',
      'Pečiatky / razidlá – 8 ks'
    ],
    hasScoring: true,
    scoring: 'Skupinky zbierajú pečiatky – čím viac, tým lepšie.',
    hasMtzNote: true,
    mtzNote: 'MTZ doplní zoznam animátorov na jednotlivé stanoviská.'
  },

  {
    id: 'str-obnova',
    name: 'Duchovná obnova',
    dayRef: 'streda',
    timeLabel: 'Poobedie',
    timeOfDay: 'afternoon',
    type: 'activity',
    time: '14:30',
    endTime: '17:00',
    location: 'Kaplnka / záhrada',
    description: `
Deň duchovného stíšenia. Program vedie kňaz alebo duchovný sprevádzateľ.
    `,
    vedúciDna: null,
    vedúciProgramu: null,
    animators: [],
    animatorsNote: null,
    materials: [],
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
    location: 'Areál chatovačky',
    description: `
Edmund je nezvestný a skupinky ho musia nájsť.

## Rozdelenie animátorov
- jedna skupina animátorov chytá deti
- druhá skupinka utečencov pomáha deťom dostať sa k cieľu
    `,
    vedúciDna: null,
    vedúciProgramu: 'Kika Ondisková',
    animators: [
      { name: 'Kika Ondisková',        role: 'Chytanie' },
      { name: 'Peťo Hanzal',           role: 'Chytanie' },
      { name: 'Nika',                  role: 'Chytanie' },
      { name: 'Maroš',                 role: 'Chytanie' },
      { name: 'Filip',                 role: 'Chytanie' },
      { name: 'Barborka Bobaľová',     role: 'Chytanie' },
      { name: 'Patrik Bača',           role: 'Chytanie' },
      { name: 'Janko Falát',           role: 'Chytanie' },
      { name: 'Filip Sukeľ',           role: 'Chytanie' },
      { name: 'Paulínka Katkovčinová', role: 'Chytanie' },
      { name: 'Hanka',                 role: 'Beh'      },
      { name: 'Paulínka Harajdová',    role: 'Beh'      },
      { name: 'Boris Surničin',        role: 'Beh'      },
      { name: 'Dano Chripák',          role: 'Beh'      },
      { name: 'Janko Katkovčin',       role: 'Beh'      }
    ],
    animatorsNote: '10 chytajúcich + 5 utečencov',
    materials: [
      'Baterky – 15 ks',
      'Pásky – 80 ks'
    ],
    hasScoring: false,
    scoring: null,
    hasMtzNote: false,
    mtzNote: null
  },

  // ── ŠTVRTOK ───────────────────────────────────────────────────────────────

  {
    id: 'stv-trening',
    name: 'Tréning',
    dayRef: 'stvrtok',
    timeLabel: 'Doobedu',
    timeOfDay: 'morning',
    type: 'activity',
    time: '09:30',
    endTime: '12:00',
    location: 'Ihrisko',
    description: `
Skupinky sa pripravujú na záverečnú bitku. Tréning bojových zručností a tímovej spolupráce.
    `,
    vedúciDna: null,
    vedúciProgramu: null,
    animators: [],
    animatorsNote: '15+ animátorov (zoznam doplniť)',
    materials: [
      'Rekvizity na boj – 1 sada',
      'Lopty – 4 ks'
    ],
    hasScoring: false,
    scoring: null,
    hasMtzNote: true,
    mtzNote: 'MTZ doplní rozdelenie animátorov.'
  },

  {
    id: 'stv-aslan',
    name: 'Stretnutie Aslan & čarodejnica',
    dayRef: 'stvrtok',
    timeLabel: 'Poobedie',
    timeOfDay: 'afternoon',
    type: 'scenka',
    time: '14:30',
    endTime: '16:00',
    location: 'Lúka',
    description: `
Kľúčová scénka tábora – Aslan a Biela čarodejnica sa stretávajú a uzatvárajú zmluvu. Deti sú svedkami.
    `,
    vedúciDna: null,
    vedúciProgramu: null,
    animators: [
      { name: 'MTZ',                   role: 'Armáda čarodejníc' },
      { name: 'Adam Paško',            role: 'Ločkár'            },
      { name: 'Nina',                  role: 'Ločkár'            },
      { name: 'Patrik Pekarovič',      role: 'Ločkár'            },
      { name: 'Barborka Kridlová',     role: 'Ločkár'            },
      { name: 'Paulínka Katkovčinová', role: 'Ločkár'            }
    ],
    animatorsNote: null,
    materials: [],
    hasScoring: false,
    scoring: null,
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
    endTime: '22:00',
    location: 'Celý areál',
    description: `
Dramatická nočná aktivita – deti sú stratené v Narnii a musia nájsť cestu späť. Animátori ako strašiaci ich vedú na správnu cestu.
    `,
    vedúciDna: null,
    vedúciProgramu: 'Adam Paško',
    animators: [
      { name: 'Paulínka Harajdová',    role: 'Strašiak' },
      { name: 'Marína Holubová',       role: 'Strašiak' },
      { name: 'Nika',                  role: 'Strašiak' },
      { name: 'Bašká B.',              role: 'Strašiak' },
      { name: 'Tomáš Blaha',           role: 'Strašiak' },
      { name: 'Adam Paško',            role: 'Strašiak' },
      { name: 'Ondrej Mocák',          role: 'Stratený' },
      { name: 'Hanka',                 role: 'Stratený' },
      { name: 'Ema',                   role: 'Stratený' },
      { name: 'Patrik Pekarovič',      role: 'Stratený' },
      { name: 'Filip',                 role: 'Stratený' },
      { name: 'Ajka',                  role: 'Stratený' },
      { name: 'Mathias',               role: 'Stratený' },
      { name: 'Peter Greňo',           role: 'Stratený' },
      { name: 'Kika Olajošová',        role: 'Stratený' },
      { name: 'Barborka Kridlová',     role: 'Stratený' },
      { name: 'Sofia Dolobačová',      role: 'Stratený' },
      { name: 'Patrik Bača',           role: 'Stratený' },
      { name: 'Janko Falát',           role: 'Stratený' },
      { name: 'Paulínka Katkovčinová', role: 'Stratený' }
    ],
    animatorsNote: '20 animátorov',
    materials: [
      'Baterky – 20 ks',
      'Kostýmy strašiakov – 6 ks',
      'Reproduktor – 1 ks'
    ],
    hasScoring: false,
    scoring: null,
    hasMtzNote: false,
    mtzNote: null
  },

  {
    id: 'stv-skuska',
    name: 'Skúška odvahy',
    dayRef: 'stvrtok',
    timeLabel: 'Nočná',
    timeOfDay: 'night',
    type: 'activity',
    time: '23:00',
    endTime: '00:30',
    location: 'Les + areál',
    description: `
Skúška odvahy pre skupinky – každá skupinka prechádza trasou v tme.
    `,
    vedúciDna: null,
    vedúciProgramu: 'David',
    animators: [
      { name: 'David' }, { name: 'Filip' }, { name: 'Dano Chripák' },
      { name: 'Boris Surničin' }, { name: 'Braňo Kováč' },
      { name: 'Dianka Salanciová' }, { name: 'Kika Ondisková' }
    ],
    animatorsNote: '7 animátorov',
    materials: [
      'Baterky – 8 ks',
      'Rekvizity (strach) – 1 sada'
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
    time: '09:30',
    endTime: '12:00',
    location: 'Ihrisko + okolie',
    description: `
Skupinky sa pripravujú na záverečný boj – maľujú sa, cvičia a budujú tímového ducha.
    `,
    vedúciDna: null,
    vedúciProgramu: 'Patrik Pekarovič',
    animators: [
      { name: 'Patrik Pekarovič',      role: 'NEGÁCIA' },
      { name: 'Janko Katkovčin',       role: 'NEGÁCIA' },
      { name: 'Peter Greňo',           role: 'NEGÁCIA' },
      { name: 'Ondrej Mocák',          role: 'NEGÁCIA' },
      { name: 'Adam Paško',            role: 'NEGÁCIA' },
      { name: 'Barborka Kridlová',     role: 'NEGÁCIA' },
      { name: 'Ema',                   role: 'NEGÁCIA' },
      { name: 'Paulínka Katkovčinová', role: 'NEGÁCIA' },
      { name: 'Sofia Dolobačová',      role: 'NEGÁCIA' }
    ],
    animatorsNote: '15+ animátorov',
    materials: [
      'Rekvizity na vojnu – 1 sada',
      'Farby na tvár – 10 ks'
    ],
    hasScoring: false,
    scoring: null,
    hasMtzNote: false,
    mtzNote: null
  },

  {
    id: 'pia-boj',
    name: 'Záverečný boj',
    dayRef: 'piatok',
    timeLabel: 'Poobedie',
    timeOfDay: 'afternoon',
    type: 'activity',
    time: '14:30',
    endTime: '17:00',
    location: 'Celý areál',
    description: `
Záverečná bitka o Narniu – všetci animátori a účastníci súťažia v tímovej hre.
    `,
    vedúciDna: null,
    vedúciProgramu: null,
    animators: [],
    animatorsNote: 'Všetci animátori',
    materials: [
      'Zástavky tímov – 2 ks',
      'Farebné pásky – 80 ks'
    ],
    hasScoring: true,
    scoring: 'Víťazný tím získa bonusové body pre skupinky.',
    hasMtzNote: false,
    mtzNote: null
  },

  {
    id: 'pia-bal',
    name: 'Bál',
    dayRef: 'piatok',
    timeLabel: 'Večer',
    timeOfDay: 'evening',
    type: 'activity',
    time: '20:00',
    endTime: '23:00',
    location: 'Záhrada / jedáleň',
    description: `
Záverečný bál – tanec, súťaže a oslava konca tábora.
    `,
    vedúciDna: null,
    vedúciProgramu: null,
    animators: [],
    animatorsNote: 'Všetci',
    materials: [
      'Dekorácie – 1 sada',
      'Reproduktor – 1 ks',
      'Sviečky / svetlá – 1 sada'
    ],
    hasScoring: false,
    scoring: null,
    hasMtzNote: false,
    mtzNote: null
  },

  // ── SOBOTA ────────────────────────────────────────────────────────────────

  {
    id: 'sob-stretnutie',
    name: 'Záverečné stretnutie animátorov',
    dayRef: 'sobota',
    timeLabel: 'Doobedu',
    timeOfDay: 'morning',
    type: 'activity',
    time: '10:30',
    endTime: '11:30',
    location: 'Záhrada',
    description: `
Záverečné stretnutie celého animátorského tímu – reflexia tábora, poďakovania.
    `,
    vedúciDna: null,
    vedúciProgramu: 'Čaby',
    animators: [],
    animatorsNote: 'Všetci animátori',
    materials: [],
    hasScoring: false,
    scoring: null,
    hasMtzNote: false,
    mtzNote: null
  }

];
