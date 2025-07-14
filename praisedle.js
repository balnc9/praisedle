// Praisedle - Worship Music Guessing Game
class PraisedleGame {
    constructor() {
        this.currentSong = null;
        this.currentAttempt = 1;
        this.maxAttempts = 6;
        this.clipLengths = [1, 2, 4, 7, 11, 16];
        this.currentClipIndex = 0;
        this.score = 0;
        this.gameOver = false;
        this.audioPlayer = document.getElementById('audio-player');
        
        // Load songs and initialize
        this.loadSongs();
        this.loadStats();
        this.bindEvents();
        this.startNewGame();
    }

    // Curated worship song database
    getDefaultSongs() {
        return [
            {
                id: 1,
                title: "How Great Is Our God",
                artist: "Chris Tomlin",
                audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Demo URL - replace with actual songs
                startTime: 30
            },
            {
                id: 2,
                title: "Amazing Grace",
                artist: "Traditional",
                audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
                startTime: 15
            },
            {
                id: 3,
                title: "10,000 Reasons (Bless the Lord)",
                artist: "Matt Redman",
                audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
                startTime: 45
            },
            {
                id: 4,
                title: "Blessed Be Your Name",
                artist: "Matt Redman",
                audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
                startTime: 25
            },
            {
                id: 5,
                title: "Here I Am to Worship",
                artist: "Tim Hughes",
                audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
                startTime: 20
            },
            {
                id: 6,
                title: "Shout to the Lord",
                artist: "Darlene Zschech",
                audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
                startTime: 12
            },
            {
                id: 7,
                title: "Holy Spirit",
                artist: "Francesca Battistelli",
                audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
                startTime: 35
            },
            {
                id: 8,
                title: "Good Good Father",
                artist: "Chris Tomlin",
                audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
                startTime: 28
            },
            {
                id: 9,
                title: "What a Beautiful Name",
                artist: "Hillsong Worship",
                audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
                startTime: 40
            },
            {
                id: 10,
                title: "Way Maker",
                artist: "Sinach",
                audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
                startTime: 22
            },
            {
                id: 11,
                title: "Reckless Love",
                artist: "Cory Asbury",
                audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
                startTime: 33
            },
            {
                id: 12,
                title: "Great Are You Lord",
                artist: "All Sons & Daughters",
                audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
                startTime: 18
            },
            {
                id: 13,
                title: "Oceans (Where Feet May Fail)",
                artist: "Hillsong United",
                audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
                startTime: 55
            },
            {
                id: 14,
                title: "This I Believe (The Creed)",
                artist: "Hillsong Worship",
                audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
                startTime: 42
            },
            {
                id: 15,
                title: "King of My Heart",
                artist: "Bethel Music",
                audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
                startTime: 26
            },
            {
                id: 16,
                title: "Build My Life",
                artist: "Pat Barrett",
                audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
                startTime: 30
            },
            {
                id: 17,
                title: "Cornerstone",
                artist: "Hillsong Worship",
                audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
                startTime: 45
            },
            {
                id: 18,
                title: "Open Heaven (River Wild)",
                artist: "Hillsong Worship",
                audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
                startTime: 38
            },
            {
                id: 19,
                title: "Do It Again",
                artist: "Elevation Worship",
                audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
                startTime: 32
            },
            {
                id: 20,
                title: "Living Hope",
                artist: "Phil Wickham",
                audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
                startTime: 25
            }
        ];
    }

    loadSongs() {
        // Always use the curated song list for consistency
        this.songs = this.getDefaultSongs();
    }

    loadStats() {
        const stats = localStorage.getItem('praisedle-stats');
        if (stats) {
            this.stats = JSON.parse(stats);
        } else {
            this.stats = {
                gamesPlayed: 0,
                gamesWon: 0,
                currentStreak: 0,
                maxStreak: 0,
                winPercentage: 0,
                totalScore: 0,
                guessDistribution: [0, 0, 0, 0, 0, 0, 0], // index 0-5 for attempts 1-6, index 6 for failed
                totalAttempts: 0,
                averageAttempts: 0
            };
        }
        this.updateStatsDisplay();
    }

    saveStats() {
        // Calculate average attempts
        if (this.stats.gamesWon > 0) {
            this.stats.averageAttempts = (this.stats.totalAttempts / this.stats.gamesWon).toFixed(1);
        }
        
        localStorage.setItem('praisedle-stats', JSON.stringify(this.stats));
        this.updateStatsDisplay();
        this.updateGuessDistribution();
    }

