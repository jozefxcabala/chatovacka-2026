// ─────────────────────────────────────────────────────────────────────────────
// MODLITBY A STRETKÁ
//
// Každá modlitba má:
//   id    — unikátny identifikátor
//   title — názov
//   text  — text modlitby (môže byť multiline template string)
//
// Pre dlhší text modlitby môžeš použiť rovnaký formát ako v activities.js:
//   text: `
//   Prvý odsek modlitby.
//
//   Druhý odsek.
//   `
// ─────────────────────────────────────────────────────────────────────────────

export const prayers = [

  // ── RANNÉ MODLITBY ────────────────────────────────────────────────────────

  {
    id: 'pr-ranna-pon',
    dayRef: 'pondelok',
    title: 'Ranná modlitba — Lucy',
    character: 'Lucy',
    quote: 'Kráľovstvo Narnie nestojí na veľkých hradbách, ale na malých hrdinoch.',
    text: `Na modlitby si majú decká doniesť čo najmenšiu reálnu vec zbalenú z domu (2 minúty). Veci sa porovnajú, kto má najväčšiu vec, vyhráva malú sladkosť.

Podobenstvo o horčičnom zrnku:
Ježiš povedal: „K čomu prirovnáme Božie kráľovstvo a v akom podobenstve ho pripodobníme? Je ako horčičné zrno. Ono, po tom, čo bolo zasiate do zeme, je najmenšie zo všetkých zrniek, ktoré sú na zemi. A po tom, čo bolo zasiate do zeme, vystupuje a stáva sa najväčším zo všetkých rastlín a vyráža veľké konáre, takže je možné, že v jeho tieni prebýva vtáctvo." A v podobenstvách ako tieto rozprával im Ježiš podobenstvá; tak ako boli schopní počúvať. A okrem podobenstiev nerozprával s nimi. Svojim učeníkom však vysvetľoval všetko osamote.

★ Ježiš hovorí v podobenstvách — sú do istej miery pochopiteľné, no zároveň ukrývajú niečo na prvé počutie nepostrehnuteľné
★ Kráľovstvo Nebeského Otca prirovnal k semienku horčičného zrnka, nie k niečomu veľkému, ale k niečomu najmenšiemu
★ Avšak aj nepatrné malé semienko horčice dokáže vyrásť na niečo obrovské — strom
★ Strom vyrastá zo zeme, ktorá je symbolom človeka (hebrejsky sa povie zem = adamach a človek zase adam)
★ Ale nakoniec si v ňom nájdu svoje miesto aj nebeské vtáky, ktoré sú symbolom neba a teda Božieho sveta
★ Každý z nás je pozvaný vyrásť ako horčičné zrnko na strom, ktorý sa stane Božím domovom.

Praktická časť:
★ Použite predmety, ktoré decká priniesli — rozdeľte ich na polovicu + to najmenšie bude v strede
★ Skúste obrazne pomenovať veci na pravej strane, ktoré pomôžu semienku rásť (napr. voda, svetlo, živiny…)
★ A teraz pomenujte veci, ktoré zrnku prekážajú v raste (napr. škodcovia, sucho, kamene…)
★ V krste bol do nás zasiaty Boží život v podobe semienka večného života!
★ A Nebeský Otec túži, aby toto dobré dielo, ktoré v nás začal, aj dokončil.
★ Čo tomuto nebeskému životu v nás pomáha a čo mu naopak bráni rásť? (pomenujte aspoň 3 a 3 veci)
★ Na koniec si ako skupina vyberte 1 vec, čo pomáha a 1 vec, čo v raste zrnku bráni

PS: Inak viete, že celá Narnia vyrástla z jedného malého semienka?!`
  },

  {
    id: 'pr-ranna-uto',
    dayRef: 'utorok',
    title: 'Ranná modlitba — Edmund',
    character: 'Edmund',
    quote: 'Nie všetko, čo sa zdá na prvý pohľad dobré, aj dobré je.',
    text: `Animátor si pripraví niekoľko podobných kariet a jednu rozdielnu (ktorá vyzerá zo zadu úplne rovnako ako ostatné). Všetky karty otočí lícom nadol a rozloží. Každé dieťa si potom potiahne jednu z kariet a vráti ju naspäť.

Podobenstvo o pšenici a burine:
Predniesol im aj iné podobenstvo: „Nebeské kráľovstvo sa podobá človekovi, ktorý zasial na svojej roli dobré semeno. Ale kým ľudia spali, prišiel jeho nepriateľ, prisial medzi pšenicu kúkoľ a odišiel. Keď vyrástlo steblo a vyháňalo do klasu, ukázal sa aj kúkoľ. K hospodárovi prišli sluhovia a povedali mu: ‚Pane, nezasial si na svojej roli dobré semeno? Kde sa teda vzal kúkoľ?' On im vravel: ‚To urobil nepriateľ.' Sluhovia mu povedali: ‚Chceš, aby sme šli a vyzbierali ho?' On odpovedal: ‚Nie, lebo pri zbieraní kúkoľa by ste mohli vytrhnúť aj pšenicu. Nechajte oboje rásť až do žatvy. V čase žatvy poviem žencom: Pozbierajte najprv kúkoľ a poviažte ho do snopov na spálenie, ale pšenicu zhromaždite do mojej stodoly.'"

★ Ježiš hovorí v podobenstvách — sú do istej miery pochopiteľné, no zároveň ukrývajú niečo na prvé počutie nepostrehnuteľné
★ Hospodár predstavuje Otca, ktorý na svet zasieva iba to, čo je dobré
★ Dobré semeno symbolizuje Božie deti — ľudí, ktorí nasledujú pravdu a konajú dobro
★ Nepriateľ predstavuje diabla (zlého), ktorý zámerne seje zlo
★ Burina (kúkoľ) sú zlí ľudia, hriech a všetko to, čo rozdeľuje a ničí
★ Pole predstavuje svet
★ Kým kúkoľ (burina) rastie, je takmer na nerozoznanie od skutočnej pšenice — až keď začne prinášať úrodu, ukáže sa pravda
★ Diabol (nepriateľ) málokedy ponúka zlo tak, aby hneď vyzeralo zle — ponúka ho ako niečo príjemné, lákavé, ako falošné dobro

Praktická časť:
★ Animátor otočí všetky karty lícom nahor, aby sme videli pravdu
★ Všetky podobné karty predstavujú dobro — pšenicu, jedna rozdielna karta predstavuje zlo — kúkoľ
★ Ťahanie karty predstavuje každodenné situácie, keď si vyberáme medzi dobrom a zlom
★ Dobrých kariet je viac — každý deň máme veľa príležitostí vybrať si dobro
★ Všetky karty zozadu vyzerajú rovnako — ani zlo nemusí hneď vyzerať ako zlo
★ Falošné dobro: presne tak ako Edmund v Narnii. Keď stretol Bielu čarodejnicu, neponúkla mu niečo odporné. Ponúkla mu teplý nápoj, trón a hlavne — vynikajúci jantárový turecký med. Vyzeralo to lákavo a dobre, no bol to len háčik, ktorým si ho zotročila.
★ Čo môže byť takým falošným dobrom pre našu skupinku počas dnešného dňa? Pomenujte aspoň 3 veci
★ Zamyslite sa nad tým, ako môžete rozlíšiť, čo je pšenica a čo kúkoľ…`
  },

  {
    id: 'pr-ranna-str',
    dayRef: 'streda',
    title: 'Ranná modlitba — Peter',
    character: 'Peter',
    quote: 'Obklopení dobrom môžeme bojovať proti zlu.',
    text: `Už pri večernej modlitbe môžete povedať deťom, nech si každé prinesie na rannú modlitbu jednu vec, ktorú by nechcelo stratiť, resp. by sa mu jej ťažko vzdávalo.

Na začiatku modlitby môže každý jednou vetou povedať, prečo si doniesol práve túto vec a prečo by sa jej nechcel vzdať.

Podobenstvo o stratenej ovci:
Preto im povedal toto podobenstvo: „Ak má niekto z vás sto oviec a jednu z nich stratí, nenechá tých deväťdesiatdeväť na púšti a nepôjde za tou, čo sa stratila, kým ju nenájde? A keď ju nájde, vezme ju s radosťou na plecia, a len čo príde domov, zvolá priateľov a susedov a povie im: „Radujte sa so mnou, lebo som našiel ovcu, čo sa mi stratila." Hovorím vám: Tak bude aj v nebi väčšia radosť nad jedným hriešnikom, ktorý robí pokánie, ako nad deväťdesiatimi deviatimi spravodlivými, ktorí pokánie nepotrebujú.

★ Ježiš hovorí v podobenstvách — sú do istej miery pochopiteľné, no zároveň ukrývajú niečo na prvé počutie nepostrehnuteľné
★ Ježiš je dobrý pastier
★ Ovca je zviera, ktoré potrebuje okolo seba ďalšie ovce, neustále sa držia pri sebe
★ Ak sa jedna stratí, už sa nevráti naspäť, práve naopak, svojím bečaním ľahko priláka dravé zvieratá
★ Preto musí krok podniknúť pastier, nechať ostatné ovce a ísť hľadať tú jednu
★ Zvyšných 99 oviec drží spolu, sú obklopené dobrom pastiera
★ V stratenej ovci sa ľahko nájdeme aj my, napríklad po hriechu, keď sa príliš ľutujeme alebo nevieme nájsť východisko
★ Vtedy nás prichádza hľadať Otec, cez Ježiša, dáva nám pocítiť svoju lásku, prijatie

Pastier hľadá ovcu, až kým ju nenájde — záleží mu na každom z nás osobitne
Rovnako ako aj my sme hľadali jednu vec, Otec hľadá nás — miluje každého z nás osobitne a nechce o nikoho prísť
Aj počas dnešného dňa budeme mať veľa príležitostí hľadať dobro
Skúsme sa dnes nezamerať len na tú hlavnú skupinu (99 oviec), napr. našich najlepších kamarátov zo skupinky
Nebojme sa nájsť tú ‚1 ovcu' aj v našom okolí, napr. porozprávať sa s niekým, s kým sa v skupinke až tak nebavím

Pomodlite sa spoločne Ž23 — Pán je môj pastier`
  },

  {
    id: 'pr-ranna-stv',
    dayRef: 'stvrtok',
    title: 'Ranná modlitba — Susan',
    character: 'Susan',
    quote: 'Konfrontujme svoju vieru v dennodenných rozhodnutiach: Pre čo sa rozhodnem ja? Lucy sa už rozhodla.',
    text: `Aktivitka na úvod: This or That
Deti si vyberajú čo by radšej… môžete pridať aj vlastné otázky napr. vtipné alebo tak.
Deti sa môžu postaviť do zástupu čelom k animátorovi a ak si vyberú prvú možnosť, urobia krok doľava, a ak druhú, tak doprava. To sa opakuje pri každej otázke. Po každej otázke krátka diskusia prečo sa tak rozhodli.

1. Chodiť všade iba cúvaním ALEBO musieť každých 5 krokov urobiť dramatický kotúľ?
2. Plakať javorový sirup ALEBO sa potiť perlivú kolu?
3. Edmund alebo Peter?
4. Lucy alebo Suzan?
5. Spať na chatke hore alebo dole?
6. Hrať poobede volejbal alebo futbal?
7. Ísť na raňajky prví alebo pustiť pred seba skupinku, ktorá išla stále posledná?
8. Ísť do sprchy večer alebo ráno?
9. Kúpiť si sladkosti v bufete alebo si ich priniesť z domu?
10. Vstať na pesničky od animátorov alebo mať vlastný budík?

Podobenstvo o dvoch staviteľoch — na skale a piesku:
24 A tak každý, kto počúva tieto moje slová a uskutočňuje ich, podobá sa múdremu mužovi, ktorý si postavil dom na skale. 25 Spustil sa dážď, privalili sa vody, strhla sa víchrica a oborili sa na ten dom, ale dom sa nezrútil, lebo mal základy na skale.

26 A každý, kto tieto moje slová počúva, ale ich neuskutočňuje, podobá sa hlúpemu mužovi, ktorý si postavil dom na piesku. 27 Spustil sa dážď, privalili sa vody, strhla sa víchrica, oborili sa na ten dom a dom sa zrútil; zostalo z neho veľké rumovisko.

★ Muži, ktorí sa rozhodujú, kde postavia svoje domy, sú ako my — každý jeden z nás niekoľkokrát na deň robíme rozhodnutia, malé aj väčšie
★ Môžeme sa rozhodnúť pre skalu, ktorá je pevná a stabilná, alebo pre piesok, ktorý zle drží a ľahko sa rozsype
★ Základy domov budú také dobré ako naša voľba
★ Dážď, víchrica predstavujú skúšky v živote, možno ťažké a nepríjemné situácie
★ Na prvý pohľad by mohli oba postavené domy vyzerať pekne a v poriadku, no ich reálny stav sa ukáže až keď príde víchrica
★ Ak sme postavili dom na dobrých základoch, na skale, prežije aj dážď či búrku
★ Ak sme sa rozhodli stavať zle — na piesku — dom sa zrúti
★ Rozhodujeme sa na základe viery a konáme podľa Ježiša alebo podľa hriechu?
★ Vždy máme na výber — ani naše predošlé zlé rozhodnutia neznamenajú, že sa opäť nemôžeme rozhodnúť robiť dobro

Skúsme sa počas dňa zastaviť, keď sa budeme mať rozhodnúť, a najprv sa zamyslime — chcem konať dobro alebo zlo? Vyberám si skalu alebo piesok?`
  },

  {
    id: 'pr-ranna-pia',
    dayRef: 'piatok',
    title: 'Ranná modlitba — Aslan',
    character: 'Aslan',
    quote: 'Máš odvahu zastať sa iných, si pripravený/á priniesť obetu?',
    text: `Modlitba začne spoločným prečítaním kroniky zo štvrtkového dňa.

Po prečítaní kroniky nasleduje krátka aktivitka: **každé dieťa si na papierik napíše jednu vetu**:
- čo preň znamená Aslanova obeta,
- alebo akú obetu ono samo prinieslo pre niekoho druhého.

Potom sa deti rozdelia do skupiniek. Spoločne si prečítajú podobenstvo o dobrom pastierovi a budú hľadať podobnosti medzi Ježišom – Dobrým pastierom – a Aslanom. Na záver napíšu krátky odkaz Ježišovi/Aslanovi na papierik a vložia ho do pripravenej krabičky.

## Podobenstvo o dobrom pastierovi

> Veru, veru, hovorím vám: Kto nevchádza do ovčinca bránou, ale prelieza inokade, je zlodej a zbojník. Kto vchádza bránou, je pastier oviec. Tomu vrátnik otvára a ovce počúvajú jeho hlas. On volá svoje ovce po mene a vyvádza ich. Keď ich všetky vyženie, kráča pred nimi a ovce idú za ním, lebo poznajú jeho hlas. Za cudzím nepôjdu, ba ujdú od neho, lebo cudzí hlas nepoznajú.

> Ježiš im to povedal takto obrazne, ale oni nepochopili, čo im to chcel povedať. Preto im Ježiš znova vravel:

> **„Ja som brána k ovciam... Ja som dobrý pastier. Dobrý pastier položí svoj život za ovce. Ja poznám svoje a moje poznajú mňa... Aj svoj život položím za ovce... Nik mi ho neberie, ja ho dávam sám od seba. Mám moc dať ho a mám moc zasa si ho vziať.“**

_(Jn 10, 1 – 18)_

## Čo nám chce Ježiš povedať?

★ Ježiš používa obraz pastiera, ktorému na jeho ovciach skutočne záleží.
★ Dobrý pastier nie je nájomník – nájomník uteká pri prvom nebezpečenstve, ale pastier zostáva.
★ Dobrý pastier pozná svoje ovce po mene a ovce poznajú jeho hlas.
★ Dobrý pastier dobrovoľne položí svoj život za svoje ovce.
★ Presne tak sa aj Aslan slobodne rozhodol zomrieť namiesto Edmunda – z lásky, nie z donútenia.
★ Smrť však nemala posledné slovo. Tak ako Ježiš vstal z mŕtvych, aj Aslan sa vracia späť k životu.
★ Ježiš aj Aslan ukazujú, že skutočná láska je ochotná obetovať sa pre druhých.

## Otázky do skupiniek

### O podobenstve

★ Čím sa dobrý pastier odlišuje od nájomníka?
★ Prečo podľa vás Ježiš prirovnal ľudí práve k ovciam?
★ Čo znamená, že ovce poznajú hlas svojho pastiera?
★ Prečo pastier volá svoje ovce po mene? Čo nám to hovorí o Bohu?

### Aslan a Ježiš

★ Aké podobnosti vidíte medzi Aslanom a dobrým pastierom?
★ Akú obetu priniesli obaja?
★ Musel sa Aslan obetovať? Musel Ježiš zomrieť? Čo nám ich slobodné rozhodnutie hovorí o láske?
`
  },

  {
    id: 'pr-ranna-sob',
    dayRef: 'sobota',
    title: 'Ranná modlitba — Narnia a svet doma',
    character: 'Narnia a svet doma',
    quote: 'Veci sa nikdy nedejú rovnakým spôsobom dvakrát!',
    text: `Animátor dá v skupinke kolovať nejaký predmet a každý povie svoj highlight chatovačky alebo niečo, čo si z tohto tábora odnáša – to svoje ovocie.

## Podobenstvo o neúrodnom figovníku

> A povedal toto podobenstvo: „Ktosi mal vo vinici zasadený figovník a prišiel hľadať na ňom ovocie, ale nenašiel. Preto povedal vinohradníkovi: ‚Pozri, už tri roky chodím hľadať ovocie na tomto figovníku, a nič nenachádzam. Vytni ho! Načo ešte aj zem vyčerpáva?‘ On mu odvetil: ‚Pane, nechaj ho ešte tento rok. Okopem ho a pohnojím. Možno nabudúce prinesie ovocie. Ak nie, potom ho vytneš.‘“

## Čo nám chce Ježiš povedať?

★ Ježiš hovorí v podobenstvách – sú do istej miery pochopiteľné, no zároveň ukrývajú niečo na prvé počutie nepostrehnuteľné.
★ Majiteľ vinice by strom hneď vyťal, no vinohradník (Ježiš) mu ešte dáva šancu.
★ Každý deň máme nové príležitosti priniesť dobré ovocie.
★ Ježiš od nás chce premenu – chce nás okopať a pohnojiť.
★ Zároveň má s nami trpezlivosť, nechce od nás hneď dokonalosť.

## Narnia a svet doma

★ Aj nás na tomto tábore Ježiš „okopával a hnojil" – dal nám šancu premeniť sa cez modlitby, hry, animátorov, spoločenstvo, dej tábora…
★ Tábor končí a vieme, že sa už nezopakuje – aj Aslan povedal: „Veci sa nikdy nedejú rovnakým spôsobom dvakrát.“
★ Súrodenci v Narnii vyrástli a museli čeliť novým výzvam.
★ Aj my sa teraz vraciame domov premenení, plní pekných zážitkov a momentov.
★ Sme pozvaní preniesť si Narniu a všetko dobré, čo sme na tomto tábore zažili, aj do nášho každodenného života po návrate domov.
★ Môže to nejaký čas trvať, no vieme, že Ježiš bude mať s nami trpezlivosť rovnako ako s neúrodným figovníkom.

## Výzva

Skúsme si premyslieť 1 konkrétnu vec, ktorú by sme po návrate domov chceli robiť inak (napr. viac pomáhať doma, nájsť si čas na pravidelnú modlitbu…).
`
  },

  // ── VEČERNÉ MODLITBY ──────────────────────────────────────────────────────

  {
    id: 'pr-vecerna-pon',
    dayRef: 'pondelok',
    title: 'Večerná modlitba – ĎOPka v skupinkách',
    text: `ĎOP = Ďakujem, Odprosujem/Odpúšťam, Prosím.

Pomôcky: skupinková krabička, papieriky, perá.

Poznámka: Papieriky sa nevynášajú – sú dobrovoľné a súkromné, môžu sa použiť ako obetný dar.

Deti si môžu napísať na lístok:
• Ďakujem – za čo som vďačný počas dňa
• Odprosujem – čo ma mrzí, čo som pokazil
• Odpúšťam – komu chcem odpustiť
• Prosím – za čo alebo za koho chcem prosiť

Môžu povedať to, čo napísali, alebo to hodia do krabičky na ĎOPku.`
  },

  {
    id: 'pr-vecerna-uto',
    dayRef: 'utorok',
    title: 'Večerná modlitba – ĎOPka v skupinkách',
    text: `ĎOP = Ďakujem, Odprosujem/Odpúšťam, Prosím.

Pomôcky: skupinková krabička, papieriky, perá.

Poznámka: Papieriky sa nevynášajú – sú dobrovoľné a súkromné, môžu sa použiť ako obetný dar.

Deti si môžu napísať na lístok:
• Ďakujem – za čo som vďačný počas dňa
• Odprosujem – čo ma mrzí, čo som pokazil
• Odpúšťam – komu chcem odpustiť
• Prosím – za čo alebo za koho chcem prosiť

Môžu povedať to, čo napísali, alebo to hodia do krabičky na ĎOPku.`
  }
];
