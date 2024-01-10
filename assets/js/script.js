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
  // console.log(weather);
  // console.log(weather.name);
  // console.log(weather.main.temp);
  // console.log(weather.wind.speed);
};
const getForecast = async (lat, lon) => {
  // console.log("forecast");
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=affb9672421f2bdbafa153c5ca91f216&units=imperial`
  );
  // console.log("response" + JSON.stringify(response));
  const data = await response.json();
  console.log(data);
  // console.log("data" + JSON.stringify(data));
  const result = data.list.filter((day) => day.dt_txt.includes("15:00:00"));
  // console.log("result" + JSON.stringify(result));
  var start = dayjs().add(1, "day").startOf("day").unix();
  var end = dayjs().add(6, "day").startOf("day").unix();

  result.forEach((index) => {
    $(".forecast").append(
      $(`<div>
  <div >${index.dt_txt}</div>
  <div>${index.main.temp}</div>
  <div>${index.wind.speed}</div>
  <div>${index.main.humidity}</div>

  </div>`)
    );
  });

  for (let index = 0; index < result.length; index++) {
    if (result[index].dt >= start && result.dt < end) {
      if (result[index].dt_txt.slice(11, 13) == "12") {
        renderForecastCard(result[index]);
      }
    }
  }
  for (let i = 0; i < result.length; i++) {
    const div = document.createElement("div");
    const day = document.createElement("p");
    day.textContent = result[i].dt_txt;
    // div
    div.append(day);
    document.querySelector("#Forecast").append(div);
  }
};
function renderForecastCard(forecast) {
  $(".current").append($(`<h1>${weather.name}</h1>`));
  const myImage = $(`<img>`);
  myImage.attr(
    "src",
    `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`
  );
  $(".current").append(myImage);
  $(".current").append($(`<p>Temp: ${forecast.main.temp}</p>`));
  $(".current").append($(`<p>Wind: ${forecast.wind.speed}</p>`));
  $(".current").append($(`<p>Humidity: ${forecast.main.humidity}</p>`));
  console.log(forecast);
  console.log(forecast.name);
  console.log(forecast.main.temp);
  console.log(forecast.wind.speed);
}

const getCoords = async (city) => {
  // console.log(city);
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

  function searched() {
    let addCity = JSON.parse(localStorage.getItem("newCity"));
    if (!Array.isArray(addCity)) {
      addCity = [];

      addCity.unshift($(".city").val());
      localStorage.setItem("newCity", JSON.stringify(addCity));
      console.log(addCity);
      console.log(2);
    }
  }
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
