require('dotenv').config();

// express
const express = require('express');
const app = express();
const headers = require('./middleware/headers');

// controllers
const user = require('./controllers/usercontroller');
const myMemes = require('./controllers/myMemesController');
const feed = require('./controllers/feedController');
const vote = require('./controllers/votingController');
const comment = require('./controllers/commentscontroller');

// import db
const db = require('./db');
app.use(express.json());
app.use(headers);

// middleware
app.use(require('./middleware/headers'));

// routes
app.use('/user', user);
app.use('/feed', feed);

// protected routes
app.use(require('./middleware/validate-session'));
app.use('/mymemes', myMemes);
app.use('/vote', vote);
app.use('/comment', comment)


db.sequelize.sync().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`app has become self aware on port ${process.env.PORT}`);
    });
});