const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validadeAddCreditCard(data) {
    let errors = {};

    //if dont come anything in object return empty string for valide
    data.title = !isEmpty(data.title) ? data.title : '';
    data.number = !isEmpty(data.number) ? data.number : '';
    data.expiryDate = !isEmpty(data.expiryDate) ? data.expiryDate : '';

    if (Validator.isEmpty(data.title)){
        errors.error = 'Você precisa digitar o Titulo do cartão';
    }

    if (Validator.isEmpty(data.number)){
        errors.error = 'Cartão deve ter um numero';
    }

    if (Validator.isEmpty(data.expiryDate)){
        errors.error = 'Cartão precisa ter uma data de expiração';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}