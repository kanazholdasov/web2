// Function to fetch weather data
async function getWeather(city) {
    const response = await fetch(`/api/weather?city=${city}`);
    const data = await response.json();
    displayWeather(data);
}
// Function to fetch and display a joke
async function getJoke() {
    try {
        const response = await fetch('/api/joke');
        if (!response.ok) {
            throw new Error('Failed to fetch joke');
        }
        const data = await response.json();
        document.querySelector('#joke').textContent = `${data.setup} - ${data.punchline}`;
    } catch (error) {
        console.error(error);
        document.querySelector('#joke').textContent = 'Error fetching joke.';
    }
}


// Function to fetch and display IP geolocation
async function getIPLocation() {
    const response = await fetch('/api/ip-location');
    const data = await response.json();
    document.querySelector('#ip-location').textContent = `IP: ${data.ip}, City: ${data.city}, Country: ${data.country}`;
}

// Add event listener to fetch and display joke
document.querySelector('#get-joke-btn').addEventListener('click', () => {
    getJoke();
});

// Add event listener to fetch and display IP location
document.querySelector('#get-ip-location-btn').addEventListener('click', () => {
    getIPLocation();
});


let map;

function displayWeather(data) {
    if (data.error) {
        document.querySelector('#city-display').textContent = 'Not Found';
        document.querySelector('#temperature').textContent = 'Temperature: -';
        document.querySelector('#feels-like').textContent = 'Feels Like: -';
        document.querySelector('#description').textContent = 'Description: -';
        document.querySelector('#humidity').textContent = 'Humidity: -';
        document.querySelector('#pressure').textContent = 'Pressure: -';
        document.querySelector('#wind-speed').textContent = 'Wind Speed: -';
        document.querySelector('#rain-volume').textContent = 'Rain Volume: -';
        document.querySelector('#coordinates').textContent = 'Coordinates: -';
        document.querySelector('#weather-icon').src = ''; // No icon
    } else {
        // Log weather data to see if icon is present
        console.log(data);

        document.querySelector('#city-display').textContent = `${data.name}, ${data.sys.country}`;
        document.querySelector('#temperature').textContent = `Temperature: ${data.main.temp}°C`;
        document.querySelector('#feels-like').textContent = `Feels Like: ${data.main.feels_like}°C`;
        // Always display a default icon
        document.querySelector('#weather-icon').src = 'https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png'; // Default icon

        if (data.weather && data.weather.length > 0) {
            document.querySelector('#description').textContent = `Description: ${data.weather[0].description}`;
            const iconCode = data.weather[0].icon;
            console.log('Icon code:', iconCode); // Log icon code for debugging
        } else {
            document.querySelector('#description').textContent = 'Description: Not Available';
        }

        document.querySelector('#humidity').textContent = `Humidity: ${data.main.humidity}%`;
        document.querySelector('#pressure').textContent = `Pressure: ${data.main.pressure} hPa`;
        document.querySelector('#wind-speed').textContent = `Wind Speed: ${data.wind.speed} m/s`;
        document.querySelector('#rain-volume').textContent = `Rain Volume (Last 3 Hours): ${data.rain ? data.rain['1h'] : 0} mm`;
        document.querySelector('#coordinates').textContent = `Coordinates: Lat ${data.coord.lat}, Lon ${data.coord.lon}`;
         
        
        // Check if the map already exists, and if so, reset it
         if (map) {
            map.remove(); // Remove the previous map before creating a new one
        }

        // Initialize a new Leaflet map
        map = L.map('map').setView([data.coord.lat, data.coord.lon], 13); // Center map on city coordinates
        
        // Add a tile layer (OpenStreetMap)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        // Add a marker at the city's coordinates
        L.marker([data.coord.lat, data.coord.lon]).addTo(map)
            .bindPopup(`<b>${data.name}</b><br/>Latitude: ${data.coord.lat}<br/>Longitude: ${data.coord.lon}`)
            .openPopup();
    }
}

// Add event listener to the "Get Weather" button
document.querySelector('#get-weather-btn').addEventListener('click', () => {
    const city = document.querySelector('#city-name').value;
    if (city.trim()) {
        getWeather(city);
    } else {
        alert('Please enter a valid city name.');
    }
});
