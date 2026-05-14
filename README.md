# School Management System API

A Node.js and Express.js based API to manage school data with proximity-based searching.

## Live API Link
- **Base URL:** https://school-management-eck8.onrender.com

## Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MySQL (Hosted on Aiven Cloud)
- **Deployment:** Render

## Features
- **Add School API:** Validates and stores school data (name, address, latitude, longitude).
- **List Schools API:** Retrieves all schools and sorts them based on the user's current location using the Haversine formula.

## Endpoints
1. **POST** `/addSchool` - Add a new school.
2. **GET** `/listSchools?latitude=xx.xxx&longitude=xx.xxx` - Get sorted list of schools.