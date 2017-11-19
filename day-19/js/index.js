'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var canvas = document.querySelector('#canvas');
var ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
var song = document.querySelector('#song');
setTimeout(function () {
  song.play();
}, 1000);

var horizont = canvas.height / 2;
var totalwaves = 70,
    totalfishes = 30,
    totalclouds = 10;
var fishImg = document.createElement('img');
fishImg.src = 'https://cdn.rawgit.com/ManzDev/codevember2017/master/assets/fishes.png';
var cloudsParent = document.querySelector('.clouds');

function clearScreen() {
  ctx.clearRect(0, horizont, canvas.width, canvas.height);
}

function drawSea() {
  ctx.globalAlpha = 0.65;
  ctx.fillStyle = '#254a6b';
  ctx.fillRect(0, horizont, canvas.width, canvas.height);
  ctx.globalAlpha = 1.0;
}

function rnd(min, max) {
  return min + ~ ~(Math.random() * (max - min));
}

var Wave = function () {
  function Wave(x, y) {
    _classCallCheck(this, Wave);

    this.x = x;
    this.y = y;
    this.size = rnd(5, 40) * rnd(1, 5);
    this.small = true;
    this.color = ['#4591a8', '#5ba4ba', '#316b7c'][rnd(0, 3)];
    this.speed = 10;
  }

  Wave.prototype.update = function update() {
    if (this.speed > 0) {
      this.speed--;
      return;
    } else this.speed = 10;

    if (this.small) {
      this.x -= 2;
      this.size += 4;
      this.small = false;
    } else {
      this.x += 2;
      this.size -= 4;
      this.small = true;
    }
  };

  Wave.prototype.draw = function draw() {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.size, this.y);
    ctx.stroke();
  };

  return Wave;
}();

var Cloud = function () {
  function Cloud() {
    _classCallCheck(this, Cloud);

    this.type = rnd(1, 4);
    this.x = rnd(-256, canvas.width);
    this.y = rnd(0, 64);
    this.rate = 3;

    // element
    this.cloud = document.createElement('div');
    this.cloud.className = 'cloud type' + this.type;
    cloudsParent.appendChild(this.cloud);
  }

  Cloud.prototype.generate = function generate() {
    this.x = rnd(-512, -256);
    this.y = rnd(0, 64);
  };

  Cloud.prototype.update = function update() {
    if (this.rate > 0) {
      this.rate--;
      return;
    } else this.rate = 3;

    this.x += 1;

    if (this.x > canvas.width + 256) this.generate();
  };

  Cloud.prototype.draw = function draw() {
    this.cloud.style.left = this.x + 'px';
    this.cloud.style.top = this.y + 'px';
  };

  return Cloud;
}();

var Fish = function () {
  function Fish() {
    _classCallCheck(this, Fish);

    this.type = rnd(0, 3);
    this.size = 128;
    this.generate();
  }

  Fish.prototype.generate = function generate() {
    this.x = -512 + rnd(0, 512);
    this.y = rnd(horizont, canvas.height - 128);
  };

  Fish.prototype.update = function update() {
    if (this.y > horizont + 5) this.y += rnd(-1, 2);else this.y += rnd(0, 2);

    this.x += rnd(0, 3);

    if (this.x > canvas.width + 256) this.generate();
  };

  Fish.prototype.draw = function draw() {
    ctx.drawImage(fishImg, 128, 128 * this.type, 128, 128, this.x, this.y, 64, 64);
  };

  return Fish;
}();

ctx.beginPath();
ctx.lineWidth = 2;
ctx.strokeStyle = '#074659';
ctx.moveTo(0, horizont - 1);
ctx.lineTo(canvas.width, horizont - 1);
ctx.stroke();

// Init
var waves = [],
    fishs = [],
    clouds = [];

for (var i = 0; i < totalwaves; i++) {
  waves[i] = new Wave(rnd(0, canvas.width), rnd(horizont + 1, canvas.height));
}for (var i = 0; i < totalfishes; i++) {
  fishs[i] = new Fish();
}for (var i = 0; i < totalclouds; i++) {
  clouds[i] = new Cloud();
}fishs[totalfishes - 1].type = 3;
fishs[totalfishes - 1].x = -640;

// Loop
function update() {

  for (var i = 0; i < totalwaves; i++) {
    waves[i].update();
  }for (var i = 0; i < totalfishes; i++) {
    fishs[i].update();
  }for (var i = 0; i < totalclouds; i++) {
    clouds[i].update();
  }
}

function draw() {

  clearScreen();

  for (var i = 0; i < totalfishes; i++) {
    fishs[i].draw();
  }for (var i = 0; i < totalwaves; i++) {
    waves[i].draw();
  }for (var i = 0; i < totalclouds; i++) {
    clouds[i].draw();
  }drawSea();
}

function loop() {
  requestAnimationFrame(loop);
  update();
  draw();
}

loop();