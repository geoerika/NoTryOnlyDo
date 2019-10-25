// /server/todo.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// this will be our todo data structure
const todoSchema = new Schema(
  {
    title: { type: String, required: 'Title is required'},
    description: String,
    status: { type: String, required: 'Status is required'},
    dueDate: Date
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model('Todo', todoSchema);
