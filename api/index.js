/* nodemon added,everytime i change something in this file it should restart express app*/

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user');
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const salt = bcrypt.genSaltSync(10);
const secret = 'dafuygbasdlufbgn3495ng';

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(cookieParser());

mongoose.connect('mongodb+srv://blog:fpqvgsJSZUWIbFWz@cluster0.zsamjx8.mongodb.net/?retryWrites=true&w=majority')

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await User.create({
            username,
            password: bcrypt.hashSync(password, salt),
        });
        res.json(userDoc);
    } catch (e) {
        res.status(400).json.apply(e);
    }



});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const userDoc = await User.findOne({ username });
    bcrypt.compareSync(password, userDoc.password);
    const passOK = bcrypt.compareSync(password, userDoc.password);
    if (passOK) {
        //logged in
        jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json({
                id: userDoc._id,
                username,
            });
        })

    } else {
        res.status(400).json('wrong credentials');
    }
});


app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err;
        res.json(info);

    })
});

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok');
})

app.listen(4000);