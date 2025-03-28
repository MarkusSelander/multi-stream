# Multi-Stream Viewer

En React-applikasjon for å vise flere iframes (f.eks. sportsstrømmer) samtidig. Støtter grid- og listevisning, drag & drop, fullskjerm og lagring i localStorage.

## Link til nettsiden
[Multi-Stream Viewer](https://markusselander.netlify.app/)

## Funksjoner

- **Legg til streams**: Lim inn en iframe-URL.
- **Grid/List**: Velg mellom rutenettvisning og listevisning.
- **Juster kolonner**: Endre antall kolonner (i grid-modus) med en slider.
- **Drag & drop**: Omorganiser streams.
- **Fjern streams**: Fjern-knapp vises ved hover/klikk.
- **Fullskjerm**: Dobbeltklikk for fullskjermvisning.
- **LocalStorage**: Oppsett og streams lagres automatisk.

## Installasjon og kjøring

1. Klon repoet:
   ```bash
   git clone https://github.com/MarkusSelander/multi-stream.git
   cd multi-stream
2. Installer avhengigheter:
   ```bash
   npm install
   ```
3. Kjør applikasjonen:
   ```bash
   npm start
   ```
4. Åpne nettleseren og gå til `http://localhost:3000`.

## Bygg og Deploy
1. Bygg applikasjonen for produksjon:
   ```bash
   npm run build
   ```
Lisens
Dette prosjektet er lisensiert under MIT-lisensen. Se [LICENSE](LICENSE) for detaljer.