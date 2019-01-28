const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;
//Create schema
const TrasferSchema = new Schema({
    sentfrom:{
        type: String,
        required: true
    },
    sentto:{
        type: String,
        required: true
    },
    amount:{
        type: String,
        required: true,
    },
    sentfromid:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }

});

module.exports = Trasfer = mongoose.model('trasfers', TrasferSchema);