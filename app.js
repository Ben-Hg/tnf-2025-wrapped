// Global state
let currentSlide = 0;
let totalSlides = 0;
let selectedPlayer = null;

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    loadPlayerSelection();
    setupMusicControl();
});

// Load player selection screen
function loadPlayerSelection() {
    const playerGrid = document.getElementById('player-grid');
    const searchInput = document.getElementById('player-search');

    // Sort players alphabetically - include ALL players now
    const players = playerStats
        .sort((a, b) => a.name.localeCompare(b.name));

    players.forEach(player => {
        const btn = document.createElement('button');
        btn.className = 'player-btn';
        btn.textContent = player.name;
        btn.dataset.playerName = player.name.toLowerCase();
        btn.onclick = () => selectPlayer(player);
        playerGrid.appendChild(btn);
    });

    // Add search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const buttons = playerGrid.querySelectorAll('.player-btn');

        buttons.forEach(btn => {
            const playerName = btn.dataset.playerName;
            if (playerName.includes(searchTerm)) {
                btn.classList.remove('hidden');
            } else {
                btn.classList.add('hidden');
            }
        });
    });
}

// Player selection handler
function selectPlayer(player) {
    selectedPlayer = player;
    document.getElementById('player-select-screen').classList.remove('active');
    generateSlides();
    document.getElementById('slides-container').classList.add('active');
    document.getElementById('navigation').classList.remove('hidden');
    showSlide(0);
}

// Generate all slides
function generateSlides() {
    const container = document.getElementById('slides-container');
    container.innerHTML = '';

    // Section 1: Club Stats (5 slides)
    createIntroSlide();
    createSeasonOverviewSlide();
    createTopScorersSlide();
    createRecordsSlide();
    createFunFactsSlide();

    // Section 2: Personal Stats (7 slides)
    createPersonalIntroSlide();
    createPersonalStatsSlide();
    createPersonalGoalsSlide();
    createPersonalWinRateSlide();
    createFootballerComparisonSlide();
    createShareableSummarySlide();
    createFinalSlide();

    // Update total slides and generate progress dots
    totalSlides = container.children.length;
    generateProgressDots();
}

// Create individual slides
function createIntroSlide() {
    const slide = document.createElement('div');
    slide.className = 'slide';
    slide.innerHTML = `
        <div class="slide-content">
            <h1 class="slide-title">⚽<br>TNF 2025<br>WRAPPED</h1>
            <div class="slide-stat">50 Weeks</div>
            <p class="slide-description">82 players. 419 goals. 1 beautiful game.<br><br>Here's your year in football...</p>
        </div>
    `;
    document.getElementById('slides-container').appendChild(slide);
}

function createSeasonOverviewSlide() {
    const slide = document.createElement('div');
    slide.className = 'slide';
    slide.innerHTML = `
        <div class="slide-content">
            <h2 class="slide-title">The Season in Numbers</h2>
            <div class="stat-grid three-col">
                <div class="stat-item">
                    <div class="stat-label">Total Games</div>
                    <div class="stat-value">${clubStats.totalMatches}</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Total Goals</div>
                    <div class="stat-value">${clubStats.totalGoals}</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Goals/Game</div>
                    <div class="stat-value">${clubStats.goalsPerGame}</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Whites Wins</div>
                    <div class="stat-value">${clubStats.whitesWins}</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Colours Wins</div>
                    <div class="stat-value">${clubStats.coloursWins}</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Draws</div>
                    <div class="stat-value">${clubStats.draws}</div>
                </div>
            </div>
            <p class="slide-description" style="margin-top: 30px;">
                ${clubStats.goalsPerGame} goals per game is nearly 3x the Premier League average!
            </p>
        </div>
    `;
    document.getElementById('slides-container').appendChild(slide);
}

