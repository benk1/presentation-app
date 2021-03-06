import React, { Component } from 'react';

import Joi from 'joi-browser';
import Form from './common/Form';
class LogInForm extends Form {
	state = {
		data: { username: '', password: '' },

		errors: {},
	};

	schema = {
		username: Joi.string()
			.required()
			.label('Username'),
		password: Joi.string()
			.required()
			.label('Password'),
	};

	doSubmit = () => {
		console.log('submitted');
		//call the server
	};

	render() {
		return (
			<div>
				<h1>Login</h1>

				<form onSubmit={this.handleSubmit}>
					{this.renderInput('username', 'Username', 'text', 'Username')}
					{this.renderInput('password', 'Password', 'password', 'Password')}
					{this.renderButton('Login')}
				</form>
			</div>
		);
	}
}

export default LogInForm;
