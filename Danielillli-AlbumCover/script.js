// Update your script.js

document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audioPlayer');
    const albumItems = document.querySelectorAll('.album__item');
    let currentAudio = null;
    let playingAlbum = null;

    albumItems.forEach(item => {
        const playButton = item.querySelector('.play-button');
        const audioSource = item.getAttribute('data-audio');
        const audioControls = item.querySelector('.audio-controls');
        const audioProgress = item.querySelector('.audio-progress');
        const currentTimeElem = item.querySelector('.current-time');
        const totalTimeElem = item.querySelector('.total-time');
        const volumeSlider = item.querySelector('.volume-slider');
        const volumePercentage = item.querySelector('.volume-percentage');

        playButton.addEventListener('click', (e) => {
            e.stopPropagation();
            if (playingAlbum === item) {
                if (audioPlayer.paused) {
                    audioPlayer.play();
                    playButton.innerHTML = pauseButtonSVG();
                } else {
                    audioPlayer.pause();
                    playButton.innerHTML = playButtonSVG();
                }
            } else {
                if (currentAudio) {
                    currentAudio.innerHTML = playButtonSVG();
                    currentAudio.closest('.album__item').querySelector('.audio-controls').style.display = 'none';
                }
                audioPlayer.src = audioSource;
                audioPlayer.play();
                playButton.innerHTML = pauseButtonSVG();
                currentAudio = playButton;
                playingAlbum = item;
                audioControls.style.display = 'block';
            }
        });

        // Update progress and time
        audioPlayer.addEventListener('timeupdate', () => {
            if (playingAlbum === item) {
                const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
                audioProgress.value = progress;
                currentTimeElem.textContent = formatTime(audioPlayer.currentTime);
                totalTimeElem.textContent = formatTime(audioPlayer.duration);
            }
        });

        // Seek functionality
        audioProgress.addEventListener('input', (e) => {
            const seekTime = (e.target.value / 100) * audioPlayer.duration;
            audioPlayer.currentTime = seekTime;
        });

        // Volume control functionality
        volumeSlider.addEventListener('input', (e) => {
            const volume = e.target.value / 100;
            audioPlayer.volume = volume;
            volumePercentage.textContent = `${Math.round(volume * 100)}%`;
        });
    });

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    function playButtonSVG() {
        return `
            <svg role="img" aria-hidden="true" viewBox="0 0 24 24" class="Svg-sc-ytk21e-0 Svg-img-icon-medium">
                <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
            </svg>`;
    }

    function pauseButtonSVG() {
        return `
            <svg role="img" aria-hidden="true" viewBox="0 0 24 24" class="Svg-sc-ytk21e-0 Svg-img-icon-medium">
                <path d="M6 19h4.5V5H6v14zm7.5-14v14H18V5h-4.5z"></path>
            </svg>`;
    }
});
