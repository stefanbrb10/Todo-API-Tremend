const Todo = require('../models/Todo');
const mongoose = require('mongoose');

async function searchTodo(req, res, next){
    let todo;
    try{
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(404).json({message: "Id is not of Mongo type and is invalid"});
        }
        todo = await Todo.findById(req.params.id);
        if(todo == null){
            return res.status(404).json({message: "Todo not found"});
        }
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }
    res.todo = todo;
    next();
}

module.exports = searchTodo;