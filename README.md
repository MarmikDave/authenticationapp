# Authentication System

A full-stack web application, built with React (frontend) and Node.js/Express (backend).

## Prerequisites

- Node.js (v14 or later)
- MySQL

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/MarmikDave/Authentication-System.git
   cd authenticationapp
   ```

2. Set up the database:
   - Create a MySQL database named `auth-system`
   - Import the schema from `server/schema.sql`

3. Configure the server:
   ```
   cd server
   cp .env.example .env
   npm install
   ```
   Edit the `.env` file with your database credentials and JWT secret.

4. Set up the client:
   ```
   cd ../client
   npm install
   ```

## Running the Application

1. Start the server:
   ```
   cd server
   npm start
   ```
   Server runs on `http://localhost:3000`

2. Start the client:
   ```
   cd client
   npm start
   ```
   Client runs on `http://localhost:3001`

3. Open your browser and go to `http://localhost:3001`

## Features

- User authentication (signup, login, logout)
- Dashboard with tyre management statistics

## Technologies Used

- Frontend: React, Material-UI, Recharts
- Backend: Node.js, Express, MySQL
- Authentication: JSON Web Tokens (JWT)
