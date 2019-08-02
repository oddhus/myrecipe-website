const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')
const Recipe = require('../../src/models/recipe')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Mike',
    email: 'mike@example.com',
    password: 'mikemike1',
    tokens:[{
        token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
    }]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    name: 'Odd',
    email: 'odd@example.com',
    password: 'oddoddodd',
    tokens:[{
        token: jwt.sign({_id: userTwoId}, process.env.JWT_SECRET)
    }]
}

const recipeOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'First recipe',
    isCompleted: false,
    owner: userOneId
}

const recipeTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Second recipe',
    isCompleted: true,
    owner: userOneId
}

const recipeThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Third recipe',
    isCompleted: false,
    owner: userTwoId
}

const setupDatabase = async () => {
    await User.deleteMany()
    await Recipe.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Recipe(recipeOne).save()
    await new Recipe(recipeTwo).save()
    await new Recipe(recipeThree).save()

}

module.exports = {
    userOneId,
    userOne,
    setupDatabase,
    userTwoId,
    userTwo,
    recipeOne
}