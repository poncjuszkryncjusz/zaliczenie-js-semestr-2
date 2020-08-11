# zaliczenie-js-semestr-2

uruchomienie API node main.js

npm: build:dev - starter

Przygotuj prototyp porównywarki produktów.

1.wyświetl listę produktów. zdjęcie, nazwa, model, marka, cena oraz przycisk umożliwiający dodanie do porównywarki.
2.na liście produktów dodaj stronicowanie, gdzie na jednej stronie widoczne są 4 elementy
3.na liście produktów dodaj możliwość sortowanie wg. ceny (rosnąco i malejąco)
4.jeśli produkt jest oznaczony jako "special" nadaj mu inny kolor tła oraz kolor przycisku "dodaj do porównania"
5.stwórz wyszukiwarkę, która umożliwi przeszukanie listy produktów. 
6.wyszukiwarka powinna zawierać następujące filtry: zakres cenowy (2 pola), marka produktu, wg. koloru
7.wyszukiwarka powinna zacząć szukanie na liście po wpisaniu min. 3 znaków i szukać po następujących polach: nazwa, marka, opis. Poprzez wyszukiwarką zawężamy listę produktów na podstawie wpisanej frazy.
8.jeśli dodamy maksymalną ilość produktów do porównania to powinniśmy zablokować możliwość kliknięcia w przyciski na produktach z listy wyszukiwania. Maksymalna ilość produktów do porównania to 3. 
9.w porównywarce wyświetlamy wszystkie dostępne dane danego produktu (tj. zdjęcie, nazwa, model, marka, cena, opis, kolor ... )
Dane przygotuj za pomocą:
biblioteki https://github.com/typicode/json-server i wczytaj je do aplikacji za pomocą biblioteki https://github.com/axios/axios
lub skorzystaj z gotowej listy w pliku JSON dołączonego do zadania.