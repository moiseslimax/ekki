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
        type: String,
        required: true
    },
    creditcard: [
        {
            title: {
                type: String,
                required: false
            },
            number: {
                type: String,
                required: false
            },
            //tem que mudar para date
            expiryDate: {
                type: String,
                required: false
            },
            debt:{
                type: String,
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