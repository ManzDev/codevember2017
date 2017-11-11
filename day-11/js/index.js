'use strict';

var canvas = document.querySelector('#canvas');
var ctx = canvas.getContext('2d');
canvas.width = innerWidth * 2;
canvas.height = innerHeight;

var music = new Howl({
  src: ['https://cdn.rawgit.com/ManzDev/codevember2017/master/assets/tron-by-mcklain.mp3?1']
}).play();

var gridY = {
  color: '#18dadd',
  x: innerWidth / 2,
  y: innerHeight,
  sep: 150,
  update: function update() {
    if (this.y > 0) this.y -= 1;
  },
  drawLine: function drawLine(x, y) {
    // Y
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.moveTo(x, y);
    ctx.lineTo(x, y - 1);
    ctx.stroke();
  },
  draw: function draw() {
    // grid lines
    for (var x = 0; x < canvas.width; x = x + this.sep) {
      this.drawLine(x, this.y);
    }
  }
};

var gridX = {
  color: '#18dadd',
  x: 0,
  y: 0,
  sep: 75,
  update: function update() {
    if (this.x < canvas.width) this.x += 2;
  },
  drawLine: function drawLine(x, y) {
    // Y
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.moveTo(x, y);
    ctx.lineTo(x + 2, y);
    ctx.stroke();
  },
  draw: function draw() {
    // grid lines
    for (var y = 0; y < canvas.height; y = y + this.sep) {
      this.drawLine(this.x, y);
    }
  }
};

function update() {
  gridY.update();
  gridY.draw();
  gridX.update();
  gridX.draw();
}

(function loop() {
  requestAnimationFrame(loop);
  update();
})();