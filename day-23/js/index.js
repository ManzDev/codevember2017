'use strict';

var template = document.querySelector('.template');
var soprano = document.querySelector('#soprano');
var lines = document.querySelectorAll('.board .line');
var elevator = document.querySelector('.elevator');
var win = document.querySelector('.window');

for (var i = 0; i < lines.length; i++) {
  for (var j = 0; j < [1, 8, 12][i]; j++) {
    lines[i].appendChild(template.content.cloneNode(true));
  }
}lines[0].appendChild(soprano.content.cloneNode(true));
lines[0].appendChild(template.content.cloneNode(true));

for (var i = 0; i < 4; i++) {
  elevator.appendChild(template.content.cloneNode(true));
}var turrets = document.querySelectorAll('.turret');

function updateTurrets(ini, rnd) {
  for (var i = ini; i < turrets.length; i++) {
    if (~ ~(Math.random() * rnd) == 1) turrets[i].classList.toggle('open');
  }
}

function sopranoSing() {
  if (~ ~(Math.random() * 2) == 1) turrets[1].classList.toggle('open');
}

var id = setInterval(function () {
  updateTurrets(23, 2);
}, 500);

setTimeout(function () {
  clearInterval(id);
  setInterval(function () {
    updateTurrets(0, 4);
  }, 500);
  setInterval(function () {
    sopranoSing();
  }, 250);
}, 35000);