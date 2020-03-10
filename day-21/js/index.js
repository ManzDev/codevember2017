'use strict';

var music = new Howl({
  src: ['https://manzdev.github.io/codevember2017/assets/eye-tiger.mp3'],
  loop: true
});

var boxing = new Howl({
  src: ['https://manzdev.github.io/codevember2017/assets/boxing.mp3']
});

var intro = new Howl({
  src: ['https://manzdev.github.io/codevember2017/assets/eye-tiger-intro.mp3'],
  autoplay: true,
  onend: function onend() {
    music.play();
  }
});

var _document$querySelect = document.querySelectorAll('.player');

var p1 = _document$querySelect[0];
var p2 = _document$querySelect[1];

var crowd = document.querySelector('.crowd');
var crowd2 = document.querySelector('.crowd2');
var data = document.querySelector('.data');

setTimeout(function () {
  data.classList.add('off');
  boxing.play();
}, 8000);

function getRandomEmoji() {
  return String.fromCharCode(55357, 56832 + ~ ~(Math.random() * 69));
}

p1.textContent = getRandomEmoji();
p2.textContent = getRandomEmoji();

var people = [],
    maxPeople = 200;

for (var i = 0; i < 200; i++) {
  crowd.textContent += getRandomEmoji();
  crowd2.textContent += getRandomEmoji();
}

function update(player) {

  //console.log('Updating...');
  var r = ~ ~(Math.random() * 25);

  if (r % 2 == 0) {
    player.classList.toggle('move');
  }

  if (r == 1) {
    player.classList.add('block');
    setTimeout(function () {
      player.classList.remove('block');
    }, 2000);
  }

  if (r == 2) {
    player.classList.add('strong');
    setTimeout(function () {
      player.classList.remove('strong');
    }, 1000);
  }

  if (r == 3) {
    player.classList.add('punch');
    setTimeout(function () {
      player.classList.remove('punch');
    }, 1000);
  }
}

setInterval(function () {
  update(p1);
  update(p2);
}, 1000);
