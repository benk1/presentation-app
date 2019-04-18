import React, {Component} from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
//import axios from 'axios'
//import { Link } from "react-router-dom";
//import { BrowserRouter as Router } from 'react-router-dom';

class EditPresenter extends Component {

  state = {
    _id: this.props.presenter.data._id,
    presentername: this.props.presenter.data.presentername,
    evaluatorname: this.props.presenter.data.evaluatorname,
    topic:this.props.presenter.data.topic,
    articleurl:this.props.presenter.data.articleurl,
    presentationdat: this.props.presenter.data.presentationdat,
    textarea: this.props.presenter.data.textarea
  }




  handleChange = (e) => {
      this.setState({
          [e.target.name]:e.target.value
      })
  }

  handleSubmit = (e) => {
      e.preventDefault();
      this.props.onEdit(this.state, this.props.presenter.index);
      console.log('benweree',this.state)
      this.props.history.push('/presenters');
      
     
  }
  
 
  render () {
    console.log('wewe',this.state._id)

    return (
      
      
      <div className="form">
        
         <Form onSubmit={this.handleSubmit} method="POST">
      
      <div className="form-container">
        <h3 style={{ marginTop: "40px" }} className="addpresenter">
        Edit Presenter
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


          <Button> Update Presenter</Button>
         
           </div>
          </div>
         </Form>

      </div>
    );
  }
}

export default EditPresenter;