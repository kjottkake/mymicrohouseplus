const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    });

const weatherSchema = new mongoose.Schema({
      temperature: {type: Number, required: true},
      humidity: {type: Number, required: true},
      pressure: {type: Number, required: true},
      conditions: {type: String, required: true},
      uvIndex: {type: Number},
      
});

const sunlightSchema = new mongoose.Schema({
      sunrise: { type: Date, required: true },
      sunset: { type: Date, required: true },
      strongestLightTime: { type: Date },
      weakestLightTime: { type: Date },
    });
    
    const movementSchema = new mongoose.Schema({
      earthquake: { type: Boolean },
      landslide: { type: Boolean },
    });
    
    const dataSchema = new mongoose.Schema({
      location: { type: locationSchema, required: true },
      interiorTemperature: { type: Number },
      weather: { type: weatherSchema, required: true },
      uv: { type: Number },
      movement: { type: movementSchema },
      sunlight: { type: sunlightSchema },
    }, { timestamps: true }); // Adds createdAt and updatedAt timestamps
    
    const DataModel = mongoose.model('Data', dataSchema);
    
    module.exports = DataModel;