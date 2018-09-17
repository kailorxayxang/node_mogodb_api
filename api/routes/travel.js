const express = require('express');
const router = express.Router();
const Travel = require('../models/travel');
//protection routes
const chekAuth = require('../middleware/check_auth');

router.route('/')
 .get(chekAuth,(req, res, next) => {
   Travel.find({})
     .exec()
     .then(ress => {
       res.status(200).json({
         result:ress
       });
     })
     .catch(err => {
      res.status(500).json({
       message: 'failed ....',
       error:err
      });
     });
 })
 .post(chekAuth,(req, res, next) => {
  const travel = new Travel();
  travel.title = req.body.title;
  travel.place = req.body.place;
  travel.about = req.body.about;
   console.log(travel);
  travel.save()
   .then(result => {
    res.status(200).json({
     message: 'Save Data success',
     result:result
    });
   })
   .catch(err => {
    res.status(500).json({
     message: 'failed ....',
     error:err
    });
   });
 });

router.route('/:id')
 .get(chekAuth,(req, res, next) => {
   Travel.findById({ _id: req.params.id })
     .exec()
     .then(ress => {
       res.status(200).json({
         result:ress
       });
     })
     .catch(err => {
       res.status(500).json({
        message: 'Not found this id',
        error:err 
       }); 
     }); 
 })
  .patch(chekAuth,(req, res, next) => {
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    Travel.update({ _id: req.params.id }, { $set: updateOps })
      .exec()
      .then(ress => {
        res.status(200).json({
          message:'update success'
        })
      })
      .catch(err => {
        res.status(500).json({
          message: 'update failed',
        error:err 
        }); 
      });
 })
  .delete(chekAuth,(req, res, next) => {
    Travel.remove({ _id: req.params.id })
      .exec()
      .then(result => {
        res.status(200).json({
          message: 'delete success'
        });
      })
      .catch(err => {
        res.status(500).json({
          message: 'can not delete',
          error:err
        });
      }); 
 });

module.exports = router;