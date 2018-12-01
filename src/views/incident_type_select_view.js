const PubSub = require("../helpers/pub_sub.js");

const IncidentTypeSelectView = function (querySelection) {
  this.element = document.querySelector(querySelection);
};

IncidentTypeSelectView.prototype.populatePullDown = function(categoryList) {
  // clear out and recreate list of options from array of categories
  this.element.innerHTML = '';
  categoryList.forEach((category) => {
    const option = document.createElement("option");
    option.textContent = category.name;
    option.setAttribute('value', category.url);
    this.element.appendChild(option);
  });
};

IncidentTypeSelectView.prototype.bindEvents = function () {
  // when we have a list of categories, populate the pulldown
  PubSub.subscribe("PoliceApiModel:have_categories", (event) => {
    PubSub.signForDelivery(this,event);
    const categoryList = event.detail;
    this.populatePullDown(categoryList);
  });
  // when user changes value, publish it.
  this.element.addEventListener("change", (event) => {
    const value = event.target.value;
    PubSub.publish("IncidentTypeSelectView:change_category",value);
  })
};

module.exports = IncidentTypeSelectView;
