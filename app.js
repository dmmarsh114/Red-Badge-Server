require('dotenv').config();
const express = require('express')
const app = express();

app.listen(process.env.PORT, () => console.log(`app has become self aware on port ${process.env.PORT}`))