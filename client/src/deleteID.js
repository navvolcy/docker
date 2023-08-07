import React, { Component} from 'react'
import trash from '../src/trash.svg'



class DeleteID extends Component {
    constructor(props){
        super(props);
        this.state = { employee: []};
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    
   async handleSubmit(event){
        event.preventDefault();
        fetch(`/employees/${this.props.rmEmployee}`, { method:'DELETE'})
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
                <button className="delete"  type="submit" value="Submit" onClick={this.handleSubmit}>
                    <img src={trash}  className="trash"/> 
                </button>
            </div>
        )
    }
}

export default DeleteID;