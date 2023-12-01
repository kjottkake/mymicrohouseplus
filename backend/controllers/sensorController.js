const express = require('express');
const axios = require('axios');
const DataModel = require('../models/wotSchema');
const router = express.Router();

router.post('/model', async (req, res) => {
  try {
    const forecastApiUrl = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min,rain_sum&forecast_days=14";

    const forecastApiResponse = await axios.get(forecastApiUrl);
    const forecastData = forecastApiResponse.data;

    const newData = new DataModel({
      location: {
        lat: forecastData.latitude,
        lon: forecastData.longitude,
      },
      interiorTemperature: req.body.interiorTemperature,
      weather: {
        temperature: forecastData.hourly.temperature_2m[0], // Adjust this based on the actual structure of the API response
        // Add other weather fields here based on the Open Meteo API response
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

