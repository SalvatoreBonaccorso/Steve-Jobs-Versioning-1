var express = require('express');
var router = express.Router();
var User = require('../models/user');

// API list GET
router.get('/', function(req, res) {
    User.find(function(err, users) {
        if (err) return res.status(500).json({error: err});
        res.json(users);
    });
});

// API create POST
router.post('/', [
    check('name').exists(),
    check('surname').exists(),
    check('email').isEmail(),
    check('age').isInt(),
    ],
    function(req, res) {
    const newUser = new User(req.body);
    newUser.save(function(err) {
        if (err) return res.status(500).json({error: err});
        res.status(201).json(newUser);
    });
});

// API show GET/ID 
router.get('/:id', function(req, res) {
    User.findOne({_id: req.params.id}, function(err, user) {
        if (err) return res.status(500).json({error: err});
        if (!user) return res.status(404).json({message: 'Utente non trovato'});
        res.json(user);
    });
});

// API update PUT/ID
router.put('/:id', function(req, res) {
    User.findOne({_id: req.params.id})
        .exec(function(err, user) {
        if (err) return res.status(500).json({error: err});
        if (!user) {
            return res.status(404).json({message: 'Utente non trovato'});
        }
        for (key in req.body) {
            if (req.body.hasOwnProperty(key)) {
                user[key] = req.body[key];
            }
        }
        user.save(function(err) {
            if (err) return res.status(500).json({error: err});
            res.json(user);
        });
    });
});

// API delete DELETE/ID
router.delete('/:id', function(req, res) {
    User.findOne({_id: req.params.id})
    .exec(function(err, user) {
        if (err) return res.status(500).json({error: err});
        if (!user) return res.status(404).json({message: 'Utente non trovato'});
        User.remove({_id: req.params.id}, function(err) {
            if (err) return res.status(500).json({error: err});
            res.json({message: 'Utente eliminato correttamente'});
        });
    });
});

module.exports = router;