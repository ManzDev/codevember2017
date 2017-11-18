'use strict';

var motor = new Howl({
  src: ['https://cdn.rawgit.com/ManzDev/codevember2017/master/assets/motor.mp3'],
  loop: true
});

var startmotor = new Howl({
  src: ['https://cdn.rawgit.com/ManzDev/codevember2017/master/assets/start-motor.mp3?4']
});

setTimeout(function () {
  startmotor.play();
}, 5000);
setTimeout(function () {
  motor.play();
}, 6000);