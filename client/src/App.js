import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import Route from "react-router-dom/Route";
import axios from "axios";
import "font-awesome/css/font-awesome.css";

import Presenters from "./components/Presenters";
import AddPresenter from "./components/AddPresenter";
import EditPresenter from "./components/EditPresenter";
import View from "./components/View";
import Header from "./components/Header";
import Home from "./components/pages/Home";
import NotFound from "./components/NotFound";
import LogInForm from "./components/LogInForm";
import "./App.css";

class App extends Component {
  state = {
    presenters: []
  };

  componentDidMount() {
    axios.get("/presenters").then(response => {
      //console.log('componentDidMount',response.data);
      this.setState({
        presenters: response.data
      });
    });
  }

  getPresentersFromServer = () => {
    axios.get("/presenters").then(response => {
      console.log(response);
      this.setState({
        presenters: response.data
      });
    });
  };

  getPresenter = id => {
    let matchedPresenterIndex;
    this.state.presenters.forEach((stud, index) => {
      if (stud._id === id) {
        //console.log ('I a m getPresenter',id);
        matchedPresenterIndex = index;
      }
    });
    const machedStudData = this.state.presenters[matchedPresenterIndex];
    return { index: matchedPresenterIndex, data: machedStudData };
  };

  onEdit = (presenter, index) => {
    axios
      .put(`/presenters/${presenter._id}`, presenter)
      .then(response => {
        //console.log ('I a m responding for edit',response);
        let newStdents = this.state.presenters;
        newStdents.splice(index, 1, presenter);

        this.setState({
          presenters: newStdents
        });
        console.log("I a m responding for edit", this.state.presenters);
      })
      .catch(err => console.log(err));
    //const updatedVal = this.props.presenters.map((dat,i) => {
  };

  /*onView = (presenter,index) => {
      //this.props.history.push('/presenter/view/:id');
    axios
    .get(`/presenter/view/${this.props.match.params.id}`)
    //.get (`/presenter/view/${presenter._id}`,presenter)
    .then (response => {
      console.log ('I a m responseOnView',response);
      this.setState({
        presenters: response.data
      });
     
 
   })
   .catch (err => console.log (err));
   const updatedName = this.state.presenters.presentername
   //const updatedView = this.state.presenters.filter(stud => stud._id === presenter._id);
   //this.setState({
   //presenters: updatedView
  //});
   }*/

  render() {
    console.log("i am presenters", this.state.presenters);
    return (
      <Router>
        <div className="container">
          <Header />

          {/*<div className="header">
       <div className="add"><Link style={{textDecoration: 'none', fontSize: '20px',color:'red'}} to="/presenters/add" >Add Presenter</Link></div>
       <div className="presentations"><Link style={{textDecoration: 'none', fontSize: '20px',color:'red'}} to="/presenters" >Presentations</Link></div>
       <div className="home"><Link style={{textDecoration: 'none', fontSize: '20px',color:'red'}} to="/" >Home</Link></div>
         
    </div>*/}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={LogInForm} />
            <Route
              path="/presenters/edit/:id"
              render={props => (
                <EditPresenter
                  {...props}
                  onEdit={this.onEdit}
                  presenter={this.getPresenter(props.match.params.id)}
                />
              )}
            />
            <Route path="/presenters/add" component={AddPresenter} />
            <Route
              path="/presenters"
              render={props => (
                <Presenters
                  {...props}
                  presenters={this.state.presenters}
                  getPresentersFromServer={this.getPresentersFromServer}
                />
              )}
            />
            <Route
              path="/presenter/view/:id"
              render={props => (
                <View
                  {...props}
                  presenter={this.getPresenter(props.match.params.id)}
                />
              )}
            />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
