const map = L.map("map");
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

function DisplayLocation() {
  fetch(
    "https://geo.ipify.org/api/v2/country,city?apiKey=at_KFty41RO0VuNz2swz5QJdFTsM15D1"
  )
    .then((resp) => resp.json())
    .then((data) => {
      let latitude = data.location.lat;
      let longitude = data.location.lng;
      map.setView([latitude, longitude], 13);
      console.log(longitude, latitude);
    });
}
// Displays when the user enters the window
DisplayLocation();
