// const MongoClient = require("mongodb").MongoClient;
const {MongoClient, ObjectID} = require("mongodb");


// var user = {name: 'Micke', age: 45};
// var {name} = user;
// console.log(name);


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) =>{
    if(err){
        return console.log('Unable to connect to mongo db server');
    }

    console.log('Connected to Mongo db');
    const db = client.db('TodoApp');
    
    // deleteMany
        // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) =>{
        //     console.log(result);
        // });
    //deleteOne
    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) =>{
    //     console.log(result);
    // })

    // findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) =>{
    //     console.log(result);
    // });


    // db.collection('Users').deleteMany({name: 'Micke Ring'}).then((result) =>{
    //     console.log(result);
    // }, (err) =>{
    //     console.log(`Something went wrong: ${err}`);
    // });

    db.collection('Users').findOneAndDelete({_id: new ObjectID('5c5ad2db6560841d887258a9')}).then((result) =>{
        console.log(result);
    }, (err) =>{
        console.log(`Error: ${err}`);
    })


    // client.close();
})

