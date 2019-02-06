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
    
    // db.collection('Todos').find({
    //     _id: new ObjectID('5c5ad6a9444dabd34e725dcd')
    // }).toArray().then((docs) =>{
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) =>{
    //     console.log("Unable to fetch todos", err);
    // });

    // db.collection('Todos').find().count().then((count) =>{
    //     console.log('Todos');
    //     console.log(`Todos count: ${count}`);
    // }, (err) =>{
    //     console.log("Unable to fetch todos", err);
    // });

    db.collection('Users').find({name: 'Micke Ring'}).toArray().then((docs) =>{
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) =>{
        console.log(`Error: ${err}`);
    });

    // client.close();
})

