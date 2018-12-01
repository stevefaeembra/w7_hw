const PubSub = require("../helpers/pub_sub.js");

const MonthInputView = function (querySelection) {
  this.element = document.querySelector(querySelection);
};

MonthInputView.prototype.bindEvents = function () {
  this.element.addEventListener("change", (event) => {
    const selectedMonth = event.target.value;
    PubSub.publish("MonthInputView:month-changed", selectedMonth);
  })
};

module.exports = MonthInputView;
