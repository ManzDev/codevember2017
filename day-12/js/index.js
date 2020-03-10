'use strict';

var zebra = document.querySelectorAll('.zebra.b');
var total = zebra.length;

var music = new Howl({
  src: ['https://manzdev.github.io/codevember2017/assets/happier-times-by-paperlaur.mp3'],
  loop: true
}).play();

function update() {

  if (~ ~(Math.random() * 2) == 0) {
    var i = ~ ~(Math.random() * total);
    zebra[i].classList.add('press');
    setTimeout(function () {
      zebra[this].classList.remove('press');
    }.bind(i), ~ ~(Math.random() * 3) * 1000);
  }
}

(function loop() {
  requestAnimationFrame(loop);
  update();
})();
