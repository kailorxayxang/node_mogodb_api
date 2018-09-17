const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//protection post routes
const chekAuth = require('../middleware/check_auth');

const User = require('../models/user');
const config = require('../../config/secret');

router.post('/signup',(req, res, next) => {
 //check user is exist or not
 User.findOne({ email: req.body.email })
  .exec()
  .then(user => {
   if (user) {
    return res.status(409).json({
     message: 'Oops! E-mail address or Username already exist'
    });
   } else {
    const users = new User();
    //encrypt password befor save
    bcrypt.hash(req.body.password, 10, (err, hash) => {
     if (err) {
      return res.status(500).json({
       error: err
      });
     } else {
      users.username = req.body.username;
      users.email = req.body.email;
      users.password = hash;

      users.save()
       .then(ress => {
        res.status(200).json({
         message: 'User signup Successful',
        });
       })
       .catch(err => {
        res.status(500).json({
         message: 'signup failed please try again',
         error: err
        });
       });
     }
    });
   }
  })
  .catch(err => {
   res.status(500).json({
    message: 'Something wrong!!!',
    error: err
   });
  });
});

//login
router.post('/login',(req, res, next) => {
 User.find({ email: req.body.email })
  .exec()
  .then(user => {
   if (user.length<1) {
    return res.status(401).json({
     message:'mail not found, user doesn\'t exist'
    });
   }
   else {
    bcrypt.compare(req.body.password, user[0].password, (err, result) => {
     if (err) {
      return res.status(401).json({
       message:'Login failed'
      });
     }
      if (result) {
        //befor login encode to jwt and sent jwt encode to client side 
        const token = jwt.sign({
          userId: user[0]._id,
          email: user[0].email,
          username: user[0].username
        }, config.jwt_key, {
            expiresIn: "1h"
          });
       return res.status(200).json({
         message: 'Login Successfull',
        token:token
      });
     }
     res.status(401).json({
      message:'Auth failed'
     });
    });
   }
  })
  .catch(err => {
   res.status(500).json({
    error:err
   });
  });
});

//get all user and 
router.route('/user')
 .get(chekAuth,(req, res, next) => {
  User.find({ })
   .exec()
   .then(ress => {
    res.status(200).json({
     users: ress
    });
   })
   .catch(err => {
    res.status(500).json({
     message: 'Not users',
     error: err
    });
   });
 });

 //get one user,update and delete
router.route('/user/:id')
 .get(chekAuth,(req, res, next) => {
  User.findById({ _id: req.params.id })
   .exec()
   .then(ress => {
    res.status(200).json({
     users:ress
    });
   })
   .catch(err => {
    res.status(500).json({
     message: 'Not users',
     error:err
    });
   });
 })
 .patch()
 .delete(chekAuth,(req, res, next) => {
  User.remove({ _id: req.params.id })
   .exec()
   .then(deletes=> {
    res.status(200).json({
     message:'Delete Success'
    });
   })
   .catch(err => {
    res.status(500).json({
     message: 'Can not delete this user',
     error: err
    });
   });
 });
module.exports = router;