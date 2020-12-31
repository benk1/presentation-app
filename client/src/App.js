import React, { Component } from 'react';

import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'font-awesome/css/font-awesome.css';
import _ from 'lodash';

import Presenters from './components/Presenters';
// import AddPresenter from './components/AddPresenter';
import EditPresenter from './components/EditPresenter';
import View from './components/View';
import Header from './components/NavBar';
import Home from './components/pages/Home';
import NotFound from './components/NotFound';
import LogInForm from './components/LogInForm';
import SignUp from './components/SignUp';
import AddPresentation from './components/AddPresentation';
import SearchBox from './components/SearchBox';
import EditPresentation from './components/EditPresentation';
import http from './services/httpService';
import config from './config.json';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

class App extends Component {
	state = {
		presenters: [],
		sortColumn: { path: 'title', order: 'asc' },
		searchQuery: '',
	};

	async componentDidMount() {
		const { data: presenters } = await http.get('/presenters');
		// console.log('INAPP',presenters);
		this.setState({ presenters });
	}

	// componentDidMount() {
	// 	http.get('/presenters').then((response) => {
	// 		console.log('componentDidMount', response.data);

	// 		this.setState({
	// 			presenters: response.data,
	// 		});
	// 	});
	// }

	getPresentersFromServer = () => {
		http.get('/presenters').then((response) => {
			//console.log('RESPONSE', response);

			this.setState({
				presenters: response.data,
			});
		});
	};

	getPresenter = (id) => {
		const { presenters } = this.state;
		let matchedPresenterIndex;
		presenters.forEach((stud, index) => {
			if (stud._id === id) {
				console.log('I am in getPresenter', id);
				matchedPresenterIndex = index;
			}
		});
		const machedStudData = presenters[matchedPresenterIndex];
		return { index: matchedPresenterIndex, data: machedStudData };
	};

	getSinglePresenter = (presenter) => {
		return http
			.get(`/presenters/${presenter._id}`, presenter)
			.then((response) => {
				console.log('Everything is fine', response);
			})
			.catch((ex) => {
				console.log('Not good', ex);
			});
	};

	onEdit = (presenter, index) => {
		try {
			http.put(`/presenters/${presenter._id}`, presenter).then((response) => {
				console.log('I a m responding for edit', response);
				let newStudents = [...this.state.presenters];
				newStudents.splice(index, 1, presenter);

				this.setState({
					presenters: newStudents,
				});
			});
		} catch (error) {
			console.log(error);
		}
	};

	handleUpdate = async (presenter) => {
		try {
			await http.put(`/presenters/${presenter._id}`, presenter);

			const presenters = [...this.state.presenters];

			const index = presenters.findIndex((p) => p._id === presenter._id);

			presenters[index] = { ...presenter };

			this.setState({ presenters });
		} catch (error) {
			console.log('Something went wrong', error);
		}
	};

	savePresenter = (presenter) => {
		if (presenter._id) {
			const body = { ...presenter };
			delete body._id;
			return http.put(`/presenters/${presenter._id}`, body);
		}
		return http.post(`/presenters/`, presenter);
	};
	handleSort = (path) => {
		const sortColumn = { ...this.state.sortColumn };
		if (sortColumn.path === path)
			sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
		else {
			sortColumn.path = path;
			sortColumn.order = 'asc';
		}
		this.setState({ sortColumn: sortColumn });
	};
	handleSearch = (query) => {
		this.setState({
			searchQuery: query,
		});
	};
	handleAdd = async (obj) => {
		const { data: presenter } = await http.post('/presenters', obj);

		const presenters = [...this.state.presenters, presenter];
		this.setState({ presenters });
	};
	handleDelete = async (presenter) => {
		//Optimistic Updates vs Pessimistic Updates
		const originalPresenters = this.state.presenters;

		const presenters = this.state.presenters.filter(
			(p) => p._id !== presenter._id
		);
		this.setState({ presenters });
		try {
			await http.delete(`/presenters/${presenter._id}`);
		} catch (ex) {
			//Expected Error(404: not Found,400: bad request) - CLIENT ERRORS
			//-Display a specific error message
			if (ex.response && ex.response.status === 404)
				toast('This presenter has already been deleted!');

			this.setState({ presenters: originalPresenters });
		}
	};

	render() {
		const { sortColumn, presenters, searchQuery } = this.state;

		const sorted = _.orderBy([sortColumn.path], [sortColumn.order]);
		const filteredPresentersByName = presenters.filter((p) =>
			p.presenterName.toLowerCase().startsWith(searchQuery)
		);
		// const filteredPresentersByName = presenters.filter((p) => {
		// 	return p.presentername.toLowerCase().startsWith(searchQuery);
		// });
		return (
			<Router>
				<main className="container">
					<Header />
					<ToastContainer />
					<SearchBox onChange={this.handleSearch} />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/signup" component={SignUp} />
						<Route path="/login" component={LogInForm} />
						<Route
							path="/presenters/:id"
							render={(props) => (
								<EditPresentation
									{...props}
									onEdit={this.onEdit}
									onUpdate={this.handleUpdate}
									presenters={presenters} //getPresenter={this.getPresenter(props.match.params.id)} //savePresenter={this.savePresenter(props.match.params.id)}
									presenter={this.getPresenter(props.match.params.id)}
								/>
							)}
						/>
						<Route
							path="/presentation/new"
							render={
								(props) => (
									<AddPresentation
										{...props} //presenters={presenters}
										onAdd={this.handleAdd}
									/>
								)
								//getPresentersFromServer={this.getPresentersFromServer}
							}
						/>
						{/* //component=
						{AddPresentation} */}
						<Route
							path="/presenters"
							render={(props) => (
								<Presenters
									{...props}
									presenters={filteredPresentersByName}
									onDelete={this.handleDelete}
									sortColumn={sorted}
									onSort={this.handleSort}
									getPresentersFromServer={this.getPresentersFromServer}
								/>
							)}
						/>
						<Route path="/presenter/:id" component={View} />
						render=
						{(props) => (
							<View
								{...props}
								presenter={this.getPresenter(props.match.params.id)}
							/>
						)}
						<Route path="/not-found" component={NotFound} />
						<Redirect from="/" exact to="/presenters" />
						<Redirect to="/not-found" />
					</Switch>
				</main>
			</Router>
		);
	}
}

export default App;
