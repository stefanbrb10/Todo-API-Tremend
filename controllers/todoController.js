const Todo = require('../models/Todo');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


const getTodos = async (req, res) => {
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 4;
        const startIndex = (page - 1) * limit; // where is the user currently

        const todos = await Todo.find({userId: req.user._id}).skip(startIndex).limit(limit);
        const total = await Todo.countDocuments({userId: req.user._id});

        const pagination = {
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalItems: total
        };

        res.json({todos, pagination}); 
    } catch(err){
        res.status(500).json({message: err.message}); 
    }
};

const getTodoById = async (req, res, next) => {
    if(res.todo.userId != getCurrentUser(req)){
        return res.status(401).json({message: "Unauthorized"});
    }
    const todo = await Todo.findById(req.params.id);
    if(!todo){
    return res.status(404).json({message: "Todo not found"});
    }
    res.send(res.todo);
}

const createTodo = async (req, res) => {
    const currentUser = getCurrentUser(req);
    const todo = new Todo({
        title: req.body.title, 
        description: req.body.description,
        completed: req.body.completed,
        userId: currentUser
    })
    try{  
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    } catch(err){
        res.status(400).json({message: err.message});
    }
};

const updateTodo = async (req, res) => {
    if(res.todo.userId != getCurrentUser(req)){
        return res.status(401).json({message: "Unauthorized"});
    }

    // consider only the fields that are in the request body
    if(req.body.title != null){
        res.todo.title = req.body.title;
    }
    if(req.body.description != null){
        res.todo.description = req.body.description;
    }
    if(req.body.completed != null){
        res.todo.completed = req.body.completed;
    }
    try{
        const updatedTodo = await res.todo.save();
        res.json(updatedTodo);
    } catch(err){
        res.status(400).json({message: err.message});
    }
};

const deleteTodo = async (req, res) => {
    if(res.todo.userId != getCurrentUser(req)){
        return res.status(401).json({message: "Unauthorized"});
    }
    try{
        const deletedTodo = await Todo.findOneAndDelete({_id: req.params.id});
        if(!deletedTodo){
            return res.status(404).json({message: "Todo not found"});
        }
        res.json({message: `Todo with title ${res.todo.title} has been deleted`});
    } catch(err){
        res.status(500).json({message: err.message});
    }
};


function getCurrentUser(req){
    const token = req.header('Cookie').replace('token=', '');
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    return decodedToken.userId;
}

module.exports = { getTodos, getTodoById, createTodo, updateTodo, deleteTodo};