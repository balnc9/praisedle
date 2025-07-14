# 🎵 Praisedle - Worship Music Guessing Game

A Heardle-style music guessing game specifically designed for worship music! Test your knowledge of praise and worship songs by listening to progressively longer clips.

## 🎮 How to Play

1. **Listen to the Audio Clips**: Start with a 1-second clip and work your way up to 16 seconds
2. **Make Your Guess**: Enter the song title and/or artist name
3. **Get Feedback**: Correct guesses end the round, incorrect guesses unlock longer clips
4. **Track Your Progress**: View your statistics and try to maintain your streak!

### Game Rules
- You have 6 attempts to guess correctly
- Audio clips are available in these lengths: 1s, 2s, 4s, 7s, 11s, 16s
- You can only unlock longer clips by using previous attempts
- Guessing the song title OR artist correctly counts as a win
- Fuzzy matching allows for slight spelling variations

## 🚀 Getting Started

### Play Online (Recommended)
Visit the live website: **[Coming Soon - Deploy using guide below]**

### Run Locally
```bash
# Clone the repository
git clone https://github.com/yourusername/praisedle.git
cd praisedle

# Install dependencies
npm install

# Start the server
npm start

# Visit http://localhost:3000
```

## ✨ Features

### 🎯 Game Features
- **Progressive Audio Clips**: Just like Heardle - 1s → 2s → 4s → 7s → 11s → 16s
- **Smart Guessing**: Accepts both song titles and artist names with fuzzy matching
- **Visual Feedback**: Wordle-style guess boxes with ✅/❌ indicators
- **Statistics Tracking**: Win rate, streaks, guess distribution, and more
- **Dark Modern Theme**: Beautiful, responsive design that works on all devices

### 📊 Advanced Statistics
- 🔥 **Streak Tracking**: Animated fire icons that grow with your success
- 📈 **Guess Distribution**: See how often you win on each attempt
- 🎯 **Performance Metrics**: Average attempts, total score, win percentage
- 📱 **Local Storage**: Everything saves automatically in your browser

### 🎵 Song Database
- **20 Popular Worship Songs**: Curated collection of beloved praise songs
- **Contemporary & Traditional**: Mix of modern hits and classic hymns
- **Artist Variety**: Songs from Chris Tomlin, Hillsong, Matt Redman, and more

## 🌊 Modern Design

### Dark Theme
- Beautiful gradient backgrounds
- Smooth animations and transitions
- Glass-morphism effects
- Responsive mobile design

### Interactive Elements
- Hover effects on all buttons
- Animated progress bars
- Success confetti animations
- Smooth state transitions

## 🏗️ Technical Features

### Frontend
- **Vanilla JavaScript**: No frameworks - fast and lightweight
- **Progressive Web App**: Works offline once loaded
- **Responsive Design**: Perfect on desktop, tablet, and mobile
- **Accessibility**: Keyboard navigation and screen reader support

### Backend
- **Express.js Server**: Fast, secure, and scalable
- **Security Headers**: Helmet.js protection
- **Compression**: Gzip compression for faster loading
- **Health Monitoring**: Built-in health check endpoints

### Performance
- **CDN Ready**: Optimized for content delivery networks
- **Caching**: Smart caching strategies for static assets
- **Lightweight**: Minimal dependencies and optimized code

## 🌐 Deployment

Praisedle is ready to deploy to multiple platforms:

### Quick Deploy (2 minutes)
- **Vercel**: Zero-config deployment with GitHub
- **Netlify**: Drag-and-drop deployment
- **Railway**: One-click deployment

### Advanced Deployment
- **Docker**: Containerized deployment
- **VPS/Server**: Full control hosting
- **Cloud Platforms**: AWS, Google Cloud, Azure

📖 **[Complete Deployment Guide](DEPLOYMENT.md)**

## 📱 Browser Compatibility

- ✅ Chrome, Firefox, Safari, Edge (modern versions)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ✅ Requires JavaScript enabled
- ✅ Modern audio API support

## 🎵 Adding Your Own Songs

The song database is configured in the JavaScript file. To add real worship songs:

1. **Upload audio files** to a hosting service (SoundCloud, your server, etc.)
2. **Update the song database** in `praisedle.js`
3. **Ensure proper licensing** for all audio content

```javascript
// Example song format
{
    id: 21,
    title: "Your Song Title",
    artist: "Artist Name",
    audioUrl: "https://your-audio-host.com/song.mp3",
    startTime: 30 // seconds to start playing from
}
```

## 🔐 Privacy & Data

- **No Account Required**: Play immediately without registration
- **Local Storage Only**: All stats saved in your browser
- **No Data Collection**: Zero tracking or analytics by default
- **Offline Capable**: Works without internet once loaded

## 🎯 Perfect For

- **Churches**: Youth groups, worship teams, Bible studies
- **Worship Leaders**: Learning and practicing song recognition
- **Music Lovers**: Testing knowledge of Christian music
- **Game Nights**: Fun competition with friends and family

## 📊 Statistics

The game tracks comprehensive statistics:

- **Games Played**: Total rounds completed
- **Win Rate**: Percentage of successful games
- **Current Streak**: Consecutive wins
- **Best Streak**: Highest streak achieved
- **Average Attempts**: How quickly you typically guess
- **Guess Distribution**: Visual breakdown of solving patterns

## 🔧 Development

### Local Development
```bash
npm run dev        # Start with auto-reload
npm start          # Production mode
npm test           # Run tests (if any)
```

### Project Structure
```
praisedle/
├── praisedle.html    # Main game interface
├── praisedle.css     # Styling and animations
├── praisedle.js      # Game logic and functionality
├── server.js         # Express server
├── package.json      # Dependencies and scripts
└── sample-songs.json # Example song database format
```

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source under the MIT License. Feel free to use, modify, and distribute.

**Important**: Ensure you have proper licensing for any audio content you use.

## 🙏 Acknowledgments

- Inspired by Heardle and Wordle
- Built for the worship music community
- Designed with accessibility and inclusivity in mind

---

## 🚀 Get Started Now!

1. **[Deploy to Vercel](https://vercel.com)** - Fastest way to go live
2. **[View Deployment Guide](DEPLOYMENT.md)** - Complete hosting instructions
3. **[Run Locally](#run-locally)** - Test on your machine first

**Ready to test your worship music knowledge? Let's praise and play! 🎵✨** 