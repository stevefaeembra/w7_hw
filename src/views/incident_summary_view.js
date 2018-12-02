const PubSub = require("../helpers/pub_sub.js");

const IncidentSummaryView = function (querySelection) {
  this.element = document.querySelector(querySelection);
};

IncidentSummaryView.prototype.bindEvents = function () {
  PubSub.subscribe("PoliceApiModel:starting_lookup", (event) => {
    // add a spinner...
    
  })
};

IncidentSummaryView.prototype.render = function (incident) {
  // summary of the incident
  const card = document.createElement("div");
  card.className = "incident-card";

  const id = incident.id;
  const category = incident.category;
  const lat = incident.location.latitude;
  const lon = incident.location.longitude;
  const name = incident.location.street.name;

  const idDiv = document.createElement("div");
  idDiv.className = "incident-card--id";
  idDiv.textContent = id;
  card.appendChild(idDiv);

  const idCategory = document.createElement("div");
  idCategory.className = "incident-card--category";
  idCategory.textContent = category;
  card.appendChild(idCategory);

  const idLocation = document.createElement("div");
  idLocation.className = "incident-card--location";
  idLocation.textContent = `Latitude ${lat}, Longitude ${lon}`;
  card.appendChild(idLocation);

  const idDescription = document.createElement("div");
  idDescription.className = "incident-card--description";
  idDescription.textContent = name;
  card.appendChild(idDescription);

  return card;

};

module.exports = IncidentSummaryView;
