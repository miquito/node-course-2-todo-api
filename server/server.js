const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

// var newTodo = new Todo({
//     text: 'Cook dinner'
// });

// newTodo.save().then((doc) =>{
//     console.log('Saved todo', doc)
// }, (err) =>{
//     console.log('unable to save')
// });

// var newTodo = new Todo({
//     text: 'Testing',
//     completedAt: '444333'
// });

// newTodo.save().then((doc) =>{
//     console.log('Saved new todo', doc)
// }, (err) =>{
//     console.log("Error", err)
// });

var User = mongoose.model('User', {
    email:{
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
});

var user = new User({
    email: 'micke@sitback.se'
});

user.save().then((doc) =>{
    console.log("Saved new User", doc);
}, (err)=>{
    console.log("Error!", err);
})