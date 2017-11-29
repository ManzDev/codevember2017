'use strict';

var place = document.querySelector('.place');
var cloud = document.querySelector('#cloud');
var sky = document.querySelector('.sky');
var music = new Howl({
  src: ['https://cdn.rawgit.com/ManzDev/codevember2017/master/assets/polarity-by-kubbi.mp3', 'https://cdn.rawgit.com/ManzDev/codevember2017/master/assets/polarity-by-kubbi.ogg'],
  loop: true,
  autoplay: true
});
var clouds = [],
    maxClouds = 15;

for (var i = 0; i < maxClouds; i++) {
  var div = document.createElement('div');
  div.className = 'cloud';
  div.appendChild(cloud.content.cloneNode(true));
  clouds[i] = div;
  clouds[i].style.opacity = Math.random();
  clouds[i].style.zIndex = -2 + ~ ~(Math.random() * 4);
  clouds[i].style.top = ~ ~(Math.random() * 150) + 'px';
  clouds[i].style.animationDuration = ~ ~(Math.random() * 55) + 20 + 's';
  sky.appendChild(clouds[i]);
}

function chew() {
  place.classList.toggle('up');
  place.classList.toggle('chew');
}

setInterval(chew, 4000);