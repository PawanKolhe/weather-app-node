![Screenshot](https://github.com/PawanKolhe/weather-app-node/blob/master/screenshot.PNG)

# Weather App

Weather REST API using Express.js and HandlebarsJS as templating engine. 

## Setup

Following APIs are required to run this web app:

- [Weather Stack API](https://weatherstack.com/)
- [Mapbox Geocode API](https://docs.mapbox.com/api/search/#geocoding)

## Instructions

#### Environment Variables
1. Rename `.env.example` to `.env`
2. Place the API keys in `.env` with your own

#### Local Setup
Install dependencies

    npm install
    
Serve project
    
    node src/app
    
---

#### Live Reload

You can install nodemon for live reloading

    npm i -g nodemon
    
Run nodemon

    nodemon src/app -e js,hbs
