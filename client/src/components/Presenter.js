//import React, { Component } from 'react';
//import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import React from 'react';

const Presenter = ({ presenter, onDelete }) => {
	return (
		<tbody>
			<tr>
				<td>{presenter.presenterName}</td>
				<td>{presenter.evaluatorName}</td>
				<td>{presenter.topic}</td>
				<td>{presenter.articleUrl}</td>
				<td>
					{moment(presenter.presentationDate)
						.utcOffset('800')
						.calendar()}
				</td>

				<button className="item-view">
					<NavLink to={`/presenter/${presenter._id}`}>View</NavLink>
				</button>

				<button className="item-edit">
					{' '}
					<NavLink to={`/presenters/${presenter._id}`}>Edit</NavLink>
				</button>
				<button className="item-delete" onClick={() => onDelete(presenter)}>
					Delete
				</button>
			</tr>
		</tbody>
	);
};

export default Presenter;

// class Presenter extends Component {
// 	handleDelete = ({ presenter,onDelete }) => {
// 		this.setState({
// 			//console.log('clicked', this.props)
// 			presenters: onDelete(presenter),
// 		});
// 	};

// 	render() {
// 		const {
// 			presentername,
// 			evaluatorname,
// 			topic,
// 			articleurl,
// 			presentationdat,
// 			textarea,
// 		} = this.props.presenter;
// 		//console.log(this.props)
// 		return (
// 			<tbody>
// 				<tr>
// 					<td>{presentername}</td>
// 					<td>{evaluatorname}</td>
// 					<td>{topic}</td>
// 					<td>{articleurl}</td>
// 					<td>{moment(presentationdat).calendar()}</td>

// 					<button className="item-view">
// 						<NavLink to={`/presenter/view/${this.props.presenter._id}`}>
// 							View
// 						</NavLink>
// 					</button>

// 					<button className="item-edit">
// 						{' '}
// 						<NavLink to={`/presenters/edit/${this.props.presenter._id}`}>
// 							Edit
// 						</NavLink>
// 					</button>
// 					<button className="item-delete" onClick={this.handleDelete}>
// 						Delete
// 					</button>
// 				</tr>
// 			</tbody>
// 		);
// 	}
// }

// export default Presenter;
