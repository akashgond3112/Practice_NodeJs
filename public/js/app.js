console.log("Client side javascript file is loaded!");

// fetch('http://api.weatherstack.com/current?access_key=85d4be2bfa1a77d49ae46298945856fa&query=boston').then(response =>{
//     response.json().then((data) =>{
//         console.log(data.location.country);
//         console.log(data.current.weather_descriptions[0]);

//     })
// })

const weatherform = document.querySelector("form");
const search = document.querySelector("input");
const message_1 = document.querySelector("#message-1");
const message_2 = document.querySelector("#message-2");
var weather_icons = document.querySelector("#weather_icon");

weatherform.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  console.log("Button clicked " + location);

  message_1.textContent = "Loading....";
  message_2.textContent = "";
  weather_icons.src="";

  fetch("/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          message_1.textContent = data.error;
        }
        message_1.textContent = data.location;
        message_2.textContent = data.forecast;
        weather_icons.src = data.weather_icons;
      });
    }
  );
});
