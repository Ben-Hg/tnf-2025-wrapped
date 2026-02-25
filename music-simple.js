// Simple Music Control - Autoplay on page load

// Wait for page to fully load
window.addEventListener('load', function() {
    const audio = document.getElementById('background-music');
    const button = document.getElementById('music-toggle');

    if (!audio || !button) {
        console.error('Music elements not found');
        return;
    }

    // Set volume
    audio.volume = 0.3;

    // Track playing state
    let playing = false;

    // Try to autoplay immediately
    audio.play()
        .then(() => {
            button.textContent = '🔊';
            button.classList.remove('muted');
            playing = true;
            console.log('Music autoplaying');
        })
        .catch(err => {
            // Autoplay blocked by browser - show muted icon
            button.textContent = '🔇';
            button.classList.add('muted');
            playing = false;
            console.log('Autoplay blocked - click button to play:', err);
        });

    // Button click handler for manual control
    button.onclick = function() {
        if (playing) {
            // Pause music
            audio.pause();
            button.textContent = '🔇';
            button.classList.add('muted');
            playing = false;
            console.log('Music paused');
        } else {
            // Play music
            audio.play()
                .then(() => {
                    button.textContent = '🔊';
                    button.classList.remove('muted');
                    playing = true;
                    console.log('Music playing');
                })
                .catch(err => {
                    console.error('Music error:', err);
                    alert('Cannot play music. Check if music.mp3 file exists.');
                });
        }
    };

    console.log('Music system loaded');
});
