const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');


exports.signup = (req, res, next) =>{
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.mail,
            password: hash
        });
        user.save()
        .then(() => res.status(201).json({message: 'utilisateur cree!'}))
        .catch (error => res.status(500).json({error}));
    })
    .catch(error => res.status(500).json({error}));
};

exports.login = (req, res, next) =>{
    User.findOne({email: req.body.email})
    .then(user => {
        if (user === null){
        res.status(401).json({message: 'Pair identifiant/mot de passe incorrect!'});
        } else {
            bcrypt.compare(req.bbody.password, user.password)
            .then(valid => {
                if (!valid){
                    res.status(401).json({message: 'pair identifiant/mot de passe incorect'});
                }else{
                    res.status(200).json({
                        userId: user._id,
                        toke: jwt.sign(
                            {userId: user._id},
                            'RANDOM_TOKEN_SECRET',
                            {expiresIn: '24h'}
                        )

                    });
                }
            })
            
            .catch(error => {
                res.status(500).json({error});
            })
    
        }
    })
   
   
    .catch(error =>{
        res.status(500).json({error});
    })

};