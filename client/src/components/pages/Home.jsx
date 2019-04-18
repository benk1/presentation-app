import React from 'react'
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    
    <React.Fragment>
        <h2> Welcome to Presentations Home Page</h2>
        <h3>This is Full Stack Presentation Management  App, it is part of MERN(Mongodb,Express,ReactJs and NodeJs) learning Curve.</h3>
        <h4>Please click the link  below to check out current Presentations in our database</h4>
        <div className="jumbotron text-center">
        <NavLink className="badge badge-primary "  to="/presenters">Check Presentations</NavLink>
        </div>
      
    </React.Fragment>
  )
}

export default Home;
