'use strict';

var internet = document.querySelector('#internet');
var switchon = document.querySelector('#switchon');
var earth = document.querySelector('.earth');
var bits = document.querySelectorAll('.bit');
var text = document.querySelector('.text');
var pcs = document.querySelectorAll('.pc');
var go = false;
var number = '';
var id = -1;
var times = 0;
var chain = '';
var web = [{ class: 'yt', word: 'yout' }, { class: 'cp', word: 'code' }, { class: 'tw', word: 'twit' }, { class: 'fb', word: 'face' }];

var music2 = new Howl({
  src: ['https://manzdev.github.io/codevember2017/assets/dischipo-2.mp3'],
  loop: true
});

var music = new Howl({
  src: ['https://manzdev.github.io/codevember2017/assets/dischipo.mp3'],
  onend: function onend() {
    if (!go) this.play();else music2.play();
  }
});

function changeBits() {
  if (times % 2 == 0) {
    number = 0 + (64 + ~ ~(Math.random() * 58)).toString(2);
    for (var i = 0; i < 4; i++) {
      bits[i].dataset.bit = number[i];
    }
  } else {
    for (var i = 0; i < 4; i++) {
      bits[i].dataset.bit = number[i + 4];
    }
  }

  times++;

  if (times == 10) {
    go = true;
    clearInterval(id);
    internet.classList.remove('anim');
    pcs.forEach(function (e) {
      e.classList.add('jump');
    });
    pcs[0].querySelector('.screen').classList.add(web[~ ~(Math.random() * 4)].class);
  }

  console.log(times);
  if (times > 1 && times % 2 != 0) {
    console.log('Bits: ', chain);
    var word = String.fromCharCode(parseInt(chain, 2));
    text.textContent += word;
    chain = '';
  }
  chain = chain + bits[0].dataset.bit + bits[1].dataset.bit + bits[2].dataset.bit + bits[3].dataset.bit;
}

// Init
switchon.onclick = function () {
  id = setInterval(changeBits, 5000);
  changeBits();
  music.play();
  internet.classList.add('anim');
  earth.classList.add('spin');
  this.disable = true;
  this.onclick = function () {
    return false;
  };
};
