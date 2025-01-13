"use strict";

const btncheck = document.querySelector(".check");
const btnguess = document.querySelector(".guess");
const btnmessage = document.querySelector(".message");
const btnnumber = document.querySelector(".number");
const btnhighscore = document.querySelector(".highscore");
const btnscore = document.querySelector(".score");
const btnagain = document.querySelector(".again");

let secretnumber = Math.trunc(Math.random() * 20) + 1;
let highscore = 0;
let score = 20;

/*const displaymessage = function(message){
  document.querySelector('.message') = message;
}*/
btncheck.addEventListener("click", function () {
  const guess = Number(btnguess.value);
  //when there is no input
  if (!guess || guess > 20 || guess < 1) {
    btnmessage.textContent = "no valid number!!!";

    //when player wins
  } else if (guess === secretnumber) {
    btnmessage.textContent = "correct answer ";
    btnnumber.textContent = secretnumber;

    document.querySelector("body").style.backgroundColor = "#60b347";

    document.querySelector(".number").style.width = "30rem";

    if (score > highscore) {
      highscore = score;
      btnhighscore.textContent = highscore;
    }

    //when guess is to high
  } else if (guess !== secretnumber) {
    if (score > 1) {
      btnmessage.textContent =
        guess > secretnumber ? "To high!!!" : "To low!!!";
      score--;
      btnscore.textContent = score;
    } else {
      btnmessage.textContent = "You lost the game!";
      btnscore.textContent = 0;
    }
  }
});

btnagain.addEventListener("click", function () {
  score = 20;
  secretnumber = Math.trunc(Math.random() * 20) + 1;

  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";

  btnmessage.textContent = "Start guessing...";

  btnscore.textContent = score;

  document.querySelector(".number").textContent = "?";

  btnguess.value = "";
});
