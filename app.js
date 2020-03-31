require('dotenv').config();

// express
const express = require('express');
const app = express();

// controllers
const user = require('./controllers/usercontroller');

// import db
const sequelize = require('./db');
sequelize.sync(); // {force: true} 
app.use(express.json());

// middleware
// app.use(require('./middleware/headers'));

// routes
app.use('/user', user);

// protected routes

app.listen(process.env.PORT, () => console.log(`app has become self aware on port ${process.env.PORT}`));