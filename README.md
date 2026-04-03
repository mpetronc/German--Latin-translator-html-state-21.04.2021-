# Translatio Teutonica

A German-to-Latin translator: This project is designed for short phrases, vocabulary demos, and playful presentation. 

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
