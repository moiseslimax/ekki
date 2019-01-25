const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema
const TrasferSchema = new Schema({
    sentFrom:{
        type: String,
        required: true
    },
    sentTo:{
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }

});

module.exports = Trasfer = mongoose.model('trasfers', TrasferSchema);