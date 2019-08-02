const express = require('express')
const Recipe = require('../models/recipe')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/recipes', auth, async (req, res) => {
    const recipe = new Recipe({
        ...req.body,
        owner: req.user._id
    })
    try {
        await recipe.save()
        res.status(201).send(recipe)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/recipes', auth, async (req, res) => {

    let match = {}
    const sort = {}

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1  
    }

    if (req.query.search) {
        match = {
            title: req.query.search
        }
    }

    try {
        //alternative
        await req.user.populate({
            path: 'recipes',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        //alternative
        //const tasks = await Task.find({owner: req.user._id, isCompleted})
        if(!req.user.recipes) {
            res.status(204).send()
        }
        res.status(200).send(req.user.recipes)
    } catch (error) {
        res.status(500).send()
    }
})

router.get('/recipes/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const recipe = await Recipe.findOne({_id, owner: req.user._id})
        if(!recipe) {
            return res.status(404).send()
        }
        res.send(recipe)
    } catch (error) {
        res.status(500).send()
    }
 
})

router.patch('/recipes/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'preparation', 'ingredients']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        res.status(400).send({error: 'invalid updates'})
    }
    try {
        const recipe = await Recipe.findOne({ _id: req.params.id, owner: req.user._id})

        if (!recipe) {
            res.status(404).send()
        }

        
        recipe.title = req.body.title
        recipe.preparation = req.body.preparation
        recipe.ingredients = []
        req.body.ingredients.forEach((element) => recipe.ingredients.push(element))

        //updates.forEach((update) => recipe[update] = req.params[update])
        console.log(recipe)
        await recipe.save()
        res.status(204).send(recipe)

    } catch (error) {
        res.status(400).send()
    }

})

router.delete('/recipes/:id', auth, async (req, res) => {
    try {
        const recipe = await Recipe.findOneAndDelete({_id: req.params.id, owner: req.user.id})
        if (!recipe) {
            return res.status(404).send()
        }
        res.send(recipe)
    } catch (error) {
        res.status(500).send()
    }
    
})

module.exports = router