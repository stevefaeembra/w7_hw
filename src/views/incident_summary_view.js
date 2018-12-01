const PubSub = require("../helpers/pub_sub.js");

const IncidentSummaryView = function (querySelection) {
  this.element = document.querySelector(querySelection);
};

IncidentSummaryView.prototype.bindEvents = function () {

};

IncidentSummaryView.prototype.render = function (incident) {
  // summary of the incident
  const card = document.createElement("div");
  card.textContent= "An incident";
  card.className = "incident-card"
  return card;
};

module.exports = IncidentSummaryView;
