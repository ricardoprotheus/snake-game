let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
};
let direction = "right"; 
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

// Create the Background of Canvas
function createBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
};

// Create the Snake on Canvas
function createSnake() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
};

// 
function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

// Captute the Keybords for indentification the key press
document.addEventListener('keydown', update);

// Control of Direction
function update(event) {

    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";

};


// Initialize the Game
function startGame() {

    // Control of limites of Canvas, out on right and enter on left 
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    // Collision Test
    for (i = 1; i < snake.length; i++) {

        // If Collision for trust
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            // Terminate the Game
            clearInterval(startGame);
            alert("Game Over ... :(");
        };
        
    };

    // Execute Draw Background of Canvas
    createBG();
    // Execute Draw Snake on Canvas
    createSnake(); 
    // Execute Draw Food on Canvas of forme random
    drawFood();

    // Inicialize coordenates
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Informe the direction of Snake
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    // For Control of Game
    if (snakeX != food.x || snakeY != food.y) {
        // Remove the last position
        snake.pop();        
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    // Render new Head of Snake
    let newHead = {
        x: snakeX,
        y: snakeY
    };

    //
    snake.unshift(newHead);

};

let game = setInterval(startGame, 100);