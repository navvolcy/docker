import React, {Component} from 'react'
import EmployeeCard from './employeecard'

class EmployeeList extends Component {

  render() {
    return (
        <div>
            {this.props.employees.map(employee => <EmployeeCard key={employee.id} employee1={employee} />)} 
        </div>
    )
  }
}

export default EmployeeList;
