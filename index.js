const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());


const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Earth's radius in km

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; 
};


app.post('/addSchool', async (req, res) => {
    const { name, address, latitude, longitude } = req.body;

   
    if (!name || !address || latitude === undefined || longitude === undefined) {
        return res.status(400).json({ error: "All fields (name, address, latitude, longitude) are required." });
    }

    if (typeof latitude !== 'number' || typeof longitude !== 'number') {
        return res.status(400).json({ error: "Latitude and Longitude must be numbers." });
    }

    try {
        const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
        const [result] = await db.execute(query, [name, address, latitude, longitude]);
        
        res.status(201).json({ 
            message: "School added successfully!", 
            schoolId: result.insertId 
        });
    } catch (err) {
        res.status(500).json({ error: "Database error: " + err.message });
    }
});


app.get('/listSchools', async (req, res) => {
    let { latitude, longitude } = req.query;

    // Validation
    if (!latitude || !longitude) {
        return res.status(400).json({ error: "User latitude and longitude are required as query parameters." });
    }

    const userLat = parseFloat(latitude);
    const userLon = parseFloat(longitude);

    try {
      
        const [schools] = await db.execute('SELECT * FROM schools');

      
        const schoolsWithDistance = schools.map(school => {
            const distance = calculateDistance(userLat, userLon, school.latitude, school.longitude);
            return { ...school, distance };
        });

    
        schoolsWithDistance.sort((a, b) => a.distance - b.distance);

        res.json(schoolsWithDistance);
    } catch (err) {
        res.status(500).json({ error: "Database error: " + err.message });
    }
});

app.get('/', (req, res) => {
    res.send("Server is working fine!");
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});