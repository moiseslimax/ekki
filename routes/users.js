const express = require('express');
const router = express.Router();

//Validator
const validadeRegisterInput = require('../validation/register')
const validadeAddContact = require('../validation/addcontact')
const validadeAddCreditCard = require('../validation/addcreditcard')

//User model
const User = require('../models/User')

// @route GET api/posts/test
// @desc  get all posts
// @access Public
router.get('/', (req,res) => {
   console.log('teste');
});


// @route GET api/posts/test
// @desc  get all posts
// @access Public
router.post('/getlogin', (req,res) => {
    User.findOne({email: req.body.email})
        .then(user =>{
            if (!user) {
                return res.json({error: 'Email não encontrado'})
            } else if (req.body.password != user.password) {
                return res.json({error: 'Senha incorreta'})
            } else {
                return res.status(200).json({user})
            }   
        })
 })

// @route GET api/users/register
// @desc  Register user
// @access Public
router.post('/register', (req, res) => {
    const { errors, isValid } = validadeRegisterInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email:req.body.email })
        .then(user => {
            if(user){
                //FALTA O BCRYPT
                return res.status(400).json({email: 'email alredy exists'})
            }else{
                if (req.body.balance == 0 || req.body.balance == undefined) {
                    req.body.balance = 500
                }
                if (req.body.creditbalance == undefined) {
                    req.body.creditbalance = 0
                }
                console.log(req.body.balance);
                    const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    balance: req.body.balance,
                    creditbalance: req.body.creditbalance
                });
                console.log(newUser);
                newUser.save()
                .then( user => res.json(user))
                .catch( err => console.log(err))
            }
        })
});

// @route get api/user/:user_id
// @desc  get user
// @access private
router.get('/userdata/:user_id', (req,res) => {
    const errors = {};
    console.log(req.params);
    User.findOne({ _id: req.params.user_id })
        .then(user => {
            if (!user) {
                errors.nouser = 'Não existe perfil para esse usuário';
                res.status(404).json(errors);
            }
            res.json(user)
        })
        .catch(err => res.status(404).json({ user: 'Não existe perfil para esse usuário' }))
})



////////////////////Contact Part////////////////////////////////
// @route POST api/user/addContact
// @desc  Add add Contac
// @access Privite 
router.post('/addcontact', (req,res) => {
    const { errors, isValid } = validadeAddContact(req.body);
    //check validation
    if(!isValid) {
        //Return any errors with 400 status
        return res.json(errors);
    }
    console.log(req.body.email)
    User.findOne({email: req.body.email})
        .then(response => {
            console.log(response);
            if (!response) {
                res.json({ erro: 'Email não existe no nosso banco de dados' })
            } else {
                User.findOne({_id: req.body.userid})
                    .then(user => {
                        const newContact = {
                            email: req.body.email,
                            name: response.name
                        }
                        console.log(user);
                        user.contacts.unshift(newContact);
                        user.save().then(user => res.json(user));
                    })
               
            }
        })
   
    
})

// @route get api/user/contacts
// @desc  get Contacts
// @access Privite 
router.get('/contacts', (req,res) => {
    User.findOne( { _id: req.body.userid })
        .then(user => {
            if (user.contacts.length == 0) {
                return res.status(404).json({ user: 'Esse usuário não tem contatos' });
            } else {
                res.status(200).json(user.contacts)
            }
        })
})

// @route DELETE api/user/deleteContact/:contact_id
// @desc  delete Contact
// @access Privite 
router.delete('/deletecontact/:contact_id', (req,res) => {

     User.findOne( { _id: req.body.userid })
        .then(user => {
            const removeIndex = user.contacts
                .map(item => item.id)
                .indexOf(req.params.contact_id);

            //remove from array
            user.contacts.splice(removeIndex, 1);

            user.save().then(user => res.json(user))
        })
        .catch(err => res.status(404).json(err))
 })
////////////////////END-OFF: Contact Part////////////////////////////////


////////////////////START-OFF: Credit Card Part////////////////////////////////
// @route POST api/user/addcreditCard
// @desc  Add creditCard
// @access Privite 
router.post('/addcreditcard', (req,res) => {
    // console.log(req.body);
    const { errors, isValid } = validadeAddCreditCard(req.body);
    //check validation
    if(!isValid) {
        //Return any errors with 400 status
        return res.status(400).json(errors);
    }
    User.findOne( { _id: req.body.userid })
        .then(user => {
            if (user.creditcard.length > 0) {
                return res.status(500).json({ user: 'Já existe um cartão' });
            }
            // console.log(req.body);
            const newCreditCard = {
                title: req.body.title,
                number: req.body.number,
                expiryDate: req.body.expiryDate,
                debt: 0
            }
        // ad to exp array
        user.creditcard.unshift(newCreditCard);

        user.save().then(user => res.json(user));
        })
})
// @route get api/user/creditcard
// @desc  get creditcard
// @access Privite 
router.get('/creditcard', (req,res) => {

     User.findOne( { _id: req.body.userid })
         .then(user => {
             if (user.creditcard.length == 0) {
                 return res.status(404).json({ user: 'Esse usuário não tem cartões de crédito' });
             } else {
                 res.status(200).json(user.creditcard)
             }
         })
 })
 
 // @route DELETE api/user/deletecreditcard/:contact_id
 // @desc  delete creditcard
 // @access Privite 
 router.delete('/deletecreditcard/:creditcard_id', (req,res) => {

      User.findOne( { _id: req.body.userid })
         .then(user => {
             const removeIndex = user.creditcard
                 .map(item => item.id)
                 .indexOf(req.params.creditcard_id);
 
             //remove from array
             user.creditcard.splice(removeIndex, 1);
 
             user.save().then(user => res.json(user))
         })
         .catch(err => res.status(404).json(err))
  })

////////////////////END-OFF: Credit Card Part////////////////////////////////










module.exports = router;