const PubSub = require("../helpers/pub_sub.js");

const IncidentSummaryView = function (querySelection) {
  this.element = document.querySelector(querySelection);
};

IncidentSummaryView.prototype.bindEvents = function () {

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

  return card;
};

module.exports = IncidentSummaryView;
