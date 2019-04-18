import React, { Component } from 'react'
class LogInForm extends Component {
    state = {
      emailAddress: "",
      password: "",
      errors: {}
    }

    validate = () => {
        const errors = {};
        if(this.state.emailAddress.trim() === "")
            errors.emailAddress = "Email Address is Required.";

        if(this.state.password.trim() === "")
            errors.password = "Password is Required.";

            return Object.keys(errors).length === 0  ? null : errors;
        
    };

    handleSubmit = (e) =>{
        e.preventDefault();
        const errors = this.validate();
        console.log(errors)
        this.setState({
            errors: errors || {}
        })
        if(errors) return;
        console.log('submitted')
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() { 
        return ( 
            <div style={{textAlign: 'left'}}>
                <h1 style={{marginTop: '30px'}}>Log In to your Account</h1>

                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                    <label htmlFor="emailAddress">Email Address</label>
                    <input 
                    value={this.state.emailAddress} 
                    onChange={this.handleChange}
                    error={this.state.errors.emailAddress}
                    name="emailAddress"
                    id="emailAddress" 
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    type="email" 
                    className="form-control"/>
                    </div>

                    <div className="form-group">
                    <label htmlFor="password">Password</label>

                    <input 
                    value={this.state.password} 
                    id="password" 
                    placeholder="Password"
                    type="password"
                    name="password"
                    onChange={this.handleChange}
                    error={this.state.errors.password}
                    className="form-control "/>
                    { this.error && <div className="alert alert-danger">{this.error}</div>}
                    </div>
                    <button className="btn btn-primary">LogIn</button>
                </form>
               
            </div>
         );
    }
}
 
export default LogInForm;