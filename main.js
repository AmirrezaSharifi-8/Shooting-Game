/****************  CONSTANTS  ****************/
const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");
const w = window.innerWidth;
const h = window.innerHeight;
const mouse = {
  x: undefined,
  y: undefined,
};

/****************  VARIABLES  ****************/
let x = w / 2;
let y = 30;
let dx = 5;
let dy = 2;
let radius = 20;
let tirs = [];
let enemies = [];

/****************  CLASSES  ****************/
function Tir(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;

  this.draw = () => {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.stroke();
  };

  this.update = () => {
    this.x += this.dx;

    this.draw();
  };
}

function Enemy(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.killed = false;
  this.style = "blue";

  this.draw = () => {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.style;
    c.fill();
  };

  this.update = () => {
    if (this.x + this.radius < 0) {
      alert("You Lost");
      enemies = [];
      tirs = [];
    }

    this.x -= this.dx;

    this.draw();
  };
}

/****************  FUNCTIONS  ****************/
const clickFunc = (e) => {
  for (var i = 0; i < 3; i++) {
    tirs.push(new Tir(e.x, e.y, 20, 5, 10));
  }
};

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, w, h);

  tirs.forEach((tir) => tir.update());

  enemies.forEach((enemy) => enemy.update());

  enemies.forEach((enemy, i) => {
    tirs.forEach((tir, j) => {
      if (
        tirs[j].y >= enemies[i].y - enemies[i].radius &&
        tirs[j].y <= enemies[i].y + enemies[i].radius
      ) {
        if (
          tirs[j].x >= enemies[i].x - enemies[i].radius &&
          tirs[j].x <= enemies[i].x + enemies[i].radius
        ) {
          enemies = [
            ...enemies.slice(0, i),
            ...enemies.slice(i + 1, enemies.length),
          ];

          tirs = [...tirs.slice(0, j), ...tirs.slice(j + 1, tirs.length)];
        }
      }
    });
  });
}

/****************  EVENTS  ****************/
window.addEventListener("click", clickFunc);

/****************  Plain Code & Function calls  ****************/
canvas.width = w;
canvas.height = h;

setInterval(() => {
  enemies.push(new Enemy(w + 10, Math.random() * h, 2, 0, 30));
}, 2000);

animate();
