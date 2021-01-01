const express = require('express');
const router = express.Router();
const Todo = require('./PostModel');

// GET ALL ITEMS
router.get('/', async (req, res) => {
  try {
    // get all todo item from DB
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.json({ message : err });
  }    
});

// POST NEW TODO ITEM
router.post('/addTodo', async (req, res) => {
  try {
    const todo = new Todo({
      title: req.body.title,
      completed: req.body.completed
    });
    // Save the todo item into the DB
    const savedTodo = await todo.save();
    res.json(savedTodo);
  } catch (err) {
    res.json({ message : err });
  }  
});

// UPDATE
router.patch('/:todoId', async (req, res) => {
  try {
    // Find and update the todo item in DB    
    const updatedTodo = await Todo.updateOne({
      _id: req.params.todoId
    }, {
      $set: {
        title: req.body.title,
        completed: req.body.completed
      }
    });
    res.send(updatedTodo);
  } catch (err) {
    res.json({ message : err });
  }
});

// DELETE
router.delete('/:todoId', async(req, res) => {
  try {
    // Find and delete the todo item in DB by id
    const deletedTodo = await Todo.remove({
      _id: req.params.todoId
    });
    res.json(deletedTodo);    
  } catch (err) {
    res.json({ message : err });
  }
});

module.exports = router;

