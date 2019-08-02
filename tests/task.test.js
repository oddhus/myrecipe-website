const request = require('supertest')
const app = require('../src/app')
const Recipe = require('../src/models/recipe')
const {userTwo, recipeOne, userOne, setupDatabase} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create recipe for user', async () => {
    const response = await request(app)
        .post('/recipes')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'From test'
        })
        .expect(201)
    const recipe = await Recipe.findById(response.body._id)
    expect(recipe).not.toBeNull()
    expect(recipe.isCompleted).toEqual(false)
})

test('Should fetch all recipes userOne', async () => {
    const response = await request(app)
        .get('/recipes')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        expect(201)
    
    expect(response.body.length).toEqual(2)
})

test('SHould fail to delete recipe from other user', async () => {
    const response = await request(app)
        .delete('/recipes/' + recipeOne._id)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        expect(404)
    const recipe = Recipe.findById(recipeOne._id)
    expect(recipe).not.toBeNull()
})