import React, {Component} from 'react'
import EmployeeCard from './employeecard'

class EmployeeList extends Component {


  // state = {
  //   employees: []
  

  // //lifecycle method for API calls 
  // componentDidMount() {
  //   fetch('/employees')
  //   .then((response) => response.json())
  //   .then(data => {
  //       this.setState({ employees: data });
  //   });
  // }

  render() {
    return (
        <div>
            {this.props.employees.map(employee => <EmployeeCard key={employee.id} employee={employee} />)} 
        </div>
    )
  }
}

export default EmployeeList;
