const nowPlayingImg = document.querySelector('.now-playing img');
const background = document.querySelector('.background');

function syncBackgroundWithNowPlaying() {
    const imgSrc = nowPlayingImg.src;
    background.style.backgroundImage = `url(${imgSrc})`;
}

nowPlayingImg.addEventListener('load', syncBackgroundWithNowPlaying);

// Initial sync
syncBackgroundWithNowPlaying();