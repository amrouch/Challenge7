const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    const users = JSON.parse(fs.readFileSync('users.json'));
    const user = users.find(user => user.email === email);

    if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }
    bcrypt.compare(password, user.password, (err, result) => {
        if (err || !result) {
            return res.status(401).json({ error: 'Invalid email or password' });
        } else {
            const token = jwt.sign({ email: user.email }, 'your-secret-key', { expiresIn: '1h' });
            return res.json({ message: 'Login successful \n ' + 'token: ' + token });
        }
    });
});

module.exports = router;

