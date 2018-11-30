const PubSub = require("../helpers/pub_sub.js");

const IncidentTypeSelectView = function (querySelection) {
  this.element = document.querySelector(querySelection);
};

IncidentTypeSelectView.prototype.populatePullDown = function(categoryList) {
  // clear out and recreate list of options from array of categories
  this.element.innerHTML = '';
  categoryList.forEach((categoryName) => {
    const option = document.createElement("option");
    option.textContent = categoryName;
    option.setAttribute('value', option);
    this.element.appendChild(option);
  });
};

IncidentTypeSelectView.prototype.bindEvents = function () {
  // when w have a list of categories, populate the pulldown
  PubSub.subscribe("PoliceApiModel:have_categories", (event) => {
    PubSub.signForDelivery(this,event);
    const categoryList = event.detail;
    this.populatePullDown(categoryList);
  });
};

module.exports = IncidentTypeSelectView;
