require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

mongoose.set('strictQuery', false);

app.use(bodyParser.json());

const sensorController = require('./controllers/sensorController');
app.use('/', sensorController);

const userController = require('./controllers/userController');
app.use('/user', userController); 

mongoose.connect('mongodb://127.0.0.1:27017/mymicrohouseplus', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.get('/', (req, res) => {
      res.send('Are you really here? this is some bullshit man');
    });

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    })

    





