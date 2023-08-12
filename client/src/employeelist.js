import React, { Component } from "react";
import EmployeeCard from "./employeecard";

class EmployeeList extends Component {
  render() {
    return (
      <div>
        <h1> EmployeeList </h1>
        {this.props.employees.map((employee) => (
          <EmployeeCard
            key={employee.id}
            employee1={employee}
            empUpdate={this.props.updateEmp}
          />
        ))}
      </div>
    );
  }
}

export default EmployeeList;
