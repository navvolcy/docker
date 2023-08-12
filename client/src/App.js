import "./App.css";
import EmployeeList from "./employeelist";
import GetAll from "./getall";
import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employee: [],
      Value: "",
      name: "",
      title: "",
      avatar: "",
      status: true,
      showHideForm: false,
      isLoading: true,
    };

    this.handleName = this.handleName.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleAvatar = this.handleAvatar.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.hideElement = this.hideElement.bind(this);
    this.updateList = this.updateList.bind(this);
  }

  async handleClick(e) {
    e.preventDefault();
    const requestSave = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName: this.state.name,
        userTitle: this.state.title,
        userAvatar: this.state.avatar,
      }),
    };
    await fetch("/employees", requestSave);
  }

  handleName(event) {
    this.setState({ name: event.target.value });
  }

  handleTitle(event) {
    this.setState({ title: event.target.value });
  }

  handleAvatar(event) {
    this.setState({ avatar: event.target.value });
  }

  //search button by name API call to server
  async handleSubmit(e) {
    e.preventDefault();
    const requestOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };

    const response = await fetch(
      `/employees/${this.state.name}`,
      requestOption
    );
    this.setState({ employee: await response.json() });
    // .then((response) => response.json())
    // .then((data) => {
    //   this.setState({ employee: data });
    // });
  }

  componentDidMount() {
    fetch(`/employees/${this.state.status}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ employee: data, isLoading: false });
      });
  }

  hideElement(element) {
    switch (element) {
      case "showHideForm":
        this.setState({ showHideForm: !this.state.showHideForm });
        break;
    }
  }

  updateList(updatedEmpList) {
    // this happens asychronously
    this.setState({ employee: updatedEmpList });
  }

  render() {
    const showHideForm = this.state.showHideForm;

    return (
      <div className="App">
        {!this.state.isLoading && (
          <header className="App-header">
            <GetAll
              employee={this.state.employee}
              updateEmployee={this.updateList}
            ></GetAll>

            <form onSubmit={this.handleSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  onChange={this.handleName}
                  value={this.state.name}
                />
              </label>
              <button type="submit" value="Submit">
                Search
              </button>
            </form>

            <table>
              {showHideForm && (
                <>
                  <tr>
                    <td>Name: </td>
                    <td>
                      <input
                        type="text"
                        onChange={this.handleName}
                        value={this.state.name}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Title: </td>
                    <td>
                      <input
                        type="text"
                        onChange={this.handleTitle}
                        value={this.state.title}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Avatar: </td>
                    <td>
                      <input
                        type="text"
                        onChange={this.handleAvatar}
                        value={this.state.avatar}
                      />
                    </td>
                    <td>
                      <button
                        type="submit"
                        value="Submit"
                        onClick={this.handleClick}
                      >
                        Save
                      </button>
                    </td>
                  </tr>
                </>
              )}
              <tr>
                <td>
                  <button onClick={() => this.hideElement("showHideForm")}>
                    New
                  </button>
                </td>
              </tr>
            </table>

            <EmployeeList
              employees={this.state.employee}
              updateEmp={this.updateList}
            ></EmployeeList>
          </header>
        )}
      </div>
    );
  }
}

export default App;
