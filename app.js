require('dotenv').config();

// express
const express = require('express');
const app = express();

// controllers
const user = require('./controllers/usercontroller');
const myMemes = require('./controllers/myMemesController');
const feed = require('./controllers/feedController');
<<<<<<< HEAD
const myMemes = require('./controllers/myMemes');
const vote = require('./controllers/votingController');
=======
>>>>>>> a277fe98b5fe5b5614e425e6ee9731bf79eadb09

// import db
const sequelize = require('./db');
sequelize.sync(); // {force: true} 
app.use(express.json());

// middleware
// app.use(require('./middleware/headers'));

// routes
app.use('/user', user);
app.use('/feed', feed);
app.use('/mymemes', myMemes);
app.use('/vote', vote);

// protected routes

app.listen(process.env.PORT, () => console.log(`app has become self aware on port ${process.env.PORT}`));