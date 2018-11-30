const PoliceApiModel = require("./models/PoliceApiModel");
const IncidentTypeSelectView = require("./views/incident_type_select_view.js");

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');
  items = [
    new PoliceApiModel(),
    new IncidentTypeSelectView("#incident-type"),
  ]
  items.forEach((item) => {
    item.bindEvents();
  })
});
