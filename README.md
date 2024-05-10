# Online Appointment System Backend (eDoc)

The eDoc project is a backend application developed using Nest.js and TypeScript. It facilitates online appointment requests for clients or patients of medical establishments, including clinics and hospitals. This system also assists doctors in managing their appointments with patients efficiently.

## Key Features

### Admin
- **Manage Doctors**: Add, edit, and delete doctor profiles including specialties and credentials.
- **Schedule Management**: Schedule and remove sessions for doctors.
- **Patient Management**: View patient details and their appointment bookings.

### Doctors
- **Appointment Management**: View appointments booked by patients and manage their availability.
- **Session Schedule**: View scheduled sessions for appointments.
- **Account Management**: Edit account settings and delete accounts if necessary.

### Patients (Clients)
- **Online Appointment**: Make appointments online by selecting a doctor, date, and time.
- **Account Creation**: Create accounts to manage appointments and personal details.
- **Booking History**: View past appointment bookings.
- **Account Management**: Edit account settings and delete accounts if needed.

## Technologies Used

- **Backend Framework**: Nest.js (Node.js framework)
- **Database**: Prisma (ORM)
- **Containerization**: Docker
- **Programming Language**: TypeScript
- **Authentication**: JWT (JSON Web Tokens), Google Auth
- **Web Server**: Express.js (for Nest.js)


## Getting Started

To run this project locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/Anglebert-Dev/Online_Appointment_System_Backend-eDoc-.git
```

2. Navigate to the project directory:

```bash
cd edoc-backend
```

3. Install dependencies:

```bash
npm install
```

4. Configure environment variables:

   - Create a `.env` file in the root directory and define environment variables such as database connection URI, JWT secret, etc.

5. Run the server:

```bash
npm run start:dev
```

6. The server will start running on the specified port, and you can now integrate the backend with the frontend phase.
