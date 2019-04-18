const express = require("express");
//import { Presenter } from '../../client/src/components/Presenter';
const presenterRouter = express.Router();
const Presenter = require("../models/presenter");

//const validateAddPresenterInput = require('../validation/add-representer');
module.exports = {
  showPresenters: showPresenters,
  showSinglePresenter: showSinglePresenter,
  addPresenter: addPresenter,
  editPresenter: editPresenter,
  deletePresenter: deletePresenter
};

function showPresenters(req, res, next) {
  Presenter.find({}, (err, presenters) => {
    if (err) {
      res.status(404).send("Data was not found");
    }
    res.json(presenters);
  });
}

function showSinglePresenter(req, res, next) {
  const _id = req.params.id;
  Presenter.find({ _id }, (err, presenter) => {
    console.log(presenter);

    if (err) {
      res.status(404).send("An error");
    }
    if (presenter.length < 1) {
      res.send("A presenter with that id was not found");
    }
    res.json(presenter);
  });
}

function addPresenter(req, res, next) {
  const newPresenter = new Presenter(req.body);
  //console.log("this req-body-data", req.body);
  //or we can use create method which save automatically
  //Presenter.create(req.body).then(()=> {}) .catch(next)//
  /*res.send({
    type: "POST",
    presentername: req.body.presentername,
    evaluatorname: req.body.evaluatorname,
    topic: req.body.topic,
    articleurl: req.body.articleurl,
    presentationdat: req.body.presentationdat,
   
  });*/
  newPresenter
    .save()
    .then(presenter => {
      //res.json(presenter);
      console.log(`this presenter is saved in DB ${presenter} `);
      res.send(presenter);
    })
    .catch(next); //(err => console.log ('Error', err));
  //res.send("A new presenter has been added");
}

function editPresenter(req, res, next) {
  const _id = req.params.id;
  Presenter.findOneAndUpdate({ _id}, req.body)
    .then((err, presenter) => {
      res.json(presenter);
      //res.send("A new presenter has been updated");
      //presenter .save();
    })
    .catch(next);
}

function deletePresenter(req, res, next) {
  const _id = req.params.id;
  console.log("deletedObject", _id);
  Presenter.findOneAndDelete({ _id:_id }).then(presenter => {
    res.send(presenter);
  }).catch(next)
    //res.send(`A presenter with id ${_id} has been removed.`);
    //res.json(presenter);
  
}