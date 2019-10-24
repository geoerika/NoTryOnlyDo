import React, {Component} from 'react';
import Task from './Task.js';

// functional component which receives the list of tasks and maps them to Task component for displaying
class TaskList extends Component {

  render() {
    let toDoList = [];
    if (this.props.tasks.length > 0) {
      console.log('this.props.tasks: ', this.props.tasks);
      toDoList = this.props.tasks.map(task => (
      <Task key={task._id} task={task} status={this.props.status}/>
      ));
    }
    console.log('toDoList: ', toDoList);

    return (

      <ul>
        {this.props.tasks.length <= 0
          ? 'Nothing to do yet!'
          : toDoList
        }
      </ul>
    );
  }
}

export default TaskList;