function createTopScorersSlide() {
    const topScorers = playerStats
        .filter(p => p.goals > 0)
        .sort((a, b) => b.goals - a.goals)
        .slice(0, 3);

    const slide = document.createElement('div');
    slide.className = 'slide';
    slide.innerHTML = `
        <div class="slide-content">
            <h2 class="slide-title">🥇 Golden Boot Race</h2>
            <div class="slide-stat">${topScorers[0].name}</div>
            <p class="slide-description">scored an incredible ${topScorers[0].goals} goals in ${topScorers[0].apps} games!</p>
            <div class="stat-grid" style="margin-top: 40px;">
                ${topScorers.slice(1, 3).map((p, i) => `
                    <div class="stat-item">
                        <div class="stat-label">${i === 0 ? '🥈' : '🥉'} ${p.name}</div>
                        <div class="stat-value">${p.goals}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    document.getElementById('slides-container').appendChild(slide);
}

function createRecordsSlide() {
    const slide = document.createElement('div');
    slide.className = 'slide';
    slide.innerHTML = `
        <div class="slide-content">
            <h2 class="slide-title">🔥 Record Breakers</h2>
            <div class="stat-grid">
                <div class="stat-item">
                    <div class="stat-label">🔥 Highest Scoring Game</div>
                    <div class="stat-value">19</div>
                    <p style="margin-top: 10px; font-size: 0.8rem; color: #b3b3b3;">GW25: Whites 11-8 Colours</p>
                </div>
                <div class="stat-item">
                    <div class="stat-label">💥 Biggest Win</div>
                    <div class="stat-value">9-0</div>
                    <p style="margin-top: 10px; font-size: 0.8rem; color: #b3b3b3;">GW1: Whites 11-2</p>
                </div>
                <div class="stat-item">
                    <div class="stat-label">🏅 Iron Man</div>
                    <div class="stat-value">${clubStats.ironMan.apps}</div>
                    <p style="margin-top: 10px; font-size: 0.8rem; color: #b3b3b3;">${clubStats.ironMan.name} - ${clubStats.ironMan.attendance} attendance</p>
                </div>
                <div class="stat-item">
                    <div class="stat-label">🛡️ Clean Sheets</div>
                    <div class="stat-value">1</div>
                    <p style="margin-top: 10px; font-size: 0.8rem; color: #b3b3b3;">Defence? Never heard of her</p>
                </div>
            </div>
        </div>
    `;
    document.getElementById('slides-container').appendChild(slide);
}

function createFunFactsSlide() {
    const slide = document.createElement('div');
    slide.className = 'slide';
    slide.innerHTML = `
        <div class="slide-content">
            <h2 class="slide-title">😈 The Blessed & Cursed</h2>
            <div class="stat-grid three-col">
                <div class="stat-item">
                    <div class="stat-label">🚀 Best Win Rate</div>
                    <div class="stat-value">${clubStats.bestWinRate.winRate}</div>
                    <p style="margin-top: 10px; font-size: 0.9rem; color: #1DB954;">${clubStats.bestWinRate.name}</p>
                    <p style="margin-top: 5px; font-size: 0.8rem; color: #b3b3b3;">${clubStats.bestWinRate.record}</p>
                </div>
                <div class="stat-item">
                    <div class="stat-label">😭 Worst Win Rate</div>
                    <div class="stat-value" style="color: #ff4444;">${clubStats.worstWinRate.winRate}</div>
                    <p style="margin-top: 10px; font-size: 0.9rem; color: #ff4444;">${clubStats.worstWinRate.name}</p>
                    <p style="margin-top: 5px; font-size: 0.8rem; color: #b3b3b3;">${clubStats.worstWinRate.record}</p>
                </div>
                <div class="stat-item">
                    <div class="stat-label">⚡ Most Lethal</div>
                    <div class="stat-value">${clubStats.mostLethal.goalsPerGame}</div>
                    <p style="margin-top: 10px; font-size: 0.9rem; color: #1DB954;">${clubStats.mostLethal.name}</p>
                    <p style="margin-top: 5px; font-size: 0.8rem; color: #b3b3b3;">${clubStats.mostLethal.record}</p>
                </div>
            </div>
            <p class="slide-description" style="margin-top: 30px;">
                Now let's see YOUR stats, ${selectedPlayer.name}...
            </p>
        </div>
    `;
    document.getElementById('slides-container').appendChild(slide);
}

