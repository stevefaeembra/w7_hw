const PubSub = require("../helpers/pub_sub.js");

const NeighbourhoodView = function (querySelection) {
  this.element = document.querySelector(querySelection);
};

NeighbourhoodView.prototype.render = function (neighbourhood) {
  this.element.innerHTML = '';
  const forceName = document.createElement("div");
  forceName.setAttribute("class","forceName");
  forceName.textContent = neighbourhood.force;
  this.element.appendChild(forceName);
  const neighbourhoodName = document.createElement("div");
  neighbourhoodName.setAttribute("class","neighbourhoodName");
  neighbourhoodName.textContent = neighbourhood.neighbourhood;
  this.element.appendChild(neighbourhoodName);

};

NeighbourhoodView.prototype.bindEvents = function () {
  // when we have a new neighbourhood, update DOM
  PubSub.subscribe("PoliceApiModel:have_neighbourhood", (event) => {
    this.render(event.detail);
  })
};

module.exports = NeighbourhoodView;
