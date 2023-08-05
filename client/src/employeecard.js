import React, {Component} from 'react'
import DeleteID from './deleteID';

class EmployeeCard extends Component {

  render() {
    return (
        <div className="card">
        
            <img
                src={this.props.employee.avatar}
                alt="Avatar"
                width="150px"
            />
            <div className="container">
                <h4>{this.props.employee.name}</h4>
                <p>{this.props.employee.title}</p>
            </div>
            <DeleteID></DeleteID>
        </div>
    )
  }
}

export default EmployeeCard;