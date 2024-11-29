const apikey = "5735dc278513a9c8a0d2a4dd8cccad25";
const apiUrl ="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const countryFlag = document.querySelector(".flag");
const sunriseTime = document.querySelector(".sunrise");
const sunsetTime = document.querySelector(".sunset");

function convertTime(timestamp, timezoneOffset) {
    // Create a new Date object based on the timestamp and offset
    const date = new Date((timestamp + timezoneOffset) * 1000);
  
    // Extract hours and minutes
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
  
    // Determine AM or PM
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12; // Convert to 12-hour format
  
    // Format minutes to always show two digits
    const formattedMinutes = minutes.toString().padStart(2, '0');
  
    return `${hours}:${formattedMinutes} ${ampm}`;
  }
async function checkWeather(city){
    const response = await fetch(apiUrl + city +  `&appid=${apikey}`);

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }else{
        var data = await response.json();
        document.querySelector(".error").style.display = "none";

        console.log(data);
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) +"°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed +   "km/h";
        if(data.weather[0].main == "Clouds"){
            weatherIcon.src = "images/clouds.png";
        }
        else if(data.weather[0].main == "Clear"){
            weatherIcon.src = "images/clear.png"
        }
        else if(data.weather[0].main == "Rain"){
            weatherIcon.src = "images/rain.png"
        }
        else if(data.weather[0].main == "Drizzle"){
            weatherIcon.src = "images/drizzle.png"
        }
        else if(data.weather[0].main == "Mist"){
            weatherIcon.src = "images/mist.png" 
        }
        document.querySelector(".weather").style.display ="block";
        countryFlag.src = `https://flagsapi.com/${data.sys.country}/flat/32.png`;
        sunriseTime.innerText = convertTime(data.sys.sunrise, data.timezone);
        sunsetTime.innerText = convertTime(data.sys.sunset,data.timezone);

        
    }

    
        
    }

   
    


searchBtn.addEventListener("click",()=>{
    checkWeather(searchBox.value); 
})





