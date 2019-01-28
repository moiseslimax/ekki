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
        type: Schema.Types.Decimal128,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now
    }

});

module.exports = Trasfer = mongoose.model('trasfers', TrasferSchema);