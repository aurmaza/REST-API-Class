const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');

router.get("/ninjas", function (req, res, next) {
  Ninja.aggregate([
    {
      $geoNear: {
        near: {
          type: "point",
          coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
        },
        spherical: true,
        maxdistance: 100000,
        distanceField: "dist.calulated",
      },
    },
  ])
    .then(function (ninjas) {
      res.send(ninjas);
    })
    .catch(next);
});
//Add a new ninja to the database
router.post('/ninjas', function(req, res, next){
  Ninja.create(req.body).then(function(ninja){
    res.send(ninja);
  }).catch(next);
});

//Update a ninja in the database
router.put('/ninjas/:id', function(req, res, next){
Ninja.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
  Ninja.findOne({_id: req.params.id}).then(function(ninja){

    res.send(ninja);

    });
  });
});

//Delete a ninja from the database
router.delete('/ninjas/:id', function(req, res,next){
  Ninja.findByIdAndRemove({_id: req.params.id}).then(function(ninja){

    res.send(ninja);
  });


});

module.exports = router;
