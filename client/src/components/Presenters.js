import React, { Component } from 'react';
import axios from 'axios';
import Presenter from './Presenter';
import { NavLink } from 'react-router-dom';

class Presenters extends Component {
	renderpresenters = () => {
		let presenters = this.props.presenters;
		return presenters.map((presenter, index) => {
			return (
				<Presenter
					key={presenter._id}
					presenter={presenter}
					getPresentersFromServer={this.props.getPresentersFromServer}
					onView={this.props.onView}
					onDelete={this.onDelete}
					onEdit={this.props.onEdit}
					index={index}
				/>
			);
		});
	};

	onDelete = (presenter) => {
		//const originalPresenters = this.state.presenters;
		// const updatedVal = this.props.presenters.filter(
		//    stud => stud._id !== presenter._id

		// );

		axios.delete(`/presenters/${presenter._id}`).then(
			(response) => this.props.getPresentersFromServer()
			//console.log ('I a m response to delete',response.data);
			// this.setState({
			//   presenters: [
			//     ...this.props.presenters.filter(stud => stud._id !== presenter._id)
			//   ]
			// })
		);
	};
	onSort = (path) => {};

	render() {
		const { onSort, presenters } = this.props;
		if (presenters.length === 0)
			return <p>There are no Presentations in the database</p>;
		return (
			<div className="form-container">
				<div className="showNumberOfPresentations">
					<b>Showing {presenters.length} presentations in the database</b>
				</div>
				<div className="addPresenter">
					<NavLink
						style={{ textDecoration: 'none' }}
						className="addPresenter"
						to="/presenters/add"
					>
						Add Presentation
					</NavLink>
				</div>

				<table className="table">
					<thead>
						<tr>
							<th onClick={() => onSort('presentername')}>Presenter</th>
							<th onClick={() => onSort('	evaluatorname')}> Evaluator</th>
							<th onClick={() => onSort('topic')}>Topic</th>
							<th onClick={() => onSort('articleurl')}>Article</th>
							<th onClick={() => onSort('presentationdat')}>Date</th>
						</tr>
					</thead>
					{this.renderpresenters()}
				</table>
				<div />
			</div>
		);
	}
}

export default Presenters;
