# MERN Ledger Application

This project is a MERN stack application that provides a ledger for managing transactions. It consists of a backend built with Node.js, Express, and MongoDB, and a frontend yet to be developed.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Folder Structure](#folder-structure)
- [Backend Setup](#backend-setup)
- [Running the Application](#running-the-application)
- [License](#license)

## Prerequisites

Make sure you have the following installed on your machine:

- Node.js (version 14 or later)
- MongoDB (local installation or a cloud instance)


### Backend

- **config/db.js**: Database connection configuration, using environment variables.
- **controllers/**: Contains logic for handling requests related to ledgers and transactions.
- **models/**: Defines the data structure for Ledger and Transaction.
- **routes/**: Sets up the API routes for the application.
- **server.js**: The entry point for the backend server.

### Frontend

Currently, the frontend is yet to be implemented. Future development will focus on creating a user interface to interact with the backend services.

## Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd MERN_Ledger-app/backend
2. Install dependencies:
   npm install
3. Create a `.env` file in the backend directory with your MongoDB connection string:
    MONGO_URL=your_mongodb_connection_string
4. Start the backend server:
    node server.js