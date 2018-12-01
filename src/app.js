const PoliceApiModel = require("./models/police_api_model");
const IncidentTypeSelectView = require("./views/incident_type_select_view");
const PostcodeView = require("./views/postcode_view");
const PostcodeAPIModel = require("./models/postcode_api_model");
const NeighbourhoodView = require("./views/neighbourhood_view");

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');
  items = [
    new PoliceApiModel(),
    new IncidentTypeSelectView("#incident-type"),
    new PostcodeView("#postcode"),
    new PostcodeAPIModel(),
    new NeighbourhoodView("#neighbourhood"),
  ]
  items.forEach((item) => {
    item.bindEvents();
  })
});