    updateStatsDisplay() {
        document.getElementById('games-played').textContent = this.stats.gamesPlayed;
        document.getElementById('win-percentage').textContent = this.stats.winPercentage + '%';
        document.getElementById('current-streak').textContent = this.stats.currentStreak;
        document.getElementById('max-streak').textContent = this.stats.maxStreak;
        document.getElementById('avg-attempts').textContent = this.stats.averageAttempts || '0.0';
        document.getElementById('total-score').textContent = this.stats.totalScore;
        
        this.updateStreakDisplay();
    }

    updateStreakDisplay() {
        const streakIcon = document.getElementById('streak-icon');
        const streakText = document.getElementById('streak-text');
        const streakFlame = document.querySelector('.streak-flame');
        
        if (this.stats.currentStreak === 0) {
            streakText.textContent = 'Keep playing to start a streak!';
            streakFlame.classList.remove('active');
        } else if (this.stats.currentStreak === 1) {
            streakText.textContent = `You're on a ${this.stats.currentStreak} game streak! 🔥`;
            streakFlame.classList.add('active');
        } else {
            streakText.textContent = `You're on fire! ${this.stats.currentStreak} game streak! 🔥🔥`;
            streakFlame.classList.add('active');
        }
    }

    updateGuessDistribution() {
        const maxCount = Math.max(...this.stats.guessDistribution);
        
        this.stats.guessDistribution.forEach((count, index) => {
            const distElement = document.getElementById(`dist-${index === 6 ? 'failed' : index + 1}`);
            const fillElement = document.querySelector(`[data-attempts="${index === 6 ? 'failed' : index + 1}"] .distribution-fill`);
            
            if (distElement && fillElement) {
                distElement.textContent = count;
                const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
                fillElement.style.width = percentage + '%';
            }
        });
    }

