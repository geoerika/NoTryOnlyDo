// /client/App.js
import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './Navbar.js';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';

class App extends Component {
  // initialize our state
  state = {
    todoList: [],
    // id: 0,
    // title: null,
    // description: null,
    // status: 'Pending',
    // dueDate: new Date(),
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
  };

  componentDidMount() {
    this.getTodos();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getTodos, 1500);
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
    fetch('http://localhost:3001/api/getData')
      .then((data) => data.json())
      .then((res) => this.setState({ todoList: res.data }));
  };

  //create new record in the database
  postDataToDB = (title, description, status, dueDate) => {
    // let currentIds = this.state.todolist.map((data) => data.id);
    // let id = 0;
    // while (currentIds.includes(id)) {
    //   ++id;
    // }

    axios.post('http://localhost:3001/api/postData', {
      title: title,
      description: description,
      status: status,
      dueDate: dueDate
    });
  };

  handleChange = date => {
    this.setState({
      dueDate: date
    });
  };

  render() {
    const { todoList } = this.state;
    console.log('todoList: ', todoList);
    return (
      <div>
        <Navbar/>
        <div style={{height: '10px'}}></div>
        <div className="container">
          <div className="row">
            <div className="col col-md-4">
              <AddTask postDataToDB={this.postDataToDB}/>
            </div>
            <div className="col col-md-4">
              <h5 className='text-center'>Pending Tasks</h5>
              <TaskList tasks={todoList} status='Pending'/>
            </div>
            <div className="col col-md-4">
              <h5 className='text-center'>Completed Tasks</h5>
              <TaskList tasks={todoList} status='Done'/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;