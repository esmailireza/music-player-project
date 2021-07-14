const musicInfo = document.querySelector('.music-info');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const playBtn = document.querySelector('#play');
const audio = document.querySelector('#audio');
const musicContainer = document.querySelector('.music-container');
const title = document.querySelector('#title');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const cover = document.querySelector('#cover');

// song Title
const songTitle = ['hey','summer','ukulele'];
let trackIndex = 2;

// initially load song info DOM
loadSong(songTitle[trackIndex]);

// update song details
function loadSong(song) {
    title.innerHTML = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}

function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}

function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    audio.pause();
}

function prevSong() {
    trackIndex--;
    if (trackIndex < 0) {
        trackIndex = songTitle.length - 1;
    }
    loadSong(songTitle[trackIndex]);
    playSong();
}

function nextSong() {
    trackIndex++;
    if (trackIndex > songTitle.length -1) {
        trackIndex = 0;
    }
    loadSong(songTitle[trackIndex]);
    playSong();
}

function updateProgress(e) {
    const {duration,currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration)*100;
    // show percent width progressBar
    progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {

    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

// event Listener
playBtn.addEventListener('click',() =>{
    const isPlaying = musicContainer.classList.contains('play');
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
})

prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);
audio.addEventListener('timeupdate',updateProgress);
progressContainer.addEventListener('click',setProgress);
audio.addEventListener('ended',nextSong)