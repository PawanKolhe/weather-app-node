const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  // Weather API
  const base_url = "http://api.weatherstack.com";
  const api_key = process.env.WEATHER_STACK_API_KEY;
  const url = `${base_url}/current?access_key=${api_key}&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Low level error.", undefined);
    } else if (body.error) {
      callback("Coordinate error.", undefined);
    } else if (body.error || body.location.name === null) {
      callback("Coordinate error.", undefined);
    } else {
      callback(undefined, body.current);
    }
  });
};

module.exports = forecast;
