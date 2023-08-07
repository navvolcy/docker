//import logo from './logo.svg';
import './App.css';
import EmployeeList from './employeelist'
import GetAll from './getall';
import React, {Component} from 'react'
import EmployeeCard from './employeecard';



 class App extends Component {
  constructor(props){
    super(props);

    this.state ={
      employee : [],
      Value:'',
      name: '',
      title: '',
      avatar: ''
    };

    this.handleName = this.handleName.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleAvatar = this.handleAvatar.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
//Add new Employee to list 
  handleClick(e){
    e.preventDefault()
    const requestSave = {
      method: 'POST',
      headers:{'Content-Type': 'application/json'},
      body:JSON.stringify({
         userName: this.state.name,
         userTitle:this.state.title,
         userAvatar: this.state.avatar
      })
    }
    console.log('hello', requestSave)
    fetch('/employees', requestSave)
    
  }
  
handleName(event){
  this.setState({name:event.target.value});
}

handleTitle(event){
  this.setState({title:event.target.value});
}

handleAvatar(event){
  this.setState({avatar:event.target.value});
}

//search button by name API call to server
handleSubmit(e){
  e.preventDefault()
  const requestOption = {
    method:'POST',
    headers:{'Content-Type': 'application/json'}
  }
  
  fetch(`/employees/${this.state.name}`, requestOption)
  .then((response)=>response.json())
  .then(data =>{  
      this.setState({employees:data})
  });
}

  componentDidMount() {
    fetch('/employees') 
    .then((response) => response.json())
    .then(data => {
        this.setState({ employee: data });
    });
  }

  render(){

  return (
    <div className="App">
      <header className="App-header">

        <GetAll></GetAll>

        <form onSubmit={this.handleSubmit}>
            <label>Name: 
              <input type='text' onChange={this.handleName} value={this.state.name}/>
            </label>

            <label>Title: 
              <input type='text' onChange={this.handleTitle} value={this.state.title}/>
            </label>

            <label>Avatar: 
              <input type='text' onChange={this.handleAvatar} value={this.state.avatar}/>
            </label> 
          
            <button type='submit' value='Submit'>Search</button>
          
        </form>
        <button type='submit' value='Submit' onClick={this.handleClick} >New</button>
        <EmployeeList employees={this.state.employee}></EmployeeList>
        
     
        
      </header>
    </div>
  );
  }
}
export default App;