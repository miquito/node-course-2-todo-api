const {ObjectID} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
var {User} = require('../server/models/user');

// Todo.remove({})
// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// Todo.findOneAndRemove({})

Todo.findByIdAndRemove('5c5c919a444dabd34e72ae95').then((todo) => {
    console.log(todo);
});
