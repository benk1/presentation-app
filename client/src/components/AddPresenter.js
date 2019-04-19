import React, { Component } from "react";
import axios from "axios";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
//import { Link } from "react-router-dom";
//import { BrowserRouter } from 'react-router-dom';

class AddPresenter extends Component {
  state = {
    presentername: "",
    evaluatorname: "",
    topic: "",
    articleurl: "",
    presentationdat: "",
    textarea: "",
    
    newObj: []
    
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  

  handleSubmit = e => {
    e.preventDefault();
    //console.log('natuma hii  req',this.state);
    
    axios
      .post("/presenters", this.state)
      .then(response => {
       
        //const rst = [response.data, ...this.state]
        //console.log('my result',rst)
        this.setState({
          newObj: response.data
          
         })
        
        
        console.log('my response',this.state.newObj);
        this.props.history.push("/presenters");
        
      }).catch(err => 
        
        console.log(err));
        
  };

  

  render() {
    //console.log("This state is:", this.state);
    return (
      <Form onSubmit={this.handleSubmit} method="POST">
        <div className="form-container">
          <h3 style={{ marginTop: "40px" }} className="addpresenter">
            Add New Presenter
          </h3>

          <div className="first-row">
            <FormGroup>
              <Label htmlFor="presenterName">Presenter Name:</Label>
              <Input
                type="text"
                name="presentername"
                value={this.state.presentername}
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="evaluatorName">Evaluator Name:</Label>
              <Input
                type="text"
                name="evaluatorname"
                ref="evaluatorname"
                value={this.state.evaluatorname}
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="presentation">Presentation Topic:</Label>
              <Input
                type="text"
                name="topic"
                ref="topic"
                value={this.state.topic}
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="articleUri">Article URI:</Label>
              <Input
                type="url"
                name="articleurl"
                ref="articleurl"
                value={this.state.articleurl}
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="presentationDate">Presentation Date:</Label>
              <Input
                type="date"
                name="presentationdat"
                ref="presentationdat"
                value={this.state.presentationdat}
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="keywords">Key Words:</Label>
              <Input
                type="text"
                name="keyWords"
                ref="keyWords"
                value={this.state.keyWords}
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label for="exampleText">Text Area</Label>
              <Input
                type="textarea"
                value={this.state.value}
                onChange={this.handleChange}
                rows="10"
                cols="30"
                name="message"
                placeholder="Write  Summary!"
              />
            </FormGroup>

            <Button> Add Presenter</Button>
          </div>
        </div>
      </Form>
    );
  }
}

export default AddPresenter;
