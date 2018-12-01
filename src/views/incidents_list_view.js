const PubSub = require("../helpers/pub_sub");
const IncidentSummaryView = require("./incident_summary_view.js");

const IncidentsListView = function (querySelection) {
  this.element = document.querySelector(querySelection);
};

IncidentsListView.prototype.bindEvents = function () {
  // interested to know when incidents are ready
  PubSub.subscribe("PoliceApiModel:have_incidents",(event) => {
    PubSub.signForDelivery(this, event);
    const incidents = event.detail;
    this.element.innerHTML = '';
    incidents.forEach((incident) => {
      const incidentSummaryView = new IncidentSummaryView();
      const card = incidentSummaryView.render(incident);
      this.element.appendChild(card);
    })
  });
};
module.exports = IncidentsListView;
