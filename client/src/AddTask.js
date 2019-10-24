import React, {Component} from 'react';

class AddTask extends Component {

  constructor(props) {
    super();
    this.state = {
      title: null,
      description: null,
      status: 'Pending',
      dueDate: new Date()
    }
  }

  getTitle = (evt) => {
    this.setState({ title: evt.target.value })
  };

  getDescription= (evt) => {
    this.setState({ description: evt.target.value })
  };

  getStatus = (evt) => {
    this.setState({ status: evt.target.value })
  };

  getDueDate = (evt) => {
    this.setState({ dueDate: evt.target.value })
  };

  render() {

    return (

      <div>
        <h5>Add New Task</h5>
        <hr/>
        <form>
          <div className='form-group'>
            <label>Title</label>
            <input type='text' className='form-control' placeholder='Add title' onChange={this.getTitle}/>
          </div>
          <div className='form-group'>
            <label>Description</label>
            <textarea className='form-control' rows='4' placeholder='Add description' onChange={this.getDescription}/>
          </div>
          <div className="form-group">
            <label>Status</label>
            <select className="form-control" onChange={this.getStatus}>
              <option>Pending</option>
              <option>Done</option>
            </select>
          </div>
          <div className='form-group'>
            <label>Due Date</label>
            <input type='date' className='form-control' onChange={this.getDueDate}/>
          </div>
        </form>
        <button type="submit" className="btn btn-primary" onClick={() => this.props.postDataToDB(this.state.title, this.state.description, this.state.status, this.state.dueDate)}>Add task
        </button>
      </div>
    );
  }
}

export default AddTask;
