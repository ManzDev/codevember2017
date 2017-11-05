'use strict';

var sword = document.querySelector('#sword');
var hud = document.querySelector('#hud');
var power = document.querySelector('#power');
var extrapower = document.querySelector('#extrapower');
var text = document.querySelector('#text');
var strength = 0;
var firstStrength = 0;
var currentMusic = false;
var music = [new Howl({
  src: ['https://cdn.rawgit.com/ManzDev/codevember2017/master/assets/power-up-1.mp3'],
  onend: checkMusic.bind()
}), new Howl({
  src: ['https://cdn.rawgit.com/ManzDev/codevember2017/master/assets/power-up-2.mp3'],
  onend: checkMusic.bind()
}), new Howl({
  src: ['https://cdn.rawgit.com/ManzDev/codevember2017/master/assets/power-up-3.mp3'],
  onend: checkMusic.bind()
})];

sword.onmouseenter = function (e) {

  if (currentMusic === false) {
    toast('Try get THE SWORD...', 4000);
    currentMusic = 0;
    music[0].play();
  }
};

function checkMusic(p) {

  if (currentMusic == false && firstStrength < 5) {
    toast('Click FASTER!...', 3000);
  } else if (currentMusic == 0 && firstStrength > 15) {
    //strength = 5;
    toast('A little MORE!!...', 3000);
    sword.classList.add('try');
    currentMusic = 1;
  } else if (currentMusic == 1 && strength > 50) {
    currentMusic = 2;
    sword.classList.remove('try');
    sword.classList.add('up');
    setTimeout(function () {
      sword.classList.add('move');
    }, 2000);
    sword.onclick = null;
    toast('Greetings, SWORDMASTER!', 6000);
    text.textContent = firstStrength + strength + ' Points';
  }

  music[currentMusic].play();
}

sword.onclick = function (e) {

  console.log(e.clientX, e.clientY);
  console.log(e.detail);
  console.log(e.ctrlKey);
  console.log(status);
  power.style.width = firstStrength + 'px';
  extrapower.style.width = strength + 'px';

  if (e.detail > 10) {
    if (currentMusic < 1) firstStrength++;else strength = firstStrength + strength < 200 ? strength + 1 : strength + 0;
  }
};

function toast(m) {
  var t = arguments.length <= 1 || arguments[1] === undefined ? 5000 : arguments[1];

  iziToast.show({
    title: 'Tip',
    message: m,
    titleColor: '#FFF',
    messageColor: '#AAA',
    backgroundColor: '#161616',
    position: 'topRight',
    timeout: t
  });
}