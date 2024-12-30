// 534e619347d02ca9d57386ecb8be01a3

function getWeather()
{
    const apikey = "534e619347d02ca9d57386ecb8be01a3";
    const city = document.getElementById("city").value;

    if (!city) {
        alert('Please enter a city');
        return;
    }
    
    const currentweatherurl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const forecasturl =`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}`;


    fetch(currentweatherurl)
    .then(response =>response.json())
    .then(data =>{
        displayWeather(data);
    })
    .catch(error =>{
        console.error("Error fetching current weather data",error);
        alert("Error fetching current weather data .Please try again.");
    });

    fetch(forecasturl).then(response =>response.json())
    .then(data =>{
        displayHourlyForecast(data.list);
    })
    .catch(error =>{
        console.error("Error fetching hourly forecast data",error)
        alert("Error fetching hourly forecast data .Please try again.");
    });
}

function displayWeather(data){
    const tempdivInfo = document.getElementById("temp-div");
    const weatherInfoDiv = document.getElementById("weather-info");
    const weatherIcon = document.getElementById("weather-icon");
    const hourlyForecastdiv = document.getElementById("hourly-forecast");

    //clear the previos content
    weatherInfoDiv.innerHTML='';
    hourlyForecastdiv.innerHTML='';
    tempdivInfo.innerHTML='';

    if(data.cod === '404')
    {
        weatherInfoDiv.innerHTML=`<p>${data.message}</p>`;
    }
    else
    {
        const cityname = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconcode = data.weather[0].icon;
        const iconurl = `https://openweathermap.org/img/wn/${iconcode}@4x.png`;

        const temperatureHtml =`
        <p>${temperature}°C </p>
        `;
        const weatherHtml =`<p>${cityname}</p>
                            <p>${description}</p>`;

        tempdivInfo.innerHTML =temperatureHtml;
        weatherInfoDiv.innerHTML=weatherHtml;
        weatherIcon.src =iconurl;
        weatherIcon.alt = description;
        showImage();
    }
}

function displayHourlyForecast(hourlyData)
{
    const hourlyForecastdiv = document.getElementById("hourly-forecast");
    const next24hours = hourlyData.slice(0,8);
    next24hours.forEach(item =>{
        const dateTime = new Date(item.dt *1000);
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15);
        const iconcode = item.weather[0].icon;
        const iconurl = `https://openweathermap.org/img/wn/${iconcode}@4x.png`;

        const hourlyItemhtml =`
            <div class="hourly-item">
            <span>${hour}:00</span>
            <img src="${iconurl}" alt="hourly weather Icon">
            <span>${temperature}°C</span>
            </div>
        `;
        hourlyForecastdiv.innerHTML+=hourlyItemhtml;
    })
}

function showImage()
{
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display='block';
}