import React, { Component } from 'react';
//import axios from 'axios';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
//import axios from 'axios'
//import { Link } from "react-router-dom";
//import { BrowserRouter as Router } from 'react-router-dom';

class EditPresenter extends Component {
	state = {
		_id: this.props.presenter.data._id,
		presenterName: this.props.presenter.data.presenterName,
		evaluatorName: this.props.presenter.data.evaluatorName,
		topic: this.props.presenter.data.topic,
		articleUrl: this.props.presenter.data.articleUrl,
		presentationDate: this.props.presenter.data.presentationDate,
		textarea: this.props.presenter.data.textarea,
	};

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.onEdit(this.state, this.props.presenter.index);
		// this.props.onUpdate(this.state);

		this.props.history.push('/presenters');
	};

	render() {
		// console.log('wewe', this.state._id);

		return (
			<div className="form">
				<Form onSubmit={this.handleSubmit} method="POST">
					<div className="form-container">
						<h3 style={{ marginTop: '40px' }} className="addpresenter">
							Edit Presenter
						</h3>

						<div className="first-row">
							<FormGroup>
								<Label htmlFor="presenterName">Presenter Name:</Label>
								<Input
									type="text"
									name="presenterName"
									value={this.state.presenterName}
									onChange={this.handleChange}
								/>
							</FormGroup>

							<FormGroup>
								<Label htmlFor="evaluatorName">Evaluator Name:</Label>
								<Input
									type="text"
									name="evaluatorName"
									ref="evaluatorName"
									value={this.state.evaluatorName}
									onChange={this.handleChange}
								/>
							</FormGroup>

							<FormGroup>
								<Label htmlFor="topic">Presentation Topic:</Label>
								<Input
									type="text"
									name="topic"
									ref="topic"
									value={this.state.topic}
									onChange={this.handleChange}
								/>
							</FormGroup>

							<FormGroup>
								<Label htmlFor="articleUrl">Article URI:</Label>
								<Input
									type="url"
									name="articleUrl"
									ref="articleUrl"
									value={this.state.articleUrl}
									onChange={this.handleChange}
								/>
							</FormGroup>

							<FormGroup>
								<Label htmlFor="presentationDate">Presentation Date:</Label>
								<Input
									type="date"
									name="presentationDate"
									ref="presentationDate"
									value={this.state.presentationDate}
									onChange={this.handleChange}
								/>
							</FormGroup>

							{/* <FormGroup>
								<Label htmlFor="keywords">Key Words:</Label>
								<Input
									type="text"
									name="keyWords"
									ref="keyWords"
									value={this.state.keyWords}
									onChange={this.handleChange}
								/>
							</FormGroup> */}

							<FormGroup>
								<Label for="exampleText">Text Area</Label>
								<Input
									type="textarea"
									value={this.state.textarea}
									onChange={this.handleChange}
									rows="10"
									cols="30"
									name="textarea"
									placeholder="Write  Summary!"
								/>
							</FormGroup>

							<Button> Update Presenter</Button>
						</div>
					</div>
				</Form>
			</div>
		);
	}
}

export default EditPresenter;
