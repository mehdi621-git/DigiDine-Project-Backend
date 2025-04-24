# DigiDine-Project-Backend
Make sure you have the following installed on your system:

Node.js (LTS version recommended) → Download here

MongoDB Compass (Ensure MongoDB is running) → Install MongoDB Compass

Clone this Repository

git clone https://github.com/mehdi621-git/DigiDine-Project-Backend/

2️⃣ Install Dependencies

In backend folder Run the following command on terminal to install all required npm packages:

npm install

3️⃣ Environment Variables

Create a .env file in the backend directory and add the following:

PORT=5000
MONGO_URI= your_mongodb_connection_string
JWT_SECRET= In Production chnage your Token
# Google OAuth2 Credentials
CLIENT_ID=
CLIENT_SECRET=
REFRESH_TOKEN=

Replace your_mongodb_connection_string with your actual MongoDB connection string. (open MongoDb Compass and get the string and connect)


4️⃣ Ensure uploads Folder Exists

If not created automatically, create an uploads folder in the project backend:

mkdir uploads

5️⃣ Start the Server

To run the backend server, use:

npm run dev

6️⃣ API Endpoints

The server will start on http://localhost:5000/. The following API endpoints are available:

Reserve a Table: POST /bookings

Upload an Image: POST /upload

Retrieve Images: http://localhost:5000/uploads/<image-name>

Run the Frontend on port http://127.0.0.1:5500

7️⃣ Testing API

Use Postman or cURL to test API routes or run yours Frontend for smooth configuration

Dependencies Installed

Express - Web framework for Node.js

Multer - Middleware for handling multipart/form-data (file uploads)

Mongoose - MongoDB ODM for Node.js

dotenv - Loads environment variables from .env file

fs - File system module (built-in) for creating the uploads directory

nodemailer - for sending mails

googleapis - for accessing google api (google mail service)

Install dependencies manually if needed:

npm install express multer mongoose dotenv nodemailer googleapis

🚀 Now your backend is ready! 🚀

