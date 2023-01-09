const playerBody = document.querySelector('.player-body');
const buttons = document.querySelector('.buttons');
const playPause = document.getElementById('play-pause');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const audio = document.querySelector('.audio');
const songTitles = document.querySelectorAll('.song-title');
const albumCover = document.querySelector('.album-cover');
const title = document.querySelector('.song-title');
const author = document.querySelector('.song-author');
const album = document.querySelector('.song-album');
const cover = document.querySelector('.album-cover');
const playlistSongs = document.querySelectorAll('.playlist-song');
const timeCurrent = document.querySelector('.current-time');
const progress = document.querySelector('.progress');
const overTime = document.querySelector('.time');
const progressContainer = document.querySelector('.progress-container');
const progressVolume = document.querySelector('.progress-volume');
const sliderVolume = document.querySelector('.slider-vol');
const volBtn = document.querySelector('.vol');
const playlistBtn = document.querySelector('.playlist');
const playlistBody = document.querySelector('.playlist-body');



const songs = [
    {
        url: 'songs/Queen - Breakthru.mp3',
        title: 'Breakthru',
        author: 'Queen',
        album: 'Greatest Hits II',
        poster: 'images/Queen - Greatest Hits II.png',
    },
    {
        url: 'songs/Axxis - Tears Of The Trees.mp3',
        title: 'Tears Of The Trees',
        author: 'Axxis',
        album: 'Kingdom of the night',
        poster: 'images/Axxis - Kingdom of the night.jpg',
    },
    {
        url: 'songs/Эпидемия - Я молился на тебя.mp3',
        title: 'Я молился на тебя',
        author: 'Эпидемия',
        album: 'Загадка волшебной страны',
        poster: 'images/Эпидемия - Загадка волшебной страны.jpg',
    },
    {
        url: 'songs/Чиж & Co - Менуэт.mp3',
        title: 'Менуэт',
        author: 'Чиж & Co',
        album: 'Гайдном буду!',
        poster: 'images/Чиж - Гайдном буду!.jpg',
    },
    {
        url: 'songs/Океан Ельзи - Човен.mp3',
        title: 'Човен',
        author: 'Океан Ельзи',
        album: 'Човен',
        poster: 'images/Океан Ельзи - Човен.jpg',
    },
    {
        url: 'songs/Ария - Беспечный ангел.mp3',
        title: 'Беспечный ангел',
        author: 'Ария',
        album: 'Легенды русского рока',
        poster: 'images/Ария - Легенды русского рока.jpg',
    },
];

let songIndex = 0;

function loadSong(song) {
    //song info
    title.innerHTML = song.title;
    author.innerHTML = song.author;
    album.innerHTML = song.album;
    cover.src = song.poster;
    audio.src = song.url;
    //playlist
    for (let i = 0; i < playlistSongs.length; i++) {
        playlistSongs[i].childNodes[1].innerHTML = i + 1;
        playlistSongs[i].childNodes[3].innerHTML = songs[i].title;
        playlistSongs[i].childNodes[5].innerHTML = songs[i].author;
        playlistSongs[i].childNodes[7].innerHTML = songs[i].album;
    };
}

loadSong(songs[songIndex]);

// відтворення пісні по кліку на її назві в плейлисті
songTitles.forEach (function (element, i) {
    element.addEventListener('click', function () {
        songIndex = i - 1;
        loadSong(songs[i - 1]);
        playPause.classList.add('play');
        playPause.src = 'images/pause_btn.png';
        audio.play();
    })
})

function prev() {
    progress.style.width="0";
    if (playPause.classList.contains('play')) {
        audio.pause();
        if (songIndex < 1) {
            songIndex = 5;
        } else {
            songIndex = --songIndex;
        };
        loadSong(songs[songIndex]);
        audio.play();
    } else {
        if (songIndex < 1) {
            songIndex = 5;
        } else {
            songIndex = --songIndex;
        };
        loadSong(songs[songIndex]);
    };
}

function next() {
    progress.style.width="0";
    if (playPause.classList.contains('play')) {
        audio.pause();
        if (songIndex > (songs.length - 2)) {
            songIndex = (0);
        } else {
            songIndex = ++songIndex;
        };
    loadSong(songs[songIndex]);
    audio.play();
    } else {
        if (songIndex > (songs.length - 2)) {
            songIndex = (0);
        } else {
            songIndex = ++songIndex;
        };
    loadSong(songs[songIndex]);
    };
}

playPause.addEventListener('click', () => {
    playPause.classList.toggle('play');
    if (playPause.classList.contains('play')) {
        playPause.src = 'images/pause_btn.png';
        audio.play();
    } else {
        playPause.src = 'images/play_btn.png';
        audio.pause();
    }
})

// time
function updateProgress(e) {
    const {duration, currentTime} = e.srcElement;
    //current time
    let curMin = Math.floor(currentTime/60).toFixed(0);
    let curSec = Math.floor(currentTime % 60).toFixed(0);
    let sec;
    if (curSec < 10) {
        sec = "0" + curSec;
    } else {
        sec = curSec;
    };
    let min;
    if (curMin < 10) {
        min = "0" + curMin;
    } else {
        min = curMin;
    };
    timeCurrent.innerHTML = min + ":" + sec;
    //overall time
    let overMin = Math.floor(duration/60).toFixed(0);
    let overSec = Math.floor(duration % 60).toFixed(0);
        if (overMin < 10) {
            overMin = "0" + overMin;
        };
        if (overSec < 10) {
            overSec = "0" + overSec;
        };
    overTime.innerHTML = overMin + ":" + overSec;
    //progress bar
    progress.style.width = (currentTime / duration) * 100 + "%";
    if (currentTime >= duration) {
        next();
    };
}

audio.addEventListener('timeupdate', updateProgress)

//set progress
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = clickX / width * duration;
}
progressContainer.addEventListener('click', setProgress)

function setVolume(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    audio.volume = (clickX / width);
    progressVolume.style.width = (clickX / width) * 100 + "%";
    if (audio.volume == 0) {
        volBtn.src = 'images/vol-muted.png';
    } else if (audio.volume > 0 && audio.volume <= 0.5) {
        volBtn.src = 'images/vol-low.png';
        volBtn.classList.remove('muted');
    } else {
        volBtn.src = 'images/vol-high.png';
        volBtn.classList.remove('muted');
    };
}
//volume
sliderVolume.addEventListener('click', setVolume)

function muting() {
    if (volBtn.classList.contains('muted')) {
        volBtn.classList.remove('muted');
        volBtn.src = 'images/vol-high.png';
        audio.volume = 1;
    } else {
        volBtn.classList.add('muted');
        volBtn.src = 'images/vol-muted.png';
        audio.volume = 0;
    };
    progressVolume.style.width = audio.volume * 100 + "%";
}
volBtn.addEventListener('click', muting)

function playlist() {
    if (playlistBody.classList.contains('hidden')) {
        playlistBody.classList.remove('hidden');
        playlistBody.style.visibility = 'visible';
    } else {
        playlistBody.classList.add('hidden');
        playlistBody.style.visibility = 'hidden';
    }
}
playlistBtn.addEventListener('click', playlist)