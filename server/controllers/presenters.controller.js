const express = require('express');
//import { Presenter } from '../../client/src/components/Presenter';
const presenterRouter = express.Router();
const Presenter = require('../models/presenter');
const { validate } = require('../models/presenter');

//const validateAddPresenterInput = require('../validation/add-representer');
module.exports = {
	showPresenters: showPresenters,
	showSinglePresenter: showSinglePresenter,
	addPresenter: addPresenter,
	editPresenter: editPresenter,
	deletePresenter: deletePresenter,
};

function showPresenters(req, res, next) {
	Presenter.find({}, (err, presenters) => {
		if (err) {
			res.status(404).send('Data was not found');
		}
		res.send(presenters);
	});
}

function showSinglePresenter(req, res, next) {
	const _id = req.params.id;
	Presenter.findById({ _id }, (err, presenter) => {
		console.log(presenter);

		if (err) {
			res.status(404).send('The movie with the given ID was not Found!', err);
		}
		// if (presenter.length < 1) {
		//   res.send("A presenter with that id was not found");
		// }
		res.send(presenter); //.catch(next);
	});
}

function addPresenter(req, res, next) {
	const newPresenter = new Presenter(req.body);
	//console.log("this req-body-data", req.body);
	//or we can use create method which save automatically
	//Presenter.create(req.body).then(()=> {}) .catch(next)//
	/*res.send({
    type: "POST",
    presenterName: req.body.presenterName,
    evaluatorName: req.body.evaluatorName,
    topic: req.body.topic,
    articleUrl: req.body.articleUrl,
    presentationDate: req.body.presentationDate,
   
  });*/
	newPresenter
		.save()
		.then((presenter) => {
			//res.json(presenter);
			console.log(`this presenter is saved in DB ${presenter} `);
			res.send(presenter);
		})
		.catch(next); //(err => console.log ('Error', err));
	//res.send("A new presenter has been added");
}

async function editPresenter(req, res, next) {
	//const { error } = validate(req.body);
	//if (error) return res.status(400).send(error.details[0].message);
	//const _id = req.params.id;
	const presenter = await Presenter.findByIdAndUpdate(
		req.params.id,
		{
			presenterName: req.body.presenterName,
			evaluatorName: req.body.evaluatorName,
			topic: req.body.topic,
			articleUrl: req.body.articleUrl,
			presentationDate: req.body.presentationDate,
			textarea: req.body.textarea,
		},
		{ new: true }
	);

	if (!presenter)
		return res
			.status(404)
			.send('The presenter with the given ID was not found.');
	res.send(presenter).catch(next);
	// Presenter.findOneAndUpdate({ _id }, req.body)
	// 	.then((err, presenter) => {
	// 		res.json(presenter);
	// 		//res.send("A new presenter has been updated");
	// 		//presenter .save();
	// 	})
	// 	.catch(next);
}

function deletePresenter(req, res, next) {
	const _id = req.params.id;
	console.log('deletedObject', _id);
	Presenter.findOneAndDelete({ _id: _id })
		.then((presenter) => {
			res.send(presenter);
		})
		.catch(next);
	//res.send(`A presenter with id ${_id} has been removed.`);
	//res.json(presenter);
}
