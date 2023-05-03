var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Set the initial position of the snake
var snake = [{ x: 10, y: 10 }];

// Set the initial direction of the snake
var direction = "right";

// Set the position of the food
var food = {
  x: Math.floor(Math.random() * 59) + 1,
  y: Math.floor(Math.random() * 39) + 1,
};

// Set the size of each cell in the game
var cellSize = 10;

// Set the animation speed
var animationSpeed = 80;

// Set the game over flag
var gameOver = false;

var score = 0;
function updateScore() {
  document.getElementById("score").textContent = score;
}

// Add an event listener for key presses
// Add an event listener for key presses
document.addEventListener("keydown", function (event) {
  if (event.key == "ArrowLeft" && direction != "right") {
    direction = "left";
  } else if (event.key == "ArrowUp" && direction != "down") {
    direction = "up";
  } else if (event.key == "ArrowRight" && direction != "left") {
    direction = "right";
  } else if (event.key == "ArrowDown" && direction != "up") {
    direction = "down";
  }
});

// Update the game state
function update() {
  if (gameOver) {
    return;
  }

  // Move the snake in the current direction
  var head = { x: snake[0].x, y: snake[0].y };
  if (direction == "left") {
    head.x--;
  } else if (direction == "up") {
    head.y--;
  } else if (direction == "right") {
    head.x++;
  } else if (direction == "down") {
    head.y++;
  }
  snake.unshift(head);

  // Check if the snake has collided with the walls or itself
  if (
    head.x < 0 ||
    head.x >= canvas.width / cellSize ||
    head.y < 0 ||
    head.y >= canvas.height / cellSize
  ) {
    gameOver = true;
    return;
  }
  for (var i = 1; i < snake.length; i++) {
    if (head.x == snake[i].x && head.y == snake[i].y) {
      gameOver = true;
      return;
    }
  }

  // Check if the snake has eaten the food
  if (head.x == food.x && head.y == food.y) {
    food.x = Math.floor(Math.random() * 59) + 1;
    food.y = Math.floor(Math.random() * 39) + 1;
  } else {
    snake.pop();
  }
}

// Draw the game state
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < snake.length; i++) {
    if (i == 0) {
      // Snake head
      ctx.fillStyle = "#27ae60";
      ctx.beginPath();
      ctx.arc(
        snake[i].x * cellSize + cellSize / 2,
        snake[i].y * cellSize + cellSize / 2,
        cellSize / 2,
        0,
        Math.PI * 2
      );
      ctx.fill();
    } else {
      // Snake body
      ctx.fillStyle = "#1abc9c";
      ctx.fillRect(
        snake[i].x * cellSize,
        snake[i].y * cellSize,
        cellSize,
        cellSize
      );
    }
  }

  // Draw the food
  ctx.fillStyle = "#c0392b";
  ctx.beginPath();
  ctx.arc(
    food.x * cellSize + cellSize / 2,
    food.y * cellSize + cellSize / 2,
    cellSize / 2,
    0,
    Math.PI * 2
  );
  ctx.fill();
}

// Start the animation loop
function loop() {
  update();
  draw();
  if (!gameOver) {
    setTimeout(loop, animationSpeed);
  }
}

loop();
