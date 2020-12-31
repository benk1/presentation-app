import React, { Component } from 'react';
import Form from './common/Form';
import Joi from 'joi-browser';
import axios from 'axios';
class AddPresentation extends Form {
	state = {
		data: {
			presenterName: '',
			evaluatorName: '',
			topic: '',
			articleUrl: '',
			presentationDate: '',
			textarea: '',
		},
		presenters: [],
		errors: {},
	};

	schema = {
		presenterName: Joi.string()
			.required()
			.label('Presenter Name'),
		evaluatorName: Joi.string()
			.required()
			.label('Evaluator Name'),
		topic: Joi.string()
			.required()
			.label('Presentation Topic'),
		articleUrl: Joi.string()
			.required()
			.label('Article URI'),
		presentationDate: Joi.string()
			.required()
			.label('Presentation Date'),
		textarea: Joi.string()
			.required()
			.label('Summary'),
	};

	// handleAdd = async () => {
	// 	try {
	// 		const { data: presenter } = await axios.post(
	// 			'/presenters',
	// 			this.state.data
	// 		);
	// 		const presenters = [...this.props.getPresentersFromServer, presenter];
	// 		this.setState({ presenters });
	// 	} catch (error) {
	// 		console.log('Something went wrong to add', error);
	// 	}
	// };

	doSubmit = () => {
		console.log('submitted');
		//call the server
		this.props.onAdd(this.state.data);
		// axios
		// 	.post('/presenters', this.state.data)
		// 	.then((response) => {
		// 		this.setState({ newObj: response.data.data });
		// 		console.log('my created response', this.state.newObj);
		// 	})
		// 	.catch((err) => console.log(err));
		this.props.history.push('/presenters');
	};
	render() {
		return (
			<div>
				<h1>Add New Presentation</h1>

				<form onSubmit={this.handleSubmit}>
					{this.renderInput(
						'presenterName',
						'Presenter Name',
						'text',
						'Presenter Name'
					)}
					{this.renderInput(
						'evaluatorName',
						'Evaluator Name',
						'text',
						'Evaluator Name'
					)}
					{this.renderInput(
						'topic',
						'Presentation Topic',
						'text',
						'Presentation Topic'
					)}
					{this.renderInput('articleUrl', 'Article URI', 'url', 'Article URI')}
					{this.renderInput(
						'presentationDate',
						'Presentation Date',
						'date',
						'Presentation Date'
					)}
					<div>
						{this.renderTextArea(
							'textarea',
							'Write  Summary',
							'text',
							'Write  Summary'
						)}
					</div>

					{this.renderButton('Add Presentation')}
				</form>
			</div>
		);
	}
}

export default AddPresentation;
