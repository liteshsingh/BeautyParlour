# Production Deployment Guide

## Frontend Deployment

### Build the Application
```bash
cd frontend
npm run build
```
This creates a `dist/` folder with optimized production build.

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```
Follow the prompts and connect your repository.

### Deploy to Netlify
1. Push code to GitHub
2. Connect repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`

### Deploy to Traditional Server
```bash
# Build
npm run build

# Upload dist/ folder to your server
# Configure web server (nginx/apache) to serve index.html for all routes

# Example nginx config:
# location / {
#   try_files $uri $uri/ /index.html;
# }
```

### Environment Variables for Production
```
VITE_API_URL=https://your-api-domain.com
```

## Backend Deployment

### Prepare for Production

1. **Update .env file**:
```bash
SECRET_KEY=generate-a-strong-secret-key
DEBUG=False
ALLOWED_HOSTS=your-domain.com,www.your-domain.com
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/beauty_parlour
```

2. **Run migrations**:
```bash
python manage.py migrate
```

3. **Collect static files**:
```bash
python manage.py collectstatic --noinput
```

### Deploy to Heroku
```bash
# Install Heroku CLI
# Login
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set SECRET_KEY=your-secret-key
heroku config:set MONGODB_URI=your-mongodb-uri

# Deploy
git push heroku main
```

### Deploy to AWS
1. Create EC2 instance (Ubuntu)
2. Install Python, pip, and MongoDB
3. Clone repository
4. Create virtual environment
5. Install dependencies
6. Configure gunicorn and nginx
7. Set up domain with SSL (Let's Encrypt)

### Deploy to DigitalOcean
1. Create Droplet (Ubuntu 20.04)
2. SSH into droplet
3. Install required software
4. Setup application
5. Configure nginx as reverse proxy
6. Enable SSL with Certbot

### Using Gunicorn (Production Server)
```bash
# Install
pip install gunicorn

# Run
gunicorn app.wsgi:application --bind 0.0.0.0:8000

# Or with multiple workers
gunicorn app.wsgi:application --workers 4 --bind 0.0.0.0:8000
```

### Nginx Configuration Example
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /static/ {
        alias /path/to/staticfiles/;
    }

    location /media/ {
        alias /path/to/media/;
    }
}
```

## Database

### MongoDB Atlas (Cloud)
1. Create account at mongodb.com/cloud/atlas
2. Create cluster
3. Get connection string
4. Update MONGODB_URI in .env

### Backup Strategy
```bash
# Backup MongoDB
mongodump --uri "mongodb+srv://user:pass@cluster.mongodb.net/beauty_parlour" --out ./backup

# Restore
mongorestore --uri "mongodb+srv://user:pass@cluster.mongodb.net" ./backup
```

## Security Checklist

- [ ] Change SECRET_KEY to a strong random value
- [ ] Set DEBUG=False
- [ ] Configure ALLOWED_HOSTS
- [ ] Use HTTPS (SSL certificate)
- [ ] Set secure CORS origins
- [ ] Enable CSRF protection
- [ ] Use environment variables for secrets
- [ ] Set up database backups
- [ ] Configure email for notifications
- [ ] Enable security headers
- [ ] Set up monitoring/logging
- [ ] Regular security updates

## Monitoring & Maintenance

### Logs
```bash
# View application logs
tail -f /var/log/app.log

# View nginx logs
tail -f /var/log/nginx/error.log
```

### Health Checks
```bash
# Test API endpoint
curl https://your-domain.com/api/services/
```

### Backups
Set up automated backups for MongoDB:
- Daily backups to cloud storage
- Keep 30 days of backups
- Test restore procedures

### Updates
- Regularly update dependencies
- Monitor security advisories
- Test updates in staging first

## CI/CD Pipeline (GitHub Actions Example)

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to production
        run: |
          # Add your deployment commands
          echo "Deploying..."
```

## Troubleshooting Production Issues

### Application Not Responding
1. Check server status
2. Review logs for errors
3. Check database connection
4. Verify environment variables

### High Memory Usage
1. Check for memory leaks
2. Optimize database queries
3. Clear old logs
4. Restart application

### Slow Performance
1. Enable caching
2. Optimize database indexes
3. Use CDN for static files
4. Profile bottlenecks

## Support

For production issues:
- Check application logs
- Monitor system resources
- Review database queries
- Test with staging environment first
