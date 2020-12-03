import React, { Component } from 'react';

import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';

import axios from 'axios';
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
import './App.css';

class App extends Component {
	state = {
		presenters: [],
		sortColumn: { path: 'title', order: 'asc' },
	};

	componentDidMount() {
		axios.get('/presenters').then((response) => {
			console.log('componentDidMount', response.data);
			this.setState({
				presenters: response.data,
			});
		});
	}

	getPresentersFromServer = () => {
		axios.get('/presenters').then((response) => {
			//console.log(response);
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
				//console.log ('I a m getPresenter',id);
				matchedPresenterIndex = index;
			}
		});
		const machedStudData = presenters[matchedPresenterIndex];
		return { index: matchedPresenterIndex, data: machedStudData };
	};

	onEdit = (presenter, index) => {
		axios
			.put(`/presenters/${presenter._id}`, presenter)
			.then((response) => {
				//console.log ('I a m responding for edit',response);
				let newStdents = this.state.presenters;
				newStdents.splice(index, 1, presenter);

				this.setState({
					presenters: newStdents,
				});
				console.log('I a m responding for edit', this.state.presenters);
			})
			.catch((err) => console.log(err));
		//const updatedVal = this.props.presenters.map((dat,i) => {
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

	render() {
		const { sortColumn, presenters } = this.state;
		// console.log('i am presenters', this.state.presenters);
		const sorted = _.orderBy([sortColumn.path], [sortColumn.order]);
		return (
			<Router>
				<main className="container">
					<Header />

					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/signup" component={SignUp} />
						<Route path="/login" component={LogInForm} />
						<Route
							path="/presenters/edit/:id"
							render={(props) => (
								<EditPresenter
									{...props}
									onEdit={this.onEdit}
									presenter={this.getPresenter(props.match.params.id)}
								/>
							)}
						/>

						<Route path="/presentation/add" component={AddPresentation} />
						<Route
							path="/presenters"
							render={(props) => (
								<Presenters
									{...props}
									presenters={presenters}
									sortColumn={sorted}
									onSort={this.handleSort}
									getPresentersFromServer={this.getPresentersFromServer}
								/>
							)}
						/>
						<Route
							path="/presenter/view/:id"
							render={(props) => (
								<View
									{...props}
									presenter={this.getPresenter(props.match.params.id)}
								/>
							)}
						/>
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
