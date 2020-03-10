'use strict';

var speakers = document.querySelectorAll('.speaker');
var rockguy = document.querySelector('.rockguy');
var data = document.querySelector('.data');

var music = new Howl({
  src: ['https://manzdev.github.io/codevember2017/assets/du-hast-by-8-bit-universe.mp3'],
  onplay: function onplay() {
    speakers.forEach(function (e) {
      e.classList.add('anim');
      data.classList.add('anim');
      rockguy.classList.add('head');
      setTimeout(function () {
        e.classList.remove(this);
        rockguy.classList.remove('head');
        rockguy.classList.add('anim');
        data.classList.remove('anim');
      }.bind('anim'), 13000);
      setTimeout(function () {
        e.classList.add(this);
        data.classList.add('anim');
        rockguy.classList.add('head');
      }.bind('anim'), 29000);
      setTimeout(function () {
        e.classList.remove(this);
        rockguy.classList.remove('anim');
        data.classList.remove('anim');
        rockguy.classList.remove('head');
      }.bind('anim'), 44000);
    });
  },
  loop: true
});

var start = new Howl({
  src: ['https://manzdev.github.io/codevember2017/assets/du-hast-start.mp3'],
  onend: function onend() {
    music.play();
  }
}).play();
