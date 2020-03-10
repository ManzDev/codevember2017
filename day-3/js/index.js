let tree = document.querySelector('#tree');
let panel = document.querySelector('#panel');

function setText(elem, e) {
  let num = Number(elem.dataset.num);
  panel.textContent = words[num];
  panel.className = 'turnon';
}

function unsetText(elem, e) {
  let num = Number(elem.dataset.num);
  panel.innerHTML = '&nbsp;';
  panel.className = '';
}

function pop(elem, e) {
  let num = Number(elem.dataset.num);
  bubble.currentTime = 0;
  bubble.play();

  elem.style.display = 'none';
}

// Prepare
let bubble = new Audio('https://manzdev.github.io/codevember2017/assets/bubble.mp3');
let stack = [];
for (let i = 0; i < 100; i++) {

  let folder = document.createElement('img');
  folder.dataset.num = i;
  folder.className = 'folder';
  folder.src = 'https://manzdev.github.io/codevember2017/assets/folder.png';
  folder.style.left = ~~(Math.random() * innerWidth) + 'px';
  folder.style.top = ~~(Math.random() * innerHeight) + 'px';
  folder.onmouseover = setText.bind(event, folder);
  folder.onmouseleave = unsetText.bind(event, folder);
  folder.onclick = pop.bind(event, folder);
  stack.push(folder);
  tree.appendChild(folder);

}

let words = ['System32', 'Windows', 'Program Files', 'Fonts', 'Images',
             'Assets', 'My music', 'Updates', 'Temp', 'Boot',
             'etc', 'User', 'My documents', 'p0rn', 'Holiday photos', 'dev',
             'Summer 99', 'AC-DC', 'Mike Oldfield', 'Europe', 'Imagine Dragons',
             'Pimpinela', 'iTunes', 'aTunes', 'Logs', 'Config.msi', 'opt',
             'More updates', 'secret folder', 'secret pics', 'tmp', 'Downloads',
             'Desktop', 'Documents', 'Videos', 'hOrse vids', 'My photos',
             'Internet Explorer', 'Internet Exploter', 'Chrome', 'Firefox', 'data',
             'es-ES', 'en-US', 'INF', 'Recover data', 'Codevember2017',
             'Emezeta.com', 'LenguajeCSS.com', 'LenguajeHTML.com', 'LenguajeJS.com',
             'Installer', 'My teddy bear pics', 'Digital scan docs', 'To print',
             'Help', 'Diagnosis', 'Antivirus', 'Quarantine', 'My daddy vids',
             'SECRET DOCS DONT LOOK', 'usr', 'information', 'cv', 'Important data',
             'Birds', 'Strange Birds', 'Curious Birds', 'Weird Birds', 'Cats',
             'Cats pics', 'Jokes', 'Cat jokes', 'PDF documents', 'codes',
             'Device info', 'Accounts', 'Passwords DONT LOOK', 'Debug', 'Local',
             'Localization', 'Steam', 'Games', 'Gmail', 'Migration docs',
             'Setup', 'WhatsApp images', 'WhatsApp audios', 'Phone backup', 'mine',
             'TWAIN32', 'WinSxS', 'XAMPP', 'Beauty ladies', 'Pretty cats',
             'My friends', 'To backup', 'Secure data', 'DATA [CHECK]', 'Tickets']


// Main loop
function loop() {
  requestAnimationFrame(loop, tree);
  update();
}

// Update
function update() {
  for (let i = 0; i < stack.length; i++) {
    stack[i].style.left = parseInt(stack[i].style.left) + -2 + ~~(Math.random() * 5) + 'px';
    stack[i].style.top = parseInt(stack[i].style.top) + -2 + ~~(Math.random() * 5) + 'px';
  }
}

loop();
