require('dotenv').config();

// express
const express = require('express');
const app = express();

// controllers

// import db
const sequelize = require('./db');
sequelize.sync(); // {force: true} 
app.use(express.json());

// middleware

// routes

// protected routes

app.listen(process.env.PORT, () => console.log(`app has become self aware on port ${process.env.PORT}`));