---
title: "Dwa monitory, jeden kolor — bez kalibratora, z AI w telefonie"
slug: "dwa-monitory-jeden-kolor-ai-w-telefonie"
excerpt: "Dwa identyczne Delle różniły się o kilka procent jasności i punktu bieli. Kalibrator? 400–700 zł. Zamiast tego: telefon jako miernik, AI liczy deltę, skrypt podmienia gamma tables macOS. Cały zestaw na GitHubie."
publishedAt: 2026-10-23
author: "Marcin Ołdak"
category: "edukacja"
tags: ["technika", "tutorial", "build"]
readingTime: 6
featured: false
draft: false
lang: "pl"
metaTitle: "Dwa monitory, jeden kolor — kalibracja z AI w telefonie, 0 zł"
metaDescription: "Wyrównanie dwóch monitorów bez kalibratora: telefon jako miernik, AI liczy deltę punktu bieli, skrypt koryguje obraz przez gamma tables macOS."
keywords: ["kalibracja monitora", "dopasowanie kolorów ekranów", "gamma tables", "Adobe RGB", "kalibrator", "AI", "Dell U2415", "color sync"]
faq:
  - q: "Czy ta metoda zastępuje kalibrator sprzętowy?"
    a: "Nie. Wyrównuje ekrany między sobą (ten sam punkt bieli i jasność), ale nie kalibruje do sRGB ani Adobe RGB. Do profesjonalnej pracy z fotografią zostaje kalibrator hardware (rzędu 400–700 zł) z darmowym DisplayCAL."
  - q: "Działa to przez dock Thunderbolt?"
    a: "Tak — i to jest główna zaleta. Klasyczne sterowanie DDC/CI zwykle ginie w docku, a gamma tables działają na poziomie systemu macOS, więc dock im nie przeszkadza."
  - q: "Muszę umieć programować?"
    a: "Nie. Poradnik PDF prowadzi krok po kroku: wzorzec na ekranach, jedno zdjęcie, gotowy prompt wklejony do AI w telefonie, liczby do wpisania w menu monitora. Z linii komend zostaje tylko kopiowanie gotowych komend."
  - q: "Jakiej wartości przy dopasowaniu kolorów ekranów potrzebuję?"
    a: "Zero złotych i około kwadrans. Metoda używa telefonu jako miernika i darmowego AI; cały zestaw (wzorzec testowy, skrypty, poradnik) jest na GitHubie na licencji MIT."
---

Dwa identyczne monitory Dell U2415, ten sam kabel, ten sam dok. I dwa różne kolory bieli: jeden wyraźnie cieplejszy, drugi ciemniejszy. Każdy, kto ustawił sobie dwa ekrany obok siebie, zna to uczucie: nie wiesz, czy dokument jest szary, czy to Monitor A ma złudzenia.

Pierwszy odruch: kalibrator sprzętowy. Realna cena za sensowny kolorometr to rzędu 400–700 zł jednorazowo (rynek PL, 2026), do tego DisplayCAL (darmowy) i wieczór ustawiania. Uzasadnione, jeśli żyjesz z foto. Do pisania, przeglądania i rycin w artykule to przestrzał z armaty.

## DDC nie działa, dock wygrywa

Klasyczna droga to sterowanie monitorem z systemu po DDC/CI. U mnie martwe: dock Thunderbolt między Macem a monitorami zjada kanał DDC. `m1ddc` nie odpowiada, `ddcctl` nie działa na współczesnym macOS. Sprawdziłem topologię — kanał ginie w docku i tyle.

Została droga, którą od lat idzie f.lux: **gamma tables**. macOS trzyma dla każdego ekranu tablicę transferową (osobno dla R, G i B), która mówi „piksel o wartości X ma świecić na Y". Podmieniasz tę tablicę przez `CGSetDisplayTransferByTable` i cała grafika na danym ekranie przesuwa się o zadany mnożnik. Na poziomie systemu, po aplikacjach, przez dock. Mnożnik `0,928` na R i G plus `0,905` na B znaczy: „świeć o 7% słabiej i odsuń niebieski", czyli lekko przyciemnij i podgrzej.

