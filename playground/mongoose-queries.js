const {ObjectID} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
var {User} = require('./../server/models/user');

var id = '5c5c30a514101d2ec23aa5a500';

// if(!ObjectID.isValid(id)){
//     console.log('ID not valid');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//    _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//     if(!todo){
//         return console.log("ID not found");
//     }
//     console.log('Todo by Id', todo);
// }).catch((e) => {
//     console.log("Error", e);
// });

var userId = '5c5b400968c82022d4c6a521';

User.findById(userId).then((user) => {
    if(!user){
        return console.log("User not fond");
    }

    // console.log("User: ", user);
    console.log(JSON.stringify(user, undefined, 2));
}, (err) => {
    console.log("Error! User not found", err);
});