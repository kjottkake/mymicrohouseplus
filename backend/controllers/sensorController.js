require('dotenv').config();
const express = require('express');
const axios = require('axios');
const DataModel = require('../models/wotSchema');
const router = express.Router();

router.post('/model', async (req, res) => {
  try {
    const { lat, lon } = req.body.location;

    //IMPORTANT, check if lat and lon are provided
    if (!lat || !lon) {
      return res.status(400).json({ message: 'Latitude and longitude are required.' });
    }

    const apiKey = process.env.WEATHER_API_KEY;
    console.log('API Key:', apiKey);
    const currentWeatherApiUrl = `http://api.weatherapi.com/v1/current.json?key=09c7b9d06c7d426a960185107232610&q=${lat},${lon}&aqi=no`;
    //const astronomyApiUrl = `http://api.weatherapi.com/v1/astronomy.json?key=09c7b9d06c7d426a960185107232610&q=${lat},${lon}`;
    const forecastApiUrl = `http://api.weatherapi.com/v1/forecast.json?key=09c7b9d06c7d426a960185107232610&q=${lat},${lon}` 

    //promise all returns req from both links
    const [currentWeatherApiResponse, astronomyApiResponse] = await Promise.all([
      axios.get(currentWeatherApiUrl),
      axios.get(astronomyApiUrl),
      axios.get(forecastApiUrl),
    ]);

    const currentWeatherData = currentWeatherApiResponse.data;
    const astronomyData = astronomyApiResponse.data;

    const astroData = astronomyData.astronomy.astro;

    const newData = new DataModel({
      location: {
        name: currentWeatherData.location.name,
        region: currentWeatherData.location.region,
        country: currentWeatherData.location.country,
        lat: currentWeatherData.location.lat,
        lon: currentWeatherData.location.lon,
        tz_id: currentWeatherData.location.tz_id,
        localtime_epoch: currentWeatherData.location.localtime_epoch,
        localtime: currentWeatherData.location.localtime,
      },
      interiorTemperature: req.body.interiorTemperature,
      weather: {
        temperature: currentWeatherData.current.temp_c,
        conditions: currentWeatherData.current.condition.text,
        uvIndex: currentWeatherData.current.uv,
      },
      sunlight: {
        sunrise: astronomyData.astronomy.astro.sunrise,
        sunset: astronomyData.astronomy.astro.sunset,
        strongestLightTime: astronomyData.astronomy.astro.sunrise, 
        weakestLightTime: astronomyData.astronomy.astro.sunset,
      },
    });

    const savedData = await newData.save();
    res.status(201).json(savedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/model', async (req, res) => {
  try {
    const data = await DataModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/model/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid ID format.' });
    }

    const updatedData = await DataModel.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedData) {
      return res.status(404).json({ message: 'Data not found.' });
    }

    res.json(updatedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
/*
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
    const weatherApiUrl = `http://api.weatherapi.com/v1/astronomy.json?key=09c7b9d06c7d426a960185107232610&q=${lat},${lon}&aqi=no`;

    const weatherApiResponse = await axios.get(weatherApiUrl);
    const weatherData = weatherApiResponse.data;

    // Extract astro data from the response
    const astroData = weatherData.current.astro;

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
        sunrise: astroData.current.sunrise,
        sunset: astroData.current.sunset,
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

// PUT route to update data
router.put('/model/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the provided ID is valid
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid ID format.' });
    }

    // Find the data by ID and update it
    const updatedData = await DataModel.findByIdAndUpdate(id, req.body, { new: true });

    // Check if data with the given ID exists
    if (!updatedData) {
      return res.status(404).json({ message: 'Data not found.' });
    }

    res.json(updatedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


module.exports = router;

*/
