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

  console.log('req.body: ', req.body);

  const { title, description, status, dueDate } = req.body;

  if (!title) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }

  data.title = title;
  data.description = description;
  data.status = status;
  data.dueDate = dueDate;
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

//removes existing data in our database
router.delete('/deleteData', (req, res) => {
  console.log('req body: ', req.body);
  const { _id } = req.body;
  Todo.findByIdAndRemove(_id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

//updates data status in the database
router.put('/updateDataStatus', (req, res) => {
  const { _id, update } = req.body;
  Todo.findByIdAndUpdate(_id, update, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

module.exports = router;
