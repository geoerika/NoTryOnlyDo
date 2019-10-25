import React, {Component} from 'react';

class Task extends Component {

  transformDate = date => {
    if (date) {
      return date.toString().split('T')[0];
    } else {
      return date;
    }
  };

  deleteTodo = () => {
    this.props.deleteDataInDB(this.props.task._id);
  };

  updateStatus = () => {
    this.props.updateStatusInDB(this.props.task._id);
  };

  render() {

    let taskItem = null;
    let overdue = '';

    if (this.props.task.dueDate) {
      overdue = (new Date(this.props.task.dueDate)).getTime() - (new Date()).getTime();
    };

    let showDone = 'visible';
    if (this.props.task.status === 'Done') {
      showDone = 'invisible';
    };

    let cardItem = <div className="card-body">
                      <h6 className="card-title font-weight-bold">{this.props.task.title}</h6>
                      <hr/>
                      <p className="card-textarea">{this.props.task.description}</p>
                      <p className="card-text"><small>Due date: {this.transformDate(this.props.task.dueDate)}</small></p>
                      <div className="card-footer bg-transparent">
                        <button type="button" className={`btn btn-primary btn-sm float-left ${showDone}`}
                                              onClick={this.updateStatus}>Done</button>
                        <button type="button" className="btn btn-danger btn-sm float-right"
                                              onClick={this.deleteTodo}>Delete</button>
                      </div>
                    </div>;
    if((this.props.status === 'Pending') && (this.props.task.status === 'Pending')) {
      if(overdue > 0  || !this.props.task.dueDate) {
        taskItem =
          <div>
            <div className='card bg-light mb-3' style={{width: '16rem'}}>
              {cardItem}
            </div>
            <div style={{height: '3px'}}>
            </div>
          </div>
      } else {
        taskItem =
          <div>
            <div className='card bg-warning mb-3' style={{width: '16rem'}}>
             {cardItem}
            </div>
            <div style={{height: '3px'}}>
            </div>
          </div>
      }
    };

    if((this.props.status === 'Done') && (this.props.task.status === 'Done')) {
      taskItem =
        <div>
          <div className='card text-white bg-success mb-3' style={{width: '16rem'}}>
            {cardItem}
          </div>
          <div style={{height: '3px'}}>
          </div>
        </div>
    }

    return taskItem;
  }
}

export default Task;
