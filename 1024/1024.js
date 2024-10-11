let grid = [];
const gridSize = 4; // 4x4 grid
let score1 = 0;

function initializeGrid() {
  grid = [];
  for (let i = 0; i < gridSize; i++) {
    grid[i] = [];
    for (let j = 0; j < gridSize; j++) {
      grid[i][j] = 0;
    }
  }
}


function applyTileColors() {
    const cells = document.querySelectorAll('.grid-cell');
    cells.forEach(cell => {
      const value = parseInt(cell.textContent);
      cell.style.backgroundColor = getColorForValue(value);
    });
  }
  
  // Function to get color for a specific tile value
  function getColorForValue(value) {
    switch (value) {
      case 2:
        return '#badaf9'; /* Lighter blue */
      case 4:
        return '#9acbf4';
      case 8:
        return '#7aabeef';
      case 16:
        return '#5a9ce9';
      case 32:
        return '#3a8ddf';
      case 64:
        return '#197ee4';
      case 128:
        return '#156fca';
      case 256:
        return '#125fb0';
      case 512:
        return '#0e4f97';
      case 1024:
        return '#0b3f7d';
      case 2048:
        return '#082f63'; /* Darkest blue */
      default:
        return '#d9e6f2'; /* Default color */
    }
  }
  



function displayGrid() {
    const gridContainer = document.getElementById('gridContainer');
    gridContainer.innerHTML = '';
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const cell = document.createElement('div');
        cell.className = 'grid-cell';
        cell.textContent = grid[i][j] === 0 ? '' : grid[i][j];
        gridContainer.appendChild(cell);
      }
    }
    applyTileColors(); // Apply colors after displaying the grid
  }

function generateNewTile() {
  const emptyCells = [];
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (grid[i][j] === 0) {
        emptyCells.push({ row: i, col: j });
      }
    }
  }

  if (emptyCells.length > 0) {
    const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    grid[row][col] = Math.random() < 0.9 ? 2 : 4;
  }
}

function startGame() {
    initializeGrid();
    
    // Pre-fill some initial tiles for demonstration
    grid[1][1] = 2;
    grid[2][2] = 4;
    grid[3][1] = 2;
    
    displayGrid();
  }

// Call startGame when the page loads
window.onload = startGame;

function updateScore1() {
    const scoreElement = document.getElementById('currentScore');
    scoreElement.textContent = score1;
  }

  function restartGame() {
  score1 = 0; // Reset score1
  startGame(); // Restart the game
  updateScore1(); // Update the score display
}

// Call restartGame when the Restart button is clicked
document.getElementById('startButton').addEventListener('click', restartGame);

function isGameOver() {
    // Check for available moves (empty cells or potential merges)
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (grid[i][j] === 0) {
          // Found an empty cell, game is not over
          return false;
        } else if (
          (i < gridSize - 1 && grid[i][j] === grid[i + 1][j]) ||
          (j < gridSize - 1 && grid[i][j] === grid[i][j + 1])
        ) {
          // Found a merge possibility, game is not over
          return false;
        }
      }
    }
    // No available moves, game is over
    return true;
  }
  


  function moveTiles(direction) {
    let moved = false;
  
    function canMove(row, col, nextRow, nextCol) {
      return grid[nextRow][nextCol] === 0 || grid[nextRow][nextCol] === grid[row][col];
    }
  
    function move(row, col, nextRow, nextCol) {
      if (grid[nextRow][nextCol] === 0) {
        grid[nextRow][nextCol] = grid[row][col];
        grid[row][col] = 0;
      } else if (grid[nextRow][nextCol] === grid[row][col]) {
        grid[nextRow][nextCol] *= 2;
        grid[row][col] = 0;
        score1 += grid[nextRow][nextCol];
      }
      moved = true;
    }
  
    function slideTile(row, col, dr, dc) {
      let currentRow = row;
      let currentCol = col;
  
      while (currentRow + dr >= 0 && currentRow + dr < gridSize &&
            currentCol + dc >= 0 && currentCol + dc < gridSize) {
        let nextRow = currentRow + dr;
        let nextCol = currentCol + dc;
  
        if (grid[currentRow][currentCol] !== 0) {
          if (canMove(currentRow, currentCol, nextRow, nextCol)) {
            move(currentRow, currentCol, nextRow, nextCol);
          }
        }
  
        currentRow = nextRow;
        currentCol = nextCol;
      }
    }
  
    function slideTiles() {
      switch (direction) {
        case 'up':
          for (let col = 0; col < gridSize; col++) {
            for (let row = 1; row < gridSize; row++) {
              slideTile(row, col, -1, 0);
            }
          }
          break;
        case 'down':
          for (let col = 0; col < gridSize; col++) {
            for (let row = gridSize - 2; row >= 0; row--) {
              slideTile(row, col, 1, 0);
            }
          }
          break;
        case 'left':
          for (let row = 0; row < gridSize; row++) {
            for (let col = 1; col < gridSize; col++) {
              slideTile(row, col, 0, -1);
            }
          }
          break;
        case 'right':
          for (let row = 0; row < gridSize; row++) {
            for (let col = gridSize - 2; col >= 0; col--) {
              slideTile(row, col, 0, 1);
            }
          }
          break;
      }
    }
  
    slideTiles();
  
    if (moved) {
      generateNewTile();
      displayGrid();
      updateScore1();
    }
  }

  function handleKeyPress(event) {
    if (!isGameOver()) {
      switch (event.key) {
        case 'ArrowUp':
          moveTiles('up');
          break;
        case 'ArrowDown':
          moveTiles('down');
          break;
        case 'ArrowLeft':
          moveTiles('left');
          break;
        case 'ArrowRight':
          moveTiles('right');
          break;
      }
    }
  }  

  document.addEventListener('keydown', handleKeyPress);


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