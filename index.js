const express = require('express');
const app = express();
const port = 8000;
const db = require('./config/moongoose');
const Todo = require('./model/todo');
const moment = require('moment');
app.locals.moment = moment; // this makes moment available as a variable in every EJS page


app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('assets'));
app.use(express.urlencoded());

app.get('/', function (req, res) {
    Todo.find({}, function (err, todos) {
        if (err) {
            console.log('oh noo');
            return;
        }
        return res.render('home', {
            todo_list: todos
        });

    })
});
app.post('/todo', function (req, res) {


    Todo.create({
        category: req.body.category,
        date: req.body.date,
        description: req.body.description
    }, function (err, newtodo) {
        if (err) {
            console.log("error in schema part");
            return;
        }
        console.log('*****', newtodo);

        return res.redirect('back');
    })
});
app.post('/dlt-todo', function (req, res) {
    console.log(req.body.id.length);
     if(typeof req.body.id === 'object'){
    for (let i in req.body.id) {
         
        Todo.findByIdAndDelete(req.body.id[i], function (err) {
            if (err) {
                console.log("error in deleting");
             return;
            }

        })
    
    }
    return res.redirect('back');
}else{
    Todo.findByIdAndDelete(req.body.id, function (err) {
        if (err) {
            console.log("error in deleting");
         return;
        }
        return res.redirect('back');
    
    })
}
})
app.listen(port, function (err) {
    if (err) {
        console.log('error in running the server');
        return;
    }
    console.log('server running successfully');
})