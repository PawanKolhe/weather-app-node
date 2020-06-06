// Loads environment variables from .env
require('dotenv').config();

const path = require("path");
const express = require("express");
const hbs = require("hbs");

// APIs
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebar engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Pawan Kolhe",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Pawan Kolhe",
    description: "Hi! I'm Pawan Kolhe."
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Pawan Kolhe",
    message: "To get help, contact me at contact@pawankolhe.com",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Address must be provided.'
    });
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, { weather_descriptions, temperature, precip } = {}) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        location,
        forecast: `${weather_descriptions}. It is currently ${temperature}°C. There is ${precip}% chance of rain.`,
        address: req.query.address
      });
    });
  });

});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Pawan Kolhe",
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Pawan Kolhe",
    errorMessage: "Page not found.",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
