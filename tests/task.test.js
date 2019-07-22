const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/tasks')
const {userTwo, taskOne, userOne, setupDatabase} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'From test'
        })
        .expect(201)
    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.isCompleted).toEqual(false)
})

test('Should fetch all tasks userOne', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        expect(201)
    
    expect(response.body.length).toEqual(2)
})

test('SHould fail to delete task from other user', async () => {
    const response = await request(app)
        .delete('/tasks/' + taskOne._id)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        expect(404)
    const task = Task.findById(taskOne._id)
    expect(task).not.toBeNull()
})