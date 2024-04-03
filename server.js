const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const usersFilePath = path.join(__dirname, 'users.json');

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    // Simple validation
    if (!username || !email || !password) {
        return res.status(400).send('All fields are required.');
    }

    // Check if user already exists
    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
    if (users[username]) {
        return res.status(400).send('User already exists.');
    }

    // Register new user
    users[username] = { email, password }; // Warning: store passwords securely using hashing
    fs.writeFileSync(usersFilePath, JSON.stringify(users));

    res.send('Registration successful.');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));

    if (!users[username] || users[username].password !== password) {
        return res.status(400).send('Invalid credentials.');
    }

    res.send('Login successful.');
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
