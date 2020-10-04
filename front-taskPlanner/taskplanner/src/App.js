import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import {Todo} from './Todo'
import {AddTask} from './AddTask'


class App extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            tasks: []
      };
    }

  componentDidMount() {
    fetch('https://functiontaskplanner.azurewebsites.net/api/list-tasks?code=j1Bq2S5GXsuhzlaE1s10AaJN5aWQg5x5GaEMKLpMEw8X7KFf/qeaAg==')
        .then(response => response.json())
        .then(data => {
            this.setState({tasks: data.response.tasks});
        });

  }
  

  render() {
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
      return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <AddTask/>
            </Grid>
            <Grid item xs={12}>
                <Box color="primary.main"><h1>List Tasks</h1></Box>
            </Grid>
            {todoList}
        </Grid>
      );
  }
}

export default App;