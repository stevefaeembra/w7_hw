// represents a statistic e.g. robbery was 12% of total

const IncidentStatisticView = function () {

};

IncidentStatisticView.prototype.render = function (incidentStatistic) {
  // incidentStatistic is simple object {"category":"all_crime","percentage","100"};
  const statisticDiv = document.createElement("div");
  statisticDiv.className = "statistic-category";
  const categoryDiv = document.createElement("div");
  categoryDiv.className = "statistic-category--category";
  categoryDiv.textContent = incidentStatistic.category;
  const countDiv = document.createElement("div");
  countDiv.className = "statistic-category--count";
  countDiv.textContent = `${ incidentStatistic.percentage.toFixed(1) }%`;
  const percentageDiv = document.createElement("div");
  percentageDiv.className = "statistic-category--percentage";
  //percentageDiv.textContent = incidentStatistic.percentage;
  const percentageBarDiv = document.createElement("div");
  percentageBarDiv.className = "statistic-category--percentagebar";
  percentageBarDiv.style= `width: ${incidentStatistic.percentage}%;`;
  percentageDiv.appendChild(percentageBarDiv);
  statisticDiv.appendChild(categoryDiv);
  statisticDiv.appendChild(countDiv);
  statisticDiv.appendChild(percentageDiv);
  return statisticDiv;
};

module.exports = IncidentStatisticView;
