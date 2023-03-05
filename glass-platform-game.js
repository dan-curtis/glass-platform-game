// Get the canvas element
var canvas = document.getElementById("canvas");

// Set the canvas context to 2d
var ctx = canvas.getContext("2d");

var leftPressed = false;
var rightPressed = false;

// Set the variables for the platform
var platform = {
  x: canvas.width / 2 - 50,
  y: canvas.height - 20,
  width: 100,
  height: 10,
  speed: 10,
  color: "blue",
  weight: 0,
  maxWeight: 50
};

// Set the variables for the animals
var animals = [
  {
    type: "Elephant",
    x: 50,
    y: 0,
    width: 50,
    height: 50,
    speedX: 5,
    speedY: 10,
    weight: 10,
    color: "gray"
  },
  {
    type: "Rhino",
    x: 150,
    y: 0,
    width: 50,
    height: 50,
    speedX: 8,
    speedY: 12,
    weight: 8,
    color: "gray"
  },
  {
    type: "Tiger",
    x: 250,
    y: 0,
    width: 50,
    height: 50,
    speedX: 10,
    speedY: 15,
    weight: 6,
    color: "orange"
  },
  {
    type: "Monkey",
    x: 350,
    y: 0,
    width: 50,
    height: 50,
    speedX: 12,
    speedY: 18,
    weight: 4,
    color: "brown"
  }
];

// Set the variables for the game
var score = 0;
var multiplier = 1;
var gameOver = false;
var gamePaused = false;

// Draw the platform
function drawPlatform() {
    ctx.beginPath();
    ctx.rect(platform.x, platform.y, platform.width, platform.height);
    ctx.fillStyle = platform.color;
    ctx.fill();
    ctx.closePath();
  }
  
  // Draw the animals
  function drawAnimals() {
    for (var i = 0; i < animals.length; i++) {
      ctx.beginPath();
      ctx.rect(animals[i].x, animals[i].y, animals[i].width, animals[i].height);
      ctx.fillStyle = animals[i].color;
      ctx.fill();
      ctx.closePath();
    }
  }
  
  // Move the platform
  function movePlatform() {
    if (gamePaused) {
      return;
    }
  
    if (leftPressed && platform.x > 0) {
      platform.x -= platform.speed;
    } else if (rightPressed && platform.x < canvas.width - platform.width) {
      platform.x += platform.speed;
    }
  }
  
  // Move the animals
  function moveAnimals() {
    for (var i = 0; i < animals.length; i++) {
      animals[i].y += animals[i].speedY;
  
      if (animals[i].y > canvas.height) {
        animals[i].y = 0;
        animals[i].x = Math.random() * (canvas.width - animals[i].width);
      }
  
      if (
        animals[i].x < platform.x + platform.width &&
        animals[i].x + animals[i].width > platform.x &&
        animals[i].y + animals[i].height > platform.y
      ) {
        platform.weight += animals[i].weight;
        animals[i].y = 0;
        animals[i].x = Math.random() * (canvas.width - animals[i].width);
      }
    }
  }
  
  // Check for game over
  function checkGameOver() {
    if (platform.weight >= platform.maxWeight) {
      gameOver = true;
      alert("Game Over!");
    }
  }
  
  // Update the score
  function updateScore() {
    score += platform.weight * multiplier;
    multiplier += 0.1;
  }
  
  // Draw the score
  function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + score, 10, 20);
  }
  
  // Draw the game
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlatform();
    drawAnimals();
    movePlatform();
    moveAnimals();
    checkGameOver();
    updateScore();
    drawScore();
  
    if (!gameOver) {
      requestAnimationFrame(draw);
    }
    canvas.focus();
  }
  
  // Handle keyboard input
  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);


  function keyDownHandler(e) {
    if (e.key == "Left" || e.key == "ArrowLeft") {
      leftPressed = true;
    } else if (e.key == "Right" || e.key == "ArrowRight") {
      rightPressed = true;
    }
  }
  
  function keyUpHandler(e) {
    if (e.key == "Left" || e.key == "ArrowLeft") {
      leftPressed = false;
    } else if (e.key == "Right" || e.key == "ArrowRight") {
      rightPressed = false;
    }
  }
  
  // Start the game
  draw();