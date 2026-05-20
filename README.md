# Guess My Number

This project is a Number Guessing Game where the player must guess a secret number between **1 and 20**. Wrong guesses reduce the score, and hints indicate whether the guess is too high or too low.

## Features

- Secret number generated between 1 and 20
- Score starts at 20 and decreases on wrong guesses
- High score persisted in session storage
- Too high / too low hint messages
- Guess history bubbles
- Win and lose states with visual feedback
- Dark/light theme toggle
- Restart button for a new round

## Tech Stack

- React
- CSS
- JavaScript

## Project Structure

- `public/index.html` (required entry HTML, lowercase)
- `src/index.js` (React entry point)
- `src/App.jsx`
- `src/App.css`
- `src/components/Game.jsx`
- `src/components/ScoreBoard.jsx`

## Run Locally

```bash
npm install
npm start
```

Open: `http://localhost:3000`

## Build

```bash
npm run build
```

The production output is generated in `build/`.
