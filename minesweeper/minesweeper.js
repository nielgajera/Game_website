const gameBoard = document.getElementById("gameBoard");
const messageContainer = document.getElementById("messageContainer");
const gridSize = 5; // Change this for a larger grid
const totalCells = gridSize * gridSize;
const totalBombs = Math.floor(totalCells * 0.2); // 20% of cells as bombs
const fruits = ["🍎", "🍌", "🍒", "🍇", "🍊"]; // Emojis representing fruits
const bomb = "💣"; // Emoji representing a bomb
const restartButton = document.getElementById("restartButton");

const board = [];
let revealedCount = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function initializeBoard() {
  const allCells = Array(totalCells)
    .fill(0)
    .map((_, index) => ({
      isBomb: index < totalBombs,
      isRevealed: false,
      fruit: null,
    }));

  const shuffledCells = shuffle(allCells);

  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.textContent = ""; // Initially empty
    cell.addEventListener("click", revealCell);
    gameBoard.appendChild(cell);
    board.push({
      isBomb: shuffledCells[i].isBomb,
      isRevealed: false,
      element: cell,
      fruit: shuffledCells[i].fruit,
    });

    if (!shuffledCells[i].isBomb) {
      const fruitIndex = Math.floor(Math.random() * fruits.length);
      board[i].fruit = fruits[fruitIndex];
      cell.dataset.fruit = fruits[fruitIndex];
    }
  }
}

function revealCell(event) {
  const index = event.target.dataset.index;
  if (board[index].isRevealed) return;

  if (board[index].isBomb) {
    // Handle bomb clicked
    event.target.textContent = bomb;
    event.target.style.backgroundColor = "red";
    board[index].isRevealed = true;
    setTimeout(() => {
      revealAll();
      const message = document.createElement("p");
      message.textContent = "Game Over! You clicked a bomb. You lose!";
      messageContainer.classList.add("gameOver");
      messageContainer.appendChild(message);
    }, 500); // Change the delay time (in milliseconds) as needed
  } else {
    // Handle revealing the cell
    event.target.textContent = event.target.dataset.fruit;
    event.target.style.backgroundColor = "lightgreen";
    revealedCount++;
    board[index].isRevealed = true;
    if (revealedCount === totalCells - totalBombs) {
      revealAll();
      setTimeout(() => {
        const message = document.createElement("p");
        message.textContent =
          "Congratulations! You found all the fruits! You win!";
        messageContainer.classList.add("congratulations");
        messageContainer.appendChild(message);
      }, 500); // Change the delay time (in milliseconds) as needed
    }
  }
}

function revealAll() {
  board.forEach((cell) => {
    if (!cell.isRevealed) {
      if (cell.isBomb) {
        cell.element.textContent = bomb;
        cell.element.style.backgroundColor = "red";
      } else {
        cell.element.textContent = cell.fruit;
        cell.element.style.backgroundColor = "lightgreen";
      }
      cell.isRevealed = true;
    }
    cell.element.removeEventListener("click", revealCell);
  });
}

function resetGame() {
  // Clear the game board and message container
  gameBoard.innerHTML = "";
  messageContainer.innerHTML = "";

  // Reset the game variables
  board.length = 0;
  revealedCount = 0;

  // Initialize a new game
  initializeBoard();
}

// Event listener for the restart button
restartButton.addEventListener("click", resetGame);

initializeBoard();

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
