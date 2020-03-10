'use strict';

var canvas = document.querySelector('#rain');
var ctx = canvas.getContext('2d');
canvas.width = 175;
canvas.height = 310;

function clearScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

var music = undefined;
var boxes = document.querySelectorAll('.mgc-switch');
var cloud = document.querySelector('#cloud');
var god = document.querySelector('#god');
var totalDrops = 0;
var maxDrops = 500;
var rainColors = ['#7ab7dd', '#a4cee8', '#FFF', '#113d59', '#9da5aa'];

function newDrop() {
  return {
    x: ~ ~(Math.random() * canvas.width),
    y: ~ ~(Math.random() * canvas.height),
    height: ~ ~(Math.random() * 50),
    color: ~ ~(Math.random() * 5),
    update: function update() {
      this.x += ~ ~(Math.random() * 1);
      this.y += 1 + ~ ~(Math.random() * 25);
      if (this.y > canvas.height) this.y = ~ ~(Math.random() * 10);
    }
  };
}

// Init
var drops = [];
for (var i = 0; i < maxDrops; i++) {
  drops.push(newDrop());
}

// Update
function update() {
  for (var i = 0; i < totalDrops; i++) {
    drops[i].update();
  }clearScreen();
}

// Render
function draw() {
  if (~ ~(Math.random() * 75) == 1 && totalDrops > 400) {
    ctx.fillStyle = '#FFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  for (var i = 0; i < totalDrops; i++) {
    ctx.lineWidth = 1;
    ctx.strokeStyle = rainColors[drops[i].color];
    ctx.beginPath();
    ctx.moveTo(drops[i].x, drops[i].y);
    ctx.lineTo(drops[i].x, drops[i].y + drops[i].height);
    ctx.stroke();
  }
}

function loop() {
  requestAnimationFrame(loop, canvas);
  update();
  draw();
}

loop();

// Events
boxes.forEach(function (e) {
  e.onclick = checkBox.bind();
});

function checkBox() {

  // First time
  if (!music) {
    music = new Howl({
      src: ['https://manzdev.github.io/codevember2017/assets/tetris-a.mp3'],
      autoplay: false,
      loop: true
    }).play();
    god.classList.add('appear');
  }

  totalDrops = (boxes[0].checked ? 0 : 5) + (boxes[1].checked ? 25 : 0) + (boxes[2].checked ? 125 : 0) + (boxes[3].checked ? 170 : 0) + (boxes[4].checked ? 75 : 0) + (boxes[5].checked ? 100 : 0);

  if (totalDrops > 400) cloud.classList.add('verydark');else if (totalDrops > 250) {
    cloud.classList.add('dark');
    cloud.classList.remove('verydark');
  } else if (totalDrops < 250) cloud.classList.remove('dark', 'verydark');
}
