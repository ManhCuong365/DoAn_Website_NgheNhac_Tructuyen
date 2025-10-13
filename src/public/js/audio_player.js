document.addEventListener('DOMContentLoaded', function () {
    let audio = document.getElementById('audio');
    let playPauseBtn = document.getElementById('playPauseBtn');
    let playPauseIcon = document.getElementById('playPauseIcon');
    let prevBtn = document.getElementById('prevBtn');
    let nextBtn = document.getElementById('nextBtn');
    let stopBtn = document.getElementById('stopBtn');
    let seekBar = document.getElementById('seekBar');
    let currentTimeEl = document.getElementById('currentTime');
    let durationEl = document.getElementById('duration');
    let muteBtn = document.getElementById('muteBtn');
    let muteIcon = document.getElementById('muteIcon');
    let volDownBtn = document.getElementById('volDownBtn');
    let volUpBtn = document.getElementById('volUpBtn');
    let volumeBar = document.getElementById('volumeBar');

    if (!audio) return;

    // build playlist from rows
    let rows = Array.from(document.querySelectorAll('.song-row'));
    let currentIndex = -1; // index in rows

    function formatTime(time) {
        time = isNaN(time) ? 0 : Math.floor(time);
        let m = Math.floor(time / 60);
        let s = time % 60;
        return m + ':' + (s < 10 ? '0' : '') + s;
    }

    function toFullUrl(src) {
        if (!src) return '';
        return src.startsWith('http') ? src : (src.startsWith('/') ? location.origin + src : location.origin + '/' + src);
    }

    function safePlay() {
        audio.play().catch(function (err) {
            console.error('audio.play() rejected:', err);
        });
    }

    function setActiveRow(idx) {
        // reset icons
        document.querySelectorAll('.row_play_btn').forEach(ic => {
            ic.classList.remove('fa-pause');
            ic.classList.add('fa-play');
        });
        if (idx >= 0 && rows[idx]) {
            let icon = rows[idx].querySelector('.row_play_btn');
            if (icon) {
                icon.classList.remove('fa-play');
                icon.classList.add('fa-pause');
            }
        }
    }

    function playIndex(idx) {
        if (idx < 0 || idx >= rows.length) return;
        let row = rows[idx];
        let src = (row.getAttribute('data-src') || '').trim();
        if (!src) return console.warn('no data-src on row', idx);
        let full = toFullUrl(src);
        if (!audio.src || audio.src !== full) {
            audio.pause();
            audio.src = full;
            audio.load();
        }
        currentIndex = idx;
        setActiveRow(currentIndex);
        safePlay();
    }

    function playNext() {
        if (rows.length === 0) return;
        let next = currentIndex + 1;
        if (next >= rows.length) next = 0; // loop
        playIndex(next);
    }

    function playPrev() {
        if (rows.length === 0) return;
        let prev = currentIndex - 1;
        if (prev < 0) prev = rows.length - 1;
        playIndex(prev);
    }

    // row click handlers
    rows.forEach((row, idx) => {
        row.addEventListener('click', function (e) {
            let link = e.target.closest && e.target.closest('a');
            if (link && !link.classList.contains('song-link')) return;
            playIndex(idx);
        });
        let btn = row.querySelector('.row_play_btn');
        if (btn) {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                if (currentIndex === idx && !audio.paused) {
                    audio.pause();
                } else if (currentIndex === idx && audio.paused) {
                    safePlay();
                } else {
                    playIndex(idx);
                }
            });
        }
    });

    // main controls
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', function () {
            if (!audio.src || audio.src === '') {
                // start at first row
                if (rows.length) playIndex(0);
                return;
            }
            if (audio.paused) safePlay();
            else audio.pause();
        });
    }
    if (nextBtn) nextBtn.addEventListener('click', playNext);
    if (prevBtn) prevBtn.addEventListener('click', playPrev);
    if (stopBtn) stopBtn.addEventListener('click', function () {
        audio.pause();
        audio.currentTime = 0;
        currentIndex = -1;
        setActiveRow(-1);
        if (playPauseIcon) { playPauseIcon.classList.remove('fa-pause'); playPauseIcon.classList.add('fa-play'); }
    });

    // audio events
    audio.addEventListener('play', function () {
        if (playPauseIcon) { playPauseIcon.classList.remove('fa-play'); playPauseIcon.classList.add('fa-pause'); }
        setActiveRow(currentIndex);
    });
    audio.addEventListener('pause', function () {
        if (playPauseIcon) { playPauseIcon.classList.remove('fa-pause'); playPauseIcon.classList.add('fa-play'); }
        // keep activeRow paused icon or set to play on pause? keep paused icon for current row
        setActiveRow(-1);
    });
    audio.addEventListener('ended', function () {
        // autoplay next
        playNext();
    });

    audio.addEventListener('loadedmetadata', function () {
        if (seekBar) seekBar.max = Math.floor(audio.duration);
        if (durationEl) durationEl.textContent = formatTime(audio.duration);
    });
    audio.addEventListener('timeupdate', function () {
        if (seekBar) seekBar.value = Math.floor(audio.currentTime);
        if (currentTimeEl) currentTimeEl.textContent = formatTime(audio.currentTime);
    });
    if (seekBar) {
        seekBar.addEventListener('input', function () {
            audio.currentTime = seekBar.value;
        });
    }

    // volume controls: change by steps and sync slider
    function clamp(v) { return Math.max(0, Math.min(1, v)); }
    if (volDownBtn) {
        volDownBtn.addEventListener('click', function () {
            audio.volume = clamp(audio.volume - 0.1);
            if (volumeBar) volumeBar.value = audio.volume;
            if (audio.volume === 0) { muteIcon.classList.remove('fa-volume-up'); muteIcon.classList.add('fa-volume-mute'); }
            else { muteIcon.classList.remove('fa-volume-mute'); muteIcon.classList.add('fa-volume-up'); }
        });
    }
    if (volUpBtn) {
        volUpBtn.addEventListener('click', function () {
            audio.volume = clamp(audio.volume + 0.1);
            if (volumeBar) volumeBar.value = audio.volume;
            muteIcon.classList.remove('fa-volume-mute'); muteIcon.classList.add('fa-volume-up');
        });
    }
    if (muteBtn) {
        muteBtn.addEventListener('click', function () {
            audio.muted = !audio.muted;
            if (muteIcon) {
                muteIcon.classList.toggle('fa-volume-mute', audio.muted);
                muteIcon.classList.toggle('fa-volume-up', !audio.muted);
            }
        });
    }
    if (volumeBar) {
        volumeBar.addEventListener('input', function () {
            audio.volume = parseFloat(this.value);
            if (audio.volume === 0) { muteIcon.classList.remove('fa-volume-up'); muteIcon.classList.add('fa-volume-mute'); }
            else { muteIcon.classList.remove('fa-volume-mute'); muteIcon.classList.add('fa-volume-up'); }
        });
    }
});