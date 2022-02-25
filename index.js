const form = document.querySelector('form')
const cityName = document.querySelector('#currentCity #cityName')
const cityWeather = document.querySelector('#currentCity #weather')
const date = document.querySelector('#currentCity #date')
const currentTemp = document.querySelector('#currentCity #currentTemp')
const unit = document.querySelector('#currentCity #units')
const searchInput = document.querySelector('header form input')
const unitSwitcher = document.querySelector('button#unitSwitch')
const giphy = document.querySelector('img#gif')

const clearSky = 'YA5oXxbyy8N5C'
const fewClouds = '3o7WTFAHOpnxfCogGk'
const scatteredClouds = 'upqTXDriI9Kj7Lv9SE'
const brokenClouds = '5HK4TiiBeLSZq'
const showerRain = 'HkZ6bBjavyxDG'
const rain = '3oKIPstwMF15FghbYQ'
const thunderstorm = '3o85xzEtQs693ln3qM'
const snow = '26tneSGWphvmFlUju'
const mist = 'n4q2kXmbeb8HKeGIq0'


let currentCity = 'Ramla'
let units = 'imperial'
const apiKey = 'f8c51189d5e340b81026dbda2258b7e2'
let gif 

unitSwitcher.addEventListener('click', () => {
    unitSwitcher.textContent = unitSwitcher.textContent === 'F to C' ?  'C to F' : 'F to C';
    units = units === 'imperial' ? 'metric' : 'imperial'
    getData()
})

form.addEventListener('submit', (e)=> {
    e.preventDefault()
    currentCity = searchInput.value
    getData()
    form.reset()
})

function returnGif(description) {
    if (description === 'clear sky') {
        gif = clearSky
    } else if (description === 'few clouds') {
        gif = fewClouds
    } else if (description === 'scattered clouds') {
        gif = scatteredClouds
    } else if (description === 'broken clouds') {
        gif = brokenClouds
    } else if (description === 'shower rain') {
        gif = showerRain
    } else if (description === 'rain') {
        gif = rain
    } else if (description === 'thunderstorm') {
        gif = thunderstorm
    } else if (description === 'snow') {
        gif = snow
    } else if (description === 'mist') {
        gif = mist 
    }
}
async function getData() {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${currentCity}&units=${units}&appid=${apiKey}`, {mode: 'cors'});
    const info = await response.json()
    const weatherDesc = info.weather[0].description;
    returnGif(weatherDesc)
    const showGif = await fetch(`https://api.giphy.com/v1/gifs?ids=${gif}&api_key=01AyMSviTkU61F4tdpU4XKCCaJyvz2mn`);
    const name = await showGif.json()

    giphy.src = name.data[0].images.preview_webp.url
    cityName.textContent = info.name
    cityWeather.textContent = info.weather[0].description
    date.textContent = new Date().toString().slice(0,15)
    currentTemp.textContent = info.main.temp
    if (units == 'imperial') {
        unit.textContent = 'F'
    }
    else {
        unit.textContent = 'C'
    }
}

getData()