## Telefon jako miernik

Skąd wiedzieć, o ile korygować? Zdjęcie. Ale nie dowolne, bo cały trik polega na tym, że **oba ekrany są w jednej klatce, w jednej ekspozycji**. Na obu otwierasz wzorzec: jedenaście pasów szarości od 0 do 100% plus cztery duże pola (biel, pół szarości, ćwierć, czerń). Telefon prostopadle, na wysokości środka ekranów, z zablokowaną ekspozycją (AE/AF lock), żadnego światła dziennego padającego na panele. Jeden refleks robi różnicę 40+ punktów jasności w obrębie jednego ekranu i pomiar ląduje w koszu.

To zdjęcie idzie do AI w telefonie z promptem, który prosi o medianę jasności bieli i pola 50% na każdym ekranie. Mediana, nie średnia, bo jest odporna na morę i pojedyncze prześwietlone piksele. AI zwraca: „lewy jest o 7% ciemniejszy i o 2,5% cieplejszy od prawego" oraz konkretną liczbę do wpisania w menu monitora. Wpisujesz, potwierdzasz ✓ (Dell bez potwierdzenia nic nie ustawia — najczęstszy powód „nic się nie zmienia"), robisz nowe zdjęcie. Dwie–trzy rundy i ekrany są zgrane.

Jest jeden haczyk, o którym prompt musi pamiętać: „ciemniejszy na zdjęciu" przy niższej jasności wpisanej w menu monitora nie znaczy „ciemniejszy panel". Ekran A ma Brightness 40, B ma 55 — wynik trzeba znormalizować, inaczej skorygujesz w złą stronę.

## Skrypt robi to samo, tylko nie męczy się po uśpieniu

Korekty w menu monitora mają sufit. Gdy różnica jest większa, wchodzi skrypt: `colorsync.py` podmienia gamma tables per ekran. Przy pierwszym uruchomieniu zapisuje oryginalne tablice (snapshot), a potem każde nałożenie liczy zawsze ze snapshotu razy mnożnik — dzięki temu nie kumuluje się i `reset` zawsze wraca do stanu fabrycznego. Weryfikacja po zapisie: skrypt czyta tablicę z powrotem i sprawdza, czy system naprawdę ją przyjął.

Jedyny koszt tej drogi: gamma tables kasują się po uśpieniu ekranu. Drugi skrypt czyta aktywną korektę z pliku stanu i przywraca ją co 5 minut przez launchd. Od tamtej pory nie pamiętam, że ten problem istnieje.

## Czego ta metoda nie robi

Wyrównuje ekrany **między sobą** — prawy monitor jest wzorcem umownym; gdyby był fabrycznie przekłamany, skrypt zrówna oba do przekłamania. To nie kalibracja do sRGB ani do Adobe RGB. I tu cegiełka, którą dziś sam poprawiałem: przy wyborze profilu w Ustawieniach systemowych kusi, żeby wstawić obu Dellom Adobe RGB (1998). Panel U2415 nie pokazuje Adobe RGB — pokazuje mniej więcej sRGB. Profil szerszy od panelu to instrukcja dla systemu „tu jest więcej kolorów niż jest", a obraz wychodzi przesycony. Ten sam profil na obu ekranach: tak. Adobe RGB: nie — sRGB albo profil z EDID.

## Zestaw

Całość leży na GitHubie: [github.com/martin0ne/color-sync-kit](https://github.com/martin0ne/color-sync-kit) — poradnik PDF krok po kroku (dla osoby, która nie programuje — telefon, AI, gotowy prompt), wzorzec testowy, skrypt korekty, auto-odnawianie i plik launchd. Licencja MIT.

Koszt: 0 zł i kwadrans. Kalibrator wraca na stół dopiero wtedy, gdy zaczniesz sprzedawać kolory, a nie teksty.
