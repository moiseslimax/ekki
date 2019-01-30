const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validadeRegisterInput(data) {
    let errors = {};

    //if dont come anything in object return empty string for valide
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';


    if(!Validator.isLength(data.name, {min:2, max:30})){
        errors.error = 'O nome precisa ter entre 2 e 30 caractéres'
    }

    if (Validator.isEmpty(data.name)){
        errors.error = 'Você precisa digitar o Nome';
    }

    if (Validator.isEmpty(data.email)){
        errors.error = 'Você precisa digitar o Email';
    }

    if (!Validator.isEmail(data.email)){
        errors.error = 'Email é invalido';
    }

    if (Validator.isEmpty(data.password)){
        errors.error = 'Você precisa digitar a Senha';
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30})){
        errors.error = 'Senha deve ter pelo menos 6 caractéres';
    }

    if (Validator.isEmpty(data.password2)){
        errors.error = 'Você precisa digitar a Confirmação da Senha';
    }

    if (!Validator.equals(data.password, data.password2)){
        errors.error = 'Senhas devem estar iguais';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}