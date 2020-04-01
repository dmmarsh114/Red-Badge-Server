require('dotenv').config();

// express
const express = require('express');
const app = express();
const db = require('./db');
const headers = require('./middleware/headers');

// controllers
const user = require('./controllers/usercontroller');
const myMemes = require('./controllers/myMemesController');
const feed = require('./controllers/feedController');
const vote = require('./controllers/votingController');

// import db
const db = require('./db')
app.use(express.json());
app.use(headers);

// middleware
// app.use(require('./middleware/headers'));

// routes
app.use('/user', user);
app.use('/feed', feed);
app.use('/mymemes', myMemes);
app.use('/vote', vote);

// protected routes


db.sequelize.sync().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`app has become self aware on port ${process.env.PORT}`);
    });
});