const apiKey = "37a21ee58be1454883b123745230504";
const url = "http://api.weatherapi.com/v1/future.json?";
let dateInput = document.getElementById("date");
let date = new Date();
let city = document.getElementById("cities").value;
date.setDate(date.getDate() + 14);
dateInput.valueAsDate = date;
function getData(city, date) {
    fetch(url + new URLSearchParams({
        key: apiKey,
        q: city,
        dt: date
    })).then(
        response => response.json()
    ).then(data => {
        if (data['error']) {
            return document.getElementById(
                "not-found"
            ).innerHTML = "City not found"
        }
        document.getElementById("not-found").innerHTML = ""
        document.getElementById("future").innerHTML = ""
        let day = data.forecast.forecastday[0].day;
        let hours = data.forecast.forecastday[0].hour;
        document.getElementById("weather").innerHTML = `
            <h2>${data.location.name}</h2>
            <img src="${day.condition.icon}">
            <p>Temperature: ${day.avgtemp_c}℃</p>
            <p>Wind: ${day.maxwind_kph}km/h</p>
            <p>Humidity: ${day.avghumidity}%</p>
        `;
        console.log(hours);
        for (const hour of hours) {
            let time = new Date(hour.time).toLocaleTimeString()
            let temp = hour.temp_c;
            let icon = hour.condition.icon;
            let humidity = hour.humidity;
            let windSpeed = hour.wind_kph;
            document.getElementById("future").innerHTML += `
                <div>
                    <h4>${time}</h4>
                    <img src="${icon}">
                    <p>Temperature: ${temp}℃</p>
                    <p>Wind: ${windSpeed}km/h</p>
                    <p>Humidity: ${humidity}%</p>
                </div>
            `    
        }

    }).catch(error => {
        console.error('Error fetching weather data:', error);
    });
}

getData(city, dateInput.value);

dateInput.addEventListener("change", function () {
    getData(city, dateInput.value)
})

document.getElementById("search-form").addEventListener("submit", (event) => {
    event.preventDefault();
    city = event.target['search'].value;
    getData(city, dateInput.value);
})