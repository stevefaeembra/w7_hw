const PubSub = require("../helpers/pub_sub");
const IncidentSummaryView = require("./incident_summary_view.js");

const IncidentsListView = function (querySelection) {
  this.element = document.querySelector(querySelection);
};

IncidentsListView.prototype.bindEvents = function () {

  // want to know when boundary is ready, so we can
  // put a spinner in place. import for UX as some city
  // areas can have thousands of incidents and take several
  // seconds to load.

  PubSub.subscribe("PoliceApiModel:starting_lookup", (event) => {
    // inject spinner. this will be cleared out
    // when the data is ready
    this.element.innerHTML = "";
    const spinner = document.createElement("i");
    spinner.className = "fa fa-refresh fa-spin center";
    spinner.style="font-size:48px;color:red"
    this.element.appendChild(spinner);
  });

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
