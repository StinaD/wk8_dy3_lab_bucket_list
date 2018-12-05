const express = require('express');
const ObjectId = require('mongodb').ObjectId;

const createRouter = function (collection) {

  const router = express.Router();

  router.get( '/', (req, res) => {
    collection
      .find()
      .toArray()
      .then((docs) => res.json(docs));
  } );

  router.get( '/:id', (req, res) => {
    const id = req.params.id;
    collection
      .findOne({ _id: ObjectId(id) })
      .then((doc) => res.json(doc));
  });

  router.post( '/', (req, res) => {
    const newData = req.body;
    collection
      .insertOne(newData)
      .then( () => collection.find().toArray())
      .then( (docs) => res.json(docs) );
  });

  router.delete('/:id', (req, res) => {
    const id = req.params.id;
    collection
    .deleteOne({_id: ObjectId(id)})
    .then(() => collection.find().toArray())
    .then((docs) => res.json(docs));
  });

  router.put('/:id', (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    collection
    .updateOne({_id: ObjectId(id)}, {$set: updatedData})
    .then(() => collection.find().toArray())
    .then((docs) => res.json(docs));
  })

  return router;
};


module.exports = createRouter;