function createPersonalIntroSlide() {
    const slide = document.createElement('div');
    slide.className = 'slide';
    slide.innerHTML = `
        <div class="slide-content">
            <h2 class="slide-title">Ready, ${selectedPlayer.name}?</h2>
            <div class="slide-stat">${selectedPlayer.apps}</div>
            <p class="slide-description">
                You played ${selectedPlayer.apps} games this season.<br>
                Let's see how you did...
            </p>
        </div>
    `;
    document.getElementById('slides-container').appendChild(slide);
}

function createPersonalStatsSlide() {
    const slide = document.createElement('div');
    slide.className = 'slide';
    slide.innerHTML = `
        <div class="slide-content">
            <h2 class="slide-title">Your Season Overview</h2>
            <div class="stat-grid">
                <div class="stat-item">
                    <div class="stat-label">Appearances</div>
                    <div class="stat-value">${selectedPlayer.apps}</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Wins</div>
                    <div class="stat-value">${selectedPlayer.wins}</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Win Rate</div>
                    <div class="stat-value">${selectedPlayer.winRate}</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">MOTMs</div>
                    <div class="stat-value">${selectedPlayer.motm}</div>
                </div>
            </div>
        </div>
    `;
    document.getElementById('slides-container').appendChild(slide);
}

function createPersonalGoalsSlide() {
    const slide = document.createElement('div');
    slide.className = 'slide';

    let content = '';
    if (selectedPlayer.goals === 0) {
        content = `
            <h2 class="slide-title">Your Scoring Record</h2>
            <div class="slide-stat">0</div>
            <p class="slide-description">
                Goals scored this season.<br><br>
                But football isn't just about goals! ${selectedPlayer.motm > 0 ? `You won ${selectedPlayer.motm} MOTM award${selectedPlayer.motm > 1 ? 's' : ''} with pure class.` : 'Your contributions were invaluable!'}
            </p>
        `;
    } else {
        const goalRank = playerStats.filter(p => p.goals > selectedPlayer.goals).length + 1;
        content = `
            <h2 class="slide-title">You Found the Net</h2>
            <div class="slide-stat">${selectedPlayer.goals}</div>
            <p class="slide-description">
                goals in ${selectedPlayer.apps} games<br>
                (${selectedPlayer.goalsPerGame.toFixed(1)} goals per game)<br><br>
                That's good for <strong>#${goalRank}</strong> in the league!
            </p>
        `;
    }

    slide.innerHTML = `<div class="slide-content">${content}</div>`;
    document.getElementById('slides-container').appendChild(slide);
}

function createPersonalWinRateSlide() {
    const slide = document.createElement('div');
    slide.className = 'slide';

    const winRateNum = parseInt(selectedPlayer.winRate);
    let message = '';
    if (winRateNum >= 60) {
        message = "You're a winner! Teams with you rarely lose.";
    } else if (winRateNum >= 45) {
        message = "Solid! A balanced contributor to the team.";
    } else if (winRateNum >= 30) {
        message = "Tough season, but you showed up every week!";
    } else {
        message = "Next season is your comeback tour!";
    }

    slide.innerHTML = `
        <div class="slide-content">
            <h2 class="slide-title">Your Impact</h2>
            <div class="slide-stat">${selectedPlayer.winRate}</div>
            <p class="slide-description">
                win rate across ${selectedPlayer.apps} appearances<br><br>
                ${message}
            </p>
            <div class="stat-grid three-col" style="margin-top: 40px;">
                <div class="stat-item">
                    <div class="stat-label">Wins</div>
                    <div class="stat-value" style="color: #1DB954;">${selectedPlayer.wins}</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Draws</div>
                    <div class="stat-value" style="color: #FFA500;">${selectedPlayer.draws}</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Losses</div>
                    <div class="stat-value" style="color: #ff4444;">${selectedPlayer.losses}</div>
                </div>
            </div>
        </div>
    `;
    document.getElementById('slides-container').appendChild(slide);
}

function createFootballerComparisonSlide() {
    const comparison = getFootballerComparison(selectedPlayer);

    const slide = document.createElement('div');
    slide.className = 'slide';
    slide.innerHTML = `
        <div class="slide-content">
            <h2 class="slide-title">Your Playing Style</h2>
            <div class="comparison-box">
                <p style="font-size: 1.2rem; color: #b3b3b3; margin-bottom: 15px;">You play like...</p>
                <div class="comparison-name">${comparison.player}</div>
                <div class="comparison-reason">${comparison.reason}</div>
            </div>
        </div>
    `;
    document.getElementById('slides-container').appendChild(slide);
}

