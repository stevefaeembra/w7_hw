const PubSub = require("../helpers/pub_sub.js");

const IncidentsStatisticsView = function (querySelection) {
  this.element = document.querySelector(querySelection);
};

IncidentsStatisticsView.prototype.bindEvents = function () {
  PubSub.subscribe("PoliceApiModel:have_incidents",(event) => {
    PubSub.signForDelivery(this,event);
    const incidents = event.detail;
    const counts = this.getPercentages(incidents);
  });
};

IncidentsStatisticsView.prototype.getPercentages = function (incidents) {
  let counts = {};
  let total = 0;
  debugger;
  incidents.forEach((incident) => {
    total += 1;
    if (incident.category in counts) {
      counts[incident.category] += 1;
    } else {
      counts[incident.category] = 1;
    }
  });
  console.log("Found", total, "incidents");
  console.dir(counts);
};

module.exports = IncidentsStatisticsView;
