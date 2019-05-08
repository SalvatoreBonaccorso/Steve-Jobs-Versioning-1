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

module.exports = router;