function createShareableSummarySlide() {
    const comparison = getFootballerComparison(selectedPlayer);
    const goalRank = playerStats.filter(p => p.goals > selectedPlayer.goals).length + 1;

    const slide = document.createElement('div');
    slide.className = 'slide';
    slide.innerHTML = `
        <div class="slide-content shareable-card" id="shareable-summary">
            <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="font-size: 2.5rem; font-weight: 900; margin-bottom: 10px;">${selectedPlayer.name}</h1>
                <p style="font-size: 1.2rem; color: #1DB954; font-weight: 700;">TNF 2025 WRAPPED ⚽</p>
            </div>

            <div class="stat-grid" style="margin-bottom: 30px;">
                <div class="stat-item">
                    <div class="stat-label">Games</div>
                    <div class="stat-value" style="font-size: 2rem;">${selectedPlayer.apps}</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Goals</div>
                    <div class="stat-value" style="font-size: 2rem;">${selectedPlayer.goals}</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Win Rate</div>
                    <div class="stat-value" style="font-size: 2rem;">${selectedPlayer.winRate}</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">MOTMs</div>
                    <div class="stat-value" style="font-size: 2rem;">${selectedPlayer.motm}</div>
                </div>
            </div>

            <div class="comparison-box" style="margin-bottom: 20px;">
                <p style="font-size: 1rem; color: #b3b3b3; margin-bottom: 10px;">Playing Style</p>
                <div class="comparison-name" style="font-size: 1.8rem; margin-bottom: 10px;">${comparison.player}</div>
                <div class="comparison-reason" style="font-size: 0.95rem;">${comparison.reason}</div>
            </div>

            <div style="text-align: center; margin-top: 30px;">
                <button id="share-summary-btn" class="share-btn">
                    📤 Share This Summary
                </button>
            </div>
        </div>
    `;
    document.getElementById('slides-container').appendChild(slide);
}

function createFinalSlide() {
    const slide = document.createElement('div');
    slide.className = 'slide';
    slide.innerHTML = `
        <div class="slide-content">
            <h2 class="slide-title">That Was Your 2025, ${selectedPlayer.name}</h2>
            <p class="slide-description" style="font-size: 1.5rem; line-height: 1.8;">
                ${selectedPlayer.apps} games<br>
                ${selectedPlayer.goals} goals<br>
                ${selectedPlayer.wins} wins<br>
                ${selectedPlayer.motm} MOTM award${selectedPlayer.motm !== 1 ? 's' : ''}<br><br>
                Same time next year? ⚽
            </p>
        </div>
    `;
    document.getElementById('slides-container').appendChild(slide);
}

