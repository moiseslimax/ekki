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
        type: Number,
        required: false
    },
    creditBalance:{
        type: Number,
        required: false
    },
    creditCard: [
        {
            card: [
                {
                    number: {
                        type: Number,
                        required: true
                    },
                    expiryDate: {
                        type: String,
                        required: true
                    },
                }
            ]
        }
    ],
    contacts: [
        {
            contact:[
                {
                    name: {
                        type: String,
                        required: true
                       },
                    email: {
                        type: String,
                        required: true
                       },       
                }
            ]
        }
    ],
    history: [
        {
            trasfer:[
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
            ]
        }
    ],
    date:{
        type: Date,
        default: Date.now
    }
});


module.exports = User = mongoose.model('users', UserSchema);