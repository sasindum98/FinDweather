
document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();
  searchData();
});

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


      fetch(`http://api.weatherapi.com/v1/current.json?key=0d6a73dda4df492095472525240309&q=${userInput}`)
      .then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    })
    .then(data => {
      console.log(data);
      country.innerText = data.location.name;
      temp.innerText = `${data.current.temp_c}°C / ${data.current.temp_f}°F`;
      conditionIcon.src = `https:${data.current.condition.icon}`; // Add this line
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
});

updateHourlyForecast();

     
          }

          function updateHourlyForecast(data) {
            const hours = [6, 9, 12, 15, 18, 21]; // 6 AM, 9 AM, 12 PM, 3 PM, 6 PM, 9 PM
            const currentHour = new Date().getHours();
            
            hours.forEach((hour, index) => {
              const forecastHour = (currentHour + index * 3) % 24;
              const forecastData = data.forecast.forecastday[0].hour[forecastHour];
              
              const temperature = Math.round(forecastData.temp_c);
              document.getElementById(`${hour}amtemp`).textContent = `${temperature}°C`;
            });
          }
          
          // Usage:
          fetch(`http://api.weatherapi.com/v1/forecast.json?key=0d6a73dda4df492095472525240309&q=${userInput}`)
            .then(res => {
              if (!res.ok) {
                throw new Error('Network response was not ok');
              }
              return res.json();
            })
            .then(data => {
              updateHourlyForecast(data);
            })
            .catch(error => {
              console.error('There was a problem with the fetch operation:', error);
            });

          
    