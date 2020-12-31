import React, { Component } from 'react';
import Form from './common/Form';
import Joi from 'joi-browser';
import axios from 'axios';
import { getPresenter, savePresenter } from '../services/presenterService';
const apiEndPoint = '/presenters';
class EditPresentation extends Form {
	state = {
		data: {
			// id: this.props.presenter.data._id,
			presenterName: '', //this.props.presenter.data.presenterName,
			evaluatorName: '', //this.props.presenter.data.evaluatorName,
			topic: '', //this.props.presenter.data.topic,
			articleUrl: '', //this.props.presenter.data.articleUrl,
			presentationDate: '', //this.props.presenter.data.presentationDate,
			textarea: '', //this.props.presenter.data.textarea,
		},
		editPresenter: [],
		errors: {},
	};

	schema = {
		_id: Joi.string(),
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
			.label('Text Area'),
	};
	async populatePresenter() {
		try {
			const presenterId = this.props.match.params.id;
			// if (presenterId === 'new') return;
			console.log('ID', presenterId);

			const { data: presenter } = await getPresenter(presenterId);
			console.log('PRESENTEROBJ', presenter);
			this.setState({ data: this.mapToViewModel(presenter) });
			//console.log('HEI', this.state.data);
		} catch (ex) {
			if (ex.response && ex.response.status === 404) console.log(ex);
			this.props.history.replace('not-found');
		}
	}

	async componentDidMount() {
		await this.populatePresenter();
		console.log('INCDM', this.state.data);
	}

	mapToViewModel = (presenter) => {
		// console.log('INMAPVIEW', presenter);
		return {
			_id: presenter._id,
			presenterName: presenter.presenterName,
			evaluatorName: presenter.evaluatorName,
			topic: presenter.topic,
			articleUrl: presenter.articleUrl,
			presentationDate: presenter.presentationDate,
			textarea: presenter.textarea,
		};
	};
	presenterUrl = (id) => {
		return `${apiEndPoint}/${id}`;
	};

	getPresenter = (presenterId) => {
		return axios.get(this.presenterUrl(presenterId));
	};

	// savePresenter = (presenter) => {
	// 	if (presenter._id) {
	// 		const body = { ...presenter };
	// 		console.log('BODY', body);
	// 		delete body._id;
	// 		return axios.put(`/presenters/${presenter._id}`, body);
	// 	}
	// 	return axios.post(`/presenters/${presenter._id}`, presenter);
	// };

	// getPresenter = (presenterId) => {
	// 	return Axios.get(`/presenters/${presenter._id}`, presenterId);
	// };

	handleEdit = (presenter, index) => {
		axios
			.put(`/presenters/${presenter._id}`, presenter)
			.then((response) => {
				console.log('I a m responding for edit', response.data);
				let newStudents = this.props.presenters;
				newStudents.splice(index, 1, presenter);

				this.setState({ editPresenter: newStudents });
				console.log('I a m responding for edit', this.state.presenters);
			})
			.catch((err) => console.log(err));
		//const updatedVal = this.props.presenters.map((dat,i) => {
	};

	doSubmit = async () => {
		console.log('submitted');
		this.props.onUpdate(this.state.data);
		// this.props.onEdit(this.state.data, this.props.presenter.index);

		//this.handleEdit(this.state.data, this.props.presenter.index);
		// await savePresenter(this.state.data);

		this.props.history.push('/presenters');
	};
	render() {
		// console.log('My PROPS', this.props);
		return (
			<div>
				<h1>Edit Presentation</h1>

				<form onSubmit={this.handleSubmit}>
					{this.renderInput('presenterName', 'Presenter Name', 'text')}
					{this.renderInput('evaluatorName', 'Evaluator Name', 'text')}
					{this.renderInput('topic', 'Presentation Topic', 'text')}
					{this.renderInput('articleUrl', 'Article URI', 'url', 'Article URI')}
					{this.renderInput('presentationDate', 'Presentation Date', 'date')}
					<div>{this.renderTextArea('textarea', 'Write  Summary', 'text')}</div>

					{this.renderButton('Save')}
				</form>
			</div>
		);
	}
}

export default EditPresentation;
