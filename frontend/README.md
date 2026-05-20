# Task Management System API

## Features

- JWT Authentication
- Role-Based Access Control
- Task CRUD APIs
- Protected Routes
- Swagger Documentation
- React Frontend
- MongoDB Integration

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- JWT
- bcryptjs

### Frontend
- React.js
- Axios

## Backend Setup

cd backend
npm install
npm run dev

## Frontend Setup

cd frontend
npm install
npm run dev
## .env

PORT=5000
MONGO_URI= mongodb+srv://24mcce36_db_user:TMKpEOJHikzf3uxL@cluster0.ukaotcf.mongodb.net/?appName=Cluster0
JWT_SECRET=sai_backend_assignment_super_secret_key_2026

## Swagger Docs

http://localhost:5000/api-docs

## Scalability Considerations

- Modular MVC architecture
- JWT-based stateless authentication
- Middleware-based authorization
- API versioning
- MongoDB indexing support
- Can be extended into microservices
- Docker-ready architecture