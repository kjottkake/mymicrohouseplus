const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  lat: { type: Number, required: true },
  lon: { type: Number, required: true },
});

const weatherSchema = new mongoose.Schema({
  temperature: { type: Number },
});

const dataSchema = new mongoose.Schema(
  {
    location: { type: locationSchema, required: true },
    interiorTemperature: { type: Number },
    weather: { type: weatherSchema },
  },
  { timestamps: true }
);

const DataModel = mongoose.model('Data', dataSchema);

module.exports = DataModel;





/*
const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
      lat: { type: Number, required: true },
      lon: { type: Number, required: true },
    });

    const weatherSchema = new mongoose.Schema({
      //conditions: { type: String, required: true },
     // temperature: { type: Number, required: true },
      conditions: { type: String},
      uvIndex: { type: Number },
     // sunrise: { type: Date },
      //sunset: { type: Date },
      strongestLightTime: { type: Date },
      weakestLightTime: { type: Date },
    });

    
    const sunlightSchema = new mongoose.Schema({
      sunrise: { type: Date, default: new Date() },
      sunset: { type: Date, default: new Date() },
      strongestLightTime: { type: Date, default: new Date() },
      weakestLightTime: { type: Date, default: new Date() },
    });
    
    const dataSchema = new mongoose.Schema({
      location: { type: locationSchema, required: true },
      interiorTemperature: { type: Number },
      weather: { type: weatherSchema, required: true },
      //uv: { type: Number },
      //movement: { type: movementSchema },
      sunlight: { type: sunlightSchema },
    }, { timestamps: true });
    
    const DataModel = mongoose.model('Data', dataSchema);
    
    module.exports = DataModel;

    */