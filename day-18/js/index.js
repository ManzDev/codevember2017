'use strict';

var motor = new Howl({
  src: ['https://manzdev.github.io/codevember2017/assets/motor.mp3'],
  loop: true
});

var startmotor = new Howl({
  src: ['https://manzdev.github.io/codevember2017/assets/start-motor.mp3?4']
});

setTimeout(function () {
  startmotor.play();
}, 5000);
setTimeout(function () {
  motor.play();
}, 6000);
