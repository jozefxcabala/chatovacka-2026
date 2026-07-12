// ─────────────────────────────────────────────────────────────────────────────
// SCÉNKY TÁBORA
//
// Každá scénka má:
//   id      — unikátny identifikátor
//   dayRef  — ID dňa (z days.js)
//   title   — názov scénky (zobrazuje sa v harmonograme aj v sekcii Scénky)
//   text    — plný text scénky (formatTextToHtml formát)
// ─────────────────────────────────────────────────────────────────────────────

export const scenes = [

  // ── PONDELOK ──────────────────────────────────────────────────────────────

  {
    id: 'sc-pon-1',
    dayRef: 'pondelok',
    title: 'Scénka 1 – Príchod k profesorovi',
    text: `_Pred autobusmi, prichádzame spolu s deťmi_

**LUCY:** _(nadšene sa obzerá)_ „Pozrite sa! Aký veľký dom! A aká krásna príroda okolo!"

**EDMUND:** _(nahnevane)_ „Krásne? Veď tu nič nie je. Ani zábava, ani mesto."

**SUSAN:** „Aspoň sme v bezpečí. V Londýne by sme teraz určite nechceli byť."

**PETER:** „Musíme to tu zvládnuť. Nebudeme tu navždy."

_(Príde profesor.)_

**PROFESOR:** „Vitajte v mojom dome. Volám sa profesor Kirke. Dúfam, že sa tu budete cítiť dobre."

**LUCY:** „Ďakujeme, pán profesor."

**PROFESOR:** „Dom je starý a je v ňom veľa izieb. Môžete ich preskúmať, ale dávajte pozor na starožitnosti. Niektoré sú staršie ako vy všetci dokopy."

_(Deti sa zasmejú. Profesor odíde.)_

**EDMUND:** „No výborne. Starý dom, staré obrazy, starý profesor... Toto budú najnudnejšie prázdniny."

**LUCY:** „Možno nás tu čaká nejaké dobrodružstvo."

**EDMUND:** „Jasné... určite."`
  },

  {
    id: 'sc-pon-2',
    dayRef: 'pondelok',
    title: 'Scénka 2 – Schovávačka',
    text: `_Pred schovávačkou — deti sa prechádzajú po dome_

**SUSAN:** „Ten dom je obrovský. Myslím, že ani nepoznáme všetky izby."

**LUCY:** „Poďme ich preskúmať!"

**EDMUND:** „To je nuda."

**PETER:** „Tak navrhni niečo lepšie."

**LUCY:** „Poďme sa hrať na schovávačku! V takomto dome to bude perfektné!"

_(Všetci súhlasia.)_

**PETER:** „Dobre. Ja budem prvý hľadať. Počítam do dvadsať!"

_(Začne počítať. Ostatní sa rozutekajú. Lucy beží, až dôjde ku skrini.)_

**LUCY:** „Sem nie... tu ma nájdu..."

**LUCY:** „Takúto skriňu som ešte nikdy nevidela. Skúsim sa schovať sem."

_(Vojde dnu. Najprv sa smeje.)_

**LUCY:** „Aké mäkké kabáty..."

_(Kráča ďalej. Potom prestane.)_

**LUCY:** „Počkať... Tá skriňa je nejako veľmi hlboká..."

_(Dotkne sa vetvičiek.)_

**LUCY:** „To nie sú kabáty..."`
  },

  {
    id: 'sc-pon-3',
    dayRef: 'pondelok',
    title: 'Scénka 3 – Lucy objaví Narniu',
    text: `_Po schovávačke — pred večerou_
_Lucy pomaly vyjde zo skrine._

**LUCY:** „To nie je možné... Veď som bola v skrini!"

_(Poobzerá sa.)_

**LUCY:** „Stromy... sneh... lampa... Kde to som?"

_(Príde bližšie k lampe.)_

**LUCY:** „Toto nie je profesorov dom. Som úplne niekde inde."

_(Zrazu začuje zvonček. Spoza stromu/rohu vyjde pán Tumnus. Obaja sa zľaknú.)_

**LUCY:** „Jéj!"

**TUMNUS:** „Ach! Človek!"

**LUCY:** „Prepáčte... Nechcela som vás vyľakať."

**TUMNUS:** „To ja som sa zľakol. Ty si človek?"

**LUCY:** „Áno. Volám sa Lucy."

**TUMNUS:** „Ja som pán Tumnus."

_(Lucy pozerá na jeho nohy.)_

**LUCY:** „Ty máš kozie nohy!"

**TUMNUS:** _(zasmeje sa)_ „Som satyr."`
  },

  {
    id: 'sc-pon-4',
    dayRef: 'pondelok',
    title: 'Scénka 4 – Tumnus rozpráva o Narnii',
    text: `_Pred večerným programom_

**TUMNUS:** „Lucy, vitaj v Narnii."

**LUCY:** „Tak toto je Narnia? Je nádherná."

_(Tumnus zosmutnie.)_

**LUCY:** „Čo sa deje?"

**TUMNUS:** „Nie vždy bola takáto. Kedysi tu bola jar, leto, kvitli kvety a zvieratá sa radovali."

**LUCY:** „A čo sa stalo?"

**TUMNUS:** „Vládne tu Biela čarodejnica. Je veľmi mocná a veľmi zlá."

**LUCY:** „Čo robí?"

**TUMNUS:** „Svojou mágiou spôsobila, že je tu stále zima. Nikdy nepríde jar ani Vianoce."

**LUCY:** „To musí byť strašné."

**TUMNUS:** „Všetci sa jej boja. Kto ju neposlúchne, toho potrestá."

**LUCY:** „Ja som sem prišla náhodou. Nechcem mať problémy."

**TUMNUS:** „Neboj sa. Poď ku mne domov. Oddýchneš si a potom ti ukážem cestu späť."`
  },

  {
    id: 'sc-pon-5',
    dayRef: 'pondelok',
    title: 'Scénka 5 – Tumnus prizná pravdu',
    text: `_Po večernom programe — pred nočnou hrou_
_Sedia pri stole._

**LUCY:** „Ďakujem za čaj. Si veľmi milý."

**LUCY:** „Prečo si taký tichý?"

**TUMNUS:** „Lucy... musím ti povedať pravdu."

**LUCY:** „Akú pravdu?"

**TUMNUS:** „Biela čarodejnica prikázala všetkým, že ak nájdeme človeka, musíme ho priviesť k nej."

**LUCY:** „Tak preto si ma pozval?"

_(Tumnus skloní hlavu.)_

**TUMNUS:** „Najprv áno. Bál som sa čarodejnice."

_(Lucy zosmutnie.)_

**TUMNUS:** „Ale keď som ťa spoznal, pochopil som, že si dobrá. Nemôžem ťa zradiť."

**LUCY:** „Ďakujem."

_(Tumnus sa pozrie von.)_

**TUMNUS:** „Musíš okamžite utekať! Ak sa vojaci čarodejnice dozvedia, že si tu, nájdu ťa."

**LUCY:** „A čo ty?"

**TUMNUS:** „O mňa sa nestaraj. Choď ku skrini! Ja ich zdržím!"

_(Tu začína nočná hra.)_`
  },

  {
    id: 'sc-pon-6',
    dayRef: 'pondelok',
    title: 'Scénka 6 – Návrat domov',
    text: `_Po nočnom programe_
_Lucy vybehne zo skrine. Peter stále počíta._

**PETER:** „...osemnásť, devätnásť, dvadsať! Idem vás hľadať!"

_(Lucy nechápavo pozerá.)_

**LUCY:** „Čo? Veď ja som bola preč celé hodiny!"

_(Prídu ostatní.)_

**SUSAN:** „Lucy, kde si bola?"

**LUCY:** „V Narnii! Za touto skriňou je úplne iný svet!"

**EDMUND:** „Ty si bola schovaná asi minútu."

**LUCY:** „Nie! Rozprávala som sa so satyrom. Volal sa pán Tumnus. Hovoril mi o zlej Bielej čarodejnici a o tom, že v Narnii je večná zima."

**SUSAN:** „Lucy... asi sa ti to snívalo."

**LUCY:** „Nie! Prisahám, že je to pravda."

**PETER:** „Možno si si to len predstavovala."

_(Lucy sa pozrie na skriňu.)_

**LUCY:** _(potichu)_ „Ja viem, že Narnia existuje."`
  },

  // ── UTOROK ────────────────────────────────────────────────────────────────

  {
    id: 'sc-uto-1',
    dayRef: 'utorok',
    title: 'Scénka 1 – Hádka pred raňajkami',
    text: `_Pred jedálňou, pred raňajkami_
_Postavy: Peter, Edmund, Susan, Lucy_

_(Prídu na scénu, hádajú sa.)_

**LUCY:** „Ale ja som tam naozaj bola! Skryla som sa v tej starej veľkej skrini a objavila som tam úplne inú krajinu!"

**EDMUND:** _(posmešne)_ „To si si určite celé vymyslela. Veď to nie je možné, aby v skrini bol iný svet."

**LUCY:** „Nevymyslela! Je skutočný a volá sa Narnia!"

**SUSAN:** „A to vieš zase odkiaľ?"

**LUCY:** „Povedal mi to jeden faun — pán Tumnus."

**EDMUND:** „Hej jasné, pán Tumnus. A Janka s Marienkou si tam náhodou nestretla niekde?" _(Začne sa smiať.)_

**PETER:** „Lucy, naozaj by si už mala prestať s tými rozprávkami, začína ma z nich bolieť hlava..."

**LUCY:** _(hnevá sa)_ „Ale veď vám vravím celý čas, že to je skutočné. Nie sú to rozprávky!"

**SUSAN:** _(príde k Lucy)_ „Lucy, ja viem, že to je pre teba ťažké, že sme museli odísť z domu sem, ale tým, že si budeš vymýšľať, tomu nepomôžeš."

**EDMUND:** „Poďme sa radšej najesť. Z tých jej drístov mi už úplne vyhladlo."

_(Odchádzajú preč.)_

**LUCY:** _(nahnevane)_ „Veď vy zistíte, že vám neklamem..."

_(Odchádza preč.)_`
  },

  {
    id: 'sc-uto-2',
    dayRef: 'utorok',
    title: 'Scénka 2 – Edmund vchádza do Narnie',
    text: `_Pred doobedným programom_
_Postavy: Lucy, Edmund, Trpaslíčka, delegáti_

_(Lucy vchádza na scénu, Edmunda ešte nevidno.)_

**LUCY:** „Mám pocit, že tam musím ísť zase. Niečo ma tam ťahá. Možno mi nakoniec aj súrodenci uveria, že im neklamem."

_(Vchádza do skrine. Zmení sa scéna — sme v Narnii.)_

**LUCY:** _(šťastne)_ „Wau. Je to rovnako očarujúce ako včera. Kto vie, koho tu dnes stretnem."

_(Odchádza. Zmena scény naspäť.)_

**EDMUND:** _(posmešne)_ „Hej, jasné ty si bola v Narnii lol. Šak ťa tu teraz počkám a hneď uvidíš. Klamárka jedna."

_(Čaká chvíľu.)_

**EDMUND:** „No čo tam robí tak dlho. Idem ju hľadať a potom ju pekne vysmejem."

_(Vchádza do skrine. Zmena scény — Narnia s hudbou.)_

**EDMUND:** _(postupne vychádza)_ „Lucy? Lucia? Kde si? ... WAU! No toto neni možné. Ona fakt neklamala. Nádhera."

_(Edmund sa obzerá. Delegácia vchádza na scénu.)_

**DELEGÁT 1:** „Aha aha! To čo je za čudo? Také som tu ešte nevidel."

**TRPASLÍČKA:** „Ale veď to môže byť... Syn Adamov... Poďme za ním!"

_(Delegácia prichádza k nemu. Trpaslíčka poklepe Edmunda po ramene.)_

**TRPASLÍČKA:** „Nie si ty náhodou syn Adamov?"

**EDMUND:** „Akože či som človek? Lebo to som, ale kto ste vy?"

**TRPASLÍČKA:** _(vážne, dôležito)_ „My sme delegácia od veľaváženej Bielej Čarodejnice! Veľmi nás teší, že ťa stretávame. Naša pani vás už dlho očakávala. Ako sa voláš?"

**EDMUND:** „Edmund... Kto je Biela Čarodejnica?"

**DELEGÁT 2:** „To je predsa vládkyňa tejto krajiny! Je veľmi mocná a dokáže všetko!"

**EDMUND:** „Akože všetko?"

**DELEGÁT 2:** „Pozeraj! Posiela ti dar." _(Vyberá krabicu.)_ „Čo by si si prial?"

**EDMUND:** „Hmmmm. Napríklad cukríky."

**TRPASLÍČKA:** _(vytiahne cukríky)_ „Nech sa páči!" _(Podáva ich Edmundovi.)_

**EDMUND:** „Wau! A čo tak niečo na pitie?"

**TRPASLÍČKA:** _(vytiahne niečo na pitie)_ „Nech sa páči!"

**EDMUND:** „Tykokos! A čokoláda by tam nebola?"

**TRPASLÍČKA:** _(tak trochu nahnevane)_ „Nebola! Teda... bola, ale najprv mi musíš odpovedať na pár otázok... Si tu sám?"

**EDMUND:** „Noooo... nie som... Prišiel som sem za mojou sestrou Lucy."

**DELEGÁT 1:** „A ešte máš nejakých súrodencov?"

**EDMUND:** „Áno, Susan a Petra, ale tí tu nie sú. Môžem už konečne tú čokoládu?"

**TRPASLÍČKA:** _(vyberá čokoládu)_ „Ale Biela Čarodejnica má na svojom zámku miestnosť plnú sladkostí. Pozýva teba aj tvojich súrodencov. Z teba urobí princa!"

**EDMUND:** „To naozaj? Ale len zo mňa, že? Z ostatných dúfam nie!"

**TRPASLÍČKA:** „Samozrejme, len z teba. Ale musíš ich priviesť všetkých."

**EDMUND:** _(váhavo)_ „No, dobre, tak ja ich privediem."

**TRPASLÍČKA:** „Aby si si to nerozmyslel, poď s nami na kráľovnin dvor. Ukážeme ti, aký úžasný život ťa čaká!"

**EDMUND:** „To naozaj? Tak to poďme čím skôr!"

_(Odchádzajú preč.)_`
  },

  {
    id: 'sc-uto-3',
    dayRef: 'utorok',
    title: 'Scénka 3 – Edmund vs. Lucy',
    text: `_Po programe, pred obedom_
_Postavy: Lucy, Edmund, Susan, Peter_

_(Edmund sa prechádza.)_

**EDMUND:** „No to bolo úžasné úplne. Nikdy som nič také nezažil. Už sa neviem dočkať kedy budem princ! Len ako tu dostanem ostatných?"

_(Lucy vchádza na scénu.)_

**LUCY:** „Edmund? Čo tu robíš?"

**EDMUND:** „Nooooo... len sa prechádzam... A čo je teba do toho vlastne?"

**LUCY:** „Takže už mi veríš, že Narnia existuje! Poď, musíme to povedať ostatným!"

_(Začnú utekať ku skrini, vojdú. Zmena scény naspäť na Anglicko. Vyjdú von. Prichádzajú Peter a Susan.)_

**LUCY:** „Už mi budete veriť! Narnia existuje! Edmund tam bol teraz so mnou!"

**EDMUND:** „No ja vôbec netuším o čom ona točí..."

**LUCY:** „ČOŽE? Edmund, čo to robíš, veď si tam bol so mnou?!"

**EDMUND:** „Joj hej, nikde som nebol, čo trepeš."

_(Peter a Susan sú zmätení.)_

**SUSAN:** „Jeden z vás si musí vymýšľať. Kto z vás hovorí pravdu?"

**EDMUND a LUCY:** „JA!"

**EDMUND:** „Už dva dni si vymýšľa Lucy, veď ste ju počuli včera!"

**LUCY:** „NIE!!! To Edmund klame!"

**PETER:** „Ako teraz zistíme, kto z vás má pravdu?"

**SUSAN:** „To budeme musieť nejak rozsúdiť..."

_(Odchádzajú.)_`
  },

  {
    id: 'sc-uto-4',
    dayRef: 'utorok',
    title: 'Scénka 4 – Lucy neprestáva',
    text: `_Pred večerou_
_Postavy: Lucy, Edmund, Peter, Susan_

_(Všetci prichádzajú na scénu spolu.)_

**LUCY:** „No taaak. Ale veď už by ste mi mohli veriť..."

**PETER:** „No ja neviem, mne sa to stále nejak nezdá."

**SUSAN:** „Mne tiež nie."

**LUCY:** „A ty by si už tiež mohol priznať pravdu, Edmund."

**EDMUND:** „Nooo... Tak..."

**SUSAN:** „TAK???"

**EDMUND:** _(zamrmle)_ „Tak... má pravdu no..."

**PETER:** „Čo si to povedal? Zopakuj to hlasnejšie."

**EDMUND:** „Vraví pravdu..."

**PETER:** „To myslíš vážne?"

**SUSAN:** „Robíš si z nás aj ty srandu?"

**LUCY:** „Nie, nerobí! Povedz im to!"

**EDMUND:** _(zahanbene)_ „Bol som tam s ňou. Hovorila pravdu."

_(Peter a Susan sú zmätení.)_

**PETER & SUSAN:** „Čože?"

**LUCY:** „Môžeme tam ísť všetci spolu!"

**PETER:** „Tak keď s tým toľko nechceš prestať a už ti verí aj Edmund... Mohli by sme sa na to pozrieť..."

**LUCY:** „Áno!"

**SUSAN:** „Ale až po večeri! Nepôjdeme tam predsa hladní..." _(ticho)_ „...ak to vôbec existuje."`
  },

  {
    id: 'sc-uto-5',
    dayRef: 'utorok',
    title: 'Scénka 5 – Všetci vchádzame do Narnie',
    text: `_Pred večerným programom_
_Postavy: Lucy, Edmund, Peter, Susan_

_(Všetci prichádzajú na scénu spolu.)_

**LUCY:** „No poďte poďte."

**SUSAN:** „No šak veď ideme no."

**EDMUND:** „Keď už musíme..." _(Prekrúca očami.)_

**PETER:** „To je tá skriňa?"

**LUCY:** „Áno, bude sa vám to páčiť."

**PETER:** _(príde ku skrini a otvorí ju)_ „Veď tu sú len nejaké staré kabáty."

**LUCY:** „Dôležité je to, čo je za nimi." _(Vchádza dnu. Ostatní tiež, váhavo.)_

**SUSAN:** „Zázrak!"

**PETER:** „To nie je možné."

**LUCY:** „Ja som vám to hovorila!"

**PETER:** „Prepáč Lucy, že sme ti neverili."

**SUSAN:** „Áno, je nám to ľúto."

**LUCY:** „Odpustím vám, ale len keď so mnou pôjdete navštíviť pána Tumnusa." _(S úsmevom.)_

**SUSAN:** „Tak poďme!"

_(Odídu a vrátia sa späť — všade je neporiadok, Tumnus zmizol.)_

**EDMUND:** „Všade je neporiadok..."

**LUCY:** „Čo sa to tu stalo? A kde je pán Tumnus?"

**PETER:** „Nemohol len tak zmiznúť. Vyzerá to tak, že sa mu stalo niečo zlé..."

**LUCY:** „Musíme ho nájsť a pomôcť mu!"

**SUSAN:** _(otočí sa na deti)_ „Ale sami to nezvládneme. Potrebujeme vašu pomoc. Pridáte sa k nám?"`
  },

  {
    id: 'sc-uto-6',
    dayRef: 'utorok',
    title: 'Scénka 6 – Proroctvo',
    text: `_Po večernom programe_
_Postavy: Lucy, Edmund, Peter, Susan, Bobrovci_

**PETER:** _(deťom)_ „Našli ste niečo? Prineste to sem."

_(Deti prinesú dôkazy.)_

**LUCY:** „Všetky tieto veci naznačujú, že ho niekto uniesol! Nejakí vlci!"

**SUSAN:** _(drží zatykač)_ „Áno, tu sa o tom píše."

_(Prečíta zatykač.)_

**EDMUND:** „Čo budeme teraz robiť?"

**LUCY:** „Poďme ho hľadať!"

**PETER:** „Ale kam? Je to tu obrovské a nikto z nás to nepozná..."

_(Pribehne Bobor a Bobrová.)_

**BOBOR:** „Nikoho hľadať nepôjdete. Ste vo veľkom nebezpečenstve! Musíte ísť so mnou!"

**PETER:** „A ty si kto? Nepôjdeme len tak s tebou, keď ťa nepoznáme."

**BOBOR:** „Ja som bobor a toto je moja manželka. Musíte nám veriť, inak Biela Čarodejnica unesie aj vás! Musíte sa ísť schovať k nám domov."

**EDMUND:** „Ale prečo by nás chcela Biela Čarodejnica uniesť?"

**BOBROVÁ:** „Vy ste o tom nepočuli?"

**SUSAN:** „O čom?"

**BOBROVÁ:** „O proroctve."

**PETER:** „Proroctve?"

**BOBOR:** „Áno. Proroctvo o Aslanovi."

**LUCY:** „Kto je Aslan?"

**BOBROVÁ:** „To je vládca celej tejto krajiny. Kráľ. Proste boss. Najvyšší šéf. Bol dlho preč, ale vrátil sa. Čaká na vás pri kamennom stole!"

**BOBOR:** „A proroctvo o ňom znie: _až v Cair Paravel na trón znova, usadne zas krv Adamova, nastane dobrá vláda nová._"

**LUCY:** „To čo znamená?"

**BOBROVÁ:** „Kedysi dávno bolo predpovedané, že dvaja synovia Adamovi a dve dcéry Evine porazia Bielu Čarodejnicu a prinesú Narnii mier!"

**PETER:** „A to máme byť akože my? Máme ísť do vojny?"

**BOBOR:** „Kto iný ako vy! Veď tu nikdy žiadny iný človek nebol!"

**EDMUND:** „Mne sa to celé nejak nezdá."

**BOBROVÁ:** „O tom sa porozprávame u nás. Musíme vás odviesť, aby vás Biela Čarodejnica nedostala skôr, ako sa nad tým proroctvom stihnete zamyslieť!"

**SUSAN:** „Tak, čo myslíte? Ideme?"

**PETER:** „Vyzerá to, že nám chcú naozaj pomôcť."

**LUCY:** „Tak teda poďme."

_(Všetci odchádzajú zo scény.)_`
  },

  // ── STREDA ────────────────────────────────────────────────────────────────

  {
    id: 'sc-str-1',
    dayRef: 'streda',
    title: 'Scénka 1 – Útek pred vlkmi',
    text: `_Pred doobedným programom_
_Postavy: Peter, Susan, Lucy, Bobor, Bobrová_
_Nálada: Bobrovci a Lucy sú happy a nahypení, Peter a Susan zamyslení, nervózne sa prechádzajú._

**SUSAN:** „Akosi sa mi to proroctvo nezdá. Podľa mňa je to príliš nebezpečné. A čo keď je to len povera... rozprávka pre deti."

**LUCY:** „Ale čo keď je to skutočné a iba my môžeme zachrániť Narniu?"

**PETER:** „Nie Lucy, Susan má pravdu. Poď. Edmund, ideme." _(ticho, obzerajú sa okolo seba)_ „Edmund?" _(vyľakane)_ „Kde je? Musíme ho nájsť!"

**BOBROVÁ:** „Rýchlo, nech ho nechytí Biela Čarodejnica!"

_(Začnú zavýjať vlci.)_

**BOBOR:** „Je neskoro. Musíme sa dostať do bezpečia — poďte tadiaľto!"`
  },

  {
    id: 'sc-str-2',
    dayRef: 'streda',
    title: 'Scénka 2 – Aslanov tábor',
    text: `_Po programe, pred obedom_
_Postavy: Peter, Lucy, Susan, Vedúci tábora (kentaur)_
_Atmosféra: víťazná, jar sa vracia_

**PETER:** „Dokázali sme to. To musí byť Aslanov tábor."

**LUCY:** „Je tu krásne."

**SUSAN:** „A pozrite — aj sneh sa topí."

_(Prichádza vedúci tábora.)_

**VEDÚCI:** „Keď sa vracia Aslan, vracia sa aj jar. Vitajte, králi a kráľovné Narnie. Aslan ma poveril, aby som dohliadal na tábor a bol vám nápomocný. Priniesli ste nám nádej... Počkať, kde je váš brat?"

**LUCY:** „Edmunda zavrela do žalára Biela Čarodejnica."

**PETER:** „Urobíme čo bude v našich silách, aby sme ho našli a zachránili Narniu."

**SUSAN:** „Presne tak, porazíme Bielu Čarodejnicu."

**PETER:** „Je pred nami ešte veľký boj. Ale nebojte sa — nie sme v ňom sami. Verím, že všetko dobre dopadne."

_(Peter ich chytí za ramená. Všetci prikývnu.)_`
  },

  {
    id: 'sc-str-3',
    dayRef: 'streda',
    title: 'Scénka 3 – Príprava na duchovný boj',
    text: `_Pred poobedným programom_
_Postavy: Peter, Susan, Lucy, Aslan (iba hlas)_

_(Peter sedí zúfalý. Prichádza k nemu Susan.)_

**SUSAN:** „Peter, čo sa deje?"

**PETER:** „Myslíš, že sme pripravení? Či máme dosť zbraní? Trénovali sme dosť... neviem čo ďalej."

**LUCY:** „Opýtajme sa predsa jeho."

**SUSAN & PETER:** „Ty myslíš Aslana?"

**LUCY:** „Áno, veď je vždy pri nás."

_(Môžu si kľaknúť a zatvoriť oči. Ozve sa hlas.)_

**ASLAN:** _(hlas)_ „Pamätáte si dary, ktoré ste dostali? Majte ich vždy pri sebe. Každý z nich vám môže pomôcť v správnej chvíli. Odvaha neznamená nemať strach. Znamená to konať správne aj napriek tomu. Nevzdávajte sa — a pamätajte: dobro je silnejšie než zlo."`
  },

  {
    id: 'sc-str-4',
    dayRef: 'streda',
    title: 'Scénka 4 – Vlci v tábore',
    text: `_Pred večernou hrou_
_Postavy: Peter, Susan, Lucy, Vedúci_

_(Peter a Susan hrajú karty, Lucy sa pri nich hrá. K nim vbehne vedúci.)_

**VEDÚCI:** „Vlci. Hliadka uvidela vlkov."

**PETER:** _(rýchlo sa postaví)_ „Kde?"

**VEDÚCI:** „Obliehajú celý tábor."

_(Vstanú aj ostatní a idú sa rozhliadnuť.)_

**SUSAN:** „Zvláštne, prečo tu rovno nevtrhnú? Vyzerajú akoby... akoby..."

**LUCY:** „Akoby niečo chránili."

**SUSAN:** „Čo ak je to Edmund?"

**PETER:** „Musíme to zistiť."`
  },

  {
    id: 'sc-str-5',
    dayRef: 'streda',
    title: 'Scénka 5 – Peter premôže vlka',
    text: `_Počas večernej hry_
_Postavy: Peter, Lucy, Susan, Vlk 1, Vlk 2_

_(Lucy a Susan sa oddelia a idú samy spolu.)_

**LUCY:** „Myslíš, že už Edmunda nájdeme?"

**SUSAN:** „Verím, že áno, Lucy."

_(Niečo zašuští.)_

**LUCY:** „Počula si to?"

**SUSAN:** „Asi to bol iba vietor, no drž sa pri mne."

_(Ukážu sa vlci a pomaly ich obkľučujú.)_

**VLK 1:** _(posmešne)_ „Heej, to bol iba vetrík, nenechajte sa rušiť. Hahaha."

**VLK 2:** „My iba prechádzame okolo, niekoho hľadáme."

**VLK 1:** _(škodoradostne)_ „Dve dcéry Evine. Nevideli ste ich náhodou? Máme pre ne prekvapko."

_(Vlk skočí na dievčatá. Víťazoslávne dobehne Peter, zneskodní jedného vlka. Druhý sa zlakne a utečie.)_

**LUCY:** „Ty si nás zachránil!"

**SUSAN:** „Peter. Si v poriadku? Nič sa ti nestalo?"

**PETER:** „Neboj sa. Len škrabnutie."

**LUCY:** „Pozrite, niečo mu vypadlo. Myslíte, že by nás to mohlo priviesť k Edmundovi?"

**SUSAN:** „Áno, vyzerá to ako mapa."

**PETER:** „Nestrácajme čas. Aslan mal pravdu — odvaha je najlepšia zbraň. Poďme!"`
  },

  {
    id: 'sc-str-6',
    dayRef: 'streda',
    title: 'Scénka 6 – Nájdenie Edmunda',
    text: `_Keď sa nájde Edmund_
_Postavy: Lucy, Peter, Edmund, Susan_

**LUCY:** „Edmund!"

_(Všetci sa môžu objať.)_

**EDMUND:** „Vy... vy ste prišli. Myslel som, že už sa po mňa nevrátite."

**SUSAN:** „Čo si to urobil? Vieš, ako sme sa o teba báli?"

**PETER:** „Prečo si len tak utiekol? Súrodenci toto nerobia. Musíme držať vždy spolu."

**EDMUND:** „Nechcel som vás sklamať. Myslel som, že robím správnu vec. Mýlil som sa."

**LUCY:** „Hlavné je, že sme zase všetci spolu."

_(Peter sa stále trochu divne pozerá na Edmunda.)_`
  },

  {
    id: 'sc-str-7',
    dayRef: 'streda',
    title: 'Scénka 7 – Edmund prosí o odpustenie',
    text: `_Pred spaním_
_Postavy: Peter, Edmund_

_(Peter sedí sám, vyčerpaný po boji. Príde k nemu nesmelo Edmund.)_

**EDMUND:** „Peter... Chcem sa ti ospravedlniť. Zradil som vás. Myslel som iba na seba. Prosím, odpusť mi."

_(Chvíľa ticha.)_

**PETER:** „Ako si mohol byť taký sebecký?"

**EDMUND:** „Ona... ona mi dala cukríky a sľúbila mi ich ešte viac."

**PETER:** „No to je úžasné. Zapredať súrodencov za pár karameliek."

**EDMUND:** „Ver mi, už mi ani nechutili, keď som pochopil, čo som spravil."

**PETER:** _(miernejším tónom)_ „Som rád, že si si to uvedomil a priznal si chybu. Každý si zaslúži druhú šancu. Odpúšťam ti."`
  },

  // ── ŠTVRTOK ───────────────────────────────────────────────────────────────

  {
    id: 'sc-stv-1',
    dayRef: 'stvrtok',
    title: 'Scénka 1 – Pred bojom',
    text: `_Pred programom — všetky deti sú spolu a pripravujú sa_
_Postavy: Peter, Edmund, Lucy, Susan_

**PETER:** „Je to tu fantastické, ale stále sa bojím o vaše životy. Choďte domov, ja to tu zvládnem."

**EDMUND:** „Peter, my nikam nejdeme."

**LUCY:** „Presne tak, pán Tumnus sa sám nezachráni."

**SUSAN:** „A predsa len, sme súrodenci — a tí držia spolu."

**PETER:** „Ste všetci vyspatí a najedení? Dnes nás čaká dlhý deň."

**VŠETCI:** „Ánooo!" _(s úsmevom)_

**PETER:** „A sme pripravení trénovať?"

**VŠETCI:** „Ánooo!"

**PETER:** „Pozrite sa okolo seba — nie sme v tom sami a ak budeme pevne držať spolu, žiadna armáda Bielej Čarodejnice nás nezlomí. Strach musíme nechať za sebou, pretože v každom z nás sa ukrýva sila Aslana, ktorý stále stojí za nami. Tak poďme — a dajme kráľovnej to, čo si zaslúži!"`
  },

  {
    id: 'sc-stv-2',
    dayRef: 'stvrtok',
    title: 'Scénka 2 – Delegáti a Biela čarodejnica',
    text: `_Pred poobedným programom_
_Deti trénujú. Delegáti sa začnú pýtať, či nevideli daného utečenca, ukážu obrázok a hľadajú Edmunda._

**LUCY:** „Pozrite, to sú vojaci z armády čarodejnice!"

**SUSAN:** „Čo tu chcete?"

**DELEGÁT:** „Milí zradcovia Narnie — kráľovninej spravodlivosti nikto neunikne. Prišla si len po to, čo jej podľa zákona patrí. Jeden z vás zbabelo utiekol z jej moci. Nezabúdajte, že celá Narnia patrí Bielej kráľovnej a jej oči vás neustále sledujú. Žiadam, aby ste mi toho, ktorý začal slúžiť kráľovnej, okamžite a bezpodmienečne vrátili! Tak hovorí starý zákon."

_(Delegáti spoznajú Edmunda podľa obrázka a zakričia.)_

**DELEGÁT:** „TY — ty si ten, ktorý utiekol! Pôjdeš s nami."

**VELITEĽ VOJSKA:** „Syn Adamov ostáva u nás. Určite je niečo, čo presvedčí čarodejnicu, aby zmenila názor."

**DELEGÁT:** „Dovtedy teda zostávame tu. A žiadne triky."`
  },

  {
    id: 'sc-stv-3',
    dayRef: 'stvrtok',
    title: 'Scénka 3 – Delegáti odchádzajú',
    text: `_Po poobednom programe_
_Postavy: Lucy, Delegát_

**DELEGÁT:** _(s posmešným, víťazoslávnym úklonom)_ „Už nám nie ste na nič dobrý. Nikoho už vám nebudeme brať. Naša milostivá kráľovná vie byť... nečakane veľkorysá."

**LUCY:** _(prekvapene a podozrievavo)_ „Veliteľka, čo sa stalo? Čo od nás Čarodejnica žiada za tvoju slobodu?"

**DELEGÁT:** _(hlasno sa zasmeje)_ „Od vás? Vôbec nič! Vy ste pre ňu len figúrky na šachovnici. Starobylá mágia Narnie však vyžadovala obeť — a niekto oveľa mocnejší a dôležitejší sa postaral o to, aby bol tento dlh vyrovnaný."`
  },

  {
    id: 'sc-stv-4',
    dayRef: 'stvrtok',
    title: 'Scénka 4 – Obeta Aslana (Kameňolom)',
    text: `_Večer, v kameňolome_

_V kameňolome sú ľudia s fakľami, oblečení v čiernom. Je tam roztrhaná vlajka. Zhromaždíme sa._

_(Jeden z prítomných zapálí vlajku a strašidelne povie:)_

**HLAS:** „ASLAN SA OBETOVAL."

_(Príde Susan.)_

**SUSAN:** _(smutne)_ „Poďme sa zaňho pomodliť."

_(Modlitba.)_

_(Po modlitbe.)_

**SUSAN:** „Ale kde sú zvyšní animátori?"

**SALUPA:** „Áno, skutočne — animátori sa stratili a určite potrebujú našu pomoc. A my, Lupa a Salupa, sme zistili, ako na to. Lupa, prezraď im záhadu tejto záhady."

**LUPA:** _(vysvetlí hru)_`
  },

  // ── PIATOK ────────────────────────────────────────────────────────────────

  {
    id: 'sc-pia-1',
    dayRef: 'piatok',
    title: 'Scénka 1 – Pred bojom',
    text: `_Ráno, pred programom_
_Postavy: Peter, Edmund, Susan, Vojak_

_(Peter sedí, čistí si meč, pozerá do zeme. Prichádza Susan a Edmund.)_

**SUSAN:** „Peter... mal by si niečo zjesť. Odvčera si nič nemal."

**PETER:** _(bez pohľadu hore)_ „Ako môžem jesť, Zuzka? Aslan je mŕtvy. Tá kamenná doska... videl som, čo s ním urobila. Bez neho sme len deti, ktoré sa hrajú na vojakov."

**EDMUND:** „Nie sme deti, Peter. Už nie. Ja som spravil chybu, kvôli mne tam Aslan išiel. Ale neurobil to preto, aby sme sa teraz vzdali. Chcel, aby Narnia žila."

_(Pribehne vojak, udýchaný.)_

**VOJAK:** „Pane! Armáda Bielej Čarodejnice sa pohla. Sú ich stovky. Minotauri, vlkodlaci, obri... Idú rovno sem. Čakajú na tvoj rozkaz."

**PETER:** _(postaví sa, váha)_ „Na môj? Ja nie som Aslan."

**EDMUND:** „Ale si náš brat. A si najstarší. Ak nepovedieš armádu ty, prepadneme panike. Pozri sa na nich — strácajú nádej. Musíš im ju vrátiť."

**PETER:** _(hlboký nádych, tasí meč)_ „Máš pravdu. Za Aslana. Za Narniu!"

**VŠETCI:** „ZA NARNIU!!!"`
  },

  {
    id: 'sc-pia-2',
    dayRef: 'piatok',
    title: 'Scénka 2 – Uvedenie do boja',
    text: `_Pred záverečným bojom — Peter stojí pred zhromaždenou armádou detí_
_Postavy: Peter, Edmund, Susan, Vojak_

**PETER:** „Narniania! Armáda Bielej Čarodejnice je na dohľad. Dnes nestojíme len proti nepriateľovi, ktorého vidíme — ale proti strachu a temnote, ktorá chce pohltiť náš domov. Viem, že Aslan tu nie je s nami. Ale jeho duch a odvaha sú v každom jednom z nás!"

**EDMUND:** „Presne tak! Ja som urobil chybu, ale Aslan mi odpustil. Teraz je rad na nás, aby sme ukázali, čo v nás je. Nemôžeme to vzdať!"

**PETER:** „Ja preberám zodpovednosť za tento boj a povediem vás. Buď vyhráme, alebo Narnia navždy zamrzne. Na miesta! Pripraviť zbrane! Vpred do boja!"`
  },

  {
    id: 'sc-pia-3',
    dayRef: 'piatok',
    title: 'Scénka 3 – Koniec bitky a zvrat',
    text: `_Po skončení aktivity, pred večerou_
_Postavy: Peter, Edmund, Susan, Vojak_
_Na zemi leží zranený Edmund. Peter a Susan pri ňom kľačia._

**VOJAK:** „Dokázali sme to! Ich armáda sa rozpadla — vyhrali sme!"

**PETER:** _(zúfalo)_ „Vyhrali sme... ale za akú cenu? Edmund sa v najhoršom momente hodil predo mňa, aby ma zachránil. Mal som to byť ja!"

**SUSAN:** „Nevešaj hlavu, Peter. Spomeň si na Aslanov prísľub. Vernosť a obeta pre druhého majú v Narnii obrovskú moc. Smrť si v tomto svete nikdy neberie človeka natrvalo, ak položil život za svojho kráľa — prebúdza sa do nového sveta!"

_(Susan/Peter dajú Edmundovi symbolicky napiť z elixíru, alebo nad ním prehlásia slovo prebudenia. Edmund sa zhlboka nadýchne, otvorí oči a posadí sa.)_

**EDMUND:** „Čo sa stalo? Vyhrali sme?"

**PETER:** _(silno ho objíme)_ „Ty blázon... Vyhrali sme! Vďaka tebe a vďaka posilám, ktoré nám Aslan poslal do srdca. Narnia je konečne slobodná!"

**VOJAK:** „Pozrite — zima ustupuje! Ideme víťazne domov do tábora!"

**PETER:** „Smer tábor, očistiť sa a pripraviť sa na večeru!" _(Všetci s pokrikom odchádzajú.)_`
  },

  {
    id: 'sc-pia-4',
    dayRef: 'piatok',
    title: 'Scénka 4 – Korunovácia a Veľký bál',
    text: `_Večer — vyzdobené táborové námestie_
_Postavy: Pán Tumnus, Peter, Edmund, Susan, Lucy_

_(Pán Tumnus stojí pred nastúpeným táborom. V rukách drží koruny na vankúšoch. Štyria vyvolení pred ním stoja.)_

**PÁN TUMNUS:** „Narniania! Temnota padla a biela zima skončila. Dnes sa naplnilo staré proroctvo. V mene všetkých verných tvorov tejto zeme... vás korunujem za našich vládcov."

_(Tumnus postupne nasadzuje koruny.)_

**PÁN TUMNUS:** „Kráľ Peter — Veľkolepý!"

**PÁN TUMNUS:** „Kráľovná Susan — Láskavá!"

**PÁN TUMNUS:** „Kráľ Edmund — Spravodlivý!"

**PÁN TUMNUS:** „Kráľovná Lucy — Statočná!"

**PÁN TUMNUS:** „Raz kráľom v Narnii — navždy kráľom. Nech vaše koruny svietia na česť a slávu celej tejto zemi!"

**VŠETCI VEDÚCI:** „Nech žijú králi a kráľovné Narnie!" _(Potlesk, jasot.)_

**PETER:** „Aslan tu s nami dnes večer už nestojí fyzicky. Jeho práca je nateraz hotová a odišiel. Ale to neznamená, že nás nechal samých. Jeho duch, ktorý nás dnes oživil, zachránil a pomohol nám znova sa narodiť, zostáva v našich srdciach. Aby sme mohli žiť jeho kráľovstvo každý deň — tu v tábore, aj doma v realite."

**EDMUND:** „Presne tak. Zanechal nám slobodu, radosť a víťazstvo, ktoré nám už nikto nevezme!"

**PETER:** „A preto — na oslavu nového veku slobodnej Narnie — vyhlasujem tento Veľký bál za otvorený! Hudba, hraj!"`
  }

];
