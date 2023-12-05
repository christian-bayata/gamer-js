// Rules of the Game

// If both the player and computer makes the same move, it is a tie
// If the player makes the rock move, and the computer makes the paper move,
// then it is a win for the player,
// otherwise the computer wins

// If the player makes the paper move, and the computer makes the rock move,
// then it is a win for the player,
// otherwise the computer wins

// If the player makes the scissors move, and the computer makes the paper move,
// then it is a win for the player,
// otherwise the computer wins

let gameArchive = JSON.parse(localStorage.getItem("archive")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScore();

document.querySelector(".rock-image-button").addEventListener("click", () => {
  playGame("rock");
});

document.querySelector(".paper-image-button").addEventListener("click", () => {
  playGame("paper");
});

document.querySelector(".scissors-image-button").addEventListener("click", () => {
  playGame("scissors");
});

document.querySelector(".reset-score-button").addEventListener("click", () => {
  resetScore();
});

document.querySelector(".auto-play-button").addEventListener("click", () => {
  autoPlay();
});

function computerMove() {
  let computerMove = Math.random(0, 1);

  if (computerMove > 0 && computerMove < 1 / 3) {
    computerMove = "rock";
  } else if (computerMove > 1 / 3 && computerMove < 2 / 3) {
    computerMove = "paper";
  } else if (computerMove > 2 / 3 && computerMove < 1) {
    computerMove = "scissors";
  }

  return computerMove;
}

function playGame(playerMove) {
  const compMove = computerMove();

  let result = "";
  if (playerMove === "rock") {
    if (compMove === "rock") {
      result = "Tie.";
    } else if (compMove === "paper") {
      result = "You win.";
    } else if (compMove === "scissors") {
      result = "You lose.";
    }
  }

  if (playerMove === "paper") {
    if (compMove === "rock") {
      result = "You lose.";
    } else if (compMove === "paper") {
      result = "Tie.";
    } else if (compMove === "scissors") {
      result = "You win.";
    }
  }

  if (playerMove === "scissors") {
    if (compMove === "rock") {
      result = "You lose.";
    } else if (compMove === "paper") {
      result = "You win.";
    } else if (compMove === "scissors") {
      result = "Tie.";
    }
  }

  if (result === "You win.") {
    gameArchive.wins += 1;
  } else if (result === "You lose.") {
    gameArchive.losses += 1;
  } else if (result === "Tie.") {
    gameArchive.ties += 1;
  }

  localStorage.setItem("archive", JSON.stringify(gameArchive));

  updateScore();

  document.querySelector(".decision").innerHTML = `${result}`;
  document.querySelector(".moves").innerHTML = `You <img class="the-image" src="../assets/images/${playerMove}-emoji.png"> <img class="the-image" src="./assets/images/${compMove}-emoji.png"> Computer`;

  return result;
}

function updateScore() {
  document.querySelector(".js-score").innerHTML = `Wins: ${gameArchive.wins}, Losses: ${gameArchive.losses}, Ties: ${gameArchive.ties} `;
}

function resetScore() {
  gameArchive.wins = 0;
  gameArchive.losses = 0;
  gameArchive.ties = 0;
  localStorage.removeItem("archive");

  updateScore();
}

let intervalId,
  onAutoPlay = false;

function autoPlay() {
  if (!onAutoPlay) {
    intervalId = setInterval(() => {
      const playerMove = computerMove();
      playGame(playerMove);
    }, 2000);
    onAutoPlay = true;
    document.querySelector(".auto-play-button").textContent = "Stop";
  } else {
    clearInterval(intervalId);
    onAutoPlay = false;
    document.querySelector(".auto-play-button").textContent = "Auto Play";
  }
}
