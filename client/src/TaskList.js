import React, {Component} from 'react';
import Task from './Task.js';

// functional component which receives the list of tasks and maps them to Task component for displaying
class TaskList extends Component {

  //orders a list of tasks from older tasks to younger
  orderTodoList= (todoList) => {
    todoList.sort((a,b) => {
      return a.dueDate >= b.dueDate ? 1 : -1;
    });
    return todoList;
  };

  render() {
    let toDoList = [];
    if (this.props.tasks.length > 0) {
      toDoList = this.orderTodoList(this.props.tasks);
      toDoList = toDoList.map(task => (
        <Task key={task._id} task={task} status={this.props.status}
              deleteDataInDB={this.props.deleteDataInDB}
              updateStatusInDB={this.props.updateStatusInDB}/>
      ));
    }

    return (
      <div className='text-center'>
        {this.props.tasks.length <= 0
          ? <h6 className='text-info'>No Tasks!!</h6>
          : <ul>{toDoList}</ul>
        }
      </div>
    );
  }
}

export default TaskList;
