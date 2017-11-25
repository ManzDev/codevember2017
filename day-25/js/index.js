let avocado = document.querySelector('template');
let grid = document.querySelector('.grid');
let waves = document.querySelector('.waves');
let options = ['avocado', 'avocado back', 'super avocado', 'avocado dorito'];

for (let i = 0; i < 3; i++)
  grid.appendChild(avocado.content.cloneNode(true));

for (let i = 0; i < 10; i++) {
  let bar = document.createElement('div');
  bar.className = 'bar';
  waves.appendChild(bar);
}
  
let avocados = document.querySelectorAll('.avocado');
let bars = document.querySelectorAll('.bar');

function change() {
  for (let i = 0; i < avocados.length; i++)
    avocados[i].className = options[~~(Math.random() * options.length)];
}

function updateBars() {
  for (let i = 0; i < bars.length; i++)
    bars[i].style.height = ~~(Math.random() * 100) + '%';
}

setInterval(change, 3000);
setInterval(updateBars, 100 + ~~(Math.random() * 100));