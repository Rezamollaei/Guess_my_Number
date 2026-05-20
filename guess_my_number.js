"use strict";

const btnCheck = document.querySelector(".check");
const inputGuess = document.querySelector(".guess");
const messageEl = document.querySelector(".message");
const numberEl = document.querySelector(".number");
const highscoreEl = document.querySelector(".highscore");
const scoreEl = document.querySelector(".score");
const againBtn = document.querySelector(".again");
const historyBubbles = document.querySelector(".history-bubbles");
const scoreCard = document.querySelector(".score-card");
const themeToggle = document.querySelector(".theme-toggle");
const themeText = document.querySelector(".theme-text");
const themeIcon = document.querySelector(".theme-icon");
const root = document.documentElement;

const messageStates = ["high", "low", "win", "lose", "invalid"];

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

let secretnumber = getSecretNumber();
let score = 20;
let highscore = Number(sessionStorage.getItem("highscore")) || 0;

highscoreEl.textContent = highscore;

const setMessage = (text, state = "") => {
  messageEl.textContent = text;
  messageStates.forEach((item) => messageEl.classList.remove(item));
  if (state) {
    messageEl.classList.add(state);
  }
};

const updateScore = (value) => {
  score = value;
  scoreEl.textContent = score;
  scoreCard.classList.toggle("danger", score <= 5);
};

const setGameState = (state = "") => {
  document.body.classList.remove("win", "lose");
  numberEl.classList.remove("win", "lose");
  if (state) {
    document.body.classList.add(state);
    numberEl.classList.add(state);
  }
};

const addHistoryBubble = (guess, state) => {
  const bubble = document.createElement("span");
  bubble.className = `history-bubble ${state}`;
  bubble.textContent = guess;
  historyBubbles.prepend(bubble);
};

const clearHistory = () => {
  historyBubbles.innerHTML = "";
};

const handleGuess = () => {
  const guess = Number(inputGuess.value);

  if (!guess || guess > 20 || guess < 1) {
    setMessage("Enter a number between 1 and 20.", "invalid");
    return;
  }

  if (guess === secretnumber) {
    setMessage("Correct! You nailed it.", "win");
    numberEl.textContent = secretnumber;
    setGameState("win");
    addHistoryBubble(guess, "win");

    if (score > highscore) {
      highscore = score;
      highscoreEl.textContent = highscore;
      sessionStorage.setItem("highscore", String(highscore));
    }

    return;
  }

  if (score > 1) {
    const state = guess > secretnumber ? "high" : "low";
    setMessage(state === "high" ? "Too high!" : "Too low!", state);
    addHistoryBubble(guess, state);
    updateScore(score - 1);
  } else {
    updateScore(0);
    setMessage("Game over. Try again!", "lose");
    numberEl.textContent = secretnumber;
    setGameState("lose");
  }
};

btnCheck.addEventListener("click", handleGuess);
inputGuess.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleGuess();
  }
});

againBtn.addEventListener("click", () => {
  secretnumber = getSecretNumber();
  updateScore(20);
  setMessage("Start guessing...");
  numberEl.textContent = "?";
  inputGuess.value = "";
  inputGuess.focus();
  setGameState();
  clearHistory();
});

const setTheme = (theme) => {
  root.setAttribute("data-theme", theme);
  themeToggle.setAttribute("aria-pressed", theme === "dark");
  themeText.textContent = theme === "dark" ? "Dark" : "Light";
  themeIcon.textContent = theme === "dark" ? "🌙" : "☀️";
  sessionStorage.setItem("theme", theme);
};

const storedTheme = sessionStorage.getItem("theme") || "dark";
setTheme(storedTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  });
}
