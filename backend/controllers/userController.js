const express = require('express');
const bcrypt = require('bcrypt');
const UserModel = require('../models/userSchema');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // check if username, email, and password are provided
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Username, email, and password are required.' });
    }

    const existingUser = await UserModel.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already in use.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({ username, email, password: hashedPassword });

    // save the user to the database
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/:username', async (req, res) => {
      try {
        const { username } = req.params;
        if (!username) {
          return res.status(400).json({ message: 'Username is required.' });
        }
        const user = await UserModel.findOne({ username });
        if (!user) {
          return res.status(404).json({ message: 'User not found.' });
        }
    
        //IMPORTANT: check if the password is not included when sending the get request!
        const { password, ...userData } = user.toObject();
        res.json(userData);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });

module.exports = router;

