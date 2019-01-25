const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const app = express();

// body parser config
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//db config
const db = require('./config/keys').mongoURI;

//connect to mongodb
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('mongodb connected'))
    .catch(err => console.log(err))

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));