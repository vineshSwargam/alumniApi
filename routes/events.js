const express = require("express");
const { check, validationResult } = require('express-validator/check');
const upload = require('../config/multer');
const fs = require('fs');
//Bring in Models
let Event = require('../models/event');

const eventRouter = express.Router(); 

eventRouter.get('/all', (req, res) => {
  Event.find()
    .populate('author')
    .then(events => res.json(events))
    .catch(err => res.send(err));
})

eventRouter.get('/:id', (req, res) => {
  Event.findById({ _id: req.params.id })
    .populate('author')
    .then(events => res.json(events))
    .catch(err => res.send(err));
})

eventRouter.delete('/:id', (req, res) => {
  Event.remove({ _id: req.params.id }, err => {
    if(err) {
      console.log(err);
      return;
    }
    res.send(`Event was deleted successfully`);
  });
});

eventRouter.post('/upload', (req, res) => {
  const errors = [];
  upload(req, res, (err) => {

    if (err) console.log(err);

    // if (req.body.title.length <= 3) {
    //   errors.push('Title must be more descriptive');
    // }
    // if (req.body.content.length <= 0) {
    //   errors.push('Body needs more description');
    // }
    if(!req.file) {
      errors.push('Please select a featured image');
    }
    if(errors.length > 0) {
      res.send({ status: 400, errors });
    }
    else {
      const newEvent = {
        author: req.session.userId,
        title: req.body.title || 'title',
        content: req.body.content || 'content',
        date: new Date(),
        hours: 10,
        minutes: 30
      };
      if(req.file) {
        newEvent.image = req.file.filename
      }
      Event.create(newEvent, (err, event) => {
        if (err) return res.json({ err });
        console.log(event);
        res.send({ status: 200, msg: 'Event created successfully' });
      });
    }
  });
});

eventRouter.post('/:id', (req, res) => {
  const errors = [];

  upload(req, res, (err) => {
    if(err){
      errors.push(err);
      return;
    }
    // if(req.body.title.length <= 3) {
    //   errors.push('Title must be more descriptive');
    // }
    // if(req.body.body.length <= 0) {
    //   errors.push('Body needs more description');
    // }
    if(errors.length > 0) {
      res.json({ status: 400, errors });
    }
    else {
      Event.findById(req.params.id).exec((err, event) => {
        if(err) {
          res.json({ err });
          return;
        }
        if(req.file) {
          fs.unlink(`./public/${event.image}`);
          event.image = req.file.filename;
        }
        event.save();
        res.send({ status: 200, msg: 'Event successfully updated' });
      });
    }
  });
})

module.exports = eventRouter;