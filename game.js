//2D canvas
const cvs = document.getElementById('game');
const ctx = cvs.getContext('2d');

//game state
let gameOver = false;

//box pixels
const box = 32;

//audio files
const left = new Audio();
left.src = 'audio/left.mp3';

const up = new Audio();
up.src = 'audio/up.mp3';

const right = new Audio();
right.src = 'audio/right.mp3';

const down = new Audio();
down.src = 'audio/down.mp3';

const eat = new Audio();
eat.src = 'audio/eat.mp3';

const dead = new Audio();
dead.src = 'audio/dead.mp3';


//Background image
const bg = new Image();
bg.src = 'img/ground.png';

//Food Image
const foodImage = new Image();
foodImage.src = 'img/food.png';

//Game Variables
let snake, food, score, game;

//Initialize game
initGame();

//get a random position for food
function generateFood() {
    return {
        x: Math.floor(Math.random() * 17 + 1) * box,
        y: Math.floor(Math.random() * 15 + 3) * box
    }
}

//draw game on canvas
function draw() {
    //draw background
    ctx.drawImage(bg, 0, 0);

    //draw score
    ctx.fillStyle = 'white';
    ctx.font = '45px Change one';
    ctx.fillText(score, 2.5*box, 1.6*box);

    //draw snake
    for (let i = 0; i < snake.length; i++) {
        let p = snake[i];
        //draw box
        ctx.fillStyle = (i === 0) ? 'green' : 'white';
        ctx.fillRect(p.x, p.y, box, box);

        //draw stroke
        ctx.strokeStyle = 'red';
        ctx.strokeRect(p.x, p.y, box, box);
    }

    //draw food
    ctx.drawImage(foodImage, food.x, food.y, 0.95*box, 0.95*box);

    //old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //direction to move snake
    switch (d) {
        case 'left':
            snakeX -= box;
            break;
        case 'right':
            snakeX += box;
            break;
        case 'up':
            snakeY -= box;
            break;
        case 'down':
            snakeY += box;
            break;
    }

    //add new head
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    //snake eats food collision
    if (snakeX === food.x && snakeY === food.y) {
        eat.play();
        score++;
        food = generateFood();
    } else {
        //remove tail
        snake.pop();
    }

    //check for collision to end game
    checkForCollision(newHead, snake);    

    //add new head
    snake.unshift(newHead);
}


//checks for any collision to lose the game
function checkForCollision(newHead, snake) {
    //check collision for board boundaries
    if (newHead.x < box || newHead.x > 17*box || newHead.y < 3*box || newHead.y > 17*box) {
        endGame();
    }

    //check collision for snake with itself
    for (let i = 0; i < snake.length; i++) {
        if (newHead.x === snake[i].x && newHead.y === snake[i].y) {
            endGame();
        }
    }

}

//Ends the game
function endGame() {
    dead.play();
    gameOver = true;
    clearInterval(game);
}


/* Control Snake */
//even listener for up, right, down, left
document.addEventListener('keydown', direction);

//Tell snake which direction to move in
let d = null;
function direction(event) {
    if (gameOver) {
        gameOver = false;
        initGame();
    }
    let key = event.keyCode;
    if (key === 37 && d != 'right') {
        d = 'left';
        left.play();
    } else if (key === 38 && d != 'down') {
        d = 'up';
        up.play();
    } else if (key === 39 && d != 'left') {
        d = 'right';
        right.play();
    } else if (key === 40 && d != 'up') {
        d = 'down';
        down.play();
    }
}

//runs the game and draw methods
function runGame() {
    game = setInterval(draw, 100);
}


//initalize game
function initGame() {
    //score
    score = 0;

    //snake
    snake = [];
    snake[0] = {
        x: 9 * box,
        y: 10 * box
    }

    //food
    food = generateFood();
    //make sure food cannot be on same tile as snake when game starts
    while (food.x === snake[0].x && food.y === snake[0].y) {
        food = generateFood();
    }

    //run game
    runGame();
}