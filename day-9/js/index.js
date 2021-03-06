'use strict';

var factory = document.querySelector('#factory');
var music = new Howl({
  src: ['https://manzdev.github.io/codevember2017/assets/wings.mp3'],
  loop: true,
  autoplay: true
});

setTimeout(refill, 4950);
setTimeout(reface, 8250);
setInterval(reboot, 12000);

function reboot() {
  document.querySelector('.fries').remove();
  var newfries = document.createElement('img');
  newfries.className = 'fries';
  newfries.src = 'https://manzdev.github.io/codevember2017/assets/french-fries-empty.png';
  factory.insertAdjacentElement('afterEnd', newfries);
  setTimeout(refill, 4900);
  setTimeout(reface, 8250);
}

function refill() {
  document.querySelector('.fries').src = 'https://manzdev.github.io/codevember2017/assets/french-fries.png';
}

function reface() {
  document.querySelector('.fries').src = 'https://manzdev.github.io/codevember2017/assets/french-fries-face.png';
}
