let width = 633;
let height = 357;

let player = {
  x: 0,
  y: height - 40,
  size: 40,
  velocity: 2,
};

let enemies = [];
let enemySize = 45;

let bullets = [];
let bulletSize = 4;
let bulletWidth = 6;
let bulletHeight = 16;
let score = 0;

let lastTime = null;

let backgroundImage;
let laserGun;
let laserImage;
let asteroidImage;
let backgroundMusic;
let shotSound;

function preload() {
    backgroundImage = loadImage('assets/images/background.jpg');
    laserGun = loadImage('assets/images/laser-gun.png')
    laserImage = loadImage('/assets/images/laser.png');
    asteroidImage = loadImage('assets/images/asteroid.png');
  
    backgroundMusic = loadSound('assets/sounds/base-sound.mp3');
    shotSound = loadSound('assets/sounds/laser-gun.mp3');
}

function setup() {
    backgroundMusic.play()
    backgroundMusic.setVolume(0.4);
    createCanvas(width, height);
    frameRate(30);
    insertEnemy();
    lastTime = millis();
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
    shotSound.play();
    insertBullet();
}

function drawScore() {
  fill(0, 0, 150);
  textSize(20);
  text(`Pontuação: ${score}`, 10, 30);
}

function drawPlayer() {
    let { x, y, size } = player;
    
    push();
    image(laserGun, x, y, size, size);
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
        image(asteroidImage, x, y, enemySize, enemySize);
    }
    
    pop();
}

function drawBullets() {
    push(); 
    
    for (let bullet of bullets) {
        const { x, y } = bullet;
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