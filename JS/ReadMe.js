//size of the square, measured in pixels.
var tileSize = 25;
//how many tiles there are 
var tileCount = 32;

//score of the game
score = 0;

//for this case the board size would be 32 * 25 = 800px

var board;
var context; 

//initial speed of the snake.
var speed = 5;

//Snake head: this sets where the snake start from the table.
//In this case the tile size being 25 it will start from X = 125 and Y = 125
//If you want for it to start from the top LEFT corner set snakeX = 0 and snakeY = 0.

//It will iterate then from 25 to 25 
//E.G press down and it will go on Y axis, (0,0) ,(0, 25), (0,50) ....  
var snakeX = tileSize * 5;
var snakeY = tileSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

//food == a rectangle which is the size of a tile.
var foodX;
var foodY;

var gameOver = false;
var intervalSnake;

function InitialiseBoard() {
    board = document.getElementById("myGame");
    board.height = tileCount * tileSize;
    board.width = tileCount * tileSize;
    board.style.boxShadow = "50px 100px 120px";
    board.style.border=" solid 20px #98B4D4";
    board.style.borderStyle="inset";
}

function placeFood() {
    //(0-1) * cols -> (0-19.9999) -> (0-19) * 25
    foodX = Math.floor(Math.random() * tileCount) * tileSize;
    foodY = Math.floor(Math.random() * tileCount) * tileSize;
}

function SnakeOffTable(){
    return snakeX < 0 || snakeX > tileCount*tileSize || snakeY < 0 || snakeY > tileCount*tileSize
}

function SnakeAteItself(){
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            return true;
        }
    }
    return false;
}

function updateInterval()
{
    //update speed, with decimal point value.        
    speed += 0.5;
    //Every time a new interval is created and the old one is dropped.
    clearInterval(intervalSnake);
    intervalSnake = setInterval(update, 1000/speed);
}


//Code which executes when the window first loads. It can be triggered also by clicking TryAgain button.
window.onload = function() {
    InitialiseBoard();    
    ctx = board.getContext("2d"); //used for drawing on the screen

    placeFood();
    document.addEventListener("keyup", changeDirection);

    //Initially, update function is being called every 1 / 10th (100 miliseconds) of a second.    
    intervalSnake = setInterval(update, 1000/speed);    
}

function update() { 

    if (gameOver) {
        return;
    }

    //Draws the rectangle , the board in the beginning is black.
    //fillStyle property acts like a brush, you tell the context what color to draw with. 
    ctx.fillStyle="black";
    ctx.fillRect(0, 0, board.width, board.height);

    //Draws a smaller *red* rectangle on random coordinates, see placeFood method above.
    ctx.fillStyle="red";
    ctx.fillRect(foodX, foodY, tileSize, tileSize);

    //Checks whether snake reached the food. 
    
    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);        
        placeFood();
        gulpSound.play();
        
        score++;
        updateInterval() //here is where the speed of the snake is changed.   
    }

    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }

    //This gets called after the snake eats the first piece of food.
    //The new head of the snake is set to where the current position is. 
    if (snakeBody.length) {        
        snakeBody[0] = [snakeX, snakeY];
        
    }

    //Gets a green brush and draws the snake 
    function drawSnake(){
    ctx.fillStyle="#F3E5AB";
    snakeX += velocityX * tileSize;
    snakeY += velocityY * tileSize;
    ctx.fillRect(snakeX, snakeY, tileSize, tileSize);
    ctx.fillStyle="#6CBB3C"; //draw the snake tail
    for (let i = 0; i < snakeBody.length; i++) {
        ctx.fillRect(snakeBody[i][0], snakeBody[i][1], tileSize, tileSize);
    }
}
drawSnake();

    //game over conditions
    if (SnakeOffTable() || SnakeAteItself()) {
        gameOver = true;   
        gameOverSound.play();     
        ctx.font = "100px Georgia";
        ctx.fillStyle = "red";
        ctx.fillText("GAME OVER", board.width / 7.5, board.height / 2);
        ctx.font = "30px Verdana";
        ctx.fillText("YOUR SCORE: " + `${score}` , board.width / 2.8, board.height / 3);
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

//sounds
const gulpSound = new Audio("swallow.mp3");
const gameOverSound = new Audio("gameOver.wav");

