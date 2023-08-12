import React, { Component } from "react";

class DeleteID extends Component {
  constructor(props) {
    super(props);
    this.state = { employee: [], status: this.props.empStatus };
    this.handleStatus = this.handleStatus.bind(this);
  }

  async handleStatus() {
    const statusName = !this.state.status;
    this.setState({ status: statusName });
    console.log(this.state.status)

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userStatus: statusName,
        employee: this.props.employee1 || null,
      }),
    };
    await fetch(`/employees/status`, requestOptions);
    //   .then((response) => response.json())
    //   .then((data) => {
    //   });
  }

  render() {
    return (
      <div>
        <button onClick={this.handleStatus}>
          {this.state.status === false ? "Deactivate" : "Activate"}
        </button>
      </div>
    );
  }
}

export default DeleteID;
