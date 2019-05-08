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

module.exports = router;