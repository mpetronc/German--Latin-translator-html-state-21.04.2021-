# Translatio Teutonica

A very basic German-to-Latin translator with a Roman-inspired web interface and a matching Python CLI prototype.

This project is designed for short phrases, vocabulary demos, and playful presentation. It is rule-based, intentionally lightweight, and works best as a small demo rather than a full translation engine.

## What is included

- a React + Vite frontend
- a Roman / slash-banner visual theme
- an original Gaul-inspired duo illustration
- a Python command-line translator prototype
- phrase-first translation with word-by-word fallback
- punctuation and capitalization preservation
- bracketed unknown words for easy vocabulary expansion

## Run the web app

```bash
npm install
npm run dev
```

Then open the local Vite URL in your browser.

## Hosted preview

You can also open the online preview here:

[Live preview](https://mpetronc.github.io/German--Latin-translator-html-state-21.04.2021-/)

If the page does not load yet, open the repository `Actions` tab and wait for the
GitHub Pages deployment workflow to finish.

## Build for production

```bash
npm run build
```

## Run the Python CLI

```bash
python3 german_to_latin_translator.py "Guten Morgen"
```

Or start interactive mode:

```bash
python3 german_to_latin_translator.py
```

## Example translations

```text
Guten Tag -> salve
Ich liebe dich -> te amo
Der Hund und die Katze -> Ille canis et illa felis
```

## Scope

This translator currently handles:

- short fixed phrases
- word-by-word vocabulary lookup
- simple greetings and classroom examples
- a small set of common nouns and verbs
- punctuation and capitalization preservation

This translator does not fully handle:

- proper Latin grammar
- declensions and conjugation rules
- idiomatic translation
- long or complex sentence structure
- guaranteed agreement of case, gender, and number

## Project structure

```text
.
├── german_to_latin_translator.py
├── index.html
├── package.json
├── README.md
└── src
    ├── assets
    │   └── gaul-duo.svg
    ├── main.jsx
    └── styles.css
```

## Notes

- This is not a full grammar-aware Latin translator.
- Official Asterix and Obelix artwork is not included. The project uses an original Gaul-inspired illustration to keep it safe for publishing.

## Good GitHub extras

Before uploading, consider adding:

- a `LICENSE` file
- a few screenshots
- a short demo GIF
- more vocabulary entries
