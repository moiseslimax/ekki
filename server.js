const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors')


const app = express();

//get routes data
const users = require('./routes/users');
const trasfers = require('./routes/trasfers');

// body parser config
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors())
//db config
const db = require('./config/keys').mongoURI;


//Use routes
app.use('/api/user', users);
app.use('/api/trasfer', trasfers);

//connect to mongodb
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('mongodb connected'))
    .catch(err => console.log(err))

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`))