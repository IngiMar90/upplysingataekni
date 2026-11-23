# Tölvuleikir

Þrír rólegir leikir á íslensku fyrir nemendur sem eru að byrja að læra tölvufærni. Engin innskráning, tímamörk, auglýsingar eða ytri gagnasöfnun.

- **Pakkasmiðjan:** draga og sleppa hlutum í kassa, eða velja hlut og smella á kassa. Á efsta stigi eru skrár færðar í möppur.
- **Fjársjóðsleit:** raunverulegt skrun í afmörkuðum glugga, upp og niður, með músarhjóli, snertifleti, skrunstiku eða örvatökkum þegar glugginn hefur fókus.
- **Vélmennaritun:** smella í textareit, skrifa stafi, orð og setningar, leiðrétta með Backspace og halda sjálfkrafa áfram við rétt svar. Enter má einnig nota til að athuga svar.

Umferðir hafa 6 verkefni á stigi 1, 8 á stigi 2 og 10 á stigi 3. Rétt svar sýnist í eina sekúndu og síðan kemur næsta verkefni sjálfkrafa; í ritun þarf hvorki Enter né sérstakan næsta-hnapp. Textareitur heldur fókus milli ritunarverkefna. Skipti bíða meðan stillingagluggi er opinn og falla niður þegar farið er heim eða leik skipt.

Pakkasmiðjan sýnir 3, 6 eða 9 hluti eftir stigi; á stigum 2 og 3 eru þrír flokkar. Fjársjóðsleit sýnir 12, 24 eða 40 hluti. Á stigi 3 eru endurteknar myndir auðkenndar með númerum og réttur hlutur þarf að passa bæði mynd og númer. Ritun fer úr stökum stöfum í orð, orðasambönd og setningar með hástöfum, bilum og greinarmerkjum. Kennarastillingar bjóða þrjú stig, sjónræna aðstoð, hljóð og valfrjálsan íslenskan upplestur ef íslensk kerfisrödd er í boði. Nöfn og svör eru ekki vistuð; aðeins stillingar og fjöldi lokinna umferða í localStorage á viðkomandi tæki. Stillingar eru ekki læstar með lykilorði.

## Uppsetning og skjáfylling

Opna [Tölvuleiki](https://tolvuleikir-ingi.xalzir.chatgpt.site/) í Chrome eða Edge og velja **Setja upp**, eða nota uppsetningu í valmynd vafrans. Uppsetning getur verið takmörkuð af skólastillingum. Appið opnast án hefðbundinnar veffangastiku og óskar eftir skjáfylltri birtingu þar sem hún er studd. **Fylla skjá** felur aðra hluti meðan spilað er; **Esc** hættir skjáfyllingu. Þetta er ekki læstur prófhamur eða kiosk mode.

Service worker sækir leikina og allar myndir við fyrstu opnun yfir HTTPS. Þegar niðurhali er lokið virka þeir án nets. Uppfærslur taka gildi þegar eldri opnum gluggum appsins hefur verið lokað. Upplestur fer eftir röddum á tækinu og getur þurft nettengingu eftir kerfi.

## Þróun

Allur keyrslukóði er í `dist/`, án byggingarskrefs eða þriðja aðila keyrslusafna. Þjóna má möppunni með hvaða stöðugu HTTPS vefhýsingu sem er. Afstæðar slóðir styðja einnig hýsingu í undirmöppu, t.d. GitHub Pages.

Staðbundið: `python3 -m http.server 8000 --directory dist`, síðan opna `http://localhost:8000`. `file://` styður hvorki service worker né uppsetningu.

Allar SVG myndir og tákn voru teiknuð sérstaklega fyrir verkefnið. `python3 make_assets.py` endurgerir SVG skrárnar; PNG uppsetningartáknin eru 192×192 og 512×512 útgáfur af `dist/assets/app.svg`. Eftir breytingar þarf að endurgera PNG táknin og uppfæra útgáfu og skráalista í `dist/sw.js`.

Sjá `TESTING.md` fyrir prófanir og takmarkanir fyrstu útgáfu.
