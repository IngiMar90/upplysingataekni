'use strict';
// Source-language keys keep all visible copy explicit; English and Polish are complete pairs.
const I18n = (() => {
  const translations = {
  "Tölvuleikir": [
    "Computer games",
    "Gry komputerowe"
  ],
  "Tölvuleikir · Lærum með leik": [
    "Computer games · Learn through play",
    "Gry komputerowe · Nauka przez zabawę"
  ],
  "Tölvuleikir, heim": [
    "Computer games, home",
    "Gry komputerowe, strona główna"
  ],
  "Stýringar": [
    "Controls",
    "Sterowanie"
  ],
  "Setja upp": [
    "Install",
    "Zainstaluj"
  ],
  "Uppsett": [
    "Installed",
    "Zainstalowano"
  ],
  "Fylla skjá": [
    "Full screen",
    "Pełny ekran"
  ],
  "Minnka skjá": [
    "Exit full screen",
    "Wyłącz pełny ekran"
  ],
  "Stillingar kennara": [
    "Teacher settings",
    "Ustawienia nauczyciela"
  ],
  "Loka": [
    "Close",
    "Zamknij"
  ],
  "Veldu aðstoð sem hentar nemandanum. Stillingar gilda fyrir alla sex leikina.": [
    "Choose support for the student. Settings apply to all six games.",
    "Wybierz pomoc dla ucznia. Ustawienia dotyczą wszystkich sześciu gier."
  ],
  "Færnistig": [
    "Difficulty",
    "Poziom trudności"
  ],
  "1 · Fyrstu skref": [
    "1 · First steps",
    "1 · Pierwsze kroki"
  ],
  "2 · Meiri æfing": [
    "2 · More practice",
    "2 · Więcej ćwiczeń"
  ],
  "3 · Tölvufærni": [
    "3 · Computer skills",
    "3 · Umiejętności komputerowe"
  ],
  "Stórir hlutir, fáir valkostir og mikill stuðningur.": [
    "Large objects, few choices and plenty of support.",
    "Duże przedmioty, mało opcji i dużo pomocy."
  ],
  "Fleiri hlutir, lengra skrun og stutt orð.": [
    "More objects, more scrolling and short words.",
    "Więcej przedmiotów, dłuższe przewijanie i krótkie słowa."
  ],
  "Skrár og möppur, upplýsingaleit og ritun.": [
    "Files and folders, finding information and typing.",
    "Pliki i foldery, szukanie informacji i pisanie."
  ],
  "Sjónrænar vísbendingar": [
    "Visual hints",
    "Podpowiedzi wizualne"
  ],
  "Hljóð við rétt svar": [
    "Sound for correct answers",
    "Dźwięk przy poprawnej odpowiedzi"
  ],
  "Lesa fyrirmæli sjálfkrafa": [
    "Read instructions automatically",
    "Czytaj polecenia automatycznie"
  ],
  "Engin innskráning. Stillingar og fjöldi lokinna umferða vistast aðeins í þessum vafra. Engum nöfnum eða svörum er safnað.": [
    "No login. Settings and completed rounds are saved only in this browser. Names and answers are not collected.",
    "Bez logowania. Ustawienia i liczba ukończonych rund są zapisywane tylko w tej przeglądarce. Nie zbieramy imion ani odpowiedzi."
  ],
  "Núllstilla framvindu": [
    "Reset progress",
    "Wyzeruj postępy"
  ],
  "Vista stillingar": [
    "Save settings",
    "Zapisz ustawienia"
  ],
  "Framvinda hefur verið núllstillt.": [
    "Progress has been reset.",
    "Postępy zostały wyzerowane."
  ],
  "Tölvuleikir sem app": [
    "Install the games as an app",
    "Zainstaluj gry jako aplikację"
  ],
  "Á skólatölvum getur þurft heimild kerfisstjóra til að setja upp app. Einnig er hægt að spila beint í vafra og velja „Fylla skjá“. Esc lokar skjáfyllingu.": [
    "School computers may require an administrator to allow installation. You can also play in the browser and choose “Full screen”. Esc exits full screen.",
    "Na komputerach szkolnych instalacja może wymagać zgody administratora. Możesz też grać w przeglądarce i wybrać „Pełny ekran”. Esc wyłącza pełny ekran."
  ],
  "Lærum með leik": [
    "Learn through play",
    "Nauka przez zabawę"
  ],
  "Hvað viltu æfa í dag?": [
    "What would you like to practise today?",
    "Co chcesz dziś ćwiczyć?"
  ],
  "Veldu leik. Taktu þér góðan tíma.": [
    "Choose a game. Take your time.",
    "Wybierz grę. Nie musisz się spieszyć."
  ],
  "Stig ": [
    "Level ",
    "Poziom "
  ],
  "Fyrstu skref": [
    "First steps",
    "Pierwsze kroki"
  ],
  "Meiri æfing": [
    "More practice",
    "Więcej ćwiczeń"
  ],
  "Tölvufærni": [
    "Computer skills",
    "Umiejętności komputerowe"
  ],
  "Veldu leik": [
    "Choose a game",
    "Wybierz grę"
  ],
  "Velja leik": [
    "Choose a game",
    "Wybierz grę"
  ],
  "Engin tímamörk. Alltaf hægt að prófa aftur.": [
    "No time limits. You can always try again.",
    "Bez limitu czasu. Zawsze możesz spróbować ponownie."
  ],
  " loknar umferðir á þessari tölvu": [
    " completed rounds on this computer",
    " ukończonych rund na tym komputerze"
  ],
  "Verkefni ": [
    "Task ",
    "Zadanie "
  ],
  " af ": [
    " of ",
    " z "
  ],
  "Lesa fyrirmæli": [
    "Read instructions",
    "Przeczytaj polecenie"
  ],
  "Leiksvæði": [
    "Game area",
    "Obszar gry"
  ],
  "Held áfram sjálfkrafa…": [
    "Moving on automatically…",
    "Automatycznie przechodzimy dalej…"
  ],
  " verkefni búin": [
    " tasks completed",
    " ukończonych zadań"
  ],
  "Vel gert!": [
    "Well done!",
    "Brawo!"
  ],
  "Þú laukst umferð í leiknum „": [
    "You completed a round of “",
    "Ukończono rundę w grze „"
  ],
  "“.": [
    "”.",
    "”."
  ],
  "Spila aftur": [
    "Play again",
    "Zagraj ponownie"
  ],
  "Velja annan leik": [
    "Choose another game",
    "Wybierz inną grę"
  ],
  "Pakkasmiðjan": [
    "Packing workshop",
    "Pakowanie"
  ],
  "Draga og sleppa": [
    "Drag and drop",
    "Przeciąganie i upuszczanie"
  ],
  "Settu hlutina á réttan stað.": [
    "Put the objects in the right place.",
    "Umieść przedmioty we właściwym miejscu."
  ],
  "Þú æfðir að velja hluti og færa þá á réttan stað.": [
    "You practised selecting objects and moving them to the right place.",
    "Ćwiczenie polegało na wybieraniu przedmiotów i przenoszeniu ich we właściwe miejsce."
  ],
  "Prófaðu með kennara: dragðu mynd inn á glæru í PowerPoint.": [
    "Try with your teacher: drag a picture onto a PowerPoint slide.",
    "Spróbuj z nauczycielem: przeciągnij obrazek na slajd w PowerPoint."
  ],
  "Fjársjóðsleit": [
    "Treasure hunt",
    "Poszukiwanie skarbu"
  ],
  "Skruna og finna": [
    "Scroll and find",
    "Przewijanie i szukanie"
  ],
  "Skrunaðu og finndu fjársjóðinn.": [
    "Scroll to find the treasure.",
    "Przewijaj i znajdź skarb."
  ],
  "Þú æfðir að skruna upp og niður og finna ákveðinn hlut.": [
    "You practised scrolling up and down to find an object.",
    "Ćwiczenie polegało na przewijaniu w górę i w dół oraz szukaniu przedmiotu."
  ],
  "Prófaðu með kennara: finndu mynd neðar á venjulegri vefsíðu.": [
    "Try with your teacher: find a picture further down a web page.",
    "Spróbuj z nauczycielem: znajdź obrazek niżej na stronie internetowej."
  ],
  "Vélmennaritun": [
    "Robot typing",
    "Pisanie z robotem"
  ],
  "Smella og skrifa": [
    "Click and type",
    "Klikanie i pisanie"
  ],
  "Hjálpaðu vélmenninu að skrifa.": [
    "Help the robot type.",
    "Pomóż robotowi pisać."
  ],
  "Þú æfðir að smella í textareit og nota lyklaborðið.": [
    "You practised clicking in a text box and using the keyboard.",
    "Ćwiczenie polegało na klikaniu w pole tekstowe i używaniu klawiatury."
  ],
  "Prófaðu með kennara: smelltu í textareit í Word og skrifaðu stutt orð.": [
    "Try with your teacher: click in a text box in Word and type a short word.",
    "Spróbuj z nauczycielem: kliknij w pole tekstowe w Wordzie i wpisz krótkie słowo."
  ],
  "Opnaðu réttu dyrnar": [
    "Open the right door",
    "Otwórz właściwe drzwi"
  ],
  "Smella og opna": [
    "Click and open",
    "Klikanie i otwieranie"
  ],
  "Finndu réttu dyrnar og opnaðu.": [
    "Find the right door and open it.",
    "Znajdź właściwe drzwi i otwórz je."
  ],
  "Þú æfðir að velja og opna tákn, möppur og skrár.": [
    "You practised selecting and opening icons, folders and files.",
    "Ćwiczenie polegało na wybieraniu i otwieraniu ikon, folderów i plików."
  ],
  "Prófaðu með kennara: veldu möppu og opnaðu hana í skráasafni tölvunnar.": [
    "Try with your teacher: select a folder and open it in the computer’s file manager.",
    "Spróbuj z nauczycielem: wybierz folder i otwórz go w menedżerze plików."
  ],
  "Myndasmiðjan": [
    "Picture workshop",
    "Pracownia obrazków"
  ],
  "Færa og breyta stærð": [
    "Move and resize",
    "Przesuwanie i zmiana rozmiaru"
  ],
  "Komdu myndunum í rétta ramma.": [
    "Fit the pictures into their frames.",
    "Dopasuj obrazki do ramek."
  ],
  "Þú æfðir að velja mynd, færa hana og breyta stærð hennar.": [
    "You practised selecting, moving and resizing a picture.",
    "Ćwiczenie polegało na wybieraniu obrazka, przesuwaniu go i zmianie jego rozmiaru."
  ],
  "Prófaðu með kennara: settu mynd á glæru og dragðu í horn hennar til að breyta stærðinni.": [
    "Try with your teacher: put a picture on a slide and drag its corner to resize it.",
    "Spróbuj z nauczycielem: wstaw obrazek na slajd i przeciągnij jego róg, aby zmienić rozmiar."
  ],
  "Lagaðu mistökin": [
    "Fix the mistakes",
    "Popraw błędy"
  ],
  "Afturkalla og laga": [
    "Undo and fix",
    "Cofanie i poprawianie"
  ],
  "Færðu myndina aftur í rétt horf.": [
    "Restore the picture.",
    "Przywróć obrazek do poprzedniego stanu."
  ],
  "Þú æfðir að afturkalla breytingar og prófa aftur.": [
    "You practised undoing changes and trying again.",
    "Ćwiczenie polegało na cofaniu zmian i ponownych próbach."
  ],
  "Prófaðu með kennara: færðu mynd í PowerPoint og notaðu Afturkalla eða Ctrl + Z til að færa hana til baka.": [
    "Try with your teacher: move a picture in PowerPoint, then use Undo or Ctrl + Z to move it back.",
    "Spróbuj z nauczycielem: przesuń obrazek w PowerPoint, a potem użyj Cofnij lub Ctrl + Z, aby go przywrócić."
  ],
  "Epli": [
    "Apple",
    "Jabłko"
  ],
  "Pera": [
    "Pear",
    "Gruszka"
  ],
  "Banani": [
    "Banana",
    "Banan"
  ],
  "Gulrót": [
    "Carrot",
    "Marchewka"
  ],
  "Bolti": [
    "Ball",
    "Piłka"
  ],
  "Flugdreki": [
    "Kite",
    "Latawiec"
  ],
  "Kubbar": [
    "Blocks",
    "Klocki"
  ],
  "Bangsi": [
    "Teddy bear",
    "Miś"
  ],
  "Leikfangabíll": [
    "Toy car",
    "Samochodzik"
  ],
  "Lest": [
    "Train",
    "Pociąg"
  ],
  "Baðönd": [
    "Rubber duck",
    "Gumowa kaczka"
  ],
  "Púsl": [
    "Puzzle",
    "Puzzle"
  ],
  "Hamar": [
    "Hammer",
    "Młotek"
  ],
  "Pensill": [
    "Paintbrush",
    "Pędzel"
  ],
  "Skiptilykill": [
    "Wrench",
    "Klucz płaski"
  ],
  "Reglustika": [
    "Ruler",
    "Linijka"
  ],
  "Mynd": [
    "Picture",
    "Obrazek"
  ],
  "Landslag": [
    "Landscape",
    "Krajobraz"
  ],
  "Andlit": [
    "Face",
    "Twarz"
  ],
  "Texti": [
    "Text",
    "Tekst"
  ],
  "Bréf": [
    "Letter",
    "List"
  ],
  "Glósubók": [
    "Notebook",
    "Zeszyt"
  ],
  "Heyrnartól": [
    "Headphones",
    "Słuchawki"
  ],
  "Tónlist": [
    "Music",
    "Muzyka"
  ],
  "Hátalari": [
    "Speaker",
    "Głośnik"
  ],
  "Lauf": [
    "Leaf",
    "Liść"
  ],
  "Stjarna": [
    "Star",
    "Gwiazda"
  ],
  "Bolli": [
    "Cup",
    "Kubek"
  ],
  "Lykill": [
    "Key",
    "Klucz"
  ],
  "Matur": [
    "Food",
    "Jedzenie"
  ],
  "Leikföng": [
    "Toys",
    "Zabawki"
  ],
  "Verkfæri": [
    "Tools",
    "Narzędzia"
  ],
  "Myndir": [
    "Pictures",
    "Obrazki"
  ],
  "Textar": [
    "Texts",
    "Teksty"
  ],
  "Hljóð": [
    "Sounds",
    "Dźwięki"
  ],
  "Settu skrárnar í réttar möppur.": [
    "Put the files in the right folders.",
    "Umieść pliki w odpowiednich folderach."
  ],
  "Settu hlutina í rétta kassa.": [
    "Put the objects in the right boxes.",
    "Umieść przedmioty w odpowiednich pudełkach."
  ],
  "Haltu músarhnappnum niðri, dragðu og slepptu. Eða smelltu á hlut og síðan á réttan stað.": [
    "Hold the mouse button, drag and release. Or click an object, then click its destination.",
    "Przytrzymaj przycisk myszy, przeciągnij i puść. Możesz też kliknąć przedmiot, a potem właściwe miejsce."
  ],
  "Hlutir til að flokka": [
    "Objects to sort",
    "Przedmioty do posortowania"
  ],
  "Velja ": [
    "Select ",
    "Wybierz: "
  ],
  "mynd": [
    "picture",
    "obrazek"
  ],
  "texti": [
    "text",
    "tekst"
  ],
  "hljod": [
    "sound",
    "dzwiek"
  ],
  "Mappa": [
    "Folder",
    "Folder"
  ],
  "Kassi": [
    "Box",
    "Pudełko"
  ],
  "skrár": [
    "files",
    "plików"
  ],
  "hlutir": [
    "objects",
    "przedmiotów"
  ],
  " skrá": [
    " file",
    " plik"
  ],
  " skrár": [
    " files",
    " plików"
  ],
  " hlutur": [
    " object",
    " przedmiot"
  ],
  " hlutir": [
    " objects",
    " przedmiotów"
  ],
  "Veldu fyrst hlut sem þú vilt færa.": [
    "First choose an object to move.",
    "Najpierw wybierz przedmiot do przeniesienia."
  ],
  "Prófaðu annan stað. Þú getur þetta.": [
    "Try another place. You can do it.",
    "Spróbuj innego miejsca. Dasz radę."
  ],
  ", komið á réttan stað": [
    ", in the right place",
    ", we właściwym miejscu"
  ],
  "Allt komið á réttan stað. Vel gert!": [
    "Everything is in the right place. Well done!",
    "Wszystko jest na swoim miejscu. Brawo!"
  ],
  " er á réttum stað!": [
    " is in the right place!",
    " jest na właściwym miejscu!"
  ],
  "Veldu kassa fyrir ": [
    "Choose a box for: ",
    "Wybierz pudełko dla: "
  ],
  "Slepptu hlutnum yfir kassa. Prófaðu aftur.": [
    "Release the object over a box. Try again.",
    "Puść przedmiot nad pudełkiem. Spróbuj ponownie."
  ],
  "Hluturinn sem á að finna": [
    "Object to find",
    "Przedmiot do znalezienia"
  ],
  "Skrunaðu hér til að leita": [
    "Scroll here to search",
    "Przewijaj tutaj, aby szukać"
  ],
  "Skrár": [
    "Files",
    "Pliki"
  ],
  "Hilla": [
    "Shelf",
    "Półka"
  ],
  "Skrunaðu með músarhjóli, tveimur fingrum á snertifleti eða skrunstikunni.": [
    "Scroll with the mouse wheel, two fingers on the touchpad or the scrollbar.",
    "Przewijaj kółkiem myszy, dwoma palcami po touchpadzie lub paskiem przewijania."
  ],
  "Finndu: ": [
    "Find: ",
    "Znajdź: "
  ],
  "Skrunaðu inni í glugganum. Smelltu á hlutinn þegar þú finnur hann.": [
    "Scroll inside the window. Click the object when you find it.",
    "Przewijaj wewnątrz okna. Kliknij przedmiot, gdy go znajdziesz."
  ],
  "Finndu þetta": [
    "Find this",
    "Znajdź to"
  ],
  "Skrunaðu með músarhjóli, snertifleti eða skrunstikunni.": [
    "Scroll with the mouse wheel, touchpad or scrollbar.",
    "Przewijaj kółkiem myszy, touchpadem lub paskiem przewijania."
  ],
  "Skrunaðu niður til að leita.": [
    "Scroll down to search.",
    "Przewiń w dół, aby szukać."
  ],
  "Skrunaðu upp til að leita.": [
    "Scroll up to search.",
    "Przewiń w górę, aby szukać."
  ],
  "Hluturinn er sýnilegur. Finndu hann og smelltu.": [
    "The object is visible. Find it and click.",
    "Przedmiot jest widoczny. Znajdź go i kliknij."
  ],
  "Þetta er annar hlutur. Leitaðu að myndinni til hliðar.": [
    "That is a different object. Look for the picture shown at the side.",
    "To inny przedmiot. Poszukaj obrazka pokazanego z boku."
  ],
  "Þú fannst réttan hlut. Vel gert!": [
    "You found the right object. Well done!",
    "To właściwy przedmiot. Brawo!"
  ],
  "Lagaðu villuna.": [
    "Fix the mistake.",
    "Popraw błąd."
  ],
  "Skrifaðu stafinn.": [
    "Type the letter.",
    "Wpisz literę."
  ],
  "Skrifaðu það sem þú sérð.": [
    "Type what you see.",
    "Przepisz to, co widzisz."
  ],
  "Notaðu Backspace til að eyða x. Síðan heldur leikurinn áfram.": [
    "Use Backspace to delete x. Then the game moves on.",
    "Usuń x klawiszem Backspace. Potem gra przejdzie dalej."
  ],
  "Smelltu í reitinn og skrifaðu. Leikurinn heldur sjálfkrafa áfram þegar svarið er rétt.": [
    "Click in the box and type. The game moves on automatically when the answer is correct.",
    "Kliknij w pole i pisz. Gra przejdzie dalej automatycznie po poprawnej odpowiedzi."
  ],
  "Geturðu hjálpað mér?": [
    "Can you help me?",
    "Pomożesz mi?"
  ],
  "Svona á textinn að vera:": [
    "The text should look like this:",
    "Tak ma wyglądać tekst:"
  ],
  "Skrifaðu þetta:": [
    "Type this:",
    "Wpisz to:"
  ],
  "Skrifaðu hér": [
    "Type here",
    "Pisz tutaj"
  ],
  "Smelltu hér": [
    "Click here",
    "Kliknij tutaj"
  ],
  "Notaðu ": [
    "Use ",
    "Użyj "
  ],
  " til að leiðrétta. ": [
    " to correct mistakes. ",
    ", aby poprawić błąd. "
  ],
  "Rétt svar fer sjálfkrafa í næsta verkefni.": [
    "A correct answer opens the next task automatically.",
    "Poprawna odpowiedź automatycznie otwiera następne zadanie."
  ],
  "Athuga svar": [
    "Check answer",
    "Sprawdź odpowiedź"
  ],
  "Skoðaðu fyrirmyndina. Þú mátt leiðrétta og prófa aftur.": [
    "Look at the example. You can correct your answer and try again.",
    "Spójrz na wzór. Możesz poprawić odpowiedź i spróbować ponownie."
  ],
  "Takk fyrir hjálpina!": [
    "Thanks for helping!",
    "Dziękuję za pomoc!"
  ],
  "Rétt skrifað! Vel gert.": [
    "Typed correctly! Well done.",
    "Poprawnie napisane! Brawo."
  ],
  "Skjáfylling er ekki tiltæk. Prófaðu F11 á tölvunni.": [
    "Full screen is not available. Try F11 on your computer.",
    "Pełny ekran jest niedostępny. Spróbuj nacisnąć F11."
  ],
  "Prófaðu F11 til að fylla skjá": [
    "Try F11 for full screen",
    "Naciśnij F11, aby włączyć pełny ekran"
  ],
  "Leikurinn er þegar opinn sem app. Veldu „Fylla skjá“ ef þú vilt fela rammann í kringum hann.": [
    "The game is already open as an app. Choose “Full screen” to hide the window frame.",
    "Gra jest już otwarta jako aplikacja. Wybierz „Pełny ekran”, aby ukryć ramkę okna."
  ],
  "Opnaðu leikinn í ": [
    "Open the game in ",
    "Otwórz grę w "
  ],
  "Chrome eða Edge": [
    "Chrome or Edge",
    "Chrome lub Edge"
  ],
  " á tölvu eða Chromebook.": [
    " on a computer or Chromebook.",
    " na komputerze lub Chromebooku."
  ],
  "Veldu uppsetningartáknið við veffangastikuna, ef það birtist.": [
    "Choose the install icon in the address bar, if shown.",
    "Wybierz ikonę instalacji na pasku adresu, jeśli jest widoczna."
  ],
  "Annars skaltu opna valmynd vafrans og leita að „Setja upp“ / „Install“ eða „Setja þessa síðu upp sem forrit“.": [
    "Otherwise open the browser menu and look for “Install” or “Install this site as an app”.",
    "W innym przypadku otwórz menu przeglądarki i poszukaj opcji „Zainstaluj” lub „Zainstaluj tę witrynę jako aplikację”."
  ],
  "Opnaðu síðan Tölvuleiki úr forritavalmynd tölvunnar.": [
    "Then open Computer games from your computer’s app menu.",
    "Następnie otwórz Gry komputerowe z menu aplikacji komputera."
  ],
  "Leikirnir eru tilbúnir til notkunar án nets þegar fyrstu opnun og niðurhali er lokið.": [
    "The games work offline after the first opening and download are complete.",
    "Gry działają bez internetu po pierwszym otwarciu i zakończeniu pobierania."
  ],
  "Leikirnir eru tilbúnir.": [
    "The games are ready.",
    "Gry są gotowe."
  ],
  "Smelltu einu sinni á dyrnar með réttu myndinni.": [
    "Click once on the door with the right picture.",
    "Kliknij raz drzwi z właściwym obrazkiem."
  ],
  "Tvísmelltu til að opna. Þú mátt líka velja tákn og ýta á Enter.": [
    "Double-click to open. You can also select an icon and press Enter.",
    "Kliknij dwa razy, aby otworzyć. Możesz też wybrać ikonę i nacisnąć Enter."
  ],
  "Opnaðu dyrnar með réttu myndinni.": [
    "Open the door with the right picture.",
    "Otwórz drzwi z właściwym obrazkiem."
  ],
  "Opnaðu möppuna: ": [
    "Open the folder: ",
    "Otwórz folder: "
  ],
  "Opnaðu: ": [
    "Open: ",
    "Otwórz: "
  ],
  "Finndu þessa mynd": [
    "Find this picture",
    "Znajdź ten obrazek"
  ],
  "Finndu þessa möppu": [
    "Find this folder",
    "Znajdź ten folder"
  ],
  "Finndu þessa skrá": [
    "Find this file",
    "Znajdź ten plik"
  ],
  "Í möppunni ": [
    "In the folder: ",
    "W folderze: "
  ],
  "Réttar dyr! Vel gert.": [
    "Right door! Well done.",
    "Właściwe drzwi! Brawo."
  ],
  "Þú opnaðir rétt. Vel gert!": [
    "You opened the right one. Well done!",
    "Otworzono właściwy element. Brawo!"
  ],
  "Veldu réttu dyrnar": [
    "Choose the right door",
    "Wybierz właściwe drzwi"
  ],
  "Til baka": [
    "Back",
    "Wstecz"
  ],
  "Tölvan": [
    "Computer",
    "Komputer"
  ],
  "Tölvan / ": [
    "Computer / ",
    "Komputer / "
  ],
  "Dyr: ": [
    "Door: ",
    "Drzwi: "
  ],
  "Skrá: ": [
    "File: ",
    "Plik: "
  ],
  "Mappa: ": [
    "Folder: ",
    "Folder: "
  ],
  "Þetta er annað tákn. Skoðaðu fyrirmyndina og prófaðu aftur.": [
    "That is a different icon. Look at the example and try again.",
    "To inna ikona. Spójrz na wzór i spróbuj ponownie."
  ],
  "Rétt mappa. Finndu nú skrána ": [
    "Right folder. Now find the file: ",
    "Właściwy folder. Teraz znajdź plik: "
  ],
  "Tákn valið. Tvísmelltu eða ýttu á Enter til að opna.": [
    "Icon selected. Double-click or press Enter to open.",
    "Ikona wybrana. Kliknij dwa razy lub naciśnij Enter, aby otworzyć."
  ],
  "Færðu myndina í rammann.": [
    "Move the picture into the frame.",
    "Przesuń obrazek do ramki."
  ],
  "Láttu myndina passa í rammann.": [
    "Make the picture fit the frame.",
    "Dopasuj obrazek do ramki."
  ],
  "Láttu allar myndirnar passa í rammana.": [
    "Fit all the pictures into their frames.",
    "Dopasuj wszystkie obrazki do ramek."
  ],
  "Haltu músarhnappnum niðri og dragðu myndina.": [
    "Hold the mouse button and drag the picture.",
    "Przytrzymaj przycisk myszy i przeciągnij obrazek."
  ],
  "Veldu mynd. Færðu hana og dragðu í hornið til að breyta stærð.": [
    "Select a picture. Move it and drag its corner to resize it.",
    "Wybierz obrazek. Przesuń go i przeciągnij jego róg, aby zmienić rozmiar."
  ],
  "Dragðu myndina": [
    "Drag the picture",
    "Przeciągnij obrazek"
  ],
  "Veldu mynd til að byrja": [
    "Select a picture to start",
    "Wybierz obrazek, aby zacząć"
  ],
  "Minna": [
    "Smaller",
    "Mniejszy"
  ],
  "Stærra": [
    "Bigger",
    "Większy"
  ],
  "Myndasvæði": [
    "Picture area",
    "Obszar obrazków"
  ],
  "Rammi fyrir ": [
    "Frame for: ",
    "Ramka dla: "
  ],
  "Velja og færa: ": [
    "Select and move: ",
    "Wybierz i przesuń: "
  ],
  "Breyta stærð: ": [
    "Resize: ",
    "Zmień rozmiar: "
  ],
  "Dragðu hornið til að breyta stærð": [
    "Drag the corner to resize",
    "Przeciągnij róg, aby zmienić rozmiar"
  ],
  "Einnig má velja myndina og nota örvatakkana.": [
    "You can also select the picture and use the arrow keys.",
    "Możesz też wybrać obrazek i użyć klawiszy strzałek."
  ],
  "Dragðu hornið eða notaðu Minna / Stærra. Örvatakkar færa valda mynd.": [
    "Drag the corner or use Smaller / Bigger. Arrow keys move the selected picture.",
    "Przeciągnij róg lub użyj Mniejszy / Większy. Strzałki przesuwają wybrany obrazek."
  ],
  "Valin mynd: ": [
    "Selected picture: ",
    "Wybrany obrazek: "
  ],
  "Myndirnar passa! Vel gert.": [
    "The pictures fit! Well done.",
    "Obrazki pasują! Brawo."
  ],
  "Myndin passar. Prófaðu næstu mynd.": [
    "The picture fits. Try the next one.",
    "Obrazek pasuje. Spróbuj z następnym."
  ],
  "Fela mynd": [
    "Hide picture",
    "Ukryj obrazek"
  ],
  "Færa mynd": [
    "Move picture",
    "Przesuń obrazek"
  ],
  "Minnka mynd": [
    "Shrink picture",
    "Zmniejsz obrazek"
  ],
  "Prófaðu: ": [
    "Try: ",
    "Spróbuj: "
  ],
  "Lagaðu myndina með Afturkalla.": [
    "Fix the picture with Undo.",
    "Popraw obrazek przyciskiem Cofnij."
  ],
  "Síðan færðu myndina til baka með Afturkalla.": [
    "Then restore the picture with Undo.",
    "Potem przywróć obrazek przyciskiem Cofnij."
  ],
  "Afturkalla færir eina breytingu til baka í einu. Þú mátt líka nota Ctrl + Z.": [
    "Undo reverses one change at a time. You can also use Ctrl + Z.",
    "Cofnij cofa jedną zmianę naraz. Możesz też użyć Ctrl + Z."
  ],
  "Svona á myndin að vera": [
    "This is the goal",
    "Tak ma wyglądać obrazek"
  ],
  "Svona er myndin núna": [
    "This is the picture now",
    "Tak wygląda obrazek teraz"
  ],
  "Myndin er falin": [
    "The picture is hidden",
    "Obrazek jest ukryty"
  ],
  "Afturkalla": [
    "Undo",
    "Cofnij"
  ],
  "Endurgera": [
    "Redo",
    "Ponów"
  ],
  "Það er í lagi að prófa. Afturkalla hjálpar þér að laga.": [
    "It is OK to try. Undo helps you fix things.",
    "Możesz próbować. Cofnij pomaga poprawić błędy."
  ],
  " afturkallar. ": [
    " undoes. ",
    " cofa zmianę. "
  ],
  " endurgerir.": [
    " redoes.",
    " ponawia zmianę."
  ],
  " breyting til baka": [
    " change to undo",
    " zmiana do cofnięcia"
  ],
  " breytingar til baka": [
    " changes to undo",
    " zmian do cofnięcia"
  ],
  "Myndin er í réttu horfi": [
    "The picture is restored",
    "Obrazek jest przywrócony"
  ],
  "Prófaðu breytinguna": [
    "Try the change",
    "Wypróbuj zmianę"
  ],
  "Þú lagaðir myndina. Vel gert!": [
    "You fixed the picture. Well done!",
    "Obrazek jest poprawiony. Brawo!"
  ],
  "Afturkalla færir síðustu breytingu til baka.": [
    "Undo reverses the last change.",
    "Cofnij cofa ostatnią zmianę."
  ],
  "Myndin breyttist. Nú geturðu afturkallað.": [
    "The picture changed. Now you can undo.",
    "Obrazek się zmienił. Teraz możesz cofnąć zmianę."
  ],
  "Ein breyting fór til baka. Haltu áfram.": [
    "One change undone. Keep going.",
    "Jedna zmiana cofnięta. Kontynuuj."
  ],
  "Breytingin var endurgerð. Þú getur afturkallað hana aftur.": [
    "The change was redone. You can undo it again.",
    "Zmiana została ponowiona. Możesz ją znowu cofnąć."
  ],
  "Rödd er tiltæk á völdu tungumáli.": [
    "A voice is available in the selected language.",
    "Dostępny jest głos w wybranym języku."
  ],
  "Rödd fannst ekki á völdu tungumáli. Fyrirmælin sjást á skjánum.": [
    "No voice was found for the selected language. Instructions are shown on screen.",
    "Nie znaleziono głosu w wybranym języku. Polecenia są widoczne na ekranie."
  ],
  "Tungumál": [
    "Language",
    "Język"
  ],
  "Sérstafir": [
    "Special letters",
    "Polskie litery"
  ],
  "Smelltu á staf ef hann er ekki á lyklaborðinu.": [
    "Click a letter if it is not on your keyboard.",
    "Kliknij literę, jeśli nie ma jej na klawiaturze."
  ]
};
  const words = {
  "is": [
    [
      "a",
      "m",
      "s",
      "ó",
      "í",
      "r"
    ],
    [
      "sól",
      "hús",
      "kisa",
      "bolti",
      "rauður",
      "bíll",
      "góð bók",
      "mús"
    ],
    [
      "Ég sé sól.",
      "Mús er lítil.",
      "Hér er hús.",
      "Ég á góða bók.",
      "Þetta er rauður bíll.",
      "Hvar er boltinn?",
      "Ég sé þrjá kubba.",
      "Kisa sefur í rúmi.",
      "Við leikum saman.",
      "Ég sé sól."
    ]
  ],
  "en": [
    [
      "a",
      "m",
      "s",
      "o",
      "i",
      "r"
    ],
    [
      "sun",
      "house",
      "cat",
      "ball",
      "red",
      "car",
      "good book",
      "mouse"
    ],
    [
      "I see the sun.",
      "A mouse is small.",
      "Here is a house.",
      "I have a book.",
      "This is a red car.",
      "Where is the ball?",
      "I see three blocks.",
      "The cat is asleep.",
      "We play together.",
      "I see the sun."
    ]
  ],
  "pl": [
    [
      "a",
      "m",
      "s",
      "o",
      "i",
      "r"
    ],
    [
      "kot",
      "dom",
      "mama",
      "tata",
      "las",
      "ryba",
      "mały kot",
      "mysz"
    ],
    [
      "To jest kot.",
      "Mysz jest mała.",
      "Tu jest dom.",
      "Mam dobrą książkę.",
      "To czerwony samochód.",
      "Gdzie jest piłka?",
      "Widzę trzy klocki.",
      "Kot śpi w łóżku.",
      "Bawimy się razem.",
      "To jest kot."
    ]
  ]
};
  const languages = {is:'is-IS', en:'en-GB', pl:'pl-PL'};
  let language = 'is';
  try { const saved = localStorage.getItem('tolvuleikir-language'); if (Object.hasOwn(languages,saved)) language=saved; } catch { /* Optional storage. */ }
  function t(key) { const entry=translations[key]; return language==='is' || !entry ? key : entry[language==='en' ? 0 : 1]; }
  const countForms = {
    is: {files:['skrá','skrár'], objects:['hlutur','hlutir'], changes:['breyting til baka','breytingar til baka'], rounds:['lokin umferð á þessari tölvu','loknar umferðir á þessari tölvu']},
    en: {files:['file','files'], objects:['object','objects'], changes:['change to undo','changes to undo'], rounds:['completed round on this computer','completed rounds on this computer']},
    pl: {files:['plik','pliki','plików'], objects:['przedmiot','przedmioty','przedmiotów'], changes:['zmiana do cofnięcia','zmiany do cofnięcia','zmian do cofnięcia'], rounds:['ukończona runda na tym komputerze','ukończone rundy na tym komputerze','ukończonych rund na tym komputerze']}
  };
  return {
    t, has: key => Object.hasOwn(translations,key),
    count(kind, number) { const form=new Intl.PluralRules(language).select(number), forms=countForms[language][kind]; return number+' '+forms[form==='one' ? 0 : language==='pl' && form!=='few' ? 2 : 1]; },
    get language() {return language;}, get locale() {return languages[language];},
    setLanguage(value) { if (!Object.hasOwn(languages,value)) return false; language=value; try {localStorage.setItem('tolvuleikir-language',value);} catch { /* Optional storage. */ } return true; },
    typingTasks(level) { return words[language][level-1].map((word,i,all) => ({word,...(level>1 && i===all.length-1 ? {seed:word+'x'} : {})})); }
  };
})();
if (typeof module !== 'undefined' && module.exports) module.exports = I18n;
