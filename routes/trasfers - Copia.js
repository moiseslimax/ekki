const express = require('express');
const router = express.Router();

const Trasfer = require('../models/Trasfer')
const User = require('../models/User')


// @route POST api/trasfer/normaltrasfer
// @desc  Add creditCard
// @access Privite 
router.post('/normaltrasfer', (req,res) => {
    // MUDAR PARA QUARDAR ID NAS SESSOES E DEPOIS PASSAR NO BODY
    if (req.body.amount == 0) {
        return res.status(404).json({error: 'Você deve digitar um valor'})
    }
    User.findOne( { _id: req.body.sentto })
        .then(userto => {
            if(userto == undefined){
                return res.status(404).json({error: 'não existe usuario para esse id'})
            }else{
                User.findOne( { _id: req.body.userid })
                    .then(user => {
                        if (req.body.amount > user.balance) {
                            if (user.creditcard.length == 0 ) {
                                return res.status(404).json({error: 'Vei tu não tem dinheiro, nem cartão iasdhuihasdah'})
                            } else {
                                Trasfer.find({amount: req.body.amount})
                                .then(trasfer => {
                                    // console.log(trasfer);
                                    if (trasfer.length > 0) {
                                            trasfer.map(tras => {
                                                var diff = Math.abs(new Date(tras.date) - new Date());
                                                console.log(diff)
                                                if (diff <= 120000) {
                                                    return res.status(500).json({error: 'Já foi feita uma trasferencia no mesmo valor por você a menos de 2 minutos'})    
                                                } 
                                            });
                                    
                                        console.log('chegou')   
                                        const creditdif = user.balance - req.body.amount
                                        const creditdebt = Number(creditdif) + Number(user.creditcard[0].debt)
                                        console.log('vai pro cartão de crédito: ', creditdebt)
                                        User.findOneAndUpdate({_id: req.body.userid}, { $set: {creditcard: {debt: creditdebt}}})
                                            .catch(err => res.status(404).json({ err }))
                                              
                                        const newUserBalance = 0;
                                        const newUserToBalance = Number(userto.balance) + Number(req.body.amount);
                                        User.findOneAndUpdate({_id: req.body.userid}, { $set: {balance: newUserBalance}})
                                            .catch(err => res.status(404).json({ err }))
                                        User.findOneAndUpdate({_id: req.body.sentto}, { $set: {balance: newUserToBalance}})
                                            .catch(err => res.status(404).json({ err }))
                                        
                                        
                                        const newTrasfer = new Trasfer({
                                                sentto: userto.name,
                                                sentfrom: user.name,
                                                amount: req.body.amount
                                            });
                                        console.log(newTrasfer);
                                        newTrasfer.save()
                                            .then(trasfer => res.json(trasfer))
                                            .catch( err => console.log(err))
                                        //  upando novo balance no user
                                                              
                                    } else {
                                           
                                        console.log('chegou')   
                                        const creditdif = user.balance - req.body.amount
                                        const creditdebt = Number(creditdif) + Number(user.creditcard[0].debt)
                                        console.log('vai pro cartão de crédito: ', creditdebt)
                                        User.findOneAndUpdate({_id: req.body.userid}, { $set: {creditcard: {debt: creditdebt}}})
                                            .catch(err => res.status(404).json({ err }))
                                              
                                        const newUserBalance = 0;
                                        const newUserToBalance = Number(userto.balance) + Number(req.body.amount);
                                        User.findOneAndUpdate({_id: req.body.userid}, { $set: {balance: newUserBalance}})
                                            .catch(err => res.status(404).json({ err }))
                                        User.findOneAndUpdate({_id: req.body.sentto}, { $set: {balance: newUserToBalance}})
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
                                    } 
                                })
                                
                            }
                        } else {
                            // console.log(creditdebt);    
                            Trasfer.findOne({amount: req.body.amount})
                                .then(trasfer => {
                                    if (trasfer) {
                                        if (trasfer.length > 0) {
                                            trasfer.map(tras => {
                                                var diff = Math.abs(new Date(tras.date) - new Date());
                                                console.log(diff)
                                                if (diff <= 120000) {
                                                    return res.status(500).json({error: 'Já foi feita uma trasferencia no mesmo valor por você a menos de 2 minutos'})    
                                                } 
                                            });
                                        }
                                    } else {
                                           
                                            const newUserBalance = user.balance - req.body.amount;
                                            const newUserToBalance = Number(userto.balance) + Number(req.body.amount);
                                            User.findOneAndUpdate({_id: req.body.userid}, { $set: {balance: newUserBalance}})
                                                .catch(err => res.status(404).json({ err }))
                                            User.findOneAndUpdate({_id: req.body.sentto}, { $set: {balance: newUserToBalance}})
                                                .catch(err => res.status(404).json({ err }))
                                            
                                            const newTrasfer = new Trasfer({
                                                    sentto: userto.name,
                                                    sentfrom: user.name,
                                                    amount: req.body.amount
                                                });
                                                // console.log(newTrasfer);
                                                newTrasfer.save()
                                                    .then(trasfer => res.json(trasfer))
                                                    .catch( err => console.log(err))
                                                //  upando novo balance no user
                                    }
                                })
                                
                        }
                    })

            }
        })
})

module.exports = router;