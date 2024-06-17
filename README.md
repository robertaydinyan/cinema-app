# Cinema Booking System

## Backend Setup (Laravel)

1. Navigate to the `backend` directory.
2. Install PHP dependencies using Composer:
composer install
3. Copy `.env.example` to `.env` and configure your database credentials.
4. Generate application key:
php artisan key
5. Migrate the database and seed default data (including users):
php artisan migrate --seed

**Default User Credentials:**
- Email: admin@cinema.com
- Password: cinema

## Frontend Setup (React)

1. Navigate to the `frontend` directory.
2. Install Node.js dependencies using npm:
npm install

## Testing the Project

### Admin Panel Login

1. Access the admin panel at `/admin` in your React application.
2. Login with the default user credentials:
- Email: admin@cinema.com
- Password: cinema

### Workflow

1. **Create Movies:** Add new movies under the Movies section in the admin panel.
2. **Create Rooms:** Define cinema rooms under the Rooms section.
3. **Add Time Slots:** Schedule movie sessions by adding time slots within each room.
4. **Create Sessions:** Set up sessions for the scheduled movies on the Sessions page.
5. **Book Seats:** Navigate to the booking page to reserve seats for the desired session.
6. **Book Seats:** Navigate to the booking page (`/book`) to reserve seats for the desired session.
