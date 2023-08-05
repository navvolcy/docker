//import logo from './logo.svg';
import './App.css';
import EmployeeList from './employeelist'
import GetAll from './getall';
import React, {Component} from 'react'


 class App extends Component {
  constructor(props){
    super(props);

    this.state ={
      employee : [],
      value: '',
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

  handleClick(){
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

   
/*handlechange(event){
  this.setState({value:event.target.value});
}*/

handleName(event){
  this.setState({name:event.target.value});
}

handleTitle(event){
  this.setState({title:event.target.value});
}

handleAvatar(event){
  this.setState({avatar:event.target.value});
}

handleSubmit(e){
  e.preventDefault()
  const requestOption = {
      method:'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({value: this.state.employee})
  }
  console.log(this.state.value)
  fetch(`/employees/${this.state.name}`, requestOption)
  .then((response)=>response.json())
  .then(data =>{
    if(Object.keys(data).length > 0){
      this.setState({employee: data})
      this.setState({name:data[0].name})
      this.setState({title:data[0].title})
      this.setState({avatar:data[0].avatar}) 
    }
    
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
        <from onSubmit={this.handleSubmit}>
          <label>Name:
            <input type='text' onChange={this.handleName} value={this.state.name}/>
          </label>
          <button>Search</button>
        </from>
        <EmployeeList employees={this.state.employee}></EmployeeList>
        
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
        <button type='submit' value='Submit' onClick={this.handleClick}>Save</button>
     
        
      </header>
    </div>
  );
  }
}
export default App;