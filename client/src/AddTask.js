import React, {Component} from 'react';

//component for form which helps adding new tasks into database
class AddTask extends Component {

  constructor(props) {
    super();
    this.state = this.getInitialState();
    this.postTodo = this.postTodo.bind(this);
  }

  //gets initial state
  getInitialState = () => {
    const initialState = {
      title: '',
      description: '',
      status: 'Pending',
      dueDate: '',
      submitDisabled: true
    };
    return initialState;
  };

  //resets state to initial values so we show empty values in the form after adding a task
  resetState = () => {
    this.setState(this.getInitialState());
  };

  //handles change in the form and records values from the form in the state
  handleChange = (event) => {
    const { target: { name, value } } = event;
    this.setState({ [name]: value });

    //enable Add task button
    if ((name === 'title') && value) {
      this.setState({submitDisabled : false});
    };

    if ((name === 'title') && !value) {
      this.setState({submitDisabled : true});
    };
  };

  //sends data to method in the App component which will send data to the database
  postTodo = (async () => {
    console.log('this.state: ', this.state);
    await this.props.postDataToDB(this.state.title, this.state.description,
                                  this.state.status, this.state.dueDate);
    this.resetState();
  });

  render() {

    return (

      <div>
        <h5 className='font-weight-bold'>Add New Task</h5>
        <hr/>
        <form>
          <div className='form-group'>
            <label>Title</label>
            <input type='text' className='form-control'
                   placeholder='Add title' name='title'
                   value={this.state.title} onChange={this.handleChange}/>
          </div>
          <div className='form-group'>
            <label>Description</label>
            <textarea className='form-control' rows='4'
                      placeholder='Add description' name='description'
                      value={this.state.description} onChange={this.handleChange}/>
          </div>
          <div className='form-group'>
            <label>Status</label>
            <select className='form-control' value={this.state.status}
                    name='status' onChange={this.handleChange}>
              <option>Pending</option>
              <option>Done</option>
            </select>
          </div>
          <div className='form-group'>
            <label>Due Date</label>
            <input type='date' className='form-control'
                   value={this.state.dueDate}
                   name='dueDate' onChange={this.handleChange}/>
          </div>
        </form>
        <button type='submit' className='btn btn-primary'
                disabled={this.state.submitDisabled}
                onClick={this.postTodo}>Add task
        </button>
      </div>
    );
  }
}

export default AddTask;
