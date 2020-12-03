import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './Input';
class Form extends Component {
	state = {
		data: {},
		errors: {},
	};

	validate = () => {
		const options = { abortEarly: false };
		const { error } = Joi.validate(this.state.data, this.schema, options);
		// console.log(result);
		// const errors = {};
		// const { data } = this.state;

		// if (data.username.trim() === '')
		// 	errors.username = 'Username is required';

		// if (data.password.trim() === '')
		// 	errors.password = 'Password is required';

		// return Object.keys(errors).length === 0 ? null : errors;
		if (!error) return null;
		const errors = {};
		for (let item of error.details) errors[item.path[0]] = item.message;
		return errors;
	};

	validateProperty = ({ name, value }) => {
		const obj = { [name]: value };
		const schema = { [name]: this.schema[name] };
		const { error } = Joi.validate(obj, schema);
		// if (error) return null;
		// return error.details[0].message;
		return error ? error.details[0].message : null;
		//OPTION SOLUTION WITHOUT JOI
		// if (name === 'username') {
		// 	if (value.trim() === '') return 'Username is required';
		// 	//...
		// }

		// if (name === 'password') {
		// 	if (value.trim() === '') return 'Password is required';
		// 	//...
		// }
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const errors = this.validate();
		console.log(errors);
		this.setState({
			errors: errors || {},
		});
		if (errors) return;
		this.doSubmit();
	};

	handleChange = ({ target: input }) => {
		const errors = { ...this.state.errors };
		const errorMessage = this.validateProperty(input);
		if (errorMessage) errors[input.name] = errorMessage;
		else delete errors[input.name];

		const data = { ...this.state.data };
		data[input.name] = input.value;
		this.setState({
			data,
			errors,
		});
	};

	renderButton(label) {
		return (
			<button disabled={this.validate()} className="btn btn-primary">
				{label}
			</button>
		);
	}

	renderInput(name, label, type = 'text', placeholder) {
		const { data, errors } = this.state;
		return (
			<Input
				name={name}
				type={type}
				value={data[name]}
				label={label}
				/*placeholder={placeholder}*/
				onChange={this.handleChange}
				error={errors[name]}
			/>
		);
	}

	renderTextArea(name, label, type = 'text', placeholder) {
		const { data, errors } = this.state;
		return (
			<textarea
				name={name}
				type={type}
				value={data[name]}
				label={label}
				placeholder={placeholder}
				onChange={this.handleChange}
				error={errors[name]}
			/>
		);
	}
}

export default Form;
