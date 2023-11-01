require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
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

    const apiKey = '09c7b9d06c7d426a960185107232610';
    console.log('API Key:', apiKey); // Add this line
    
    const forecastApiUrl = `http://api.weatherapi.com/v1/forecast.json?key=09c7b9d06c7d426a960185107232610&q=${lat},${lon}`; 

    const forecastApiResponse = await axios.get(forecastApiUrl);
    const forecastData = forecastApiResponse.data;
    const forecastDay = forecastData.forecast.forecastday[0];

    const newData = new DataModel({
      location: {
        name: forecastData.location.name,
        region: forecastData.location.region,
        country: forecastData.location.country,
        lat: forecastData.location.lat,
        lon: forecastData.location.lon,
        tz_id: forecastData.location.tz_id,
        localtime_epoch: forecastData.location.localtime_epoch,
        localtime: forecastData.location.localtime,
      },
      interiorTemperature: req.body.interiorTemperature,
      weather: {
        temperature: forecastDay.day.avgtemp_c,
        conditions: forecastDay.day.condition.text,
        uvIndex: forecastDay.day.uv,
        sunrise: forecastDay.astro.sunrise,
        sunset: forecastDay.astro.sunset,
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

router.get('/model/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid ID format.' });
    }

    const data = await DataModel.findById(id);

    if (!data) {
      return res.status(404).json({ message: 'Data not found.' });
    }

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

