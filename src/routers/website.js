const express = require('express')
const router = new express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const checkLogin = require('../middleware/checkLogin')

router.get('/', checkLogin, async (req, res) => {
    try {
        if (req.isLoggedIn) {
            res.render('authIndex', {
                title: 'My Recipes',
                name: 'Oddmund H',
            }) 
        } else {
            res.render('index', {
                title: 'My Recipes',
                name: 'Oddmund H',
                message: ''
            }) 
        }
         
    } catch (error) {
        console.log(error)
    }
    

    
})

router.get('/user',checkLogin, async (req, res) => {
    try {
        if (req.isLoggedIn) {
            res.render('user', {
                title: 'My Recipes'
            })
        } else {
            res.render('unauthPage', {
                title: 'My Recipes',
                name: 'Oddmund H',
                message: 'Please log in'
            }) 
        }
         
    } catch (error) {
        console.log(error)
    }
})

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'My Recipes'
    })
})

router.get('/myrecipes', checkLogin, async (req, res) => {
    try {
        if (req.isLoggedIn) {
            res.render('recipes', {
                title: 'My Recipes',
                name: 'Oddmund H'
            })
        } else {
            res.render('unauthPage', {
                title: 'My Recipes',
                name: 'Oddmund H',
                message: 'Please log in'
            }) 
        }
         
    } catch (error) {
        console.log(error)
    }

})

router.get('/createuser', checkLogin, async (req, res) => {
    try {
        if (!req.isLoggedIn) {
            res.render('create', {
                title: 'My Recipes',
                name: 'Oddmund H'
            })
        } else {
            res.render('unauthPage', {
                title: 'My Recipes',
                name: 'Oddmund H',
                message: 'You cannot create a user while logged in!'
            }) 
        }
         
    } catch (error) {
        console.log(error)
    }
        
})

router.get('/createrecipe', checkLogin, async (req, res) => {
    try {
        if (req.isLoggedIn) {
            res.render('createrecipe', {
                title: 'My Recipes',
                name: 'Oddmund H'
            })

        } else {
            res.render('unauthPage', {
                title: 'My Recipes',
                name: 'Oddmund H',
                message: 'Plese log in to create an recipe'
            }) 
        }
         
    } catch (error) {
        console.log(error)
    }

})

router.get('/createrecipe/:id', checkLogin, async (req, res) => {
    try {
        if (req.isLoggedIn) {
            res.render('createrecipe', {
                title: 'My Recipes',
                name: 'Oddmund H'
            })

        } else {
            res.render('unauthPage', {
                title: 'My Recipes',
                name: 'Oddmund H',
                message: 'Plese log in to create an recipe'
            }) 
        }
         
    } catch (error) {
        console.log(error)
    }
})




module.exports = router