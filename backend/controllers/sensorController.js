require('dotenv').config();
const express = require('express');
const axios = require('axios');
const DataModel = require('../models/wotSchema');
const router = express.Router();

// POST route to post data
router.post('/model', async (req, res) => {
  try {
    const { lat, lon } = req.body.location;

    //IMPORTANT check if latitude and longitude are provided

    if (!lat || !lon) {
      return res.status(400).json({ message: 'Latitude and longitude are required.' });
    }

    const apiKey = '09c7b9d06c7d426a960185107232610';
    const weatherApiUrl = `http://api.weatherapi.com/v1/current.json?key=09c7b9d06c7d426a960185107232610&q=${lat},${lon}&aqi=no`;

    const weatherApiResponse = await axios.get(weatherApiUrl);
    const weatherData = weatherApiResponse.data;

    const newData = new DataModel({
      location: {
        name: weatherData.location.name,
        region: weatherData.location.region,
        country: weatherData.location.country,
        lat: weatherData.location.lat,
        lon: weatherData.location.lon,
        tz_id: weatherData.location.tz_id,
        localtime_epoch: weatherData.location.localtime_epoch,
        localtime: weatherData.location.localtime,
      },
      interiorTemperature: req.body.interiorTemperature,
      weather: {
        temperature: weatherData.current.temp_c,
        conditions: weatherData.current.condition.text,
        uvIndex: weatherData.current.uv,
        sunrise: weatherData.current.sunrise,
        sunset: weatherData.current.sunset,
      },
    });

    const savedData = await newData.save();
    res.status(201).json(savedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET route to retrieve data
router.get('/model', async (req, res) => {
  try {
    const data = await DataModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;




/*
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const DataModel = require('../models/wotSchema');
const router = express.Router();


//POST route to post data
router.post('/model', async (req, res) => {
  try {
    const { latitude, longitude } = req.body.location;
    const apiKey = ' 09c7b9d06c7d426a960185107232610';
    const weatherApiUrl = `http://api.weatherapi.com/v1/current.json?key=09c7b9d06c7d426a960185107232610&q=Trondheim&aqi=no
    `;
    



    
    const weatherApiResponse = await axios.get(weatherApiUrl);
    const weatherData = weatherApiResponse.data;

    const newData = new DataModel({
      location: req.body.location,
      interiorTemperature: req.body.interiorTemperature,
      weather: {
        temperature: weatherData.main.temp,
        conditions: weatherData.weather[0].main,
        uvIndex: 0, // openweathermap does not seem to provide a uvIndex, another weatherAPI maybe??
        sunrise: new Date(weatherData.sys.sunrise * 1000),
        sunset: new Date(weatherData.sys.sunset * 1000),
        // need strongestLightTime and weakestLightTime as well, but how is that calculated?
      },
    });

  
    const savedData = await newData.save();
    res.status(201).json(savedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// GET route to retrieve data
router.get('/model', async (req, res) => {
  try {
    const data = await DataModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// place for update and delete data as well, need to check that out tomorrow

module.exports = router;
*/