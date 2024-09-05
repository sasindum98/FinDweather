 function searchData(){

      let userInput = document.getElementById("txtInput").value;
      console.log(userInput);
      
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
   



      }

        
          
    