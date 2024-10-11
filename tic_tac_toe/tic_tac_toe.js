const cells = document.querySelectorAll(".cell");
const statusDisplay = document.getElementById("status");
const restartButton = document.getElementById("restartButton");
let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const handleCellClick = (clickedCellEvent) => {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = Array.from(clickedCell.parentNode.children).indexOf(
    clickedCell
  );

  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
  }

  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;

  // First check for a win
  checkWin();

  // Check for draw only if there is no winner
  if (gameActive) {
    checkDraw();
  }

  // Switch player
  currentPlayer = currentPlayer === "X" ? "O" : "X";
};

const checkWin = () => {
  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i];
    if (
      gameState[a] !== "" &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      gameActive = false;
      statusDisplay.textContent = `${currentPlayer} wins!`;

      // Change the background color of the winning cells to yellow
      cells[a].style.backgroundColor = "yellow";
      cells[b].style.backgroundColor = "yellow";
      cells[c].style.backgroundColor = "yellow";

      cells[a].style.color = "black"; // Change text color to black
      cells[b].style.color = "black";
      cells[c].style.color = "black";

      return true; // Return true to indicate a win has been found
    }
  }
  return false; // No win found
};

const checkDraw = () => {
  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    gameActive = false;
    statusDisplay.textContent = "It's a draw!";
  }
};

const restartGame = () => {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.textContent = "";
  cells.forEach((cell) => {
    cell.textContent = ""; // Clear the X and O marks
    cell.style.backgroundColor = ""; // Reset background color
    cell.style.color = "";
  });
};

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
restartButton.addEventListener("click", restartGame);

// Function to increment the player's score
function updateScore() {
  let points = 3; // Points earned after 1 minute

  // Check if a score already exists in localStorage
  if (localStorage.getItem("playerScore")) {
    // Retrieve the existing score and add the new points
    points += parseInt(localStorage.getItem("playerScore"));
  }

  // Store the updated score in localStorage
  localStorage.setItem("playerScore", points);

  // Display the updated score (optional)
  // document.getElementById('scoreDisplay').textContent = `Your Score: ${points}`;
}

// Call the updateScore function every minute (60,000 milliseconds)
setInterval(updateScore, 60000); // 60000 ms = 1 minute
