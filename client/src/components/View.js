import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import { getPresenter, savePresenter } from '../services/presenterService';

class View extends Component {
	state = {
		presenter: null,
	};

	async componentDidMount() {
		let id = this.props.match.params.id;
		//const { data: presenter } = await getPresenter(id);
		const { data: presenter } = await axios.get('/presenters/' + id);

		this.setState({
			presenter,
		});
		console.log('IN VIEW', presenter);
	}

	handleDelete = () => {
		this.props.history.push('/presenters');
	};

	render() {
		const { presenter } = this.state;
		console.log('My state is', presenter);

		const PresenterResults = presenter ? (
			<div className="presenter">
				<h3 style={{ color: '#333' }}>Presentation Details</h3>
				<div>Presenter: {presenter.presenterName}</div>
				<div>EvaluatorName: {presenter.evaluatorName}</div>
				<div>Topic: {presenter.topic}</div>
				<div>ArticleUrl: {presenter.articleUrl}</div>
				<div>Date: {moment(presenter.presentationDate).calendar()}</div>
				<div>Summary: {presenter.textarea}</div>
				<div>
					<NavLink
						className="btn btn-primary"
						style={{
							textDecoration: 'none',
							fontSize: '20px',
							color: 'white',
							marginBottom: '20px',
						}}
						to="/presenters/"
					>
						Go Back to presentations
					</NavLink>
				</div>
			</div>
		) : (
			<div>Presenters Loading...</div>
		);
		return <div>{PresenterResults}</div>;
	}
}

export default View;
