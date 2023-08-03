import React, { Component} from 'react'


class DeleteID extends Component {
    constructor(props){
        super(props);
        this.state = { value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    handleChange(event) { 
        
        this.setState({value:event.target.value});
             
    }
    
   async handleSubmit(){
        fetch(`/employees/${this.state.value}`, { method:'DELETE'})
        //fetch returns a promise and .then calls the then method onthe promise and passes it the lambda
        //which is everything in the method call, which say when you get a result call this lambda
        //the first then returns a promise and 2nd then handles the first then's return and handles the data
        .then((response) => response.json())
        .then(data => {
        this.setState({ employees: data });    
        });
    }

    render(){

        return(
            <div>
               
               <form onSubmit={this.handleSubmit}>
                    <label htmlFor="usrInput">Id#
                    <input id="usrInput" type="number" className="user"  onChange={this.handleChange} value={this.state.value}/>
                    </label>
                    <button type="submit" value="Submit"> Delete </button>
                </form>
            
            </div>
        )
    }
}

export default DeleteID;