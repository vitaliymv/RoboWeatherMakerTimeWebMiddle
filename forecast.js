const apiKey = "37a21ee58be1454883b123745230504";
const url = "http://api.weatherapi.com/v1/forecast.json?";
let dateInput = document.getElementById("date");
let select = document.getElementById('cities');
let daysSel = document.getElementById("amount");
let citySel = document.getElementById("cities");
let city = document.getElementById("cities").value;
let days = daysSel.value;
function getData(city, amount) {
    fetch(url + new URLSearchParams({
        key: apiKey,
        q: city,
        days: amount
    })).then(
        response => response.json()
    ).then(data => {
        if (data['error']) {
            return document.getElementById(
                "not-found"
            ).innerHTML = "City not found"
        }
        document.getElementById("not-found").innerHTML = ""
        document.getElementById("few-days").innerHTML = ""
        console.log(data);
        document.getElementById("few-days").innerHTML = `<h1>${data.location.name}</h1>`
        let days = data.forecast.forecastday;
        for (const day of days) {
            let date = new Date(day.date).toLocaleDateString()
            document.getElementById("few-days").innerHTML += `
            <div id="day">
                <h3 class="date">${date}</h3>
                <div id="hours-${day.date}" class="hours"></div>
            </div>
        `;
            for (const hour of day.hour) {
                let time = new Date(hour.time).toLocaleTimeString()
                let temp = hour.temp_c;
                let icon = hour.condition.icon;
                let humidity = hour.humidity;
                let windSpeed = hour.wind_kph;
                document.getElementById(`hours-${day.date}`).innerHTML += `
                <div>
                    <h4>${time}</h4>
                    <img src="${icon}">
                    <p>Temperature: ${temp}℃</p>
                    <p>Wind: ${windSpeed}km/h</p>
                    <p>Humidity: ${humidity}%</p>
                </div>
            `
            }
        }


    }).catch(error => {
        console.error('Error fetching weather data:', error);
    });
}

getData(citySel.value, daysSel.value);


document.getElementById("search-form").addEventListener("submit", (event) => {
    event.preventDefault();
    city = event.target['search'].value;
    console.log(city);
    getData(city, days);
})

daysSel.addEventListener("change", function (event) {
    let days = event.target.value
    getData(city, days)
})

select.addEventListener("change", (event) => {
    city = event.target.value
    getData(city, daysSel.value)
})