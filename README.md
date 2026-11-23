# Tölvuleikir

Sex rólegir leikir á íslensku, ensku og pólsku fyrir nemendur sem eru að byrja að læra tölvufærni. Engin innskráning, tímamörk, auglýsingar eða ytri gagnasöfnun.

- **Pakkasmiðjan:** draga og sleppa hlutum í kassa, eða velja hlut og smella á kassa. Á efsta stigi eru skrár færðar í möppur.
- **Fjársjóðsleit:** raunverulegt skrun í afmörkuðum glugga, upp og niður, með músarhjóli, snertifleti, skrunstiku eða örvatökkum þegar glugginn hefur fókus.
- **Vélmennaritun:** smella í textareit, skrifa stafi, orð og setningar, leiðrétta með Backspace og halda sjálfkrafa áfram við rétt svar. Enter má einnig nota til að athuga svar.

- **Opnaðu réttu dyrnar:** einn smellur á stórar dyr á stigi 1, tvísmellir á sex möppur á stigi 2 og tveggja skrefa leit að möppu og skrá á stigi 3. Enter opnar líka valið tákn.
- **Myndasmiðjan:** færa eina mynd í ramma, breyta stærð hennar og loks raða þremur myndum í ramma. Raunverulegt hornhandfang breytir stærð, með Minna/Stærra hnöppum og örvatökkum sem viðbótarstuðningi.
- **Lagaðu mistökin:** sýnikennsla á eigin hraða og síðan bein myndvinnsla. Nemandi dregur mynd á annan stað á stigi 1, breytir einnig stærð með hornhandfangi á stigi 2 og færir myndina aftur á stigi 3. Ctrl + Z er sýnilegt á öllum stigum og afturkallar eina raunverulega breytingu í einu. Enginn hnappur framkvæmir breytingarnar eða afturköllunina fyrir nemandann.

Umferðir hafa 6 verkefni á stigi 1, 8 á stigi 2 og 10 á stigi 3. Rétt svar sýnist í eina sekúndu og síðan kemur næsta verkefni sjálfkrafa; í ritun þarf hvorki Enter né sérstakan næsta-hnapp. Textareitur heldur fókus milli ritunarverkefna. Skipti bíða meðan stillingagluggi er opinn og falla niður þegar farið er heim eða leik skipt.

Pakkasmiðjan sýnir 3, 6 eða 9 hluti eftir stigi; á stigum 2 og 3 eru þrír flokkar. Fjársjóðsleit sýnir 12, 24 eða 40 hluti. Á stigi 3 eru endurteknar myndir auðkenndar með númerum og réttur hlutur þarf að passa bæði mynd og númer. Ritun fer úr stökum stöfum í orð, orðasambönd og setningar með hástöfum, bilum og greinarmerkjum. Kennarastillingar bjóða þrjú stig, sjónræna aðstoð, hljóð og valfrjálsan upplestur á völdu tungumáli ef samsvarandi kerfisrödd er í boði. Nöfn og svör eru ekki vistuð; aðeins stillingar og fjöldi lokinna umferða í localStorage á viðkomandi tæki. Stillingar eru ekki læstar með lykilorði.

## Uppsetning og skjáfylling

