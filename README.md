# ZADANIE

Úlohou je naprogramovať hru vo forme PWA, v rámci ktorej sa bude dať pohybovať na obrazovke pomocou nakláňania mobilu, myši alebo stláčaním tlačidiel na klávesnici (šípky alebo tlačidlá W, A, S, D). Hru bude možné hrať na desktope aj na mobile. V prípade použitia mobilu využite zabudovaný gyroskop. Pri desktopovej verzii sa bude používať myš a klávesnica. Pri hraní hry využívajte iba vertikálny a horizontálny pohyb, t.j. nevyužívajte klikanie myšou.

## Požiadavky

* Celá stránka bude responzívna vrátane použitej grafiky. Hru bude možné hrať aj na mobile alebo tablete.
* Hru bude možné hrať viackrát za sebou s tým, že sa bude meniť úloha, ktorú je potrebné riešiť. Očakáva sa definovanie aspoň 5 rôznych úloh (problémov).
* Definovanie úloh a prípadne aj ich riešení bude zapísané vo forme XML alebo JSON súboru. To znamená, že doplnenie ďalšej úlohy do tohto súboru umožní hrať hru viackrát za sebou bez opakovania úloh. Úlohy zapísané v XML alebo JSON súbore sa budú používateľovi zobrazovať náhodne, t. j. nie presne v poradí, v akom sú zapísané.
* Ak predpokladáme, že používateľ má k dispozícii 5 úloh a napríklad pri tretej úlohe sa rozhodne hru prerušiť, vypnúť počítač a po určitom čase sa vrátiť k hraniu, tak úlohy, ktoré už hral, sa mu nezobrazia až do momentu, kým neodohrá aj zvyšné 2 úlohy. Potom sa úlohy môžu začať opakovať. To isté platí aj pri hraní na mobile.
* Každá úloha bude ukončiteľná, bude umožňovať zobrazenie nápovedy a v prípade potreby aj jej riešenia.
* Súčasťou webovej stránky musí byť popis hry (aká je jej pointa) a návod na riešenie danej úlohy (ako sa hra hrá a na ktorých zariadeniach). Nezabudnite, že hra môže mať časť pokynov platných len pre mobil. Táto časť stránky musí byť optimalizovaná aj pre tlač (pri tlači sa netlačí hracia plocha, prípadné menu a podobne).
* Nezabudnite doladiť detaily. Hra musí obsahovať aj favicon a je potrebné vymyslieť aj názov hry.

## Úlohy:

* Nápad, grafický návrh, atraktivita prevedenia, validita, favicon
* Responzivita (desktop, tablet, mobil, ...)
* Spolupráca s XML alebo JSON
* PWA (Progressive Web App)
* Možnosť prerušenia hry, logika opakovania úloh, nápoveda (riešenie)
* Popis hry a návod, optimalizácia pre tlač
* Celková funkčnosť, minimálny počet úloh
* Využitie senzoru na mobile, hranie na mobilných zariadeniach
