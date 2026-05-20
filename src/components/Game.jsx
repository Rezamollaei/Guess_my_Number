import { useEffect, useMemo, useState } from "react";
import ScoreBoard from "./ScoreBoard";

const MESSAGE_STATES = ["high", "low", "win", "lose", "invalid"];

const getSecretNumber = () => {
  const buffer = new Uint32Array(1);
  const cryptoSource = window.crypto || window.msCrypto;

  if (cryptoSource?.getRandomValues) {
    cryptoSource.getRandomValues(buffer);
    return (buffer[0] % 20) + 1;
  }

  const seed = Date.now() ^ (performance?.now?.() ?? 0);
  const lcg = (seed * 1664525 + 1013904223) % 2 ** 32;
  return (lcg % 20) + 1;
};

function Game() {
  const [secretNumber, setSecretNumber] = useState(() => getSecretNumber());
  const [guess, setGuess] = useState("");
  const [score, setScore] = useState(20);
  const [highscore, setHighscore] = useState(() => Number(sessionStorage.getItem("highscore")) || 0);
  const [message, setMessage] = useState("Start guessing...");
  const [messageState, setMessageState] = useState("");
  const [gameState, setGameState] = useState("");
  const [history, setHistory] = useState([]);
  const [theme, setTheme] = useState(() => sessionStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    sessionStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    sessionStorage.setItem("highscore", String(highscore));
  }, [highscore]);

  const handleSetMessage = (text, state = "") => {
    setMessage(text);
    setMessageState(state);
  };

  const parsedGuess = useMemo(() => Number(guess), [guess]);

  const handleGuess = () => {
    if (!parsedGuess || parsedGuess > 20 || parsedGuess < 1) {
      handleSetMessage("Enter a number between 1 and 20.", "invalid");
      return;
    }

    if (parsedGuess === secretNumber) {
      handleSetMessage("Correct! You nailed it.", "win");
      setGameState("win");
      setHistory((prev) => [{ guess: parsedGuess, state: "win" }, ...prev]);

      if (score > highscore) {
        setHighscore(score);
      }
      return;
    }

    if (score > 1) {
      const state = parsedGuess > secretNumber ? "high" : "low";
      handleSetMessage(state === "high" ? "Too high!" : "Too low!", state);
      setHistory((prev) => [{ guess: parsedGuess, state }, ...prev]);
      setScore((prev) => prev - 1);
    } else {
      setScore(0);
      handleSetMessage("Game over. Try again!", "lose");
      setGameState("lose");
    }
  };

  const resetGame = () => {
    setSecretNumber(getSecretNumber());
    setScore(20);
    setMessage("Start guessing...");
    setMessageState("");
    setGameState("");
    setHistory([]);
    setGuess("");
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <>
      <div className="floating-elements" aria-hidden="true">
        {["7", "🎲", "12", "✨", "19", "🔢", "3", "🎯", "16", "🧩", "5", "⭐"].map((item, index) => (
          <span key={`${item}-${index}`} style={{ "--i": index + 1 }}>
            {item}
          </span>
        ))}
      </div>

      <div className={`app ${gameState}`.trim()}>
        <header className="header">
          <div className="header-top">
            <div className="title-group">
              <p className="eyebrow">Guess the number</p>
              <h1>Guess My Number</h1>
              <p className="between">1 — 20 · One number · Start guessing</p>
            </div>
            <div className="header-actions">
              <button className="btn ghost theme-toggle" aria-pressed={theme === "dark"} aria-label="Toggle dark mode" onClick={toggleTheme}>
                <span className="theme-icon">{theme === "dark" ? "🌙" : "☀️"}</span>
                <span className="theme-text">{theme === "dark" ? "Dark" : "Light"}</span>
              </button>
              <button className="btn ghost again" onClick={resetGame}>
                Again
              </button>
            </div>
          </div>

          <div className="number-card">
            <div className={`number ${gameState}`.trim()}>{gameState ? secretNumber : "?"}</div>
            <p className="number-label">Secret number</p>
          </div>
        </header>

        <main className="game">
          <section className="panel input-panel">
            <label className="input-label" htmlFor="guess-input">
              Your guess
            </label>
            <div className="input-wrap">
              <input
                id="guess-input"
                type="number"
                className="guess"
                min="1"
                max="20"
                placeholder="?"
                value={guess}
                onChange={(event) => setGuess(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleGuess();
                  }
                }}
              />
              <button className="btn primary check" onClick={handleGuess}>
                Check
              </button>
            </div>
            <p className={`message ${MESSAGE_STATES.includes(messageState) ? messageState : ""}`.trim()} role="status" aria-live="polite">
              {message}
            </p>
            <div className="history">
              <p className="history-title">Guess history</p>
              <div className="history-bubbles" aria-live="polite">
                {history.map((item, index) => (
                  <span key={`${item.guess}-${index}`} className={`history-bubble ${item.state}`.trim()}>
                    {item.guess}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <ScoreBoard score={score} highscore={highscore} />
        </main>
      </div>
    </>
  );
}

export default Game;