Opna [Tölvuleiki](https://ingimar90.github.io/upplysingataekni/) í Chrome eða Edge og velja **Setja upp**, eða nota uppsetningu í valmynd vafrans. Uppsetning getur verið takmörkuð af skólastillingum. Appið opnast án hefðbundinnar veffangastiku og óskar eftir skjáfylltri birtingu þar sem hún er studd. **Fylla skjá** felur aðra hluti meðan spilað er; **Esc** hættir skjáfyllingu. Þetta er ekki læstur prófhamur eða kiosk mode.

Service worker sækir leikina og allar myndir við fyrstu opnun yfir HTTPS. Þegar niðurhali er lokið virka þeir án nets. Uppfærslur taka gildi þegar eldri opnum gluggum appsins hefur verið lokað. Upplestur fer eftir röddum á tækinu og getur þurft nettengingu eftir kerfi.

## Þróun

Allur keyrslukóði er í `dist/`, án byggingarskrefs eða þriðja aðila keyrslusafna. Þjóna má möppunni með hvaða stöðugu HTTPS vefhýsingu sem er. Afstæðar slóðir styðja einnig hýsingu í undirmöppu, t.d. GitHub Pages.

Staðbundið: `python3 -m http.server 8000 --directory dist`, síðan opna `http://localhost:8000`. `file://` styður hvorki service worker né uppsetningu.

Allar SVG myndir og tákn voru teiknuð sérstaklega fyrir verkefnið. `python3 make_assets.py` endurgerir SVG skrárnar; PNG uppsetningartáknin eru 192×192 og 512×512 útgáfur af `dist/assets/app.svg`. Eftir breytingar þarf að endurgera PNG táknin og uppfæra útgáfu og skráalista í `dist/sw.js`.

Sjá `TESTING.md` fyrir prófanir og takmarkanir fyrstu útgáfu.

## Vefhýsing

Opinberi leikurinn er á https://ingimar90.github.io/upplysingataekni/ og er birtur með GitHub Pages frá `gh-pages` greininni, rót (`/`). `main` geymir þróunarkóðann. Við uppfærslur þarf að birta innihald `dist/` í rót `gh-pages` og halda skráarskipaninni óbreyttri. GitHub byggir og birtir þá grein sjálfkrafa. Eldri chatgpt.site slóðin er ekki lengur aðalhlekkur verkefnisins.

## Aðskilin uppsett öpp

Manifest-auðkenni, upphafsslóð og umfang Tölvuleikja eru `/upplysingataekni/`. Auðkennið er rótartengt og má ekki vera `./` eða `/`: þau deila annars auðkenni með öðrum öppum á sama léni. Öndun hefur sitt eigið auðkenni `/ondun/`. Þjónustuþráður Tölvuleikja les aðeins eigið skyndiminni og afgreiðir engar beiðnir utan eigin möppu. `node verify.mjs` prófar þessi mörk. Við hýsingu undir annarri slóð þarf að aðlaga manifest-stillingarnar sérstaklega.

## Tungumál

Þrír flipar efst velja íslensku, ensku eða pólsku. Allir sex leikirnir, fyrirmæli, heiti hluta og mappa, endurgjöf, aðgengisheiti, stillingar og uppsetningarleiðbeiningar fylgja valinu. Ritunarleikurinn hefur sjálfstæða stafa-, orða- og setningabanka á hverju tungumáli. Pólskir sérstafir sem koma fyrir í verkefni eru einnig tiltækir sem litlir stafatakkar fyrir nemendur með annað lyklaborð.

Tungumál vistast aðeins á tækinu í `tolvuleikir-language`; framvinda og kennarastillingar haldast við tungumálaskipti. Skipti innan leiks endurræsa núverandi verkefni á sama stigi og verkefnanúmeri. Lokaskjár má skipta um tungumál án þess að skrá lokna umferð aftur. `html.lang`, titill og upplestur fylgja tungumáli. Nöfn tungumálaflipanna eru alltaf á eigin tungumáli.

`dist/i18n.js` geymir allar þýðingar og orðabanka staðbundið og er í offline-skyndiminni. `node test-i18n.cjs` athugar þýðingalykla, tungumálageymslu, orðabanka, leiðréttingarverkefni og pólskar fleirtölur. Engu er breytt í `ondun`.

## Leiðsögn í afturköllun

Fyrsta verkefni hverrar umferðar í Lagaðu mistökin byrjar á skrefaskiptri sýnikennslu sem sýnir breytingar og Ctrl + Z í öfugri röð. Nemandi velur sjálfur Næsta sýniskref og Ég prófa; engin tímamörk eru á sýnikennslu. Sýna mér aftur er aðgengilegt á hverju verkefni og heldur vinnu nemandans þegar snúið er til baka. Sýnikennsla bætir engu við raunverulega breytingasögu eða framvindu.

Öll verkefni byrja með óbreyttri mynd. Stig 1: færa, síðan Ctrl + Z. Stig 2: færa og breyta stærð, síðan tvær afturkallanir. Stig 3: færa, breyta stærð og færa aftur, síðan þrjár afturkallanir. Fyrsta Ctrl + Z afturkallar seinni færsluna, annað stærðarbreytinguna og þriðja fyrri færsluna. Örvatakkar á mynd eða hornhandfangi eru viðbót við drátt. Aðeins fullgerð hreyfing býr til eina breytingu; pointercancel skráir ekkert. Rétt staða eftir allar nauðsynlegar afturkallanir heldur sjálfkrafa áfram. Of snemmbúin afturköllun er leyfð og nemandi getur prófað breytingarnar aftur.

Leiðbeiningar, sýnikennsla, áminningar um Ctrl + Z og endurgjöf eru á öllum þremur tungumálunum.
