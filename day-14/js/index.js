'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ground = document.querySelector('.ground');

Array.prototype.shuffle = function () {
  for (var i = this.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var _ref = [this[j], this[i]];
    this[i] = _ref[0];
    this[j] = _ref[1];
  }
  return this;
};

var paridad = [0, 0, 0, 1, 1].shuffle();
//console.log(paridad);

var Mouse = function () {
  function Mouse(id) {
    _classCallCheck(this, Mouse);

    this.mouse = document.createElement('div');

    //if (~~(Math.random() * 2) == 0) {
    if (id == 0) {
      this.mouse.className = 'mouse';
      this.mouse.style.left = ~ ~(Math.random() * 200) + 'px';
    } else {
      this.mouse.className = 'mouse mirror';
      this.mouse.style.transform = 'scale(-1,1) translateX(' + ~ ~(Math.random() * 200) + 'px)';
      this.mouse.style.left = -1024 + ~ ~(Math.random() * 200) + 'px';
    }
    this.zindex = 5 + ~ ~(Math.random() * 50);
    this.mouse.style.zIndex = this.zindex;
    this.mouse.style.top = 295 + this.zindex + 'px';
    ground.insertAdjacentElement('beforebegin', this.mouse);
  }

  Mouse.prototype.update = function update() {

    if (~ ~(Math.random() * 250) == 0) click();
  };

  return Mouse;
}();

var mouses = [];

function click() {
  console.log('click');
  var i = ~ ~(Math.random() * mouses.length);
  mouses[i].mouse.classList.add('click');
  setTimeout(function () {
    mouses[this].mouse.classList.remove('click');
  }.bind(i), 250 + ~ ~(Math.random() * 500));
}

var update = function update() {

  // Add mouse
  if (~ ~(Math.random() * 450) == 0) {
    if (mouses.length < 5) {
      mouses.push(new Mouse(paridad.pop()));
    }
  }

  for (var i = 0; i < mouses.length; i++) {
    mouses[i].update();
  }
};

function loop() {
  requestAnimationFrame(loop);
  update();
}

function fadeToBlack() {
  var fade = document.createElement('div');
  fade.className = 'fade';
  document.body.appendChild(fade);
  var p = 100;

  update = function update() {
    if (p > 0) {
      if (p > 20) p = p - 1;else if (p > 15) p = p - .05;else p = p - .5;
      fade.style.background = 'radial-gradient(circle at center, transparent ' + p + '%, #000 ' + p + '%)';
    }
  };
}

//loop();
setTimeout(loop, 15000);
setTimeout(fadeToBlack, 66000);