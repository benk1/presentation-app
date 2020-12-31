const mongoose = require('mongoose');
//import { Presenter } from '../../client/react-node/src/components/Presenter';
const Joi = require('joi');

const Schema = mongoose.Schema;

const PresenterSchema = new Schema({
	//_id: {type: String},

	presenterName: {
		type: String, //name: Joi.string().min(3).required(),
		required: [true, 'PresenterName field is required'],
	},
	evaluatorName: {
		type: String, //age: Joi.number().required(),
		require: true,
	},

	topic: {
		type: String,
		required: true,
	},

	articleUrl: {
		type: String,
		required: true,
	},

	presentationDate: {
		type: Date,
		default: Date.now,
		required: [true, 'Date is required'],
	},
	textarea: {
		type: String,
	},

	date: {
		type: Date,
		default: Date.now,
		required: [true, 'Date is required'],
	},
});

function validatePresenter(presenter) {
	const schema = {
		presenterName: Joi.string().required(),
		evaluatorName: Joi.string().required(),
		topic: Joi.string().required(),
		articleUrl: Joi.string(),
		presentationDate: Joi.Date().required(),
		textarea: Joi.string(),
		date: Joi.Date(),
	};
	return Joi.validate(presenter, schema);
}
const Presenter = mongoose.model('presenter', PresenterSchema);
module.exports = Presenter;
exports.validate = validatePresenter;
