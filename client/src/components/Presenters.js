import React, { Component } from 'react';
// import axios from 'axios';
import Presenter from './Presenter';
import { NavLink } from 'react-router-dom';

class Presenters extends Component {
	renderPresenters = () => {
		let presenters = this.props.presenters;
		return presenters.map((presenter, index) => {
			return (
				<Presenter
					key={presenter._id}
					presenter={presenter}
					onView={
						this.props.onView //getPresentersFromServer={this.props.getPresentersFromServer}
					}
					onDelete={
						this.props.onDelete //onDelete={this.handleDelete}
					}
					onEdit={this.props.onEdit}
					//onUpdate={this.props.onUpdate}
					index={index}
				/>
			);
		});
	};

	// handleDelete = async (presenter) => {
	// 	//const originalPresenters = this.state.presenters;
	// 	// const updatedVal = this.props.presenters.filter(
	// 	//    stud => stud._id !== presenter._id

	// 	// );

	// 	await axios.delete(`/presenters/${presenter._id}`).then(
	// 		(response) => this.props.getPresentersFromServer()
	// 		//console.log ('I a m response to delete',response.data);
	// 		// this.setState({
	// 		//   presenters: [
	// 		//     ...this.props.presenters.filter(stud => stud._id !== presenter._id)
	// 		//   ]
	// 		// })
	// 	);
	// };
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
						className="btn btn-primary addPresenter"
						to="/presentation/new"
					>
						Add New Presentation
					</NavLink>
				</div>

				<table className="table">
					<thead>
						<tr>
							<th onClick={() => onSort('presenterName')}>Presenter</th>
							<th onClick={() => onSort('	evaluatorName')}> Evaluator</th>
							<th onClick={() => onSort('topic')}>Topic</th>
							<th onClick={() => onSort('articleUrl')}>Article</th>
							<th onClick={() => onSort('presentationDate')}>Date</th>
						</tr>
					</thead>
					{this.renderPresenters()}
				</table>
				<div />
			</div>
		);
	}
}

export default Presenters;
