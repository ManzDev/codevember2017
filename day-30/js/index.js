'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var music = new Howl({
  src: ['https://manzdev.github.io/codevember2017/assets/maniac-mansion-by-kenneth-moller.mp3', 'https://manzdev.github.io/codevember2017/assets/maniac-mansion-by-kenneth-moller.ogg']
});
var c = document.querySelector('#canvas');
var ctx = c.getContext('2d');
c.width = innerWidth;
c.height = innerHeight;

var Particle = function () {
  function Particle() {
    _classCallCheck(this, Particle);

    this.init();
    this.count = 12;
    this.opacity = 1;
  }

  Particle.prototype.init = function init() {
    this.x = c.width / 2;
    this.y = c.height / 2;
    this.r = 10;
    this.dir = [-.075, .075][~ ~(Math.random() * 2)];
    this.update();
  };

  Particle.prototype.update = function update() {
    if (this.r > 12 || this.r < 10) {
      this.dir = -1 * this.dir;
      this.count--;
    }

    if (this.count < 0) this.update = this.enableExplode();

    this.r = this.r + this.dir;
    var gradient = ctx.createRadialGradient(c.width / 2, c.height / 2, 5, c.width / 2, c.height / 2, this.r);
    gradient.addColorStop(0, 'RGBA(255,255,255,1)');
    gradient.addColorStop(1, 'RGBA(0,0,255, 0)');
    this.color = gradient;
  };

  Particle.prototype.enableExplode = function enableExplode() {
    music.play();
    return function () {

      var gradient = ctx.createRadialGradient(c.width / 2, c.height / 2, 5, c.width / 2, c.height / 2, this.r);
      gradient.addColorStop(0, 'RGBA(255,255,255,1)');
      gradient.addColorStop(1, 'RGBA(0,0,255, 0)');
      this.color = gradient;

      if (this.r < 1500) {
        this.r = this.r + Math.max(0.025 * this.r, 0.025);
      }
      if (this.r > 35) this.r = this.r * 1.2;

      if (this.r > 8000) this.update = this.delay;
    };
  };

  Particle.prototype.delay = function delay() {
    ctx.fillStyle = '#FFF';
    ctx.fillRect(0, 0, c.width, c.height);
    setTimeout(function () {
      this.update = this.switchoff;
    }.bind(this), 1500);
  };

  Particle.prototype.switchoff = function switchoff() {
    this.opacity = this.opacity - 0.0025;
    this.color = 'rgba(255, 255, 255, ' + this.opacity + ')';
  };

  Particle.prototype.draw = function draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fill();
  };

  return Particle;
}();

var Stars = function () {
  function Stars() {
    _classCallCheck(this, Stars);

    this.stars = [];
    this.maxStars = 500;
    for (var i = 0; i < this.maxStars; i++) {
      // star(x, y, speed)
      this.stars.push({
        x: ~ ~(Math.random() * c.width),
        y: ~ ~(Math.random() * c.height),
        speed: ~ ~(1 + Math.random() * 5),
        color: ~ ~(Math.random() * 3)
      });
    }
  }

  Stars.prototype.draw = function draw() {
    for (var i = 0; i < this.maxStars; i++) {
      var s = this.stars[i];
      ctx.lineWidth = 1;
      ctx.strokeStyle = ['#444', '#888', '#FFF'][this.stars[i].color];
      ctx.strokeRect(s.x, s.y, 1, 1);
    }
  };

  Stars.prototype.update = function update() {
    for (var i = 0; i < this.maxStars; i++) {
      this.stars[i].x -= this.stars[i].speed;
      if (this.stars[i].x < 0) this.stars[i].x = c.width;
    }
  };

  return Stars;
}();

var particle = new Particle();
var stars = new Stars();

// Functions

function clearScreen() {
  ctx.clearRect(0, 0, c.width, c.height);
}

function update() {
  stars.update();
  particle.update();
}

function draw() {
  stars.draw();
  particle.draw();
}

function loop() {
  clearScreen();
  requestAnimationFrame(loop);
  update();
  draw();
}

loop();
