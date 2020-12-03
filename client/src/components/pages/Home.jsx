import React from 'react';
import { NavLink } from 'react-router-dom';

const Home = () => {
	return (
		<React.Fragment>
			<h2> Welcome to Presentations Application Home Page</h2>
			<h4>
				This is Presentations Management Application, It is designed so that you
				can manage your presentations in an Organisation or school.
				Authenticated user van delete or add presentation ,while a guest user
				can just view presentations before Sign up. Assessment of your
				presentation will be done by evaluator by filling specific form
				requirements in Add presentation form Link..
			</h4>
			<h4>
				Please click the link below to check out current Presentations in our
				database
			</h4>
			<div className="jumbotron text-center">
				<NavLink className="badge badge-primary " to="/presenters">
					Check Presentations
				</NavLink>
			</div>
		</React.Fragment>
	);
};

export default Home;
