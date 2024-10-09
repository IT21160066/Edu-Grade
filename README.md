# Educational Platform Deployment Guide

This guide provides instructions on deploying the educational platform developed.

## Prerequisites

Before proceeding with the deployment, ensure you have the following:

- Docker installed on the deployment server
- Kubernetes cluster set up (if deploying on Kubernetes)
- Access to a third-party email service for notifications
- Access to payment gateway integration credentials

## Technologies Used

### Frontend:

- React-Vite
- Material-Tailwind
- Tailwind CSS

### Backend:

- Node Js
- Express
- MongoDB (Database)

### Authentication:

- JWT Tokens
- Secure Cookies

## Setup Instructions

1. **Clone the Repository**: `git clone https://github.com/IT21161056/Edu-Grade.git`

2. **Install Dependencies**:

   - Frontend: `cd edugrade-web && npm install`
   - Backend:
     ```
     cd user-service && npm install
     cd course-service && npm install
     cd learner-service && npm install
     cd payment-service && npm install
     cd gateway && npm install
     ```

3. **Set Environment Variables**:

   - Backend:
     Create a `.env` file in the backend directory and add the following environment variables:
     ```
     PORT = your_backend_port_here
     DATABASE_URI = your_mongodb_uri_here
     JWT_SECRET = your_jwt_secret_here
     PRODUCT_ID =  for managing products
     SECRET_KEY = confidential token
     PUBLISHABLE_KEY = used in client-side code
     ```

4. **Start the Servers**:

   - Frontend: `npm run dev` (from the frontend directory)
   - Backend: `npm start` (from the backend directory)

5. **Access the Application**:

   Open your browser and navigate to [http://localhost:5173](http://localhost:5173) to access the application.

## Docker Deployment Steps

- Navigate to each and every service
  `docker build -t your_image_name .`
- Build Docker images:
  `docker build -t anojpeiris/course-service:latest .`

- Start the Docker containers:
  `docker run -p 31003:8003 course-service`

### To access the application:

- Web Interface: [http://localhost:5173](http://localhost:5173) (replace localhost with the server IP)
- API Endpoint: [http://localhost:8000/api](http://localhost:8000/api) (replace localhost with the server IP)

## Configuration

- **Environment Variables**:
  Ensure the following environment variables are properly configured:
  - `DATABASE_URL`: All db urls are included in the .env files
  - `PORT`
  - `DATABASE_URI`
  - `JWT_SECRET`
  - `PRODUCT_ID`
  - `SECRET_KEY`
  - `PUBLISHABLE_KEY`

## Additional Notes

- For Kubernetes deployment, you may need to create Kubernetes deployment and service YAML files and apply them to your cluster.
- Ensure proper network configuration to allow external access to the application.
- Test the deployment thoroughly to ensure all functionalities are working as expected.
- Refer to the project documentation for detailed API endpoints and usage instructions.

Visa `bash 4242424242424242 `, Any 3 digits, Any future date
Visa (debit) `bash 4000056655665556 `, Any 3 digits, Any future date
Mastercard `bash 5555555555554444 `, Any 3 digits, Any future date
