# Beauty Parlour Appointment Booking App

A full-stack web application for beauty parlour appointment booking with separate user and admin interfaces.

## Features

### User Features
- Browse makeup service groups
- Select specific makeup types
- Choose appointment date and time
- Select service location
- View booking confirmation

### Admin/Agent Features
- Login authentication
- View all appointments
- Manage appointment details
- Track client information

## Tech Stack

- **Frontend**: React with Vite
- **Backend**: Django/Flask with Python
- **Database**: MongoDB
- **Authentication**: JWT tokens
- **API**: RESTful API

## Project Structure

```
BeautyParlour/
├── frontend/                 # React web application
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service calls
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/              # Static assets
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
│
├── backend/                 # Django/Flask API
│   ├── app/
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── __init__.py
│   │   └── config.py
│   ├── requirements.txt
│   ├── .env.example
│   ├── manage.py
│   └── wsgi.py
│
└── README.md                # This file
```

## Getting Started

### Prerequisites
- Node.js (v16+)
- Python 3.8+
- MongoDB (local or Atlas)
- Git

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your backend API URL:
```
VITE_API_URL=http://localhost:8000/api
```

5. Start development server:
```bash
npm run dev
```

Frontend will be available at `http://localhost:5173`

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

5. Update `.env` with your MongoDB URI and secret key

6. Run migrations:
```bash
python manage.py migrate
```

7. Start development server:
```bash
python manage.py runserver
```

Backend API will be available at `http://localhost:8000`

## API Endpoints

### User Routes
- `GET /api/services` - Get all makeup service groups
- `GET /api/services/:id` - Get service details with makeup types
- `GET /api/locations` - Get all service locations
- `POST /api/appointments` - Create new appointment

### Admin Routes
- `POST /api/auth/login` - Admin login
- `GET /api/appointments` - View all appointments
- `GET /api/appointments/:id` - Get appointment details
- `PUT /api/appointments/:id` - Update appointment status

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:8000
```

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/beauty_parlour
SECRET_KEY=your_secret_key_here
DEBUG=True
ADMIN_EMAIL=admin@beautyparlour.com
ADMIN_PASSWORD=your_secure_password
```

## Database Schema

### Collections
- **services** - Makeup service groups
- **makeup_types** - Types within each service
- **locations** - Service locations
- **appointments** - Customer appointments
- **users** - Admin/agent accounts

## Development Workflow

1. Frontend: `npm run dev`
2. Backend: `python manage.py runserver`
3. Make changes in respective folders
4. Test API endpoints with Postman/Insomnia
5. Push to version control

## Testing

### Frontend
```bash
npm run test
```

### Backend
```bash
python manage.py test
```

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment guidelines.

## Contributing

1. Create a feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

## Support

For issues and questions, create an issue in the repository.

## License

MIT License - See LICENSE file for details
