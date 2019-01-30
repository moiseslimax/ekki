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
                    // console.log(amount, balance);
                    if (found == false) {
                        return res.status(200).json({error: "Você não tem esse email na lista de contatos!"})
                    } else  if (amount > balance && user.creditcard.length == 0) {
                        return res.status(200).json({error: "Você não tem saldo nem cartão de crédito para este valor, favor criar um cartão!"})
                    } else if (user) {
                        Trasfer.find({amount: req.body.amount, sentfromid: user._id})
                        .then(trasfer => {
                            // const isTrasfer2m;
                            const isTrasfer2m = trasfer.map(tras => {
                                var diff = Math.abs(new Date(tras.datedb) - new Date());
                                console.log(diff)
                                if (diff <= 120000) {
                                    console.log('ta pra sair', trasfer);
                                    return true
                                } else {
                                    return true
                                }
                            })
                            console.log(isTrasfer2m); 
                            if (isTrasfer2m.includes(true)) {
                                console.log('oie')
                                return res.status(200).json({error: 'Já foi feita uma trasferencia no mesmo valor por você a menos de 2 minutos'})    
                            } else if (amount > balance && user.creditcard.length > 0 ) {
                                return res.status(200).json({alert: "Seu saldo está abaixo do valor de trasferencia, irá usar o saldo do cartão de crédito!"})
                            } else {
                                return res.status(200).json({sucess: "Verificação ok!"})
                            }
                        })
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
                        // console.log(user.creditcard.length)
                        if (req.body.amount > user.balance && user.creditcard.length == 0) {
                                return res.status(404).json({error: 'Vei tu não tem dinheiro, nem cartão iasdhuihasdah'})
                        } else {
                                Trasfer.find({amount: req.body.amount})
                                .then(trasfer => {
                                    // console.log(user.balance);
                                        if(req.body.amount > user.balance && user.balance == 0){
                                            // console.log('0 dinheiro vai apenas pro debt')
                                            const debt = Number(user.creditcard[0].debt) + Number(req.body.amount);
                                            User.findOneAndUpdate({_id: req.body.userid}, { $set: {creditcard: {debt: debt}}})
                                                 .catch(err => res.status(404).json({ err }))
                                        } else if (req.body.amount > user.balance){
                                            // console.log('mais dinheiro que vc tem')
                                            const newUserBalance = 0;
                                            const rest = user.balance - req.body.amount;
                                            const debt = Number(user.creditcard[0].debt) + Number(rest);
                                            User.findOneAndUpdate({_id: req.body.userid}, { $set: {balance: newUserBalance, creditcard: {debt: Math.abs(debt)}}})
                                                 .catch(err => res.status(404).json({ err }))
                                        }  else {
                                            // console.log('menos dinheiro que vc tem')
                                            const newUserBalance = user.balance - req.body.amount;
                                            User.findOneAndUpdate({_id: req.body.userid}, { $set: {balance: newUserBalance}})
                                            .catch(err => res.status(404).json({ err }))
                                        }
                                        const newUserToBalance = Number(userto.balance) + Number(req.body.amount);
                                        User.findOneAndUpdate({email: req.body.sentto}, { $set: {balance: newUserToBalance}})
                                            .catch(err => res.status(404).json({ err }))
                                        
                                        function formattedDate(d = new Date) {
                                            now = new Date();
                                            year = "" + now.getFullYear();
                                            month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
                                            day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
                                            hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
                                            minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
                                            second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
                                            return day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + second;
                                            }

                                        // console.log(formattedDate());

                                        const newTrasfer = new Trasfer({
                                                sentto: userto.name,
                                                sentfrom: user.name,
                                                sentfromid: user._id,
                                                amount: req.body.amount,
                                                date: formattedDate()
                                            });
                                        // console.log(newTrasfer);
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