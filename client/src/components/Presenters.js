import React, { Component } from "react";
import axios from "axios";
import Presenter from "./Presenter";
import { NavLink } from "react-router-dom";

class Presenters extends Component {
  renderpresenters = () => {
    let presenters = this.props.presenters;
    return presenters.map((presenter, index) => {
      return (
        <Presenter
          key={presenter._id}
          presenter={presenter}
          getPresentersFromServer={this.props.getPresentersFromServer}
          onView={this.props.onView}
          onDelete={this.onDelete}
          onEdit={this.props.onEdit}
          index={index}
        />
      );
    });
  };

  onDelete = presenter => {
    //const originalPresenters = this.state.presenters;
    // const updatedVal = this.props.presenters.filter(
    //    stud => stud._id !== presenter._id

    // );

    axios.delete(`/presenters/${presenter._id}`).then(
      response => this.props.getPresentersFromServer()
      //console.log ('I a m response to delete',response.data);
      // this.setState({
      //   presenters: [
      //     ...this.props.presenters.filter(stud => stud._id !== presenter._id)
      //   ]
      // })
    );
  };

  render() {
    if (this.props.presenters.length === 0)
      return <p>There are no Presentations in the database</p>;
    return (
      <div className="form-container">
        <h3 style={{ marginTop: "40px" }} className="addpresenter">
          <b>Presenters</b>
          <div style={{ color: "blue" }}>
            Showing {this.props.presenters.length} Presentations in the database
          </div>
        </h3>

        {/* <div><Link style={{textDecoration: 'none', fontSize: '20px',color:'red'}} to="/presenters/edit" >Edit Presenter</Link></div>*/}

        <table className="table">
          <thead>
            <tr>
              <th>Presenter</th>
              <th> Evaluator</th>
              <th>Topic</th>
              <th>Article</th>
              <th>Date</th>
            </tr>
          </thead>
          {this.renderpresenters()}
        </table>
        <div>
          <NavLink
            style={{
              textDecoration: "none",
              fontSize: "20px",
              color: "blue",
              marginBottom: "20px"
            }}
            to="/presenters/add"
          >
            Add Presenter
          </NavLink>
        </div>
      </div>
    );
  }
}

export default Presenters;
