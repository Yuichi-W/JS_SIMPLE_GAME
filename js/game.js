var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

var player = {
  x: canvas.width / 2,
  y: canvas.height - 20,
  width: 30,
  height: 30,
  speed: 5
};

var bullets = [];
var enemies = [];

var keys = {};

document.addEventListener("keydown", function (event) {
  keys[event.key] = true;
});

document.addEventListener("keyup", function (event) {
  keys[event.key] = false;
});

function drawPlayer() {
  ctx.beginPath();
  ctx.rect(player.x, player.y, player.width, player.height);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawBullets() {
  for (var i = 0; i < bullets.length; i++) {
    ctx.beginPath();
    ctx.rect(bullets[i].x, bullets[i].y, bullets[i].width, bullets[i].height);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
  }
}

function drawEnemies() {
  for (var i = 0; i < enemies.length; i++) {
    ctx.beginPath();
    ctx.rect(enemies[i].x, enemies[i].y, enemies[i].width, enemies[i].height);
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.closePath();
  }
}

function movePlayer() {
  if (keys["ArrowLeft"] && player.x > 0) {
    player.x -= player.speed;
  }
  if (keys["ArrowRight"] && player.x < canvas.width - player.width) {
    player.x += player.speed;
  }
}

function moveBullets() {
  for (var i = 0; i < bullets.length; i++) {
    bullets[i].y -= bullets[i].speed;
  }
}

function moveEnemies() {
  for (var i = 0; i < enemies.length; i++) {
    enemies[i].y += enemies[i].speed;
  }
}

function shoot() {
  bullets.push({
    x: player.x + player.width / 2 - 5,
    y: player.y - 10,
    width: 10,
    height: 10,
    speed: 5
  });
}

function spawnEnemy() {
  enemies.push({
    x: Math.random() * (canvas.width - 30),
    y: 0,
    width: 30,
    height: 20,
    speed: Math.random() * 1 + 1
  });
}

function update() {
  movePlayer();
  moveBullets();
  moveEnemies();
  detectCollisions();
  // spawnEnemy(); // 新たに追加
  draw();
}

function detectCollisions() {
  for (var i = 0; i < bullets.length; i++) {
    for (var j = 0; j < enemies.length; j++) {
      if (
        bullets[i].x < enemies[j].x + enemies[j].width &&
        bullets[i].x + bullets[i].width > enemies[j].x &&
        bullets[i].y < enemies[j].y + enemies[j].height &&
        bullets[i].y + bullets[i].height > enemies[j].y
      ) {
        bullets.splice(i, 1);
        enemies.splice(j, 1);
      }
    }
  }

  for (var i = 0; i < enemies.length; i++) {
    if (enemies[i].y > canvas.height) {
      enemies.splice(i, 1);
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawBullets();
  drawEnemies();
}

setInterval(update, 20);
setInterval(function () {
  spawnEnemy();
  if (enemies.length > 20) {
    enemies.shift();
  }
}, 1000);

var keys = {};
document.addEventListener("keydown", function (e) {
  keys[e.key] = true;
  if (e.key === " ") {
    shoot();
  }
});

document.addEventListener("keyup", function (e) {
  keys[e.key] = false;
});
