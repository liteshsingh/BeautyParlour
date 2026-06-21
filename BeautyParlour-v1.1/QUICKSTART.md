# Quick Start Guide

## Get Started in 5 Minutes

### Prerequisites
- Node.js (v16+)
- Python (3.8+)
- MongoDB (local installation or MongoDB Atlas account)

### Step 1: Clone & Navigate
```bash
# Navigate to the project folder (already done)
cd BeautyParlour
```

### Step 2: Setup Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```
Frontend runs at: http://localhost:5173

### Step 3: Setup Backend (in new terminal)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py runserver
```
Backend runs at: http://localhost:8000

### Step 4: Test the Application
1. Open http://localhost:5173 in browser
2. Click "Book Appointment" and fill the form
3. Go to http://localhost:5173/admin/login
4. Login with credentials from .env file

## Features to Test

### User Features
- [ ] Home page loads
- [ ] Browse services
- [ ] Book appointment
- [ ] See confirmation

### Admin Features
- [ ] Login to admin panel
- [ ] View all appointments
- [ ] Filter by status
- [ ] Update appointment status

## Environment Setup

### Frontend (.env)
```
VITE_API_URL=http://localhost:8000/api
```

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/beauty_parlour
SECRET_KEY=dev-key-change-in-production
DEBUG=True
ADMIN_EMAIL=admin@beautyparlour.com
ADMIN_PASSWORD=admin123
CORS_ALLOWED_ORIGINS=http://localhost:5173
JWT_SECRET_KEY=jwt-dev-key
```

## Common Issues

### Port Already in Use
```bash
# Frontend: Edit vite.config.js
# Backend: python manage.py runserver 8001
```

### MongoDB Connection Error
- Local: Ensure MongoDB is running
- Atlas: Check connection string in .env

### CORS Errors
- Check CORS_ALLOWED_ORIGINS includes frontend URL

## Next: Advanced Setup
- See [README.md](./README.md) for full documentation
- See [DEPLOYMENT.md](./DEPLOYMENT.md) for production setup

## Need Help?
- Check error messages carefully
- Review [Troubleshooting](./README.md#troubleshooting) section
- Check backend logs in terminal
