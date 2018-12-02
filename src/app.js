const PoliceApiModel = require("./models/police_api_model");
const IncidentTypeSelectView = require("./views/incident_type_select_view");
const PostcodeView = require("./views/postcode_view");
const PostcodeAPIModel = require("./models/postcode_api_model");
const NeighbourhoodView = require("./views/neighbourhood_view");
const CoordinatesView = require("./views/coordinates_view");
const MonthInputView = require("./views/month_input_view");
const IncidentsListView = require("./views/incidents_list_view");
const NeighbourhoodMapView = require("./views/neighbourhood_map_view");
const IncidentsStatisticsView = require("./views/incidents_statistics_view");

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');
  items = [
    new PoliceApiModel(),
    new IncidentTypeSelectView("#incident-type"),
    new PostcodeView("#postcode"),
    new PostcodeAPIModel(),
    new NeighbourhoodView("#neighbourhood"),
    new CoordinatesView("#coordinates"),
    new MonthInputView("#month"),
    new IncidentsListView("#incidents"),
    new NeighbourhoodMapView("#map"),
    new IncidentsStatisticsView("#statistics"),
  ]
  items.forEach((item) => {
    item.bindEvents();
  })
});
