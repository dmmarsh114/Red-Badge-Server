require('dotenv').config();

// express
const express = require('express');
const app = express();
db = require('./db')

// controllers
const user = require('./controllers/usercontroller');
const myMemes = require('./controllers/myMemesController');
const feed = require('./controllers/feedController');

// import db
// const sequelize = require('./db');
// sequelize.sync(); // {force: true} 
app.use(express.json());

// middleware
// app.use(require('./middleware/headers'));

// routes
app.use('/user', user);
app.use('/feed', feed);
app.use('/mymemes', myMemes);


// protected routes


db.sequelize.sync().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`app has become self aware on port ${process.env.PORT}`);
    });
});