// Simple Music Control - With detailed debugging

window.addEventListener('load', function() {
    console.log('=== MUSIC SYSTEM LOADING ===');

    const audio = document.getElementById('background-music');
    const button = document.getElementById('music-toggle');

    // Check if elements exist
    if (!audio) {
        console.error('ERROR: Audio element not found!');
        return;
    }
    if (!button) {
        console.error('ERROR: Button element not found!');
        return;
    }

    console.log('Audio element found:', audio);
    console.log('Button element found:', button);

    // Check if audio source loaded
    audio.addEventListener('loadeddata', function() {
        console.log('Audio file loaded successfully');
    });

    audio.addEventListener('error', function(e) {
        console.error('Audio loading error:', e);
        console.error('Audio error code:', audio.error);
    });

    // Set volume to 30%
    audio.volume = 0.3;
    console.log('Volume set to:', audio.volume);

    let playing = false;

    // Function to start music
    function startMusic() {
        console.log('Attempting to play music...');
        audio.play()
            .then(() => {
                button.textContent = '🔊';
                button.classList.remove('muted');
                playing = true;
                console.log('✓ Music is playing!');
            })
            .catch(err => {
                button.textContent = '🔇';
                button.classList.add('muted');
                playing = false;
                console.log('✗ Play failed:', err.message);
            });
    }

    // Try autoplay immediately
    startMusic();

    // Button click handler
    button.onclick = function(e) {
        e.preventDefault();
        console.log('Button clicked. Current state:', playing ? 'playing' : 'paused');

        if (playing) {
            audio.pause();
            button.textContent = '🔇';
            button.classList.add('muted');
            playing = false;
            console.log('Music paused');
        } else {
            startMusic();
        }
    };

    console.log('=== MUSIC SYSTEM READY ===');
});