    bindEvents() {
        // Play button events
        document.querySelectorAll('.play-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const length = parseInt(e.target.dataset.length);
                this.playClip(length);
            });
        });

        // Game controls
        document.getElementById('submit-guess').addEventListener('click', () => this.submitGuess());
        document.getElementById('skip-guess').addEventListener('click', () => this.skipGuess());
        document.getElementById('next-song').addEventListener('click', () => this.startNewGame());

        // Input events
        document.getElementById('song-guess').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.submitGuess();
        });
        document.getElementById('artist-guess').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.submitGuess();
        });

        // Input focus events for visual feedback
        document.getElementById('song-guess').addEventListener('focus', () => this.highlightCurrentGuessBox());
        document.getElementById('artist-guess').addEventListener('focus', () => this.highlightCurrentGuessBox());

        // Audio events
        this.audioPlayer.addEventListener('timeupdate', () => this.updateAudioProgress());
        this.audioPlayer.addEventListener('ended', () => this.audioEnded());
    }

    highlightCurrentGuessBox() {
        // Remove active class from all guess boxes
        document.querySelectorAll('.guess-box').forEach(box => {
            box.classList.remove('active');
        });
        
        // Add active class to current attempt box
        const currentBox = document.querySelector(`[data-attempt="${this.currentAttempt}"]`);
        if (currentBox && !this.gameOver) {
            currentBox.classList.add('active');
        }
    }

    updateGuessBox(attempt, songGuess, artistGuess, isCorrect) {
        const guessBox = document.querySelector(`[data-attempt="${attempt}"]`);
        if (!guessBox) return;

        const songElement = guessBox.querySelector('.guess-song');
        const artistElement = guessBox.querySelector('.guess-artist');
        const resultElement = guessBox.querySelector('.guess-result');

        // Update content
        songElement.textContent = songGuess || '---';
        artistElement.textContent = artistGuess || '---';

        // Update result icon and styling
        if (isCorrect) {
            guessBox.classList.add('correct');
            resultElement.innerHTML = '<i class="fas fa-check"></i>';
        } else if (songGuess || artistGuess) {
            guessBox.classList.add('incorrect');
            resultElement.innerHTML = '<i class="fas fa-times"></i>';
        }

        // Remove active class
        guessBox.classList.remove('active');
    }

    resetGuessBoxes() {
        document.querySelectorAll('.guess-box').forEach(box => {
            box.classList.remove('active', 'correct', 'incorrect');
            box.querySelector('.guess-song').textContent = '---';
            box.querySelector('.guess-artist').textContent = '---';
            box.querySelector('.guess-result').innerHTML = '<i class="fas fa-question"></i>';
        });
    }

    startNewGame() {
        if (this.songs.length === 0) {
            alert('No songs available! Please refresh the page and try again.');
            return;
        }

        this.currentSong = this.songs[Math.floor(Math.random() * this.songs.length)];
        this.currentAttempt = 1;
        this.currentClipIndex = 0;
        this.gameOver = false;
        
        // Reset UI
        document.getElementById('song-guess').value = '';
        document.getElementById('artist-guess').value = '';
        document.getElementById('result-section').classList.add('hidden');
        
        // Reset guess boxes
        this.resetGuessBoxes();
        this.highlightCurrentGuessBox();
        
        // Reset progress bars
        document.querySelectorAll('.progress-bar').forEach(bar => {
            bar.classList.remove('completed');
            bar.querySelector('.play-btn').disabled = false;
        });

        // Load the audio
        this.loadAudio();
    }

    loadAudio() {
        this.audioPlayer.src = this.currentSong.audioUrl;
        this.audioPlayer.currentTime = this.currentSong.startTime || 0;
    }

    playClip(length) {
        if (this.gameOver) return;

        const clipIndex = this.clipLengths.indexOf(length);
        if (clipIndex > this.currentClipIndex) {
            // Can't play longer clips until previous ones are unlocked
            return;
        }

        this.audioPlayer.currentTime = this.currentSong.startTime || 0;
        this.audioPlayer.play();
        
        // Stop after the specified length
        setTimeout(() => {
            this.audioPlayer.pause();
        }, length * 1000);

        // Mark this length as completed
        this.markClipCompleted(length);
    }

    markClipCompleted(length) {
        const progressBar = document.querySelector(`[data-seconds="${length}"]`);
        if (progressBar) {
            progressBar.classList.add('completed');
        }
    }

    updateAudioProgress() {
        // Update progress bars if needed
    }

    audioEnded() {
        // Audio clip ended naturally
    }

    submitGuess() {
        if (this.gameOver) return;

        const songGuess = document.getElementById('song-guess').value.trim();
        const artistGuess = document.getElementById('artist-guess').value.trim();

        if (!songGuess && !artistGuess) {
            alert('Please enter at least a song title or artist name.');
            return;
        }

        const isCorrect = this.checkGuess(songGuess, artistGuess);
        
        // Update the guess box
        this.updateGuessBox(this.currentAttempt, songGuess, artistGuess, isCorrect);
        
        if (isCorrect) {
            this.handleCorrectGuess();
        } else {
            this.handleIncorrectGuess();
        }
    }

    checkGuess(songGuess, artistGuess) {
        const songMatch = this.fuzzyMatch(songGuess, this.currentSong.title);
        const artistMatch = this.fuzzyMatch(artistGuess, this.currentSong.artist);
        
        // Consider it correct if either song title or artist is very close
        return songMatch || artistMatch;
    }

    fuzzyMatch(guess, target) {
        if (!guess || !target) return false;
        
        const normalizeString = (str) => {
            return str.toLowerCase()
                .replace(/[^\w\s]/g, '')
                .replace(/\s+/g, ' ')
                .trim();
        };

        const normalizedGuess = normalizeString(guess);
        const normalizedTarget = normalizeString(target);

        // Exact match
        if (normalizedGuess === normalizedTarget) return true;

        // Check if guess is contained in target or vice versa
        if (normalizedGuess.length > 3 && normalizedTarget.includes(normalizedGuess)) return true;
        if (normalizedTarget.length > 3 && normalizedGuess.includes(normalizedTarget)) return true;

        // Simple similarity check
        const similarity = this.calculateSimilarity(normalizedGuess, normalizedTarget);
        return similarity > 0.8;
    }

    calculateSimilarity(str1, str2) {
        const longer = str1.length > str2.length ? str1 : str2;
        const shorter = str1.length > str2.length ? str2 : str1;
        
        if (longer.length === 0) return 1.0;
        
        const editDistance = this.levenshteinDistance(longer, shorter);
        return (longer.length - editDistance) / longer.length;
    }

    levenshteinDistance(str1, str2) {
        const matrix = [];
        
        for (let i = 0; i <= str2.length; i++) {
            matrix[i] = [i];
        }
        
        for (let j = 0; j <= str1.length; j++) {
            matrix[0][j] = j;
        }
        
        for (let i = 1; i <= str2.length; i++) {
            for (let j = 1; j <= str1.length; j++) {
                if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }
        
        return matrix[str2.length][str1.length];
    }

    handleCorrectGuess() {
        this.gameOver = true;
        this.score = this.maxAttempts - this.currentAttempt + 1;
        
        document.getElementById('result-message').innerHTML = '🎉 Correct! Well done!';
        document.getElementById('correct-answer').innerHTML = 
            `<strong>${this.currentSong.title}</strong><br>by ${this.currentSong.artist}`;
        document.getElementById('result-section').classList.remove('hidden');

        // Update stats
        this.stats.gamesPlayed++;
        this.stats.gamesWon++;
        this.stats.currentStreak++;
        this.stats.maxStreak = Math.max(this.stats.maxStreak, this.stats.currentStreak);
        this.stats.winPercentage = Math.round((this.stats.gamesWon / this.stats.gamesPlayed) * 100);
        this.stats.totalScore += this.score;
        this.stats.totalAttempts += this.currentAttempt;
        this.stats.guessDistribution[this.currentAttempt - 1]++; // Index 0-5 for attempts 1-6
        this.saveStats();

        // Unlock all clips and play success sound
        this.clipLengths.forEach(length => this.markClipCompleted(length));
        this.playSuccessAnimation();
    }

    handleIncorrectGuess() {
        this.currentAttempt++;
        
        if (this.currentAttempt > this.maxAttempts) {
            this.handleGameOver();
        } else {
            // Unlock next clip
            if (this.currentClipIndex < this.clipLengths.length - 1) {
                this.currentClipIndex++;
            }
            
            // Clear inputs and highlight next guess box
            document.getElementById('song-guess').value = '';
            document.getElementById('artist-guess').value = '';
            this.highlightCurrentGuessBox();
        }
    }

    skipGuess() {
        if (this.gameOver) return;
        
        // Update guess box with skip
        this.updateGuessBox(this.currentAttempt, 'SKIPPED', '', false);
        this.handleIncorrectGuess();
    }

    handleGameOver() {
        this.gameOver = true;
        
        document.getElementById('result-message').innerHTML = '❌ Game Over!';
        document.getElementById('correct-answer').innerHTML = 
            `The correct answer was:<br><strong>${this.currentSong.title}</strong><br>by ${this.currentSong.artist}`;
        document.getElementById('result-section').classList.remove('hidden');

        // Update stats
        this.stats.gamesPlayed++;
        this.stats.currentStreak = 0;
        this.stats.winPercentage = Math.round((this.stats.gamesWon / this.stats.gamesPlayed) * 100);
        this.stats.guessDistribution[6]++; // Failed attempts go to index 6
        this.saveStats();

        // Unlock all clips
        this.clipLengths.forEach(length => this.markClipCompleted(length));
        this.playFailAnimation();
    }

    playSuccessAnimation() {
        // Add success animation to the page
        const confetti = document.createElement('div');
        confetti.innerHTML = '🎉🎵✨🙌🎶';
        confetti.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 3rem;
            z-index: 1000;
            animation: successPop 2s ease forwards;
            pointer-events: none;
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes successPop {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0); }
                20% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
                100% { opacity: 0; transform: translate(-50%, -100%) scale(1); }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            document.body.removeChild(confetti);
            document.head.removeChild(style);
        }, 2000);
    }

    playFailAnimation() {
        // Add a subtle fail animation
        document.querySelector('.game-section').style.animation = 'shake 0.5s ease';
        setTimeout(() => {
            document.querySelector('.game-section').style.animation = '';
        }, 500);
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes shake {
                0%, 20%, 50%, 80%, 100% { transform: translateX(0); }
                10% { transform: translateX(-5px); }
                30% { transform: translateX(5px); }
                60% { transform: translateX(-3px); }
                90% { transform: translateX(3px); }
            }
        `;
        document.head.appendChild(style);
        setTimeout(() => document.head.removeChild(style), 1000);
    }
}

// Initialize the game when the page loads
let game;
document.addEventListener('DOMContentLoaded', () => {
    game = new PraisedleGame();
    
    // Console welcome message
    console.log('%c🎵 Welcome to Praisedle! 🎵', 'color: #667eea; font-size: 20px; font-weight: bold;');
    console.log('%cTest your worship music knowledge and build your streak!', 'color: #764ba2; font-size: 14px;');
});

// Make game available globally if needed
window.game = game;
