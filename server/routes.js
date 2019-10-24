const express = require('express');
const router = express.Router();
const Todo = require('./models/todo');

//fetches data from the database
router.get('/getData', (req, res) => {
  Todo.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});


// adds new data in our database
router.post('/postData', (req, res) => {
  let data = new Todo();

  const { id, title, description, status, dueDate } = req.body;

  if ((!id && id !== 0) || !title) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }

  data.id = id;
  data.title = title;
  data.description = description;
  data.status = status;
  data.dueDate = dueDate;
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

module.exports = router;
