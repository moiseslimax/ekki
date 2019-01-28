const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Create schema
const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    balance:{
        type: Schema.Types.Decimal128,
        required: true
    },
    creditbalance:{
        type: Number,
        required: true
    },
    creditcard: [
        {
            title: {
                type: String,
                required: false
            },
            number: {
                type: Number,
                required: false
            },
            //tem que mudar para date
            expiryDate: {
                type: String,
                required: false
            },
            debt:{
                type: Schema.Types.Decimal128,
                required: false
            }
        }
    ],
    contacts: [
        {
            name: {
                type: String,
                required: false
                },
            email: {
                type: String,
                required: false
                },       

        }
    ],
    history: [
        {
            sentFrom: {
                type: String,
                required: true
                },
            sentTo: {
                type: String,
                required: true
                },   
            amount: {
                type: String,
                required: true
                },      
        }
    ],
    date:{
        type: Date,
        default: Date.now
    }
});


module.exports = User = mongoose.model('users', UserSchema);