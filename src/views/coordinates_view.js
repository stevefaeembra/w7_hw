const PubSub = require("../helpers/pub_sub.js");

const CoordinatesView = function (querySelection) {
  this.element = document.querySelector(querySelection);
};

CoordinatesView.prototype.bindEvents = function () {
  // update lat/lon
  PubSub.subscribe("PostcodeAPIModel:got_postcode_location", (event) => {
    PubSub.signForDelivery(this,event);
    this.renderLocation(event.detail);
  });
};

CoordinatesView.prototype.renderLocation = function (location) {
  this.element.innerHTML = '';
  const latLon = document.createElement("div");
  latLon.setAttribute("class","latlon");
  latLon.innerHTML = `Latitude ${location.latitude}<br>Longitude ${location.longitude}`;
  this.element.appendChild(latLon);
};

module.exports = CoordinatesView;
