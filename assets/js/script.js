const getCurrent = async (lat, lon) => {
  console.log(`In current ${(lat, lon)}`);
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=affb9672421f2bdbafa153c5ca91f216`
  );
  // get the body out of the response
  const weather = await response.json();
  ///log the data
  $(".current").append($(`<h1>${weather.name}</h1>`));
  const myImage = $(`<img>`);
  myImage.attr(
    "src",
    `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
  );
  $(".current").append(myImage);
  $(".current").append($(`<p>Temp: ${weather.main.temp}</p>`));
  $(".current").append($(`<p>Wind: ${weather.wind.speed}</p>`));
  $(".current").append($(`<p>Humidity: ${weather.main.humidity}</p>`));
  console.log(weather);
  console.log(weather.name);
  console.log(weather.main.temp);
  console.log(weather.wind.speed);
};
const getForecast = async (lat, lon) => {
  console.log("forecast");
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=affb9672421f2bdbafa153c5ca91f216&units=imperial`
  );
  console.log(response);
  const data = await response.json();
  console.log(data);
  const result = data.list.filter((day) => day.dt_txt.includes("15:00:00"));
  console.log(result);
  for (let i = 0; i < result.length; i++) {
    const div = document.createElement("div");
    const day = document.createElement("p");
    day.textContent = result[i].dt_txt;
    div;
    div.append(day);
    document.querySelector("#Forecast").append(div);
  }
};

const getCoords = async (city) => {
  console.log(city);
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=10&appid=affb9672421f2bdbafa153c5ca91f216`
  );
  // get the body out of the response
  const data = await response.json();
  // get our values
  const lat = data[0].lat;
  const lon = data[0].lon;

  getCurrent(lat, lon);
  getForecast(lat, lon);
};

//listen for a click
$(".weather_btn").on("click", () => {
  // get the value form the form
  $(".current").empty();
  // get the coords
  getCoords($(".city").val());
  //pass the coords to the current weather
  // get the weather on th epage
});
