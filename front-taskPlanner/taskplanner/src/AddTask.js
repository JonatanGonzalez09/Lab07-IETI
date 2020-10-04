import React from 'react';
import moment from "moment";
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export class AddTask extends React.Component {

    constructor(props) {
        super(props);
        this.state = {description: '', name: '', email: '', status: '', dueDate: moment()};
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render(){
        return(
            <div>
                <br/>
                <br/>
                <form onSubmit={this.handleSubmit} className="todo-form">
                <Box color="primary.main"><h1>New Tasks</h1></Box>
                <Box component="span" p={1}>
                    <TextField
                    id="description"
                    onChange={this.handleDescriptionChange}
                    value={this.state.description}
                    label="Description"
                    variant="outlined"
                    />
                    </Box>
                    <Box component="span" p={1}>
                    <TextField
                    id="name"
                    onChange={this.handleNameChange}
                    value={this.state.name}
                    label="Name"
                    variant="outlined"
                    />
                    </Box>
                    <Box component="span" p={1}>
                    <TextField
                    id="email"
                    onChange={this.handleEmailChange}
                    value={this.state.email}
                    label="Email"
                    variant="outlined"
                    />
                    </Box>
                    <Box component="span" p={1}>
                    <TextField
                    id="status"
                    onChange={this.handleStatusChange}
                    value={this.state.status}
                    label="Status"
                    variant="outlined"
                    />
                    </Box>
                    <Box component="span"  p={1}>
                    <TextField
                        id="dueDate"
                        label="Due Date"
                        type="Date"
                        variant="outlined"
                        onChange={this.handleDateChange}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    </Box>
                    <Box component="span" display="block" p={1}>
                    <Button variant="contained" color="primary" onClick={this.handleSubmit} >
                    Add 
                    </Button>
                    </Box>
                </form>
            </div>
        )
    }

    handleDescriptionChange(e) {
        this.setState({
            description: e.target.value
        });
    }

    handleNameChange(e) {
        this.setState({
            name: e.target.value
        });
    }
    handleEmailChange(e) {
        this.setState({
            email: e.target.value
        });
    }
    handleStatusChange(e) {
        this.setState({
            status: e.target.value
        });
    }

    handleDateChange(e) {
        this.setState({
            dueDate: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        if (!this.state.description.length || !this.state.name.length || !this.state.email.length || !this.state.status.length || !this.state.dueDate)
            return;

        /* console.log(JSON.parse('{"description":'+ this.state.description+',"nameResponsible":'+ this.state.name+',"emailResponsible":'+ this.state.email+',"status":'+ this.state.status+',"dueDate":'+ this.state.dueDate+' }')) */ 
        var str = '{ "description":"'+this.state.description+'", "nameResponsible":"'+this.state.name+'", "emailResponsible":"'+this.state.email+'", "status":"'+this.state.status+'", "dueDate":"'+this.state.dueDate+'"}';
        console.log(JSON.parse(str));

        fetch('https://functiontaskplanner.azurewebsites.net/api/add-task?code=K4MbO8/CHs3aJlTBrGEgFsqMePIa0lvAB7/tGCGgceLOAnvWNNViSw==', {
            method: 'post',
            body:JSON.parse(str),
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8'
              }
        })
        .then(function(response) {
            console.log(response)
            if(response.ok) {
                alert('Save!');
                window.location.reload(true);
            }
            
        })
        this.setState(prevState => ({
            description: '',
            name: '',
            email: '',
            status: '',
            dueDate: ''
        }));
    }

}