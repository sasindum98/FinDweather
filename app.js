document.addEventListener('DOMContentLoaded', function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
    
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
});

let firstPart;

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  console.log("Latitude: " + latitude);
  console.log("Longitude: " + longitude);


  const geocodingUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

  fetch(geocodingUrl)
    .then(response => response.json())
    .then(data => {
      if (data.display_name) {
        const fullAddress = data.display_name;
        firstPart = fullAddress.split(' - ')[0];
        console.log("Current location:", firstPart);
        searchData(firstPart);
        getLastFiveDaysWeather(firstPart);
        
      } else {
        console.error("Error fetching location name: No result");
      }
    })
    .catch(error => {
      console.error("Error:", error);
    });

    
}



function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      console.log("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      console.log("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      console.log("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      console.log("An unknown error occurred.");
      break;
  }
}

let map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 0, lng: 0},
        zoom: 8
    });
}

function updateMap(lat, lng) {
    const location = new google.maps.LatLng(lat, lng);
    map.setCenter(location);
    new google.maps.Marker({
        position: location,
        map: map
    });
}

// Call this when the page loads
document.addEventListener('DOMContentLoaded', initMap);

function searchDataOnAction(){

  let userInput = document.getElementById("txtInput").value;
  console.log(userInput);

  searchData(userInput);
  
}

function getLastFiveDaysWeather(userInput) {
  const apiKey = '0d6a73dda4df492095472525240309';
  const today = new Date();

  for (let i = 1; i <= 5; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const formattedDate = date.toISOString().split('T')[0];
    
    const url = `http://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${userInput}&dt=${formattedDate}`;
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const dayElement = document.getElementById(`lday${i}`);
        const iconElement = document.getElementById(`lconditionIcon${i}`);
        const conditionElement = document.getElementById(`condition${i}`);

        if (data.forecast && data.forecast.forecastday[0]) {
          const weatherData = data.forecast.forecastday[0].day;
          dayElement.innerText = date.toLocaleDateString('en-US', { weekday: 'short' });
          iconElement.src = `https:${weatherData.condition.icon}`;
          iconElement.alt = weatherData.condition.text;
          conditionElement.innerText = weatherData.condition.text;
        } else {
          console.error(`No data available for ${formattedDate}`);
        }
      })
      .catch(error => {
        console.error(`Error fetching data for ${formattedDate}:`, error);
      });
  }
}


 function searchData(userInput){

 
      
      let country = document.getElementById("country");
      let temp = document.getElementById("temp");
      let conditionIcon = document.getElementById("conditionIcon");
      let realFeel = document.getElementById("realFeel");
      let humidity = document.getElementById("humidity");
      let wind = document.getElementById("wind");
      let uv = document.getElementById("uv");
      let sixamtemp = document.getElementById("sixamtemp");
      let nineamtemp = document.getElementById("nineamtemp");
      let twlpmtemp = document.getElementById("twlpmtemp");
      let threepmtemp = document.getElementById("threepmtemp");
      let sixpmtemp = document.getElementById("sixpmtemp");
      let ninepmtemp = document.getElementById("ninepmtemp");
      let conditionIcon1 = document.getElementById("conditionIcon1");
      let conditionIcon2 = document.getElementById("conditionIcon2");
      let conditionIcon3 = document.getElementById("conditionIcon3");
      let conditionIcon4 = document.getElementById("conditionIcon4");
      let conditionIcon5 = document.getElementById("conditionIcon5");
      let conditionIcon6 = document.getElementById("conditionIcon6");
      let conditionIconf = document.getElementById("conditionIconf");
      let conditionIconf1 = document.getElementById("conditionIconf1");
      let conditionIconf2 = document.getElementById("conditionIconf2");
      let conditionIconf3 = document.getElementById("conditionIconf3");
      let conditionIconf4 = document.getElementById("conditionIconf4");
      let conditionIconf5 = document.getElementById("conditionIconf5");
      let conditionIconf6 = document.getElementById("conditionIconf6");
      let tdyFeel = document.getElementById("tdyFeel");
      let tuDyFeel = document.getElementById("tuDyFeel");
      let wedDyFeel = document.getElementById("wedDyFeel");
      let thuDyFeel = document.getElementById("thuDyFeel");
      let friDyFeel = document.getElementById("friDyFeel");
      let satDyFeel = document.getElementById("satDyFeel");
      let sunDyFeel = document.getElementById("sunDyFeel");
      let date3 = document.getElementById("date3");
      let date4 = document.getElementById("date4");
      let date5 = document.getElementById("date5");
      let date6 = document.getElementById("date6");
      let date7 = document.getElementById("date7");
      


      fetch(`http://api.weatherapi.com/v1/current.json?key=0d6a73dda4df492095472525240309&q=${userInput}`)
      .then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    })
    .then(data => {
      //console.log(data);
      country.innerText = data.location.name;
      temp.innerText = `${data.current.temp_c}°C / ${data.current.temp_f}°F`;
      conditionIcon.src = `https:${data.current.condition.icon}`; 
       // conditionIcon.alt = data.current.condition.text;
        realFeel.innerText = data.current.condition.text
        humidity.innerText = data.current.humidity
        wind.innerText = `${data.current.wind_mph} mph / ${data.current.wind_kph} kph`;
        uv.innerText = data.current.uv
        conditionIconf.src = `https:${data.current.condition.icon}`; 
        tdyFeel.innerText = data.current.condition.text
        


  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    country.innerText = "Error fetching data";
    temp.innerText = "N/A";
    conditionIcon.src = "";
    conditionIcon1.src = "";
});

