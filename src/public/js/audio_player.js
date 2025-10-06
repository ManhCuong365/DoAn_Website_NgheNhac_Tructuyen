const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPauseBtn');
const playPauseIcon = document.getElementById('playPauseIcon');
const seekBar = document.getElementById('seekBar');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');

// Play/Pause button logic
playPauseBtn.addEventListener('click', function () {
    if (audio.src && !audio.paused) {
        audio.pause();
    } else if (audio.src) {
        audio.play();
    }
});

// Update icon when audio plays/pauses
audio.addEventListener('play', function () {
    playPauseIcon.classList.remove('fa-play');
    playPauseIcon.classList.add('fa-pause');
});
audio.addEventListener('pause', function () {
    playPauseIcon.classList.remove('fa-pause');
    playPauseIcon.classList.add('fa-play');
});

// Khi click vào từng bài hát hoặc nút play từng dòng
document.querySelectorAll('.song-row').forEach(row => {
    row.addEventListener('click', function () {
        const src = this.getAttribute('data-src');
        if (src) {
            audio.src = src;
            audio.play();
        }
    });
});
document.querySelectorAll('.row_play_btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const row = this.closest('.song-row');
        const audio = document.getElementById('audio');
        const src = row.getAttribute('data-src');

        // Đổi tất cả icon về play
        document.querySelectorAll('.row_play_btn').forEach(icon => {
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
        });

        // Nếu đang phát bài này thì pause, ngược lại thì play
        if (audio.src.endsWith(src) && !audio.paused) {
            audio.pause();
            this.classList.remove('fa-pause');
            this.classList.add('fa-play');
        } else {
            audio.src = src;
            audio.play();
            this.classList.remove('fa-play');
            this.classList.add('fa-pause');
        }

        // Khi audio pause thì đổi icon về play
        audio.onpause = () => {
            this.classList.remove('fa-pause');
            this.classList.add('fa-play');
        };
        // Khi audio play thì đổi icon về pause
        audio.onplay = () => {
            // Đổi tất cả icon về play, chỉ dòng này là pause
            document.querySelectorAll('.row_play_btn').forEach(icon => {
                icon.classList.remove('fa-pause');
                icon.classList.add('fa-play');
            });
            this.classList.remove('fa-play');
            this.classList.add('fa-pause');
        };
    });
});

// Cập nhật tổng thời lượng khi load xong metadata
audio.addEventListener('loadedmetadata', function () {
    seekBar.max = Math.floor(audio.duration);
    durationEl.textContent = formatTime(audio.duration);
});

// Cập nhật thanh tiến trình và thời gian hiện tại khi phát nhạc
audio.addEventListener('timeupdate', function () {
    seekBar.value = Math.floor(audio.currentTime);
    currentTimeEl.textContent = formatTime(audio.currentTime);
});

// Cho phép tua nhạc khi kéo thanh
seekBar.addEventListener('input', function () {
    audio.currentTime = seekBar.value;
});

// Hàm định dạng thời gian mm:ss
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
