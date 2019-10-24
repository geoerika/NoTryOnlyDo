import React, {Component} from 'react';

class Task extends Component {

  transformDate = date => {
    return date.toString().split('T')[0];
  };

  render() {
    console.log('this.props: ', this.props);
    let taskItem = null;
    console.log(new Date());
    console.log((new Date()).getTime());
    console.log(new Date(this.props.task.dueDate));
     console.log((new Date(this.props.task.dueDate)).getTime());
    let overdue = (new Date(this.props.task.dueDate)).getTime() - (new Date()).getTime();
    console.log('overdue: ', overdue);
    let cardItem = <div className="card-body">
                    <h5 className="card-title">{this.props.task.title}</h5>
                    <hr/>
                    <p className="card-textarea">{this.props.task.description}</p>
                    <p className="card-text">{this.props.task.status}</p>
                    <p className="card-text">Due date: {this.transformDate(this.props.task.dueDate)}</p>
                    <button type="button" className="btn btn-primary btn-sm">Update</button>
                    <button type="button" className="btn btn-danger btn-sm float-right">Delete</button>
                  </div>
    if((this.props.status === 'Pending') && (this.props.task.status === 'Pending')) {
      if(overdue > 0 ) {
        taskItem =
          <div>
            <div className='card bg-light mb-3' style={{width: '18rem'}}>
              {cardItem}
            </div>
            <div style={{height: '3px'}}>
            </div>
          </div>
      } else {
        taskItem =
          <div>
            <div className='card bg-warning mb-3' style={{width: '18rem'}}>
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
          <div className='card text-white bg-success mb-3' style={{width: '18rem'}}>
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