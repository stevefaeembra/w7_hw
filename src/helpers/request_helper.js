const RequestHelper = function (url) {
  this.url = url
};

RequestHelper.prototype.get = function (onComplete) {
  return fetch(this.url)
    .then(response => response.json())
    .catch(err => console.log(err));
};

module.exports = RequestHelper;
