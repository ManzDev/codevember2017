'use strict';

var chars = ['rocket', 'zebra', 'cat', 'rockguy', 'eyeshit', 'god', 'computer', 'manz'];
var circle = document.querySelector('.circle');
var current = 0;

var music = new Howl({
  src: ['https://cdn.rawgit.com/ManzDev/codevember2017/master/assets/shooting-stars-by-janderson-barboza.mp3'],
  autoplay: true,
  loop: true
});

var next = function next() {
  console.log(current);
  current = (current + 1) % chars.length;
  update();
};

var prev = function prev() {
  current = current - 1;
  if (current == -1) current = chars.length - 1;
  update();
};

addEventListener('keydown', function (e) {
  if (e.keyCode == 39) next();else if (e.keyCode == 37) prev();
});

function update() {
  circle.className = 'circle';
  circle.classList.add(chars[current]);
}