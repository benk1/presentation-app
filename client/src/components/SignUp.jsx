import React, { Component } from 'react';
import Form from './common/Form';
import Joi from 'joi-browser';
class SignUp extends Form {
	state = {
		data: { username: '', password: '', name: '' },
		errors: {},
	};

	schema = {
		username: Joi.string()
			.required()
			.email()
			.label('Username'),
		password: Joi.string()
			.required()
			.min(5)
			.label('Password'),
		name: Joi.string()
			.required()
			.label('Name'),
	};

	doSubmit = () => {
		console.log('submitted');
		//call the server
	};
	render() {
		return (
			<div>
				<h1>SignUp</h1>

				<form onSubmit={this.handleSubmit}>
					{this.renderInput('username', 'Username', 'text', 'Username')}
					{this.renderInput('password', 'Password', 'password', 'Password')}
					{this.renderInput('name', 'Name', 'text', 'Name')}
					{this.renderButton('SignUp')}
				</form>
			</div>
		);
	}
}

export default SignUp;
