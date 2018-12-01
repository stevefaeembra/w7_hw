const PubSub = require("../helpers/pub_sub.js");
const RequestHelper = require("../helpers/request_helper.js");

const PostcodeAPIModel = function () {

};

PostcodeAPIModel.prototype.lookUpLocation = function (postcode) {
  // get {latitude,longitude} from a postcode
  const url = `http://api.getthedata.com/postcode/${postcode}`;
  const req = new RequestHelper(url);
  const result = req.get().then((response) => {
    const latitude = response.data.latitude;
    const longitude = response.data.longitude;
    return Promise.resolve({
      "latitude": parseFloat(latitude),
      "longitude": parseFloat(longitude)
    });
  });
  return result; // a promise
};

PostcodeAPIModel.prototype.bindEvents = function () {
  // we want to know when user enters a postcode!
  PubSub.subscribe("PostcodeSelectView:submit_postcode", (event) => {
    PubSub.signForDelivery(this,event);
    const postcode = event.detail;
    console.log(`Postcode ${postcode} recieved`);
    this.lookUpLocation(postcode).then((location) => {
      PubSub.publish("PostcodeAPIModel:got_postcode_location", location);
    });
  })
};

module.exports = PostcodeAPIModel;
