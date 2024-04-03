const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const validateToken = require('../middleware');

const router = express.Router();

// Common signup route for both user and admin
router.post('/signup', async (req, res) => {
    try {

        // Create a new user or admin
        await Admin.create({ ...req.body });

        res.status(201).json({ message: `User created successfully` });
    } catch (error) {
        console.error(`Error in signup: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Common login route for both user and admin
router.post('/login', async (req, res) => {
    try {

        const { email, password } = req.body;

        // Find the user or admin by email
        const user = await Admin.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Invalid Email' });
        }

        // Compare the provided password with the hashed password in the database
        console.log('Provided Password (plain):', password);
        console.log('User Password (hashed):', user.password);
        
        const passwordMatch = await bcrypt.compare(password, user.password);
        
        console.log('Password Match:', passwordMatch);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid Password' });
        }



        // Generate a JWT token
        const token = jwt.sign({ userId: user._id, email: user.email }, 'njend293293wsjndIwi09@', {
            expiresIn: '1h', // Set the token expiration time
        });

        res.status(200).json({ token, expiresIn: 3600, user }); // expiresIn is optional but recommended
    } catch (error) {
        console.error(`Error in login: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Common update route for both user and admin
router.post('/update/:email', validateToken, async (req, res) => {
    try {
        const userEmail = req.params.email;
        const { username, email } = req.body;

        // Update user or admin information
        const updatedUser = await Admin.findOneAndUpdate({ email: userEmail }, { username, email }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: `User not found` });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(`Error in updating ${role}: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Common delete route for both user and admin
router.post('/delete/:email', validateToken, async (req, res) => {
    try {
        const userEmail = req.params.email;

        // Delete the user or admin
        const deletedUser = await Admin.findOneAndDelete({ email: userEmail });

        if (!deletedUser) {
            return res.status(404).json({ error: `${role} not found` });
        }

        res.status(200).json({ message: `${role} deleted successfully` });
    } catch (error) {
        console.error(`Error in deleting user: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/verify', async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            res.status(400).json({ error: 'Token is required' });
        }

        jwt.verify(token, 'njend293293wsjndIwi09@')


        res.status(200).json({ message: 'Token is valid' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'Token Invalid or Expired' });

    }
});

module.exports = router;
