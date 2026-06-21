# Beauty Parlour App - Setup and Development Guide

## Project Overview

Beauty Parlour is a full-stack web application for managing beauty parlour appointment bookings. It includes:
- **Frontend**: React application for user booking and admin dashboard
- **Backend**: Django REST API with MongoDB database
- **Features**: User appointment booking, admin panel, appointment management

## Technology Stack

- **Frontend**: React 18, Vite, React Router, Axios
- **Backend**: Django 4.2, Django REST Framework, MongoDB
- **Database**: MongoDB
- **Authentication**: JWT tokens
- **API**: RESTful API

## Project Structure

```
BeautyParlour/
├── frontend/               # React web application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
│
├── backend/                # Django REST API
│   ├── app/
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── views.py       # API views
│   │   ├── serializers.py # DRF serializers
│   │   ├── admin.py       # Django admin
│   │   ├── auth.py        # JWT authentication
│   │   ├── urls.py        # API URLs
│   │   └── config.py      # Django settings
│   ├── manage.py
│   ├── wsgi.py
│   ├── requirements.txt
│   └── .env.example
│
├── README.md
└── .gitignore
```

## Installation & Setup

### Prerequisites

- Node.js v16+ and npm/yarn
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

3. Create .env file:
```bash
cp .env.example .env
```

4. Update .env with API URL:
```
VITE_API_URL=http://localhost:8000
```

5. Start development server:
```bash
npm run dev
```

The app will be available at http://localhost:5173

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create Python virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install Python dependencies:
```bash
pip install -r requirements.txt
```

4. Create .env file:
```bash
cp .env.example .env
```

5. Update .env with your MongoDB URI and settings:
```
MONGODB_URI=mongodb://localhost:27017/beauty_parlour
SECRET_KEY=your-secret-key-here
DEBUG=True
```

6. Run database migrations:
```bash
python manage.py migrate
```

7. Create superuser (optional):
```bash
python manage.py createsuperuser
```

8. Load sample data (optional):
```bash
python manage.py loaddata initial_data
```

9. Start development server:
```bash
python manage.py runserver
```

The API will be available at http://localhost:8000

## API Endpoints

### Public Endpoints

- `GET /services/` - Get all service groups
- `GET /locations/` - Get all service locations
- `POST /appointments/` - Create new appointment
- `GET /appointments/{id}/` - Get appointment details
- `POST /auth/login` - Admin login
- `POST /auth/register` - Register new admin user

### Admin Endpoints (Requires Authentication)

- `GET /appointments/` - List all appointments
- `PUT /appointments/{id}/` - Update appointment status
- `DELETE /appointments/{id}/` - Delete appointment

## Database Models

### Appointment
- `_id`: Unique identifier (UUID)
- `name`: Customer name
- `email`: Customer email
- `phone`: Customer phone number
- `serviceGroup`: Selected service group
- `makeupType`: Selected makeup type
- `date`: Appointment date
- `time`: Appointment time
- `location`: Service location
- `status`: Appointment status (Confirmed, Completed, Cancelled)
- `notes`: Additional notes
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

### Other Models
- **ServiceGroup**: Makeup service groups
- **MakeupType**: Types within services
- **Location**: Service locations
- **User**: Admin/Agent accounts

## User Flows

### Customer Booking Flow
1. Browse services on home page
2. Click "Book Appointment"
3. Fill booking form with:
   - Personal information
   - Service group and type
   - Date and time
   - Preferred location
4. Submit booking
5. Receive confirmation with appointment ID

### Admin Management Flow
1. Navigate to /admin/login
2. Login with admin credentials
3. View all appointments in dashboard
4. Filter appointments by status
5. Update appointment status
6. View appointment details

## Development Workflow

1. **Frontend Development**:
   - Run: `npm run dev`
   - Edit React components in `src/`
   - Changes auto-reload in browser

2. **Backend Development**:
   - Run: `python manage.py runserver`
   - Edit views/serializers in `app/`
   - Server restarts automatically

3. **Database Changes**:
   - Create model changes
   - Run: `python manage.py makemigrations`
   - Run: `python manage.py migrate`

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:8000
```

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/beauty_parlour
SECRET_KEY=your-secret-key-here
DEBUG=True
ADMIN_EMAIL=admin@beautyparlour.com
ADMIN_PASSWORD=your-secure-password
CORS_ALLOWED_ORIGINS=http://localhost:5173
JWT_SECRET_KEY=jwt-secret-key-here
```

## Testing

### Frontend Tests
```bash
npm run test
```

### Backend Tests
```bash
python manage.py test
```

## Building for Production

### Frontend Build
```bash
npm run build
```

Output will be in `dist/` directory.

### Backend Deployment
1. Set `DEBUG=False` in .env
2. Update `SECRET_KEY` with a secure value
3. Configure `ALLOWED_HOSTS` for your domain
4. Use production database connection
5. Collect static files: `python manage.py collectstatic`

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally or check Atlas connection string
- Verify MONGODB_URI in .env is correct

### CORS Errors
- Check CORS_ALLOWED_ORIGINS in backend .env
- Ensure frontend URL is listed

### API Not Responding
- Verify backend server is running: `python manage.py runserver`
- Check frontend .env VITE_API_URL points to correct backend URL

### Port Conflicts
- Frontend default: 5173 (change in vite.config.js)
- Backend default: 8000 (change with `python manage.py runserver 8001`)

## Contributing

1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes
3. Test thoroughly
4. Commit: `git commit -m "Add your feature"`
5. Push: `git push origin feature/your-feature`
6. Submit pull request

## Next Steps

1. Install dependencies for both frontend and backend
2. Set up MongoDB database
3. Create .env files from .env.example
4. Run both dev servers
5. Test the complete booking flow
6. Customize with your branding

## Support

For issues, questions, or contributions:
- Create an issue in the repository
- Check existing documentation
- Review API endpoint specifications

## License

MIT License - See LICENSE file for details
