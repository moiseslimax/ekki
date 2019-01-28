const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validadeAddContact(data) {
    let errors = {};

    //if dont come anything in object return empty string for valide
    data.email = !isEmpty(data.email) ? data.email : '';

    if (Validator.isEmpty(data.email)){
        errors.erro = 'Você precisa digitar o Email';
    }

    if (!Validator.isEmail(data.email)){
        errors.erro = 'Email é invalido';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}