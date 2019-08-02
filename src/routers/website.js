const express = require('express')
const router = new express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user')

router.get('/', (req, res) => {
    res.render('index', {
        title: 'My Recipes',
        name: 'Oddmund H',
        message: req.flash('message')
    })
})

router.get('/user', (req, res) => {
    res.render('user', {
        title: 'My Recipes'
    })
})

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'My Recipes'
    })
})

router.get('/myrecipes', (req, res) => {
    res.render('recipes', {
        title: 'My Recipes',
        message: req.flash('message')
    })
})

router.get('/createuser', (req, res) => {
    async function checkUser() {
        if (req.cookies.access_token || req.header('Authorization')){
        const token = req.cookies.access_token || req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token})
            if(user){
                req.flash('message', 'You cannot create user while logged in')
                res.redirect('/')
            }
        }
    }

    checkUser()

    res.render('create', {
        title: 'My Recipes',
        message: req.flash('message')
    })
})

router.get('/createrecipe', (req, res) => {
    
    res.render('createrecipe', {
        title: 'My Recipes',
        message: req.flash('message')
    })
})

router.get('/createrecipe/:id', (req, res) => {
    
    res.render('createrecipe', {
        title: 'My Recipes',
        message: req.flash('message')
    })
})




module.exports = router