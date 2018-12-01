const PubSub = require("../helpers/pub_sub.js");
const RequestHelper = require("../helpers/request_helper.js");

const PoliceApiModel = function () {
  this.data = {
    "categories": [],         // list of categories
    "category" : "all-crimes",  // selected crime
    "incidents": [],          // list of incidents
    "neighbourhood": {},      // current neighbourhood
    "boundary": [],           // list of points on boundary
    "timePeriod": {           // time period (year/month)
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
        return item;
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
      this.data.neighbourhood = data;
      PubSub.publish("PoliceApiModel:have_neighbourhood", data);
    });
};

PoliceApiModel.prototype.findBoundary = function () {
  // given we have the force name and neighbourhood name,
  // finds the boundary. this is an array of lat,lon pairs.
  console.dir(this.data);
  const neighbourhoodId = this.data.neighbourhood.neighbourhood;
  const forceName = this.data.neighbourhood.force;
  const url = `https://data.police.uk/api/${forceName}/${neighbourhoodId}/boundary`;
  const req = new RequestHelper(url);
  // this may take a while so return a promise
  return new Promise( (resolve, reject) => {
    req.get().then((info) => {
      this.data.boundary = info;
      console.dir("got boundary!");
      console.dir(this.getBoundaryWKT());
      PubSub.publish("PoliceApiModel:have_boundary", this.data.boundary);
      Promise.resolve(info);
    });
  });
};


PoliceApiModel.prototype.getBoundaryWKT = function () {
  // for debugging. This returns WKT (well known text)
  // format for the boundary. I can then paste this into QGIS
  // to make sure it makes sense ;-)
  let wkt = "LINESTRING(";
  this.data.boundary.forEach((point) => {
    wkt += `${point.longitude} ${point.latitude},`;
  })
  wkt = wkt.slice(0,wkt.length-1); // drop final comma
  wkt += ")";
  return wkt;
};

PoliceApiModel.prototype.bindEvents = function () {

  // get categories, then publish list

  this.findCategories().then(
    (categories) => {
      PubSub.publish("PoliceApiModel:have_categories",categories);
    }
  );

  // when postcode changes, find the new location and boundary

  PubSub.subscribe("PostcodeAPIModel:got_postcode_location", (location) => {
    PubSub.signForDelivery(this,event);
    const latitude = event.detail['latitude'];
    const longitude = event.detail['longitude'];
    this.findNeighbourHood({
      "latitude": latitude,
      "longitude": longitude
    });
  });

  // when we have a neighbourhood, we can fetch a boundary

  PubSub.subscribe("PoliceApiModel:have_neighbourhood", (event) => {
    PubSub.signForDelivery(this,event);
    this.findBoundary();
  });

  // when we have a boundary, we can fetch incidents

  PubSub.subscribe("PoliceApiModel:have_boundary", (event) => {
    PubSub.signForDelivery(this,event);
    const category = this.data
    const url = `https://data.police.uk/api/crimes-street/${category}?poly=${poly}&date=${month}`;

  });

  // when category changes, update current category

  PubSub.subscribe("IncidentTypeSelectView:change_category", (event) => {
    PubSub.signForDelivery(this, event);
    const newCategory = event.detail;
    this.data.category = newCategory;
    console.dir(this.data);
  })

  // when month changes, update the date info

  PubSub.subscribe("MonthInputView:month-changed", (event) => {
    PubSub.signForDelivery(this,event);
    const yearMonth = event.detail;
    const year = parseInt(yearMonth.substring(0,4));
    const month = parseInt(yearMonth.substring(5,7));
    this.data.timePeriod = {
      "year": year,
      "month": month
    };
    console.dir(this.data);
  })

};

module.exports = PoliceApiModel;
