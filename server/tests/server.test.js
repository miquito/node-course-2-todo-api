const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('../server');
const {Todo} = require('../models/todo');

const todos = [{
    text: 'First test todos',
    _id: new ObjectID()
},{
    text: 'Second test todos',
    _id: new ObjectID()
}];

beforeEach((done) =>{
    // Todo.remove({}).then(() => done());
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe('POST /todos', () =>{
    it('should create new todo', (done) =>{
        var text = 'Test todo text';

        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res)=>{
            expect(res.body.text).toBe(text);
        })
        .end((err, res) =>{
            if(err){
                return done(err);
            }

            Todo.find({text}).then((todos) =>{
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((err) => done(err));
        })
    });

    it('should not create todo woth invalid data', (done) =>{
        var text =  '';

        request(app)
        .post('/todos')
        .expect(400)
        .end((err, res) =>{
            if(err){
                return done(err);
            }

            Todo.find().then((todos) =>{
                expect(todos.length).toBe(2);
                done();
            }).catch((err) => done(err));
        })
    });
});

describe('GET /todos', () => {
    it('should GET all todos', (done) => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    })
});

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
    });

    it('should returm 404 if todo not found', (done) => {
        request(app)
        .get(`/todos/${new ObjectID().toHexString()}`)
        .expect(404)
        .end(done);
    });

    it('should return 404 for non-object ids', (done) => {
        request(app)
        .get('/todos/123')
        .expect(404)
        .end(done);
    });
});

describe('DELETE /todos/:id route', () => {
    it('Should delete a todo', (done) => {
        var hexId = todos[1]._id.toHexString();

        request(app)
        .delete(`/todos/${hexId}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo._id).toBe(hexId);
        })
        .end((err, res) => {
            if(err){
                return done(err);
            }

            Todo.findById(hexId).then((todo) => {
                expect(todo).toBeFalsy();
                done();
            }).catch((err) => done(err));

        });
    });

    it('Should return 404 if todo not found', (done) => {
        var hexId = new ObjectID().toHexString();
        request(app)
        .delete(`/todos/${hexId}`)
        .expect(404)
        .end(done);
    });

    it('should return 404 if the objectID is invalid', (done) => {
        
        request(app)
        .delete('/todos/111')
        .expect(404)
        .end(done);
    });

});