const express = require("express");
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');

//Bring in Models
let Alumni = require('../models/alumni');

const authRouter = express.Router();

authRouter.post('/signup',
  [check('firstName').isLength({ min: 1 }).withMessage('First Name field is required'),
  check('lastName').isLength({ min: 1 }).withMessage('Last Name field is required'),
  check('email').isLength({ min: 1 }).withMessage('Email field is required'),
  check('username').isLength({ min: 1 }).withMessage('Username field is required'),
  check('password').isLength({ min: 1 }).withMessage('Password field is required'),
  check('confirmPassword').isLength({ min: 1 }).withMessage('Password Confirmation field is required')],
  (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      res.json(errors.mapped());
    }
    else{
      const newAlumi = new Alumni({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        if(err) return err;
        bcrypt.hash(newAlumi.password, salt, (err, hash) => {
          if(err) return err;
          newAlumi.password = hash;
          newAlumi.save().then(alumni => res.json(alumni));
        });
      });
    }
  });

authRouter.post('/login',
  [check('username').isLength({ min: 1 }).withMessage('Username field is required'),
  check('password').isLength({ min: 1 }).withMessage('Password field is required')],
  (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      res.send({ status: 400, errors: errors.mapped() });
    }

    let query = { username: req.body.username };
    Alumni.findOne(query, (err, alumni) => {
      if (err) {
        res.json({ err });
        return;
      }
      if(!alumni) {
        res.status(400).send('NOPE');
        return;
      }
      //match password with hashed password in database. First convert this passowrd to hashe
      bcrypt.compare(req.body.password, alumni.password, (err, isMatch) => {
        if(err) throw err;
        if(isMatch) {
          req.session.userId = alumni._id;
          req.session.username = req.body.username;
          res.json({ session: req.session });
          return;
        }
        res.send({ status: 400, errors: errors.mapped() });
      });
    });
});

module.exports = authRouter;