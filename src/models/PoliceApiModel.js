const PubSub = require("../helpers/pub_sub.js");
const RequestHelper = require("../helpers/request_helper.js");

const PoliceApiModel = function () {
  this.data = {
    "categories": [],     // list of categories
    "incidents": [],      // list of incidents
    "neighbourhood": {},  // current neighbourhood
    "timePeriod": {       // time period (year/month)
      year: 2017,
      month: 7
    }
  }
};

PoliceApiModel.prototype.findCategories = function () {
  // look up police API to get a list of categories
  const date_format = `${this.data.timePeriod.year}-${this.data.timePeriod.month}`;
  const req = new RequestHelper(`https://data.police.uk/api/crime-categories?date=${date_format}`);
  const result = req.get().then(
    (info) => {
      const categories = info.map((item) => {
        return item.name;
      });
      return Promise.resolve(categories);
    }
  );
  return result; // a promise
}

PoliceApiModel.prototype.bindEvents = function () {
  //
  this.findCategories().then(
    (categories) => {
      PubSub.publish("PoliceApiModel:have_categories",categories);
    }
  );

};

module.exports = PoliceApiModel;
