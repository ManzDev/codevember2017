'use strict';

var win = new Howl({
  src: ['https://cdn.rawgit.com/ManzDev/codevember2017/master/assets/winning.mp3'],
  volume: 0.4,
  autoplay: true
});

var fish = new Audio('https://cdn.rawgit.com/ManzDev/codevember2017/master/assets/fish.mp3');
var drop = new Audio('https://cdn.rawgit.com/ManzDev/codevember2017/master/assets/drop-cup.mp3');
var finish = new Audio('https://cdn.rawgit.com/ManzDev/codevember2017/master/assets/finish.mp3');

function fishSwim() {
  fish.currentTime = 0;
  fish.play();
}

function fishDrop() {
  drop.play();
}

function fishFinish() {
  finish.play();
}

for (var i = 1; i < 10; i++) {
  setTimeout(fishSwim, i * 500);
  setTimeout(fishSwim, i * 500 + 9000);
}

setTimeout(fishDrop, 6000);
setTimeout(fishFinish, 16000);