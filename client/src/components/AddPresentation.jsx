import React, { Component } from 'react';
import Form from './common/Form';
import Joi from 'joi-browser';
import axios from 'axios';
class AddPresentation extends Form {
	state = {
		data: {
			presentername: '',
			evaluatorname: '',
			topic: '',
			articleurl: '',
			presentationdat: '',
			textarea: '',
		},
		newObj: [],
		errors: {},
	};

	schema = {
		presentername: Joi.string()
			.required()
			.label('Presenter Name'),
		evaluatorname: Joi.string()
			.required()
			.label('Evaluator Name'),
		topic: Joi.string()
			.required()
			.label('Presentation Topic'),
		articleurl: Joi.string()
			.required()
			.label('Article URI'),
		presentationdat: Joi.string()
			.required()
			.label('Presentation Date'),
		textarea: Joi.string()
			.required()
			.label('Text Area'),
	};

	doSubmit = () => {
		console.log('submitted');
		//call the server
		axios
			.post('/presenters', this.state.data)
			.then((response) => {
				this.setState({ newObj: response.data.data });
				console.log('my response', this.state.newObj);
			})
			.catch((err) => console.log(err));
		this.props.history.push('/presenters');
	};
	render() {
		return (
			<div>
				<h1>Add New Presentation</h1>

				<form onSubmit={this.handleSubmit}>
					{this.renderInput(
						'presentername',
						'Presenter Name',
						'text',
						'Presenter Name'
					)}
					{this.renderInput(
						'evaluatorname',
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
					{this.renderInput('articleurl', 'Article URI', 'url', 'Article URI')}
					{this.renderInput(
						'presentationdat',
						'Presentation Date',
						'date',
						'Presentation Date'
					)}
					<div>
						{this.renderTextArea(
							'textarea',
							'Write  Summary',
							'text',
							'Write  Summary',
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
