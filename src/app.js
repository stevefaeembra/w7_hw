const PoliceApiModel = require("./models/PoliceApiModel");

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');
  items = [
    new PoliceApiModel(),
  ]
  items.forEach((item) => {
    item.bindEvents();
  })
});
