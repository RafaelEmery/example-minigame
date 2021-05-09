let width = 633;
let height = 357;

let player = {
  x: 0,
  y: height - 10,
  size: 20,
  velocity: 2,
};

let enemies = [];
let enemySize = 20;

let bullets = [];
let bulletWidth = 4;
let bulletHeight = 10;
let score = 0;

let lastTime = null;

let backgroundImage;
let laserImage;
let backgroundMusic;
let shotSound;

function preload() {
    backgroundImage = loadImage('assets/background.jpg');
    laserImage = loadImage('/assets/laser.png');
    backgroundMusic = loadSound('assets/base-sound.mp3');
    shotSound = loadSound('assets/laser-gun.mp3');
}

function setup() {
    // let gameScreen = createCanvas(width, height);
    // gameScreen.mousePressed(gameIsRunning);

    createCanvas(width, height);
    frameRate(30);
    insertEnemy();
    lastTime = millis();
}

function gameIsRunning() {
    backgroundMusic.play();
}

function draw() { 
    background(backgroundImage);

    push();
    rectMode(CENTER);
    drawEnemies();
    drawPlayer();
    drawBullets();
    drawScore();
    pop();
    
    update();
}

function update() {
    updatePlayer();
    updateEnemies();
    updateBullets();
    checkCollisions();
}

function mouseClicked() {
    // shotSound.play();
    insertBullet();
}

function drawScore() {
  text(`Pontuação: ${score}`, 10, 20);
}

function drawPlayer() {
    let { x, y, size } = player;
    
    push();
    rect(x, y, size, size);
    fill(color(255, 0, 0));
    rect(x, y - size/2, bulletSize, bulletSize);
    pop();
}

function insertEnemy() {
    enemies.push({
        x: random(width),
        y: 0,
    });
}

function insertBullet() {
    let { x, y, size } = player;
    bullets.push({
        x,
        y: y - size/2
    });
}

function drawEnemies() {
    push(); 
    fill(color(0, 0, 0));
    
    for (let enemy of enemies) {
        const { x, y } = enemy;
        rect(x, y, enemySize, enemySize);
    }
    
    pop();
}

function drawBullets() {
    push(); 
    // fill(color(255, 255, 0));

    
    for (let bullet of bullets) {
        const { x, y } = bullet;
        // rect(x, y, bulletSize, bulletSize);
        image(laserImage, x, y, bulletWidth, bulletHeight);
    }
    
    pop();
}

function checkCollisions() {
    enemies = enemies.filter(
        enemy => {
        const collided = isColliding(enemy);
        if (collided) {
        score++; 
        }
        return !collided;
        }
    );
}

function isColliding (enemy) {
    return bullets.some(
        bullet => {
        return rectCollision(
            enemy.x, enemy.y, enemySize, enemySize,
            bullet.x, bullet.y, bulletSize, bulletSize
        );
        }
    );
}

function updateEnemies() {
    let currentTime = millis();
    
    if ((currentTime - lastTime) >= 2000) {
        insertEnemy();
        lastTime = millis();
    }
    
    for (let enemy of enemies) {
        const { x, y } = enemy;
        enemy.y += 2;
    }
}

function updateBullets() {
    for (let bullet of bullets) {
        const { x, y } = bullet;
        bullet.y -= 4;
    }
}

function updatePlayer() {
    player.x = mouseX;
    // player.y = mouseY;
}

function rectCollision(x1, y1, w1, h1, x2, y2, w2, h2) {
    // verifica colisão de retangulos
    return (
        (x1 + w1 >= x2) &&
        (x1 <= x2 + w2) &&
        (y1 + h1 >= y2) &&
        (y1 <= y2 + h2) 
    );  
}