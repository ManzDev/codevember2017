let screen = document.querySelector('#screen');
let cassette = document.querySelector('#cassette');
screen.style.height = innerHeight - 75 + 'px';

let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = innerHeight - 75;
let idata = ctx.createImageData(canvas.width, canvas.height);
let buffer32 = new Uint32Array(idata.data.buffer);

let tape = new Howl({
  src: ['https://cdn.rawgit.com/ManzDev/codevember2017/master/assets/tape-play.mp3?1']
});

//let cursors = [];
let landed = false;
let tapeView = false;

let rocket = {
  img: document.querySelector('#rocket'),
  x: (1024/2 - 128),
  y: -250,
  speed: 2,
  update: function() {
    if (this.y < innerHeight - 400)
      this.y = this.y + this.speed;
    else {
      landed = true;
      enableGuardians();
    }
  },
  render: function() {
    this.img.style.top = this.y + 'px';
    this.img.style.left = this.x + 'px';
  }
}
  
function update() {

  // rocket
  if (!landed)
    rocket.update();
  rocket.render();
  
  // noise tv
  noise();
  
}

function loop() {
  update();
  requestAnimationFrame(loop);
}

loop();

function enableGuardians() {
  noise = function() {};
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.remove();
  cassette.classList.add('on');
  tape.play();
  setTimeout(function() {
    rocket.img.src = 'https://raw.githubusercontent.com/ManzDev/codevember2017/master/assets/rocket-raccoon-true.png?1';
    let music = new Howl({
      src: ['https://cdn.rawgit.com/ManzDev/codevember2017/master/assets/hooked.mp3'],
      loop: true
    }).play();   
  }, 2000);
}

function noise() {
  let len = buffer32.length - 1;
  while(len--) buffer32[len] = Math.random() < 0.85 ? 0 : -1>>0;
  ctx.putImageData(idata, 0, 0);  
}