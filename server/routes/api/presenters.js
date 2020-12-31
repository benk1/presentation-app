const express = require('express');
const presenterRouter = express.Router();

const {
	showPresenters,
	showSinglePresenter,
	addPresenter,
	editPresenter,
	deletePresenter,
} = require('../../controllers/presenters.controller');

presenterRouter.get('/', (req, res) =>
	res.send('Check /presenters route if there presenter.')
);

presenterRouter.get('/presenters', showPresenters);
presenterRouter.get('/presenters/:id', showSinglePresenter);
presenterRouter.post('/presenters', addPresenter);
presenterRouter.put('/presenters/:id', editPresenter);
presenterRouter.delete('/presenters/:id', deletePresenter);

module.exports = presenterRouter;
