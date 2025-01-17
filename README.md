This project is a simple Number Guessing Game built with JavaScript. The player needs to guess a secret number between 1 and 20. With each incorrect guess, the score decreases, and the player gets hints whether their guess is too high or too low. The game allows players to try again and keeps track of their highest score.

Features
Secret Number: A secret number between 1 and 20 is randomly generated.
Guessing Game: Players can input a number and check if their guess matches the secret number.
Hints: The game provides feedback for high or low guesses.
High Score: The highest score is tracked throughout the game.
Restart: The game can be reset to start a new round.
How It Works
Game Initialization:

A secret number is randomly generated between 1 and 20.
The initial score is set to 20, and the high score is set to 0.
Making a Guess:

Players input a guess and click the Check button.
If the guess is invalid (not a number or out of range), an error message is shown.
If the guess is correct, the player wins, and the secret number is displayed in a larger size with a green background.
If the guess is incorrect, the game provides feedback:
Too high! or Too low!
The score is decremented for each incorrect guess.
If the score reaches 0, the game ends, and the player is notified they lost.
High Score:

If the current score is higher than the previous high score, the high score is updated.
Restarting the Game:

The Again button allows the player to reset the game, generating a new secret number, resetting the score to 20, and preparing the UI for a new round.
How to Play
Guess the Number: Enter a number between 1 and 20 and click Check.
Receive Feedback: The game will tell you if your guess is too high, too low, or correct.
Track Your Score: Each wrong guess decreases your score. Try to guess the number correctly before your score runs out!
Reset the Game: Click Again to start a new game with a fresh secret number and score.
Technologies Used
HTML for the structure of the game, including input fields and buttons.
CSS for styling the game layout, including the background and number display.
JavaScript for implementing the game logic, handling user input, updating scores, and providing feedback.
This project is a great way to practice basic game logic and DOM manipulation using JavaScript.
