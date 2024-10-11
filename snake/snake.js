document.addEventListener("DOMContentLoaded", () => {
  const gameBoard = document.getElementById("gameBoard");
  const boardSize = 20;
  const cellCount = boardSize * boardSize;
  let score1 = 0;
  let snake = [2, 1, 0]; // Snake's initial position
  let direction = 1; // 0 - up, 1 - right, 2 - down, 3 - left
  let food = 0;
  let intervalTime = 300;
  let interval = 0;

  function createBoard() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      gameBoard.appendChild(cell);
      gameBoard.parentElement.insertBefore(scoreDisplay, gameBoard); // Display score above the board
      updateScore1();
    }
  }

  const scoreDisplay = document.createElement("div");
  scoreDisplay.classList.add("score1");
  document.body.insertBefore(scoreDisplay, gameBoard);

  function updateScore1() {
    scoreDisplay.innerText = `Score: ${score1}`;
  }

  function restartGame() {
    clearInterval(interval);
    gameBoard.innerHTML = "";
    score1 = 0;
    snake = [2, 1, 0];
    direction = 1;
    intervalTime = 300;
    createBoard();
    startGame();
    updateScore1();
  }

  function startGame() {
    snake.forEach((index) => gameBoard.children[index].classList.add("snake"));
    generateFood();
    interval = setInterval(moveSnake, intervalTime);
  }

  function moveSnake() {
    const head = snake[0];
    const tail = snake.pop();
    gameBoard.children[tail].classList.remove("snake");

    let newHead;
    switch (direction) {
      case 0:
        newHead = head - boardSize; // Up
        break;
      case 1:
        newHead = head + 1; // Right
        break;
      case 2:
        newHead = head + boardSize; // Down
        break;
      case 3:
        newHead = head - 1; // Left
        break;
    }

    snake.unshift(newHead);

    if (newHead === food) {
      gameBoard.children[food].classList.remove("food");
      generateFood();
      snake.push(tail);
      gameBoard.children[tail].classList.add("snake");
      clearInterval(interval);
      intervalTime -= 15;
      interval = setInterval(moveSnake, intervalTime);
      score1 += 8; // Increase score by 8 when food is eaten
      updateScore1();
    }

    if (
      newHead >= cellCount ||
      newHead < 0 ||
      gameBoard.children[newHead].classList.contains("snake")
    ) {
      clearInterval(interval);
      alert("Game Over!");
      return;
    }

    gameBoard.children[newHead].classList.add("snake");
  }

  function generateFood() {
    do {
      food = Math.floor(Math.random() * cellCount);
    } while (gameBoard.children[food].classList.contains("snake"));

    gameBoard.children[food].classList.add("food");
  }

  document.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "ArrowUp":
        if (direction !== 2) direction = 0; // Up
        break;
      case "ArrowRight":
        if (direction !== 3) direction = 1; // Right
        break;
      case "ArrowDown":
        if (direction !== 0) direction = 2; // Down
        break;
      case "ArrowLeft":
        if (direction !== 1) direction = 3; // Left
        break;
    }
  });

  const restartButton = document.createElement("button");
  restartButton.textContent = "Restart Game";
  restartButton.addEventListener("click", restartGame);
  document.body.appendChild(restartButton);

  createBoard();
  startGame();
});


// Function to increment the player's score
function updateScore() {
  let points = 3; // Points earned after 1 minute

  // Check if a score already exists in localStorage
  if (localStorage.getItem('playerScore')) {
    // Retrieve the existing score and add the new points
    points += parseInt(localStorage.getItem('playerScore'));
  }

  // Store the updated score in localStorage
  localStorage.setItem('playerScore', points);

  // Display the updated score (optional)
  // document.getElementById('scoreDisplay').textContent = `Your Score: ${points}`;
}

// Call the updateScore function every minute (60,000 milliseconds)
setInterval(updateScore, 60000); // 60000 ms = 1 minute
