const User = require('../db').model('User');
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/signup', (req, res) => {
    let reqUser = req.body.user;

    User.create({
        email : reqUser.email,
        password : bcrypt.hashSync(reqUser.password, 10)
    })
    .then(user => {
        let token = jwt.sign({ id : user.id }, process.env.secret, { expiresIn : 60 * 60 * 24 });
        res.status(200).json({ user : user, token : token });
    })
    .catch(err => res.status(500).json(err.message));
});

router.post('/signin', (req, res) => {
    let reqUser = req.body.user;

    User.findOne({ where : { email : reqUser.email }})
        .then(user => {
            if( user ) {
                bcrypt.compare(reqUser.password, user.password, (err, matches) => {
                    if( matches ) {
                        let token = jwt.sign({ id : user.id }, process.env.secret, { expiresIn : 60 * 60 * 24 });
                        res.status(200).json({ user : user, token : token });
                    } else {
                        res.status(501).json('Failed to authenticate');
                    }
                })
            } else {
                res.status(501).json('Failed to authenticate');
            }
        })
        .catch(err => res.status(500).json(err));
});

module.exports = router;