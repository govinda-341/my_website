const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { users, createUser, findUserByEmail } = require('../models/userModel');

const secret = "mysecretkey"; 

module.exports = {
    signup: async (req, res) => {
        const { username, email, password } = req.body;
        if (!username || !email || !password) return res.status(400).json({ error: 'All fields required' });

        if (findUserByEmail(email)) return res.status(400).json({ error: 'Email already registered' });

        const user = await createUser(username, email, password);
        res.json({ message: 'User created', user: { id: user.id, username: user.username, email: user.email } });
    },

    login: async (req, res) => {
        const { email, password } = req.body;
        const user = findUserByEmail(email);
        if (!user) return res.status(400).json({ error: 'Invalid credentials' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    }
};