// Footballer comparison logic - Position-specific
function getFootballerComparison(player) {
    const goalsPerGame = player.goalsPerGame;
    const winRate = parseInt(player.winRate);
    const motmRate = player.motmPerGame;
    const position = player.position;

    // FORWARDS
    if (position === "Forward") {
        if (goalsPerGame >= 1.5) {
            return {
                player: "Erling Haaland",
                reason: `With ${goalsPerGame.toFixed(1)} goals per game, you're an absolute goal machine. Clinical finishing and always in the right place at the right time.`
            };
        }
        if (goalsPerGame >= 1.0) {
            return {
                player: "Mohamed Salah",
                reason: `${goalsPerGame.toFixed(1)} goals per game shows elite consistency. You're reliable in front of goal and a constant threat.`
            };
        }
        if (goalsPerGame >= 0.7) {
            return {
                player: "Cole Palmer",
                reason: `Scoring at ${goalsPerGame.toFixed(1)} goals per game, you contribute regularly and make things happen in the final third.`
            };
        }
        if (goalsPerGame >= 0.4) {
            return {
                player: "Gabriel Jesus",
                reason: `You chip in with goals but also work hard for the team. A forward who does more than just score.`
            };
        }
        return {
            player: "Roberto Firmino",
            reason: `The false nine. You might not score much, but your link-up play and work rate make everyone around you better.`
        };
    }

    // MIDFIELDERS
    if (position === "Midfielder") {
        if (goalsPerGame >= 1.0) {
            return {
                player: "Bruno Fernandes",
                reason: `${goalsPerGame.toFixed(1)} goals per game from midfield is exceptional. You're a goal-scoring midfielder who changes games.`
            };
        }
        if (goalsPerGame >= 0.5) {
            return {
                player: "Phil Foden",
                reason: `You chip in with goals from midfield and create chances. A versatile attacking midfielder who impacts every game.`
            };
        }
        if (winRate >= 60 && goalsPerGame < 0.5) {
            return {
                player: "Rodri",
                reason: `A ${winRate}% win rate speaks volumes. You don't need to score to dominate. You control the game and make your team better.`
            };
        }
        if (motmRate >= 0.15 || player.motm >= 3) {
            return {
                player: "Kevin De Bruyne",
                reason: `${player.motm} MOTM awards shows your quality. You might not always score, but you dictate the tempo and create magic.`
            };
        }
        if (goalsPerGame >= 0.2 && goalsPerGame < 0.5) {
            return {
                player: "Declan Rice",
                reason: `You're not a prolific scorer, but you do the hard work in midfield. Solid defensively with an occasional goal.`
            };
        }
        if (player.goals === 0 && player.motm >= 2) {
            return {
                player: "N'Golo Kanté",
                reason: `${player.motm} MOTM awards without scoring? Pure class. You're everywhere on the pitch, making tackles and intercepting passes.`
            };
        }
        if (winRate < 30) {
            return {
                player: "Jack Grealish at Aston Villa",
                reason: `Tough season with a ${winRate}% win rate, but you kept showing up. Sometimes the best players are on struggling teams.`
            };
        }
        return {
            player: "Jorginho",
            reason: `A reliable midfielder who keeps things ticking. You might not grab headlines, but you're essential to how the team functions.`
        };
    }

    // DEFENDERS
    if (position === "Defender") {
        if (goalsPerGame >= 0.3) {
            return {
                player: "John Stones",
                reason: `A defender who scores? You're a ball-playing center back who contributes at both ends of the pitch.`
            };
        }
        if (winRate >= 60) {
            return {
                player: "Virgil van Dijk",
                reason: `${winRate}% win rate shows you're a defensive rock. When you play, the team rarely loses. Leadership and presence.`
            };
        }
        if (player.apps >= 20) {
            return {
                player: "Kyle Walker",
                reason: `${player.apps} appearances shows incredible consistency. You're the dependable presence every team needs at the back.`
            };
        }
        if (player.motm >= 1) {
            return {
                player: "William Saliba",
                reason: `MOTM as a defender is rare - you're a dominant presence who makes crucial tackles and reads the game perfectly.`
            };
        }
        return {
            player: "Ben White",
            reason: `A solid, reliable defender. You do your job without fuss, keeping things tight at the back week in, week out.`
        };
    }

    // GOALKEEPER
    if (position === "Goalkeeper") {
        if (player.motm >= 3) {
            return {
                player: "Alisson Becker",
                reason: `${player.motm} MOTM awards as a goalkeeper! You're a world-class shot-stopper who wins games single-handedly.`
            };
        }
        if (winRate >= 50) {
            return {
                player: "Ederson",
                reason: `${winRate}% win rate shows you're not just a keeper, you're a sweeper-keeper who helps the team play out from the back.`
            };
        }
        if (player.apps >= 30) {
            return {
                player: "David Raya",
                reason: `${player.apps} appearances is elite consistency. You're the reliable last line of defense, always there when needed.`
            };
        }
        return {
            player: "Aaron Ramsdale",
            reason: `A solid goalkeeper who makes key saves. You might not grab all the headlines, but you're dependable between the sticks.`
        };
    }

    // Fallback
    return {
        player: "James Milner",
        reason: `A versatile player who does whatever the team needs. Not flashy, but absolutely essential.`
    };
}

// Navigation
function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });

    currentSlide = index;

    // Update navigation buttons
    document.getElementById('prev-btn').disabled = index === 0;
    document.getElementById('next-btn').disabled = index === totalSlides - 1;
}

