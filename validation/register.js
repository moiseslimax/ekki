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
        errors.name = 'O nome precisa ter entre 2 e 30 caractéres'
    }

    if (Validator.isEmpty(data.name)){
        errors.name = 'Você precisa digitar o Nome';
    }

    if (Validator.isEmpty(data.email)){
        errors.email = 'Você precisa digitar o Email';
    }

    if (!Validator.isEmail(data.email)){
        errors.email = 'Email é invalido';
    }

    if (Validator.isEmpty(data.password)){
        errors.password = 'Você precisa digitar a Senha';
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30})){
        errors.password = 'Senha deve ter pelo menos 6 caractéres';
    }

    if (Validator.isEmpty(data.password2)){
        errors.password2 = 'Você precisa digitar a Confirmação da Senha';
    }

    if (!Validator.equals(data.password, data.password2)){
        errors.password2 = 'Senhas devem estar iguais';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}