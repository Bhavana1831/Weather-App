// Your OpenWeatherMap API Key
const apiKey = 'dbd37b086ac72e8c2cc2ee6ca2d6e514';  // Replace with your actual API key

async function getWeather() {
    const city = document.getElementById('city').value;
    const weatherDiv = document.getElementById('weather');
    
    if (!city) {
        weatherDiv.innerHTML = 'Please enter a city name.';
        return;
    }

    try {
        // Fetch weather data from OpenWeatherMap API
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        
        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();

        // Extract relevant data
        const weatherDescription = data.weather[0].description;
        const temperature = data.main.temp;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;

        // Update the DOM with weather information
        weatherDiv.innerHTML = `
            <h2>${data.name}</h2>
            <p>Weather: ${weatherDescription}</p>
            <p>Temperature: ${temperature} °C</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${windSpeed} m/s</p>
        `;

        // Add 'show' class to the weather info div for fade-in effect
        weatherDiv.classList.add('show');
    } catch (error) {
        weatherDiv.innerHTML = `Error: ${error.message}`;
        weatherDiv.classList.remove('show'); // Ensure it hides on error
    }
}
