import React, { Component } from 'react';
//import PropTypes from 'prop-types'
//import axios from 'axios'
import { NavLink } from 'react-router-dom';
import moment from 'moment';

export class Presenter extends Component {
	handleDelete = (presenter) => {
		this.setState({
			//console.log('clicked', this.props)
			presenters: this.props.onDelete(this.props.presenter),
		});
	};

	render() {
		const {
			presentername,
			evaluatorname,
			topic,
			articleurl,
			presentationdat,
		} = this.props.presenter;
		//console.log(this.props)
		return (
			<tbody>
				<tr>
					<td>{presentername}</td>
					<td>{evaluatorname}</td>
					<td>{topic}</td>
					<td>{articleurl}</td>
					<td>{moment(presentationdat).calendar()}</td>
					<button className="item-view">
						<NavLink to={`/presenter/view/${this.props.presenter._id}`}>
							View
						</NavLink>
					</button>

					<button className="item-edit">
						{' '}
						<NavLink to={`/presenters/edit/${this.props.presenter._id}`}>
							Edit
						</NavLink>
					</button>
					<button className="item-delete" onClick={this.handleDelete}>
						Delete
					</button>
				</tr>
			</tbody>
		);
	}
}

export default Presenter;
