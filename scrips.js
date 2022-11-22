const map = L.map("map");

let queryString = new URLSearchParams({
  apiKey: "at_KFty41RO0VuNz2swz5QJdFTsM15D1",
});
const buttonSearch = document.querySelector(".button-search");
const inputSearch = document.querySelector(".input-header");
const ipAdress = document.querySelector("#ip-adress");
const locationInfo = document.querySelector("#location-info");
const timezone = document.querySelector("#timezone");
const isp = document.querySelector("#isp");
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);
function checkIfValidIP(str) {
  // Regular expression to check if string is a IP address
  const regexExp =
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;

  return regexExp.test(str);
}
function DisplayLocation() {
  fetch("https://geo.ipify.org/api/v2/country,city?" + queryString.toString())
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);

      ipAdress.textContent = data.ip;
      locationInfo.textContent =
        data.location.city + "," + data.location.region;
      timezone.textContent = data.location.timezone;
      isp.textContent = data.isp;
      let latitude = data.location.lat;
      let longitude = data.location.lng;
      const marker = L.marker([latitude, longitude]).addTo(map);
      marker.bindPopup("<b>Found it for you master").openPopup();
      map.setView([latitude, longitude], 13);
      console.log(data.ip);
    })
    .catch((err) => console.error(err));
}
// Checks if the input is ip , if it is it adds to query string , else it adds to domain.
function CheckInputAndDisplayLocation() {
  if (checkIfValidIP(inputSearch.value)) {
    queryString.set("ipAddress", inputSearch.value);
  } else {
    queryString.set("domain", inputSearch.value);
  }
  console.log(queryString.values);
  DisplayLocation();
}
//Display current location of first load
DisplayLocation();
//add event listener for click-button and keypress enter on input
buttonSearch.addEventListener("click", CheckInputAndDisplayLocation);
inputSearch.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    CheckInputAndDisplayLocation();
  }
});
