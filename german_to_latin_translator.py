#!/usr/bin/env python3
"""
Simple German -> Latin translator.

This is a lightweight rule-based translator, not a full grammatical machine
translation system. It works best for short demo phrases and individual words.
Unknown words are wrapped in brackets so they are easy to spot.
"""

from __future__ import annotations

import re
import sys


PHRASES = {
    "guten morgen": "bonum mane",
    "guten tag": "salve",
    "guten abend": "bonum vesperum",
    "wie geht es dir": "quid agis",
    "ich liebe dich": "te amo",
    "danke schön": "gratias tibi ago",
    "vielen dank": "gratias maximas",
    "auf wiedersehen": "vale",
    "bis bald": "mox te videbo",
    "gute nacht": "bona nox",
}


WORDS = {
    "ich": "ego",
    "du": "tu",
    "er": "is",
    "sie": "ea",
    "wir": "nos",
    "ihr": "vos",
    "hallo": "salve",
    "ja": "ita",
    "nein": "non",
    "bitte": "quaeso",
    "danke": "gratias",
    "und": "et",
    "oder": "aut",
    "aber": "sed",
    "mit": "cum",
    "ohne": "sine",
    "für": "pro",
    "haus": "domus",
    "mann": "vir",
    "frau": "femina",
    "kind": "puer",
    "freund": "amicus",
    "liebe": "amor",
    "tag": "dies",
    "nacht": "nox",
    "wasser": "aqua",
    "brot": "panis",
    "buch": "liber",
    "schule": "schola",
    "stadt": "urbs",
    "land": "terra",
    "meer": "mare",
    "sonne": "sol",
    "mond": "luna",
    "stern": "stella",
    "feuer": "ignis",
    "baum": "arbor",
    "blume": "flos",
    "hund": "canis",
    "katze": "felis",
    "vogel": "avis",
    "essen": "edere",
    "trinken": "bibere",
    "gehen": "ire",
    "kommen": "venire",
    "sehen": "videre",
    "hören": "audire",
    "sprechen": "loqui",
    "lernen": "discere",
    "lesen": "legere",
    "schreiben": "scribere",
    "leben": "vivere",
    "sein": "esse",
    "haben": "habere",
    "gut": "bonus",
    "schlecht": "malus",
    "groß": "magnus",
    "klein": "parvus",
    "neu": "novus",
    "alt": "vetus",
    "schnell": "celer",
    "langsam": "lentus",
    "wahrheit": "veritas",
    "freiheit": "libertas",
    "frieden": "pax",
    "krieg": "bellum",
}


TOKEN_RE = re.compile(r"\w+|[^\w\s]", re.UNICODE)


def preserve_case(source: str, target: str) -> str:
    if source.isupper():
        return target.upper()
    if source[:1].isupper():
        return target.capitalize()
    return target


def translate_phrase(text: str) -> str | None:
    normalized = " ".join(text.lower().split())
    translated = PHRASES.get(normalized)
    if not translated:
        return None
    return preserve_case(text, translated)


def translate_word(token: str) -> str:
    lower = token.lower()
    translated = WORDS.get(lower)
    if not translated:
        return f"[{token}]"
    return preserve_case(token, translated)


def translate_text(text: str) -> str:
    phrase_hit = translate_phrase(text.strip())
    if phrase_hit:
        return phrase_hit

    tokens = TOKEN_RE.findall(text)
    output = []

    for token in tokens:
        if re.fullmatch(r"\w+", token, re.UNICODE):
            output.append(translate_word(token))
        else:
            output.append(token)

    result = ""
    for index, token in enumerate(output):
        if index == 0:
            result += token
        elif re.fullmatch(r"[^\w\s]", token, re.UNICODE):
            result += token
        elif re.fullmatch(r"[^\w\s]", output[index - 1], re.UNICODE):
            result += " " + token
        else:
            result += " " + token
    return result


def main() -> int:
    if len(sys.argv) > 1:
        text = " ".join(sys.argv[1:])
        print(translate_text(text))
        return 0

    print("German -> Latin translator")
    print("Enter text to translate. Press Ctrl+C or Ctrl+D to exit.")

    try:
        while True:
            text = input("> ").strip()
            if not text:
                continue
            print(translate_text(text))
    except (EOFError, KeyboardInterrupt):
        print()
        return 0


if __name__ == "__main__":
    raise SystemExit(main())
