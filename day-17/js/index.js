'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var speed = document.querySelector('.lcd');
var key = document.querySelector('.key');
var race = true;
var sound = new Audio('https://cdn.rawgit.com/ManzDev/codevember2017/master/assets/coin.mp3');

var music2 = new Howl({
  src: ['https://cdn.rawgit.com/ManzDev/codevember2017/master/assets/playing-power-2.mp3'],
  loop: true
});

var music = new Howl({
  src: ['https://cdn.jsdelivr.net/gh/ManzDev/codevember2017/assets/playing-power.mp3?3'],
  onend: function onend() {
    if (player.turbo) music2.play();else this.play();
  }
}).play();

var Snail = function () {
  function Snail(element, max) {
    _classCallCheck(this, Snail);

    this.element = document.querySelector(element);
    this.x = 0;
    this.tired = 0;
    this.max = max;
    this.lastSpeed = 0;
    this.turbo = false;
  }

  Snail.prototype.start = function start() {
    this.element.classList.add('run');
  };

  Snail.prototype.update = function update() {

    if (this.tired == 1) {

      this.stop();
      this.timer = setTimeout(function () {
        this.start();
        this.tired = 0;
      }.bind(this), 500 + ~ ~(Math.random() * 1500));
    } else {
      this.tired = ~ ~(Math.random() * 50);

      // inc;
      this.x += this.inc();
      this.element.style.left = this.x + 'px';
    }

    if (this.x > 750) this.finish();
  };

  Snail.prototype.inc = function inc() {
    this.lastSpeed = ~ ~(Math.random() * this.max);
    return this.lastSpeed;
  };

  Snail.prototype.finish = function finish() {
    this.element.classList.add('winner');
    if (this.timer) clearTimeout(this.timer);
    race = false;

    var div = document.createElement('div');
    div.className = 'turnoff';
    document.body.appendChild(div);
  };

  Snail.prototype.stop = function stop() {
    this.element.classList.remove('run');
  };

  Snail.prototype.updateSpeed = function updateSpeed() {
    if (this.tired == 1) speed.textContent = 0;else speed.textContent = this.max;
  };

  Snail.prototype.enableTurbo = function enableTurbo() {
    sound.play();
    key.classList.add('off');
    this.turbo = true;
    this.max *= 3;
    this.element.classList.add('turbo');
  };

  return Snail;
}();

var player = new Snail('.snail1', 2),
    cpu = new Snail('.snail2', 2.5);

// Snail updates
player.start();
cpu.start();

setTimeout(showKey, 11500);

var eventEnableTurbo = function eventEnableTurbo(e) {
  if (e.keyCode == 84) player.enableTurbo();
};

function eventDisableTurbo() {
  key.classList.add('off');
  removeEventListener('keydown', eventEnableTurbo);
}

function showKey() {
  key.classList.remove('off');
  addEventListener('keydown', eventEnableTurbo);
  setTimeout(eventDisableTurbo, 2000);
}

function loop() {
  if (race) {
    requestAnimationFrame(loop);
    player.update();
    player.updateSpeed();
    cpu.update();
  }
}

loop();