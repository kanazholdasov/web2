# Weather Application with Joke and IP Location APIs

## Project Overview
This project is a web application that displays weather information for a specified city and integrates additional features, including a joke generator and an IP-based location lookup. The weather data is fetched from the OpenWeatherMap API, jokes are fetched from the Official Joke API, and IP location data is retrieved from the IP Geolocation API. The application is built using JavaScript, Express.js, and Leaflet for mapping.

---

## Features
- **Weather Information**: Displays temperature, humidity, pressure, wind speed, rain volume (if available), and coordinates of the specified city.
- **Interactive Map**: Uses Leaflet to display the location of the city with a marker and popup.
- **Joke Generator**: Provides a random joke fetched from the Official Joke API.
- **IP Location Lookup**: Displays the user's approximate location based on their IP address.

---

## Project Structure
```
project-root/
├── public/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── app.js
│   └── index.html
├── src/
│   └── server.js
├── package.json
```

### File Descriptions
- **public/**: Contains static files served by the Express server.
  - `style.css`: Styles for the web application.
  - `app.js`: Client-side JavaScript for fetching and displaying data.
  - `index.html`: The HTML structure of the web application.
- **src/server.js**: Server-side JavaScript with API route handling.
- **package.json**: Project metadata and dependencies.

---

## Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine.
- An API key for OpenWeatherMap (sign up [here](https://home.openweathermap.org/users/sign_up)).

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Update the API key in `server.js`:
   Replace the placeholder `ef7dd2d722bb51fb09e7e253166fc0b2` with your actual OpenWeatherMap API key.

4. Start the server:
   ```bash
   node src/server.js
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## API Usage Details

### **Endpoints**

#### 1. `/api/weather`
- **Description**: Fetches weather data for a specified city.
- **Method**: GET
- **Query Parameters**:
  - `city` (optional): The name of the city. Defaults to "Astana".
- **Response**:
  ```json
  {
    "name": "City Name",
    "sys": { "country": "Country Code" },
    "coord": { "lat": Latitude, "lon": Longitude },
    "weather": { "description": "Weather Description", "icon": "Icon Code" },
    "main": { "temp": Temperature, "feels_like": FeelsLike, "humidity": Humidity, "pressure": Pressure },
    "wind": { "speed": Wind Speed },
    "rain": Rain Volume (if available)
  }
  ```

#### 2. `/api/joke`
- **Description**: Fetches a random joke.
- **Method**: GET
- **Response**:
  ```json
  {
    "setup": "Joke Setup",
    "punchline": "Joke Punchline"
  }
  ```

#### 3. `/api/location`
- **Description**: Fetches location data based on the user's IP address.
- **Method**: GET
- **Response**:
  ```json
  {
    "ip": "User's IP Address",
    "city": "City Name",
    "region": "Region Name",
    "country": "Country Name",
    "latitude": Latitude,
    "longitude": Longitude
  }
  ```

---

## Key Design Decisions

1. **Separation of Concerns**:
   - Static files (HTML, CSS, JS) are served from the `public/` directory.
   - API logic is centralized in `server.js` for better maintainability.

2. **Use of External APIs**:
   - Leveraged OpenWeatherMap for comprehensive weather data.
   - Integrated Official Joke API and IP Geolocation API for additional user engagement and utility.

3. **Error Handling**:
   - Graceful error handling in both server-side (`server.js`) and client-side (`app.js`).
   - Displays fallback messages when API data is unavailable.

4. **Mapping with Leaflet**:
   - Provides an interactive map to visualize city coordinates dynamically.

---

## Future Improvements
- Add user authentication for personalized experiences.
- Implement caching to reduce API calls.
- Enhance the UI for a more modern and responsive design.
- Support for additional languages in weather descriptions.

---

## Author
Created by Zholdasov Kanagat.

