import React, {Component} from 'react';
import moment from "moment";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import {Todo} from './Todo'


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            description: '', 
            nameResponsible: '', 
            emailResponsible: '', 
            status: '', 
            dueDate: moment(),         
            tasks: []
        };
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        console.log("Tasks")
        fetch('https://functiontaskplanner.azurewebsites.net/api/list-tasks?code=j1Bq2S5GXsuhzlaE1s10AaJN5aWQg5x5GaEMKLpMEw8X7KFf/qeaAg==')
            .then(response => response.json())
            .then(data => {
                this.setState({tasks: data.response.tasks});
                console.log(data);
            });
      }
    render(){
        const todoList = this.state.tasks.map((todo, i) => {
            if(todo!= null){
                return (
                <Grid item xs={6}>
                <Paper>
                    <Todo key={i} id={todo.id} description={todo.description} nameResponsible={todo.nameResponsible} emailResponsible={todo.emailResponsible} status={todo.status} dueDate={todo.dueDate}/>
                </Paper>
                </Grid>
                );
            }
        });
        return(
            <Grid container spacing={3}>
            <Grid item xs={12}>
            
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
                    value={this.state.nameResponsible}
                    label="Name"
                    variant="outlined"
                    />
                    </Box>
                    <Box component="span" p={1}>
                    <TextField
                    id="email"
                    onChange={this.handleEmailChange}
                    value={this.state.emailResponsible}
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
            </Grid>
            <Grid item xs={12}>
                <Box color="primary.main"><h1>List Tasks</h1></Box>
            </Grid>
            {todoList}
        </Grid>
        )
    }

    handleDescriptionChange(e) {
        this.setState({
            description: e.target.value
        });
    }

    handleNameChange(e) {
        this.setState({
            nameResponsible: e.target.value
        });
    }
    handleEmailChange(e) {
        this.setState({
            emailResponsible: e.target.value
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
        const newItem = {
            description: this.state.description,
            nameResponsible: this.state.nameResponsible,
            emailResponsible: this.state.emailResponsible,
            status: this.state.status,
            dueDate: this.state.dueDate,

        };
        if (!this.state.description.length || !this.state.nameResponsible.length || !this.state.emailResponsible.length || !this.state.status.length || !this.state.dueDate)
            return;       
        this.setState(prevState => ({
            tasks: prevState.tasks.concat(newItem),
            description: '',
            nameResponsible: '',
            emailResponsible: '',
            status: '',
            dueDate: ''
        }));
        fetch("https://functiontaskplanner.azurewebsites.net/api/add-task?code=K4MbO8/CHs3aJlTBrGEgFsqMePIa0lvAB7/tGCGgceLOAnvWNNViSw==",{
            method: 'post',
            body:JSON.stringify(newItem),
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8'
              }
        })
        .then(function(response) {
            console.log(response)
            if(response.ok) {
                alert('Save!');
                
            }
            
        })

    }

}
export default App;