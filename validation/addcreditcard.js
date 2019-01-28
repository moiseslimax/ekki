const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validadeAddCreditCard(data) {
    let errors = {};

    //if dont come anything in object return empty string for valide
    data.title = !isEmpty(data.title) ? data.title : '';
    data.number = !isEmpty(data.number) ? data.number : '';
    data.expiryDate = !isEmpty(data.expiryDate) ? data.expiryDate : '';

    if (Validator.isEmpty(data.title)){
        errors.name = 'Você precisa digitar o Titulo do cartão';
    }

    if (Validator.isEmpty(data.number)){
        errors.email = 'Cartão deve ter um numero';
    }

    if (Validator.isEmail(data.expiryDate)){
        errors.email = 'Cartão precisa ter uma data de expiração';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}