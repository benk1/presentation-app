import React, { Component } from 'react';
//import {Link} from 'react-router-dom';
import { NavLink } from "react-router-dom";
    



class View extends Component {
    handleDelete = () => {
        this.props.history.push("/presenters")
    }
 
    render() { 
        console.log(this)
        return ( 
            <div className="presenter">
               <h3 style={{color:'#333'}}>Presenter and Presenter Info</h3>
               <div>Presenter: { ' '} {this.props.presenter.data.presentername}</div>
               <div>evaluatorname:{ ' '}  {this.props.presenter.data.evaluatorname}</div>
               <div>Topic: { ' '} {this.props.presenter.data.topic}</div>
               <div>Article:{ ' '} {this.props.presenter.data.articleurl}</div>
               <div>Date:{ ' '} {this.props.presenter.data.presentationdat}</div>
               <div><NavLink style={{textDecoration: 'none', fontSize: '20px',color:'blue',marginBottom: '20px'}} to="/presenters/" >Go Back to presentations</NavLink></div>
            </div>
         );
    }
}
 
export default View;