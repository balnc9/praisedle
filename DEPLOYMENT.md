# 🚀 Praisedle Deployment Guide

This guide covers multiple ways to deploy Praisedle to make it live on the internet.

## 📁 Project Structure

```
praisedle/
├── praisedle.html          # Main game page
├── praisedle.css           # Styling
├── praisedle.js            # Game logic
├── server.js               # Express server
├── package.json            # Node.js dependencies
├── vercel.json             # Vercel deployment config
├── netlify.toml            # Netlify deployment config
├── Dockerfile              # Docker container config
└── sample-songs.json       # Sample song database
```

## 🌐 Deployment Options

### 1. Vercel (Recommended - Easy & Free)

Vercel is perfect for this type of application with automatic deployments.

#### Steps:
1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/praisedle.git
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect the `vercel.json` config
   - Click "Deploy"

3. **Custom Domain** (Optional):
   - Go to your project settings in Vercel
   - Add your custom domain
   - Update DNS records as instructed

**Live in 2 minutes!** ⚡

---

### 2. Netlify (Alternative Free Option)

Great for static sites with serverless functions.

#### Steps:
1. **Push to GitHub** (same as above)

2. **Deploy to Netlify**:
   - Visit [netlify.com](https://netlify.com)
   - Sign up with GitHub
   - Click "New site from Git"
   - Connect your repository
   - Netlify will use the `netlify.toml` config
   - Click "Deploy site"

3. **Custom Domain**:
   - Go to Domain settings
   - Add your custom domain

---

### 3. Heroku (For More Control)

Good for applications that need persistent server processes.

#### Steps:
1. **Install Heroku CLI**:
   ```bash
   # macOS
   brew install heroku/brew/heroku
   
   # Windows
   # Download from heroku.com/cli
   ```

2. **Deploy**:
   ```bash
   heroku login
   heroku create your-app-name
   git push heroku main
   heroku open
   ```

3. **Custom Domain**:
   ```bash
   heroku domains:add yourdomain.com
   # Follow DNS setup instructions
   ```

---

### 4. Railway (Modern Alternative)

Simple deployment with great developer experience.

#### Steps:
1. **Visit [railway.app](https://railway.app)**
2. **Connect GitHub repository**
3. **Deploy automatically**
4. **Add custom domain in settings**

---

### 5. Docker Deployment

For self-hosting or cloud platforms that support containers.

#### Local Development:
```bash
# Build the image
docker build -t praisedle .

# Run the container
docker run -p 3000:3000 praisedle

# Visit http://localhost:3000
```

#### Deploy to Cloud:
- **Google Cloud Run**
- **AWS ECS**
- **Azure Container Instances**
- **DigitalOcean App Platform**

---

### 6. Traditional VPS/Server

For complete control over your hosting environment.

#### Steps:
1. **Get a VPS** (DigitalOcean, Linode, AWS EC2, etc.)

2. **Setup Server**:
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install PM2 for process management
   sudo npm install -g pm2
   ```

3. **Deploy Application**:
   ```bash
   # Clone your repository
   git clone https://github.com/yourusername/praisedle.git
   cd praisedle
   
   # Install dependencies
   npm install
   
   # Start with PM2
   pm2 start server.js --name "praisedle"
   pm2 startup
   pm2 save
   ```

4. **Setup Nginx** (Optional):
   ```bash
   sudo apt install nginx
   
   # Create nginx config
   sudo nano /etc/nginx/sites-available/praisedle
   ```

   ```nginx
   server {
       listen 80;
       server_name yourdomain.com www.yourdomain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

   ```bash
   # Enable site
   sudo ln -s /etc/nginx/sites-available/praisedle /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

5. **Setup SSL** (Let's Encrypt):
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```

---

## 🎵 Adding Real Music

To add actual worship songs instead of demo sounds:

### Option 1: Use Audio Hosting Services
- Upload songs to SoundCloud, AudioMack, or similar
- Use their embed URLs in the song database
- Ensure you have proper licensing

### Option 2: Self-Host Audio Files
- Upload audio files to your server
- Update `audioUrl` in the song database
- Ensure HTTPS for audio playback

### Option 3: Use a CDN
- Upload to AWS S3, Cloudinary, or similar
- Use CDN URLs for better performance
- Set up proper CORS headers

### Sample Configuration:
```javascript
// In praisedle.js, update the getDefaultSongs() method:
{
    id: 1,
    title: "How Great Is Our God",
    artist: "Chris Tomlin",
    audioUrl: "https://your-audio-cdn.com/how-great-is-our-god.mp3",
    startTime: 30
}
```

---

## 🔧 Environment Variables

For production deployments, you can set these environment variables:

```bash
NODE_ENV=production
PORT=3000
DOMAIN=yourdomain.com
```

---

## 📊 Monitoring & Analytics

### Health Checks
Your deployed app includes a health check endpoint:
- `https://yourdomain.com/health`

### Adding Analytics
Add Google Analytics or similar to track usage:

```html
<!-- Add to praisedle.html <head> section -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## 🚀 Quick Start Commands

### Local Development:
```bash
npm install
npm run dev
# Visit http://localhost:3000
```

### Production Build:
```bash
npm install --production
npm start
```

### Docker:
```bash
docker build -t praisedle .
docker run -p 3000:3000 praisedle
```

---

## 🎯 Recommended Deployment

**For Beginners**: Use Vercel - it's free, fast, and requires zero configuration.

**For Advanced Users**: Use a VPS with Docker for full control and customization.

**For Teams**: Use Railway or Heroku for better collaboration features.

---

## 🔒 Security Considerations

- ✅ HTTPS is enabled by default on most platforms
- ✅ Security headers are configured in the Express server
- ✅ CORS is properly configured
- ✅ No sensitive data is stored (everything is client-side)
- ✅ Content Security Policy is implemented

---

## 🆘 Troubleshooting

### Common Issues:

1. **Audio not playing**: Check CORS settings and HTTPS
2. **Slow loading**: Ensure audio files are optimized and use a CDN
3. **Mobile issues**: Test responsive design and touch controls

### Support:
- Check server logs for errors
- Use browser developer tools for client-side issues
- Monitor the `/health` endpoint for server status

---

**Your Praisedle game is now ready to go live! 🎵✨** 