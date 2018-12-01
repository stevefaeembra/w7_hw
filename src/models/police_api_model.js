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

PoliceApiModel.prototype.findNeighbourHood = function (location) {
    // given a location {latitude, longitude}
    // return the neighbourhood info
    console.log("In the findNeighbourHood");
    const req= new RequestHelper(`https://data.police.uk/api/locate-neighbourhood?q=${location.latitude},${location.longitude}`);
    req.get().then((data) => {
      this.neighbourhood = data;
      PubSub.publish("PoliceApiModel:have_neighbourhood", data);
    });
};

PoliceApiModel.prototype.bindEvents = function () {

  // get categories, then publish list
  this.findCategories().then(
    (categories) => {
      PubSub.publish("PoliceApiModel:have_categories",categories);
    }
  );

  // when postcode changes, find the new location
  PubSub.subscribe("PostcodeAPIModel:got_postcode_location", (location) => {
    PubSub.signForDelivery(this,event);
    const latitude = event.detail['latitude'];
    const longitude = event.detail['longitude'];
    this.findNeighbourHood({
      "latitude": latitude,
      "longitude": longitude
    })
  });

};

module.exports = PoliceApiModel;