function generateProgressDots() {
    const dotsContainer = document.getElementById('progress-dots');
    dotsContainer.innerHTML = '';

    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dot.onclick = () => showSlide(i);
        dotsContainer.appendChild(dot);
    }
}

// Event listeners
document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentSlide > 0) {
        showSlide(currentSlide - 1);
    }
});

document.getElementById('next-btn').addEventListener('click', () => {
    if (currentSlide < totalSlides - 1) {
        showSlide(currentSlide + 1);
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && currentSlide > 0) {
        showSlide(currentSlide - 1);
    } else if (e.key === 'ArrowRight' && currentSlide < totalSlides - 1) {
        showSlide(currentSlide + 1);
    }
});

// Touch gestures for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50 && currentSlide < totalSlides - 1) {
        showSlide(currentSlide + 1);
    }
    if (touchEndX > touchStartX + 50 && currentSlide > 0) {
        showSlide(currentSlide - 1);
    }
}

// Add event listener for share button (delegated since it's dynamically created)
document.addEventListener('click', async (e) => {
    if (e.target && e.target.id === 'share-summary-btn') {
        await shareSummary();
    }
});

async function shareSummary() {
    const summaryCard = document.getElementById('shareable-summary');

    if (!summaryCard) return;

    const shareBtn = document.getElementById('share-summary-btn');
    const originalText = shareBtn.textContent;
    shareBtn.textContent = '⏳ Generating...';
    shareBtn.disabled = true;

    try {
        const canvas = await html2canvas(summaryCard, {
            backgroundColor: '#1a1a2e',
            scale: 2,
            logging: false,
            useCORS: true
        });

        canvas.toBlob(async (blob) => {
            const file = new File([blob], `TNF-2025-${selectedPlayer.name}.png`, { type: 'image/png' });

            // Check if Web Share API is supported (mobile)
            if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
                try {
                    await navigator.share({
                        files: [file],
                        title: `${selectedPlayer.name}'s TNF 2025 Wrapped`,
                        text: `Check out my TNF 2025 season stats! ⚽`
                    });
                    shareBtn.textContent = '✅ Shared!';
                } catch (err) {
                    if (err.name !== 'AbortError') {
                        console.error('Share failed:', err);
                        downloadFallback(canvas);
                    } else {
                        shareBtn.textContent = originalText;
                    }
                }
            } else {
                // Fallback: download the image
                downloadFallback(canvas);
            }

            setTimeout(() => {
                shareBtn.textContent = originalText;
                shareBtn.disabled = false;
            }, 2000);
        }, 'image/png');

    } catch (error) {
        console.error('Share failed:', error);
        alert('Share failed. Please take a screenshot instead.');
        shareBtn.textContent = originalText;
        shareBtn.disabled = false;
    }
}

function downloadFallback(canvas) {
    const link = document.createElement('a');
    link.download = `TNF-2025-${selectedPlayer.name}-summary.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();

    const shareBtn = document.getElementById('share-summary-btn');
    shareBtn.textContent = '✅ Downloaded!';
}

// Background Music Control
function setupMusicControl() {
    const music = document.getElementById('background-music');
    const toggleBtn = document.getElementById('music-toggle');
    let isPlaying = false;

    // Set initial volume to 30% (subtle background music)
    music.volume = 0.3;

    toggleBtn.addEventListener('click', () => {
        if (isPlaying) {
            music.pause();
            toggleBtn.textContent = '🔇';
            toggleBtn.classList.add('muted');
            isPlaying = false;
        } else {
            // Try to play, but handle autoplay restrictions
            music.play().then(() => {
                toggleBtn.textContent = '🔊';
                toggleBtn.classList.remove('muted');
                isPlaying = true;
            }).catch(err => {
                console.log('Music autoplay blocked:', err);
            });
        }
    });

    // Auto-play music when user selects a player (user interaction enables autoplay)
    const originalSelectPlayer = window.selectPlayer;
    window.selectPlayer = function(player) {
        originalSelectPlayer(player);

        // Try to start music after user interaction
        if (!isPlaying) {
            music.play().then(() => {
                toggleBtn.textContent = '🔊';
                toggleBtn.classList.remove('muted');
                isPlaying = true;
            }).catch(err => {
                console.log('Music autoplay still blocked:', err);
            });
        }
    };
}
