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