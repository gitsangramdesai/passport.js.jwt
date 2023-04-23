var express = require('express');
var router = express.Router();
var db = require('../models')
var passport = require('passport');
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/signin', async function (req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;

  if (!req.body.email || !req.body.password) {
    res.status(400).send({
      msg: 'Please enter email and password.'
    });
  } else {
    try {
      let user = await db.User.create({
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
      })

      var returnValue = JSON.parse(JSON.stringify(user))
      delete returnValue.password;

      res.status(201).send({
        msg: 'User created successfully',
        data: returnValue
      });

    } catch (exp) {
      console.log("Error", exp)
      res.status(201).send({
        msg: 'Error Occured while creating User:' + exp.toString()
      });
    }

  }


});


// router.post('/login', passport.authenticate('local'),
//   function (req, res) {
//     res.json({ "msg": "login success" })
//   });


router.post("/login", async function (req, res) {
  if (req.body.email && req.body.password) {
    var email = req.body.email
    var password = req.body.password;
  }
  // usually this would be a database call:
  var user = await db.User.findOne({
    where: { email: email }
  })

  if (!user) {
    res.status(401).json({ message: "no such user found" });
  }

  var re = await bcrypt.compare(req.body.password, user.password)
  if (re) {
    var payload = { id: user.id };
    var token = jwt.sign(payload, process.env.SECRET_KEY);
    res.json({ message: "ok", token: token });
  } else {
    res.status(401).json({ message: "passwords did not match" });
  }
});


router.get("/secret", passport.authenticate('jwt', { session: false }), function (req, res) {
  res.json("Success! You can not see this without a token");
});
module.exports = router;
