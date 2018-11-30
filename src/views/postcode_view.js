const PubSub = require("../helpers/pub_sub.js");

const PostcodeView = function (querySelection) {
  this.element = document.querySelector(querySelection);
};

PostcodeView.prototype.bindEvents = function () {
  // when user enters a value in the postcode field publish it
  this.element.addEventListener("change", (event) => {
    const postcode = this.element.value;
    PubSub.publish("PostcodeSelectView:submit_postcode", postcode);
  })
};

module.exports = PostcodeView;
