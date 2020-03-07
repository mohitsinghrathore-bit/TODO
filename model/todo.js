const moongose=require('mongoose');

const todoSchema=new moongose.Schema({
    category:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true

    }
})
const Todo=moongose.model('Todo',todoSchema);
module.exports=Todo;