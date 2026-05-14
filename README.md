# School Management System API 🏫

This is a robust Backend API built with **Node.js**, **Express.js**, and **MySQL** to manage school data. The system allows users to add new schools and retrieve a list of schools sorted by their geographical proximity to a user-specified location.

## 🚀 Live API Details
- **Base URL:** `https://school-management-eck8.onrender.com`
- **Hosted on:** Render
- **Database:** MySQL (Cloud-hosted on Aiven)

---

## 🛠️ Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MySQL (MariaDB compatible)
- **Deployment:** Render (API) & Aiven (Database)

---

## 📌 API Endpoints

### 1. Add School
Add a new school to the database with its geographical coordinates.
- **Method:** `POST`
- **Endpoint:** `/addSchool`
- **Payload (JSON):**
```json
{
  "name": "St. Xavier's High School",
  "address": "Fort, Mumbai, Maharashtra",
  "latitude": 18.9444,
  "longitude": 72.8322
}
Validation: Ensures all fields are required and latitude/longitude are valid numbers.
2. List Schools (Sorted by Proximity)
Fetches all schools and sorts them based on the distance from the provided user coordinates.
Method: GET
Endpoint: /listSchools
Parameters: latitude (Float), longitude (Float)
Live Test Link: View Schools near Mumbai (19.07, 72.87)
🧮 Sorting Mechanism
The system uses the Haversine Formula to calculate the great-circle distance between two points on a sphere (Earth).
It calculates the distance in Kilometers between the user's coordinates and each school's coordinates.
The results are returned in ascending order (closest school first).
⚙️ Local Setup Instructions
Clone the Repository:
code
Bash
git clone https://github.com/abhiramSharma2002/school_management.git
cd school_management
Install Dependencies:
code
Bash
npm install
Database Configuration:
Create a .env file in the root directory and add your credentials:
code
Env
DB_HOST=your_host
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_db_name
DB_PORT=your_port
Run the Server:
code
Bash
npm start
The server will start on http://localhost:3000.
📄 Deliverables
GitHub Repository: Link
Live API Endpoints: Render Link
Postman Collection: (Attached/Shared via Link)
