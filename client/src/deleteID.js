import React, { Component} from 'react'

class DeleteID extends Component {
    constructor(props){
        super(props);
        this.state = { employee: [],
        status: false
    };
        this.handleStatus = this.handleStatus.bind(this);
    
           
    }


    
   async handleStatus(status){        
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

                <button onClick={this.handleStatus(this.state.status) }>
                    {this.state.status === false ? "Deactivate" : "Activate"}
                    
                </button>
              
                
            </div>
        )
    }
}

export default DeleteID;