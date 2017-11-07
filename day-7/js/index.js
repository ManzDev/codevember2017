'use strict';

var heart = document.querySelector('#heart');
var page = document.querySelector('#page');
var days = document.querySelectorAll('.day');
var phase = 0;
var daysWeek = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun', 'monreboot'];
var currentMusic = 0;
var music = [new Howl({
  src: ['https://rawgit.com/ManzDev/codevember2017/master/assets/skogens-djur-1.mp3?1'],
  onend: checkMusic.bind()
}), new Howl({
  src: ['https://rawgit.com/ManzDev/codevember2017/master/assets/skogens-djur-2.mp3?1'],
  onend: checkMusic.bind()
})];

// days.forEach(function(e) {
//   e.onclick = pushDay.bind(event, e.classList[1]);
// });

function pushDay(day, e) {
  //heart.className = day;
  page.className = day;

  if (day == 'fri' || day == 'sat') currentMusic = 1;else currentMusic = 0;
}

function checkMusic() {
  music[currentMusic].play();
}

checkMusic();
setInterval(loop, 10245 / 2);

function loop() {
  phase = (phase + 1) % 8;
  pushDay(daysWeek[phase], page);
}