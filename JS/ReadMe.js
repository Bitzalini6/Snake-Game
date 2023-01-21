var tileSize = 25;
var tileCount = 32;
var board;
var context; 
var speed = 10;

//snake head
var snakeX = tileSize * 5;
var snakeY = tileSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

//food
var foodX;
var foodY;

var gameOver = false;

window.onload = function() {
    board = document.getElementById("myGame");
    board.height = tileCount * tileSize;
    board.width = tileCount * tileSize;
    ctx = board.getContext("2d"); //used for drawing on the screen

    placeFood();
    document.addEventListener("keyup", changeDirection);
    // update();
    setInterval(update, 1000/speed); //100 milliseconds
}

function update() {
    if (gameOver) {
        return;
    }

    ctx.fillStyle="black";
    ctx.fillRect(0, 0, board.width, board.height);

    ctx.fillStyle="red";
    ctx.fillRect(foodX, foodY, tileSize, tileSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
    }

    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    ctx.fillStyle="#6CBB3C";
    snakeX += velocityX * tileSize;
    snakeY += velocityY * tileSize;
    ctx.fillRect(snakeX, snakeY, tileSize, tileSize);
    for (let i = 0; i < snakeBody.length; i++) {
        ctx.fillRect(snakeBody[i][0], snakeBody[i][1], tileSize, tileSize);
    }

    //game over conditions
    ctx.font = "100px Georgia";
    if (snakeX < 0 || snakeX > tileCount*tileSize || snakeY < 0 || snakeY > tileCount*tileSize) {
        gameOver = true;
        ctx.fillText("GAME OVER", board.width / 6, board.height / 2);
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            ctx.fillText("GAME OVER", board.width / 2, board.height / 6);
        }
    }
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}


function placeFood() {
    //(0-1) * cols -> (0-19.9999) -> (0-19) * 25
    foodX = Math.floor(Math.random() * tileCount) * tileSize;
    foodY = Math.floor(Math.random() * tileCount) * tileSize;
}

//CSS
const boardCss = document.getElementById("myGame");
boardCss.style.boxShadow = "50px 100px 120px"
const myButton = document.querySelector("#tryAgain");
myButton.style.fontSize = "16px";
myButton.style.backgroundColor = "#4CAF50";
myButton.style.border = "none";
myButton.style.color = "white";
myButton.style.padding = "10px 22px";
myButton.style.fontWeight = "900";

