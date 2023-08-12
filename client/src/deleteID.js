import React, { Component} from 'react'

class DeleteID extends Component {
    constructor(props){
        super(props);
        this.state = { employee: [],
        status: false
    };
        this.handleDeactivate = this.handleDeactivate.bind(this);
        this.handleActivate = this.handleActivate.bind(this);
        //this.toggleButton = this.toggleButton.bind(this);
           
    }


    /*toggleButton(){
        this.setState({status: !this.state.status})
    }*/
    
   async handleDeactivate(){
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userStatus: !this.state.status})
        };
        fetch(`/employees/${this.props.rmEmployee}`, requestOptions)
        .then((response) => response.json())
        .then(data => {
        this.setState({ employees: data }); 
       
        }); 
    }

    async handleActivate(){
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userStatus: this.state.status})
        };
        fetch(`/employees/${this.props.rmEmployee}`, requestOptions)
        .then((response) => response.json())
        .then(data => {
        this.setState({ employees: data });  
        
        }); 
    }

    render(){


        return(
            <div>                  

                <button onClick={this.state.status === false ?  this.handleDeactivate : this.handleActivate }>
                    {this.state.status === false ? "Deactivate" : "Activate"}
                    
                </button>
              
                
            </div>
        )
    }
}

export default DeleteID;