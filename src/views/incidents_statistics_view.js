const PubSub = require("../helpers/pub_sub.js");
const IncidentStatisticView = require("./incident_statistic_view");

const IncidentsStatisticsView = function (querySelection) {
  this.element = document.querySelector(querySelection);
};

IncidentsStatisticsView.prototype.bindEvents = function () {
  PubSub.subscribe("PoliceApiModel:have_incidents",(event) => {
    PubSub.signForDelivery(this,event);
    this.element.innerHTML = "";
    const incidents = event.detail;
    const counts = this.getPercentages(incidents);
  });
};

IncidentsStatisticsView.prototype.getPercentages = function (incidents) {
  let counts = {};
  let total = 0;
  incidents.forEach((incident) => {
    total += 1;
    if (incident.category in counts) {
      counts[incident.category] += 1;
    } else {
      counts[incident.category] = 1;
    }
  });
  console.log("Found", total, "incidents");
  // convert to percentages 0..100
  let categoryArray = [...Object.keys(counts)];
  const categoryPercentages = categoryArray.map((category) => {
    return {
      "category": category,
      "percentage": parseFloat((counts[category])/parseFloat(total))*100.0
    }
  });

  // add in an 'all-crimes' at 100%, insert at start of list
  categoryPercentages.unshift({"category":"all-crimes", "percentage": 100.0});

  // now, sort by percentage descending
  categoryPercentages.sort((a,b) => {
    if (a.percentage<b.percentage) {
      return 1;
    }
    else {
      return -1;
    }
  })

  // add header showing the number of incidents
  const totalCountDiv = document.createElement("div");
  totalCountDiv.className = "statistic-category--total";
  totalCountDiv.textContent = `Found ${total} incidents`;
  this.element.appendChild(totalCountDiv);

  // now have an array of objects with category name and percentages
  // render as a list
  categoryPercentages.forEach((categoryInfo) => {
    const divForStatistic = new IncidentStatisticView().render(categoryInfo);
    this.element.appendChild(divForStatistic);
  })
  console.dir(categoryPercentages);
};

module.exports = IncidentsStatisticsView;
