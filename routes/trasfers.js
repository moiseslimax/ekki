const express = require('express');
const router = express.Router();

const Trasfer = require('../models/Trasfer')
const User = require('../models/User')


router.post('/paycard', (req,res) => {
    User.findOne({_id: req.body.userid})
        .then(response => {
            let balance = parseFloat(response.balance)
            let debt = parseFloat(response.creditcard[0].debt)
            if (balance < debt) {
                res.status(200).json({error: "Saldo menor que divida!"})
            } else if (debt == 0) {
                res.status(200).json({error: "Sem divida de cartão de crédito!"})
            } else {
                let newUserBalance = balance - debt;
                // console.log(newUserBalance);

                User.findOneAndUpdate({_id: req.body.userid}, { $set: {balance: newUserBalance, creditcard: {debt: 0}}})
                .then(user => res.status(200).json({sucess: "Saldo atualizado com sucesso!"}))
                .catch(err => res.status(404).json({ err }))
            }
        })
})

router.post('/validate-trasfer', (req,res) => {
    if (!req.body.email) {
        return res.status(200).json({error: "Você precisa digitar um email!"})
    } else if (!req.body.amount) {
        return res.status(200).json({error: "Você precisa digitar um valor para trasferencia!"})
    } else {
        User.findOne({_id: req.body.userid})
        .then(user => {
                let balance =  parseFloat(user.balance);
                let amount = parseFloat(req.body.amount);
                let found = user.contacts.some(function (el) {
                    return el.email === req.body.email;
                    })
                    console.log(amount, balance);
                if (amount > balance && user.creditcard.length == 0) {
                    return res.status(200).json({error: "Você não tem saldo nem cartão de crédito para este valor, favor criar um cartão!"})
                } else if (amount > balance && user.creditcard.length > 0 ) {
                    return res.status(200).json({alert: "Seu saldo está abaixo do valor de trasferencia, irá usar o saldo do cartão de crédito!"})
                } else {
                    if (found == false) {
                        return res.status(200).json({error: "Você não tem esse email na lista de contatos!"})
                    } else {
                        return res.status(200).json({sucess: "Verificação ok!"})
                    }
                }
               
            })
    }
})


// @route POST api/trasfer/normaltrasfer
// @desc  Add creditCard
// @access Privite 
router.post('/normaltrasfer', (req,res) => {
    // MUDAR PARA QUARDAR ID NAS SESSOES E DEPOIS PASSAR NO BODY
    if (req.body.amount == 0) {
        return res.status(404).json({error: 'Você deve digitar um valor'})
    }
    User.findOne( { email: req.body.sentto })
        .then(userto => {
            if(userto == undefined){
                return res.status(404).json({error: 'não existe usuario para esse email'})
            }else{
                User.findOne( { _id: req.body.userid })
                    .then(user => {
                        console.log(user.creditcard.length)
                        if (req.body.amount > user.balance && user.creditcard.length == 0) {
                                return res.status(404).json({error: 'Vei tu não tem dinheiro, nem cartão iasdhuihasdah'})
                        } else {
                                Trasfer.find({amount: req.body.amount})
                                .then(trasfer => {
                                    // console.log(trasfer);
                                        if(req.body.amount > user.balance){
                                            console.log('mais dinheiro que vc tem')
                                            const newUserBalance = 0;
                                            const rest = user.balance - req.body.amount;
                                            const debt = Number(user.creditcard[0].debt) + Number(rest);
                                            User.findOneAndUpdate({_id: req.body.userid}, { $set: {balance: newUserBalance, creditcard: {debt: Math.abs(debt)}}})
                                                 .catch(err => res.status(404).json({ err }))
                                        } else {
                                            console.log('menos dinheiro que vc tem')
                                            const newUserBalance = user.balance - req.body.amount;
                                            User.findOneAndUpdate({_id: req.body.userid}, { $set: {balance: newUserBalance}})
                                            .catch(err => res.status(404).json({ err }))
                                        }
                                        const newUserToBalance = Number(userto.balance) + Number(req.body.amount);
                                        User.findOneAndUpdate({email: req.body.sentto}, { $set: {balance: newUserToBalance}})
                                            .catch(err => res.status(404).json({ err }))
                                        
                                        const newTrasfer = new Trasfer({
                                                sentto: userto.name,
                                                sentfrom: user.name,
                                                sentfromid: user._id,
                                                amount: req.body.amount
                                            });
                                        console.log(newTrasfer);
                                        newTrasfer.save()
                                            .then(trasfer => res.json(trasfer))
                                            .catch( err => console.log(err))
                                        //  upando novo balance no user                  
                                    })    
                        } 
                        
                    })

            }
        })
})

module.exports = router;