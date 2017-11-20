let chars = ['rocket', 'zebra', 'cat', 'rockguy', 'eyeshit', 'god', 'computer', 'manz'];
let circle = document.querySelector('.circle');
let current = 0;

let music = new Howl({
  src: ['https://cdn.rawgit.com/ManzDev/codevember2017/master/assets/shooting-stars-by-janderson-barboza.mp3'],
  autoplay: true,
  loop: true
});

let next = function() {
  console.log(current);
  current = (current + 1) % chars.length;
  update();  
}

let prev = function() {
  current = (current - 1);
  if (current == -1)
    current = chars.length -1;
  update();  
}

addEventListener('keydown', e => {
  if (e.keyCode == 39)
    next();
  else if (e.keyCode == 37)
    prev();
});

function update() {
  circle.className = 'circle';
  circle.classList.add(chars[current]);
}