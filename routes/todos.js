require('dotenv').config();
const express = require('express');
const router = express.Router();

const authenticate = require('../middlewares/auth');
const searchTodo = require('../middlewares/searchTodo');

const { getTodos,
        getTodoById,
        createTodo, 
        updateTodo,
        deleteTodo } = require('../controllers/todoController'); 

router.get('/', authenticate, getTodos);
router.get('/:id', authenticate, searchTodo, getTodoById); 
router.post('/', authenticate, createTodo); 
router.patch('/:id', authenticate, searchTodo, updateTodo);
router.delete('/:id', authenticate, searchTodo, deleteTodo);
 
module.exports = router;
