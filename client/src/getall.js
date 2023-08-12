import React, { Component } from "react";
import EmployeeCard from "./employeecard";
class GetAll extends Component {
  //1) a get all button.
  //When pressed, it will load all the employees,
  //and display their cards.
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      checked: false,
    };
    this.getAll = this.getAll.bind(this);
    this.isChecked = this.isChecked.bind(this);
  }

  isChecked(event) {
    this.setState({ checked: !event.target.value });
  }

  getAll() {
    // when clicked show inactive, when not checked show active
    // when clicked === true -- inactive / when not click == false -> active
    console.log("get all");
    fetch(`/employees/${!this.state.checked}`)
      .then((response) => response.json())
      .then((data) => {
        this.props.updateEmployee(data)
      });
  }

  render() {
    // const activeEmployeelist = this.props.employee.map((employee) => (
    //   <EmployeeCard key={employee.id} employee={employee} />
    // ));

    return (
      <div>
        <h1>Get All</h1>
        <form onSubmit={this.getAll}>
          {/* <p>{activeEmployeelist}</p> */}
          <button type="submit" value="submit">
            Find
          </button>
          <input
            type="checkbox"
            id="checkbox"
            onChange={this.isChecked}
            value={this.state.checked}
          />
        </form>
      </div>
    );
  }
}

export default GetAll;
