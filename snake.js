const canvas = document.getElementById('snakeGame');
const ctx = canvas.getContext('2d');
const box = 20;
const canvasSize = canvas.width / box;

let snake = [];
snake[0] = { x: 10 * box, y: 10 * box };

let food = {
    x: Math.floor(Math.random() * canvasSize) * box,
    y: Math.floor(Math.random() * canvasSize) * box
};

let score = 0;
let direction = { x: 0, y: 0 }; // Direction is now an object

document.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const headX = snake[0].x + box / 2;
    const headY = snake[0].y + box / 2;

    const deltaX = mouseX - headX;
    const deltaY = mouseY - headY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        direction.x = deltaX > 0 ? box : -box;
        direction.y = 0;
    } else {
        direction.x = 0;
        direction.y = deltaY > 0 ? box : -box;
    }
});

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);

    // Draw the snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? 'green' : 'white';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    // Snake movement
    const snakeX = snake[0].x + direction.x;
    const snakeY = snake[0].y + direction.y;

    const newHead = {
        x: snakeX,
        y: snakeY
    };

    // Check collision with the walls or itself
    if (snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
    }

    snake.unshift(newHead);

    // Check if snake eats the food
    if (snakeX === food.x && snakeY === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * canvasSize) * box,
            y: Math.floor(Math.random() * canvasSize) * box
        };
    } else {
        snake.pop();
    }

    // Draw the score
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, box, box);
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

const game = setInterval(draw, 100);
