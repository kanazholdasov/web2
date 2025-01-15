const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static(path.join(__dirname, '../public')));
// Joke API route
app.get('/api/joke', async (req, res) => {
    const jokeUrl = 'https://official-joke-api.appspot.com/random_joke';

    try {
        const response = await axios.get(jokeUrl);
        const joke = response.data;

        res.json({
            setup: joke.setup,
            punchline: joke.punchline
        });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching joke' });
    }
});

// Serve static files after the API routes
app.use(express.static(path.join(__dirname, '../public')));
// IP Geolocation API route
app.get('/api/ip-location', async (req, res) => {
    const ipUrl = 'https://ipapi.co/json/';

    try {
        const response = await axios.get(ipUrl);
        const location = response.data;

        res.json({
            ip: location.ip,
            city: location.city,
            region: location.region,
            country: location.country_name,
            latitude: location.latitude,
            longitude: location.longitude
        });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching IP location' });
    }
});

// Routes
app.get('/api/weather', async (req, res) => {
    const city = req.query.city || 'Astana';
    const apiKey = 'ef7dd2d722bb51fb09e7e253166fc0b2';
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await axios.get(weatherUrl);
        const data = response.data;
        
        console.log(data);
        // Get the last 3 hours of rain (if available)
        const rainVolume = data.rain ? data.rain['1h'] : 0;

        res.json({
            name: data.name,
            sys: data.sys,
            coord: data.coord,
            weather: data.weather[0],
            main: data.main,
            wind: data.wind,
            rain: rainVolume,
        });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching weather data' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
