import React, { Component } from "react";
import DeleteID from "./deleteID";

class EmployeeCard extends Component {
  render() {
    return (
      <div className="card">
        <img src={this.props.employee1.avatar} alt="Avatar" width="150px" />
        <div className="container">
          <h4>{this.props.employee1.name}</h4>
          <p>{this.props.employee1.title}</p>
        </div>
        <DeleteID
          employeeUpdate={this.props.empUpdate}
          empStatus={this.props.employee1.status}
        ></DeleteID>
      </div>
    );
  }
}

export default EmployeeCard;
