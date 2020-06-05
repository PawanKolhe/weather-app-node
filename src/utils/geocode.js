const request = require("postman-request");

const geocode = (address, callback) => {
  // Geocode API
  const base_url = "https://api.mapbox.com";
  const api_key = "pk.eyJ1IjoicGF3YW5rb2xoZSIsImEiOiJja2FvOHA5bjUxMWpoMnlxbWpuMWp1eXBzIn0.jmqnKgg0IatByN8Rwi5rwQ";
  const url = `${base_url}/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${api_key}&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if(error) {
      callback('Unable to connect to location services.', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try another search.', undefined);
    } else {
      callback(undefined, {
        location: body.features[0].place_name,
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0]
      });
    }
  });
};

module.exports = geocode;