fetch(`http://api.weatherapi.com/v1/forecast.json?key=0d6a73dda4df492095472525240309&q=${userInput}`)
      .then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    })

    .then(data =>{

      sixamtemp.innerText = `${data.forecast.forecastday[0].hour[6].temp_c}°C`
      nineamtemp.innerText = `${data.forecast.forecastday[0].hour[9].temp_c}°C`
      twlpmtemp.innerText = `${data.forecast.forecastday[0].hour[12].temp_c}°C`
      threepmtemp.innerText = `${data.forecast.forecastday[0].hour[15].temp_c}°C`
      sixpmtemp.innerText = `${data.forecast.forecastday[0].hour[18].temp_c}°C`
      ninepmtemp.innerText = `${data.forecast.forecastday[0].hour[21].temp_c}°C`
      conditionIcon1.src = `https:${data.forecast.forecastday[0].hour[6].condition.icon}`;
      conditionIcon2.src = `https:${data.forecast.forecastday[0].hour[9].condition.icon}`;
      conditionIcon3.src = `https:${data.forecast.forecastday[0].hour[12].condition.icon}`;
      conditionIcon4.src = `https:${data.forecast.forecastday[0].hour[15].condition.icon}`;
      conditionIcon5.src = `https:${data.forecast.forecastday[0].hour[18].condition.icon}`;
      conditionIcon6.src = `https:${data.forecast.forecastday[0].hour[21].condition.icon}`;
    
      
    })

    fetch(`http://api.weatherapi.com/v1/forecast.json?key=0d6a73dda4df492095472525240309&q=${userInput}&days=8`)
      .then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    })
    .then(data =>{

      conditionIconf1.src = `https:${data.forecast.forecastday[1].day.condition.icon}`;
      conditionIconf2.src = `https:${data.forecast.forecastday[2].day.condition.icon}`;
      conditionIconf3.src = `https:${data.forecast.forecastday[3].day.condition.icon}`;
      conditionIconf4.src = `https:${data.forecast.forecastday[4].day.condition.icon}`;
      conditionIconf5.src = `https:${data.forecast.forecastday[5].day.condition.icon}`;
      conditionIconf6.src = `https:${data.forecast.forecastday[6].day.condition.icon}`;
      tuDyFeel.innerText = `${data.forecast.forecastday[1].day.condition.text}`;
      wedDyFeel.innerText = `${data.forecast.forecastday[2].day.condition.text}`;
      thuDyFeel.innerText = `${data.forecast.forecastday[3].day.condition.text}`;
      friDyFeel.innerText = `${data.forecast.forecastday[4].day.condition.text}`;
      satDyFeel.innerText = `${data.forecast.forecastday[5].day.condition.text}`;
      sunDyFeel.innerText = `${data.forecast.forecastday[6].day.condition.text}`;
      date3.innerText = `Day 3 (${data.forecast.forecastday[2].date})`;
      date4.innerText = `Day 4 (${data.forecast.forecastday[3].date})`;
      date5.innerText = `Day 5 (${data.forecast.forecastday[4].date})`;
      date6.innerText = `Day 6 (${data.forecast.forecastday[5].date})`;
      date7.innerText = `Day 7 (${data.forecast.forecastday[6].date})`;
      
      getLastFiveDaysWeather();(userInput);

    })

    fetch(`http://api.weatherapi.com/v1/current.json?key=0d6a73dda4df492095472525240309&q=${userInput}`)
    .then(res => res.json())
    .then(data => {
        // ... your existing code to update weather info ...

        // Update the map with the new location
        updateMap(data.location.lat, data.location.lon);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });


      }

      

        
          
    