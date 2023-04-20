const apiKey = "37a21ee58be1454883b123745230504";
const url = "http://api.weatherapi.com/v1/current.json?";
let select = document.getElementById('cities');

select.addEventListener("change", (event) => {
    let city = event.target.value
    getData(city)
})
function getData(city) {
    fetch(url + new URLSearchParams({
        key: apiKey,
        q: city,
    })).then(
        response => response.json()
    ).then(data => {
        if (data['error']) {
            return document.getElementById(
                "not-found"
            ).innerHTML = "City not found"
        }
        document.getElementById("not-found").innerHTML = ""
        render(data)

    }).catch(error => {
        console.error('Error fetching weather data:', error);
    });
}

function render(data) {
    let temp = data.current.temp_c;
    let windSpeed = data.current.wind_kph;
    let cloud = data.current.cloud;
    let humidity = data.current.humidity;
    let windDir = data.current.wind_dir;
    let location = data.location.name;

    document.getElementById("weather").innerHTML = `
        <h3>City: ${location}</h3>
        <img src="${data.current.condition.icon}">
        <p>Temperature: ${temp}℃</p>
        <p>Wind: ${windSpeed}km/h -> ${windDir}</p>
        <p>Clouds: ${cloud}%</p>
        <p>Humidity: ${humidity}%</p>
    `
}

getData(document.getElementById("cities").value)

document.getElementById("search-form").addEventListener("submit", (event) => {
    event.preventDefault();
    getData(event.target['search'].value)
})