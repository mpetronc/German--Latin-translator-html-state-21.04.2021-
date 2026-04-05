import React, { startTransition, useDeferredValue, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import duoIllustration from "./assets/gaul-duo.svg?v=6";

const PHRASES = {
  "alle wege führen nach rom": "omnia itinera romam ducunt",
  "auf wiedersehen": "vale",
  "bis bald": "mox te videbo",
  "danke schön": "gratias tibi ago",
  "guten abend": "bonum vesperum",
  "guten morgen": "bonum mane",
  "guten tag": "salve",
  "gute nacht": "bona nox",
  "ich habe brot und wein": "ego habeo panem et vinum",
  "ich heiße": "mihi nomen est",
  "ich liebe dich": "te amo",
  "mir geht es gut": "bene valeo",
  "vielen dank": "gratias maximas",
  "wie geht es dir": "quid agis",
  "wo ist die bibliothek": "ubi est bibliotheca",
};

const WORDS = {
  aber: "sed",
  alle: "omnia",
  alt: "vetus",
  arbeit: "opus",
  auch: "quoque",
  baum: "arbor",
  bin: "sum",
  bitte: "quaeso",
  blume: "flos",
  blumen: "flores",
  boot: "navis",
  brot: "panis",
  brotlaib: "panis",
  buch: "liber",
  bücher: "libri",
  bist: "es",
  danke: "gratias",
  das: "id",
  dein: "tuus",
  deine: "tua",
  der: "ille",
  die: "illa",
  denke: "cogito",
  denken: "cogitare",
  dir: "tibi",
  du: "tu",
  ein: "unus",
  eine: "una",
  er: "is",
  es: "id",
  esse: "edo",
  essen: "edere",
  feuer: "ignis",
  frau: "femina",
  freiheit: "libertas",
  freund: "amicus",
  freundin: "amica",
  für: "pro",
  führst: "ducis",
  führen: "ducere",
  gehe: "eo",
  gehen: "ire",
  gehst: "is",
  geht: "it",
  geld: "pecunia",
  gut: "bonus",
  hallo: "salve",
  habe: "habeo",
  haus: "domus",
  haben: "habere",
  habt: "habetis",
  hast: "habes",
  hat: "habet",
  heute: "hodie",
  hund: "canis",
  ich: "ego",
  ihr: "vos",
  ist: "est",
  ja: "ita",
  katze: "felis",
  kind: "puer",
  klein: "parvus",
  komme: "venio",
  kommen: "venire",
  kommst: "venis",
  kommt: "venit",
  krieg: "bellum",
  land: "terra",
  lernen: "discere",
  lerne: "disco",
  lernst: "discis",
  lernt: "discit",
  lese: "lego",
  lesen: "legere",
  liebst: "amas",
  liebe: "amor",
  liebt: "amat",
  leben: "vivere",
  lebe: "vivo",
  lebt: "vivit",
  mehr: "magis",
  mann: "vir",
  meer: "mare",
  mit: "cum",
  mond: "luna",
  musik: "musica",
  mutter: "mater",
  nacht: "nox",
  nach: "ad",
  nein: "non",
  nicht: "non",
  neu: "novus",
  oder: "aut",
  ohne: "sine",
  quinte: "Quinte",
  quinta: "Quinta",
  quintus: "Quintus",
  rom: "roma",
  schiff: "navis",
  schlecht: "malus",
  schreibe: "scribo",
  schreiben: "scribere",
  schreibst: "scribis",
  schreibt: "scribit",
  schule: "schola",
  sehe: "video",
  sehen: "videre",
  sein: "esse",
  seid: "estis",
  sind: "sunt",
  sie: "ea",
  sohn: "filius",
  sonne: "sol",
  spreche: "loquor",
  sprechen: "loqui",
  sprichst: "loqueris",
  spricht: "loquitur",
  stadt: "urbs",
  stern: "stella",
  straße: "via",
  straßen: "viae",
  tag: "dies",
  tochter: "filia",
  sofort: "statim",
  trinke: "bibo",
  trinken: "bibere",
  trinkst: "bibis",
  trinkt: "bibit",
  und: "et",
  unser: "noster",
  unsere: "nostra",
  vater: "pater",
  warum: "cur",
  vogel: "avis",
  was: "quid",
  wahrheit: "veritas",
  wasser: "aqua",
  weg: "via",
  wege: "itinera",
  wein: "vinum",
  weil: "quia",
  welt: "mundus",
  wie: "quomodo",
  wohne: "habito",
  wohnen: "habitare",
  wo: "ubi",
  wir: "nos",
  wirke: "ago",
  wort: "verbum",
  wörter: "verba",
  wartet: "expectat",
  zeit: "tempus",
};

const TOKEN_RE = /\w+|[^\w\s]/gu;

const EXAMPLES = [
  "Guten Morgen",
  "Ich liebe dich",
  "Was ist das?",
  "Der Hund und die Katze",
  "Alle Wege führen nach Rom",
];

function preserveCase(source, target) {
  if (source === source.toUpperCase()) {
    return target.toUpperCase();
  }

  if (source[0] && source[0] === source[0].toUpperCase()) {
    return target.charAt(0).toUpperCase() + target.slice(1);
  }

  return target;
}

function translateText(text) {
  const trimmed = text.trim();
  if (!trimmed) {
    return {
      translated: "",
      unknownWords: [],
      mode: "empty",
    };
  }

  const normalized = trimmed.toLowerCase().replace(/\s+/g, " ");
  const phraseMatch = PHRASES[normalized];

  if (phraseMatch) {
    return {
      translated: preserveCase(trimmed, phraseMatch),
      unknownWords: [],
      mode: "phrase",
    };
  }

  const tokens = trimmed.match(TOKEN_RE) ?? [];
  const unknownWords = [];

  const translatedTokens = tokens.map((token) => {
    if (!/^\w+$/u.test(token)) {
      return token;
    }

    const latin = WORDS[token.toLowerCase()];

    if (!latin) {
      unknownWords.push(token);
      return `[${token}]`;
    }

    return preserveCase(token, latin);
  });

  let translated = "";

  translatedTokens.forEach((token, index) => {
    if (index === 0) {
      translated += token;
      return;
    }

    if (/^[^\w\s]$/u.test(token)) {
      translated += token;
      return;
    }

    translated += ` ${token}`;
  });

  return {
    translated,
    unknownWords,
    mode: "word-by-word",
  };
}

function App() {
  const [input, setInput] = useState("Guten Morgen");
  const [copied, setCopied] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const deferredInput = useDeferredValue(input);
  const result = translateText(deferredInput);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => window.clearTimeout(timer);
  }, []);

  const handleExampleClick = (example) => {
    startTransition(() => {
      setInput(example);
      setCopied(false);
    });
  };

  const handleCopy = async () => {
    if (!result.translated) {
      return;
    }

    try {
      await navigator.clipboard.writeText(result.translated);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="app-shell">
      {showSplash ? (
        <section className="splash-screen" aria-label="Opening screen">
          <div className="splash-card">
            <img
              className="splash-art"
              src={duoIllustration}
              alt="Original comic-style Gaul duo standing beside a Roman banner"
            />
            <p className="splash-kicker">The Coloseo</p>
            <h1 className="splash-title">Salve !!</h1>
          </div>
        </section>
      ) : null}

      <div className="backdrop backdrop-left" />
      <div className="backdrop backdrop-right" />

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">German / Latin</p>
          <h1>The Coloseo</h1>
          <p className="lede">
            A marble-and-banner translator for short phrases, quick vocabulary, and
            playful classroom Latin with a strong Roman arena mood.
          </p>

          <div className="stat-row">
            <div className="stat-card">
              <span>Mode</span>
              <strong>{result.mode === "empty" ? "waiting" : result.mode}</strong>
            </div>
            <div className="stat-card">
              <span>Unknown words</span>
              <strong>{result.unknownWords.length}</strong>
            </div>
          </div>
        </div>

        <div className="hero-art-card">
          <img
            className="hero-art"
            src={duoIllustration}
            alt="Original comic-style Gaul duo standing beside a Roman banner"
          />
          <p className="art-note">
            quomodo vales Obelix??
          </p>
        </div>
      </section>

      <section className="road-panel">
        <div className="road-copy">
          <p className="panel-kicker">Via Romana</p>
          <h2>All Roads Lead To Rome</h2>
          <p>
            Try phrases like <strong>Alle Wege führen nach Rom</strong> and the page
            follows the old road toward Latin.
          </p>
        </div>
        <div className="road-graphic" aria-hidden="true">
          <div className="road-sun" />
          <div className="road-city">
            <span className="road-tower road-tower-left" />
            <span className="road-tower road-tower-center" />
            <span className="road-tower road-tower-right" />
          </div>
          <div className="road-path" />
          <div className="road-center-line" />
          <div className="road-stones road-stones-left" />
          <div className="road-stones road-stones-right" />
          <div className="road-edge road-edge-left" />
          <div className="road-edge road-edge-right" />
        </div>
      </section>

      <section className="translator-panel">
        <div className="panel-heading">
          <div>
            <p className="panel-kicker">Forum Translator</p>
            <h2>Deutsch in Latein</h2>
          </div>
          <button className="copy-button" onClick={handleCopy} type="button">
            {copied ? "Copied" : "Copy Latin"}
          </button>
        </div>

        <div className="translator-grid">
          <label className="input-card">
            <span>German text</span>
            <textarea
              value={input}
              onChange={(event) => {
                startTransition(() => {
                  setInput(event.target.value);
                  setCopied(false);
                });
              }}
              placeholder="Schreibe hier deinen deutschen Satz..."
            />
          </label>

          <div className="output-card">
            <span>Latin result</span>
            <div className="output-text">{result.translated || "Latin will appear here."}</div>
            {result.unknownWords.length > 0 ? (
              <p className="helper warning">
                Unknown terms stay in brackets: {result.unknownWords.join(", ")}
              </p>
            ) : (
              <p className="helper">Known words preserve case and punctuation.</p>
            )}
          </div>
        </div>

        <div className="example-strip">
          {EXAMPLES.map((example) => (
            <button
              key={example}
              className="example-chip"
              onClick={() => handleExampleClick(example)}
              type="button"
            >
              {example}
            </button>
          ))}
        </div>
      </section>

      <section className="info-grid">
        <article className="info-card">
          <p className="panel-kicker">How It Works</p>
          <h3>Rule-based, not grammar-perfect</h3>
          <p>
            Fixed expressions are translated first. If there is no phrase match, the
            app falls back to token-by-token Latin vocabulary lookup.
          </p>
          <div className="limits-note">
            <strong>Still does not handle:</strong> full Latin grammar, declensions,
            complex tenses, idioms, sentence restructuring, or guaranteed agreement.
          </div>
        </article>

        <article className="info-card">
          <p className="panel-kicker">Best For</p>
          <h3>Short lines and classroom demos</h3>
          <p>
            It shines on greetings, simple nouns, and quick examples. Full Latin
            grammar, declensions, and idioms are outside the current scope.
          </p>
          <p className="latin-example">
            Example: <strong>Was ist das?</strong> becomes <strong>Quid est id?</strong>
          </p>
        </article>

        <article className="info-card conversation-card">
          <div className="conversation-box">
            <p className="conversation-title">Quintus et Quinta</p>
            <p className="conversation-subtitle">Every line below exists in the translator</p>
            <div className="conversation-line">
              <strong>Quintus:</strong> Guten Morgen
              <span className="conversation-translation">Bonum mane</span>
            </div>
            <div className="conversation-line">
              <strong>Quinta:</strong> Wie geht es dir
              <span className="conversation-translation">Quid agis</span>
            </div>
            <div className="conversation-line">
              <strong>Quintus:</strong> Ich habe Brot und Wein
              <span className="conversation-translation">Ego habeo panem et vinum</span>
            </div>
            <div className="conversation-line">
              <strong>Quinta:</strong> Ich liebe dich
              <span className="conversation-translation">Te amo</span>
            </div>
            <div className="conversation-line">
              <strong>Quintus:</strong> Vielen Dank
              <span className="conversation-translation">Gratias maximas</span>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
