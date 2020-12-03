import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import moment from 'moment';

class View extends Component {
	handleDelete = () => {
		this.props.history.push('/presenters');
	};

	render() {
		return (
			<div className="presenter">
				<h3 style={{ color: '#333' }}>Presenter and Presenter Info</h3>
				<div>Presenter: {this.props.presenter.data.presentername}</div>
				<div>Evaluatorname: {this.props.presenter.data.evaluatorname}</div>
				<div>Topic: {this.props.presenter.data.topic}</div>
				<div>ArticleUrl: {this.props.presenter.data.articleurl}</div>
				<div>
					Date: {moment(this.props.presenter.data.presentationdat).calendar()}
				</div>
				<div>
					<NavLink
						style={{
							textDecoration: 'none',
							fontSize: '20px',
							color: 'blue',
							marginBottom: '20px',
						}}
						to="/presenters/"
					>
						Go Back to presentations
					</NavLink>
				</div>
			</div>
		);
	}
}

export default View;
