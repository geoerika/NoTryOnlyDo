// /client/App.js
import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './Navbar.js';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';

class App extends Component {

  uri = process.env.REACT_APP_API_ENDPOINT;

  // initialize our state
  state = {
    todoList: [],
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null
  };

  componentDidMount() {

    //gets data from the database every 1 secs
    this.getTodos();
    if (!this.intervalIsSet) {
      let interval = setInterval(this.getTodos, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }

  // kill a process in use
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  // fetch data from database
  getTodos = () => {
    fetch('https://notryonlydo.herokuapp.com//api/getData')
      .then((data) => data.json())
      .then((res) => this.setState({ todoList: res.data }));
  };

  //create new record in the database
  postDataToDB = (title, description, status, dueDate) => {

    axios.post(`${this.uri}/api/postData`, {
      title: title,
      description: description,
      status: status,
      dueDate: dueDate
    });
  };

  //delete a task in the database
  deleteDataInDB = (taskId) => {
    axios.delete(`${this.uri}/api/deleteData`, {
      data: {
        _id: taskId,
      },
    });
  };

  //updates the status of a task in the database
  updateStatusInDB = (taskId) => {
    axios.put(`${this.uri}/api/updateDataStatus`, {
      _id: taskId,
      update: { status: 'Done' }
    });
  };

  render() {
    let { todoList } = this.state;
    return (
      <div>
        <Navbar/>
        <div style={{height: '10px'}}></div>
        <div className='container'>
          <div className='row'>
            <div className='col col-md-4'>
              <AddTask postDataToDB={this.postDataToDB}/>
            </div>
            <div className='col col-md-4'>
              <h5 className='text-center font-weight-bold'>Pending Tasks</h5>
              <TaskList tasks={todoList} status='Pending'
                        deleteDataInDB={this.deleteDataInDB}
                        updateStatusInDB={this.updateStatusInDB}/>
            </div>
            <div className='col col-md-4'>
              <h5 className='text-center font-weight-bold'>Completed Tasks</h5>
              <TaskList tasks={todoList} status='Done'
                        deleteDataInDB={this.deleteDataInDB}
                        updateStatusInDB={this.updateStatusInDB}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
