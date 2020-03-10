'use strict';

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, 1, .1, 1000);

var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setClearColor(0x000000, 0);
renderer.setSize(128, 128);
renderer.domElement.id = 'gem';

// Prepare items
var chests = document.querySelectorAll('.chest');
var tops = document.querySelectorAll('.top');
var eyeshit = document.createElement('img');
eyeshit.className = 'sprite';
eyeshit.src = 'https://manzdev.github.io/codevember2017/assets/eyeshit.png';
var sel = ~ ~(Math.random() * 3);
tops[sel].appendChild(eyeshit);
var coins = 0;
chests[sel].addEventListener('click', showGem);
var gemsound = new Audio('https://manzdev.github.io/codevember2017/assets/link-past-by-willrock-and-damonz.mp3');
var coinsound = new Audio('https://manzdev.github.io/codevember2017/assets/coin.mp3');
var lostsound = new Audio('https://manzdev.github.io/codevember2017/assets/fail-trombone.mp3');
var song = document.querySelector('#song');

for (var i = 0; i < 3; i++) {
  if (tops[i].children.length == 0) {
    var coin = document.createElement('img');
    coin.className = 'coin sprite';
    coin.src = 'https://manzdev.github.io/codevember2017/assets/coin.png';
    tops[i].appendChild(coin);
    chests[i].addEventListener('click', showCoin);
  }
}

function showCoin(e) {
  coins++;
  console.log(e.target);
  coinsound.currentTime = 0;
  coinsound.play();
  e.target.src = 'https://manzdev.github.io/codevember2017/assets/open-chest.png';
  e.target.classList.add('bounce');
  tops[Number(e.target.dataset.num) - 1].classList.add('on', 'fadeInUp');
  e.target.removeEventListener('click', showCoin);
}

function showGem(e) {
  song.volume = .15;
  if (coins == 2) {
    song.pause();
    tops[sel].removeChild(tops[sel].firstChild);
    tops[sel].appendChild(renderer.domElement);
    gem();
    gemsound.play();
  } else youlost();

  e.target.src = 'https://manzdev.github.io/codevember2017/assets/open-chest.png';
  e.target.classList.add('bounce');
  tops[Number(e.target.dataset.num) - 1].classList.add('on', 'fadeInUp');
  e.target.removeEventListener('click', showGem);
}

var screen = document.querySelector('#screen');

function gem() {
  var geometry = new THREE.DodecahedronGeometry(1, 0);
  for (var i = 0; i < geometry.faces.length; i++) {
    geometry.faces[i].color.setHex(0x0000AA + Math.random() * 0x000055);
  }var material = new THREE.MeshLambertMaterial({ color: 0x777777, vertexColors: THREE.FaceColors });

  var cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  scene.add(directionalLight);

  var light = new THREE.PointLight(0xffffff, 1, 100);
  light.position.set(0, 250, 250);
  scene.add(light);

  var light = new THREE.PointLight(0xffffff, 1, 100);
  light.position.set(50, 1, 50);
  scene.add(light);

  var light = new THREE.PointLight(0x0000ff, 1, 100);
  light.position.set(255, 1, 1);
  scene.add(light);

  camera.position.z = 1.5;

  // Render
  function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += .02;
    cube.rotation.y += .01;
    renderer.render(scene, camera);
  }

  animate();
}

function youlost() {
  var div = document.createElement('div');
  div.className = 'lost';
  document.body.appendChild(div);
  lostsound.play();
}
