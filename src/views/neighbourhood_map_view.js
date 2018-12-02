const L = require("leaflet");
const PubSub = require("../helpers/pub_sub");

const NeighbourhoodMapView = function (querySelection) {
  this.element = document.querySelector(querySelection);
  this.map = L.map('map').setView([55.955, -3.2], 12);
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.light'
	}).addTo(this.map);
}

NeighbourhoodMapView.prototype.bindEvents = function () {
  // listen for a location and center the map at (lat, lon)
  PubSub.subscribe("PostcodeAPIModel:got_postcode_location", (event) => {
    var location = event.detail;
    var lat = location.latitude;
    var lon = location.longitude;
    this.map.setView([lat, lon], 12);
  });

  // got geojson for boundary

  PubSub.subscribe("PoliceApiModel:got-geojson",(event) => {
    let boundary = event.detail;
    L.geoJSON([boundary], {
  		style: function (feature) {
  			return feature.properties && feature.properties.style;
  		}
		}).addTo(this.map);
	});

  // got geojson for incidents

  PubSub.subscribe("PoliceApiModel:have_incidents_geojson", (event) => {
    let incidentGeojson = event.detail;
    L.geoJSON([incidentGeojson], {
  		style: function (feature) {
  			return feature.properties && feature.properties.style;
  		}
		}).addTo(this.map);
  })
};

module.exports = NeighbourhoodMapView;
