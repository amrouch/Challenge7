const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const fs = require('fs');

router.post('/register', (req, res) => {
    const { email, password } = req.body;

    const users = JSON.parse(fs.readFileSync('users.json'));
    if (users.find(user => user.email === email)) {
        return res.status(400).json({ error: 'Email already exists' });
    }

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({ error: 'Password hashing error' });
        }

        const newUser = { email, password: hash };
        users.push(newUser);
        fs.writeFileSync('users.json', JSON.stringify(users));
        res.status(201).json({ message: 'User registered successfully' });
    });
});

module.exports = router;
