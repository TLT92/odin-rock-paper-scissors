
let computerScore = 0;
let humanScore = 0;

function getComputerChoice() {
  let symbols = ["Rock", "Paper", "Scissors"];
  let randomNumber = Math.random() * 3;
  randomNumber = Math.floor(randomNumber);
  
  let computerSymbol = symbols[randomNumber];

  return computerSymbol;
}

function getUserChoice() {
  let symbolObject = {
    rock: "Rock", 
    paper: "Paper", 
    scissors: "Scissors"
  };

  let userInput = '';

  while (userInput.toLowerCase() !== 'rock' && userInput.toLowerCase() !== 'paper' && userInput.toLowerCase() !== 'scissors') {
    userInput = prompt("Type 'rock', 'paper', or 'scissors' to choose symbol").toLowerCase();
  }

  let userSymbol = symbolObject[userInput];

  return userSymbol;
}

function playRound(humanChoice, computerChoice) {
  // Store "rules": what wins/against what?
  const choices = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper"
  };

  // Convert choices to lowercase for comparisons.
  humanChoice = humanChoice.toLowerCase();
  computerChoice = computerChoice.toLowerCase();

  let messageToDisplay = "";

  // Draw.
  if (humanChoice === computerChoice) {
    messageToDisplay = `It's a draw! Both picked ${computerChoice}`;
  // Human wins
  } else if (choices[humanChoice] === computerChoice) {
    humanScore += 1;
    messageToDisplay = `You win! ${humanChoice} beats ${computerChoice}`;
  // Computer wins.
  } else {
    computerScore += 1;
    messageToDisplay = `You lose! ${computerChoice} beats ${humanChoice}`;
  }

  if (humanScore === 5) {
    messageToDisplay = "Congratulations human, you won against the computer";
    setTimeout(restartGame, 2000)
  }

  if (computerScore === 5) {
    messageToDisplay = "Too bad, human, you lost against the computer";
    setTimeout(restartGame, 2000)
  }

  let messageDisplay = document.querySelector("#message-display");
  messageDisplay.textContent = messageToDisplay;
  
  let scoreDisplay = document.querySelector("#score-display");
  scoreDisplay.textContent = `${humanScore} : ${computerScore}`;
}

function restartGame() {
  humanScore = 0;
  computerScore = 0;

  let messageDisplay = document.querySelector("#message-display");
  messageDisplay.textContent = "";

  let scoreDisplay = document.querySelector("#score-display");
  scoreDisplay.textContent = `${humanScore} : ${computerScore}`;
}

// NOT NEEDED FOR UI VERSION!
function playGame() {
  humanScore = 0;
  computerScore = 0;

  for (let i = 0; i < 5; i++) {
    playRound(getUserChoice(), getComputerChoice());
  }

  if (humanScore < computerScore) {
    console.log("Sorry but you lost against the computer!");
  } else if (humanScore > computerScore) {
    console.log("Congratulations, you won!");
  } else if (humanScore === computerScore) {
    console.log("We have no winner, it's a draw!")
  }
}

// Assuming `buttons` is an array of button elements
const playButtons = document.querySelectorAll(".play-button");

playButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    playRound(event.target.value, getComputerChoice());
  });
});
