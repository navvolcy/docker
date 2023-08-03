import React,{Component} from 'react'
import EmployeeCard from './employeecard'
class GetAll extends Component {
//1) a get all button.  
//When pressed, it will load all the employees, 
//and display their cards.
    constructor(props){
        super(props);
        this.state= {
            employees:[]
        }
        this.getAll = this.getAll.bind(this);
    }

    getAll() {
        fetch(`/employees`)
        .then((response) => response.json())
        .then(data => {
            this.setState({ employees: data });
        });
    }
        
    render(){
     
       const newEmployeelist = this.state.employees.map(employee => <EmployeeCard key={employee.id} employee={employee}/>)
        
        return(
            <div>
                <form onSubmit={this.getAll}>
                   
                    <p>{newEmployeelist}</p>
                    <button type='submit' value='submit' >GetAll</button>
                </form>
            
            </div>
        )
    }
}

export default GetAll;