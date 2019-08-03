const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const recipeRouter = require('./routers/recipes')
const webRouter =  require('./routers/website')
const path = require('path')
const hbs = require('hbs')
const cookieParser = require('cookie-parser')
const session = require('express-session')
var flash = require('express-flash')

const app = express()

const port = process.env.PORT

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine. Default location views folder to vviewpath
app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.set('trust proxy', 1) // trust first proxy
hbs.registerPartials(partialsPath)

app.use(cookieParser(process.env.SESSION_SECRET))
app.use(session({
    secret: String(process.env.SESSION_SECRET),
    resave: false,
    saveUninitialized: true,
    cookie: {secure: true, maxAge: 6000 }}));
app.use(flash());

app.use(express.static(publicDirectoryPath))
app.use(express.json())
app.use(userRouter)
app.use(recipeRouter)
app.use(webRouter)



module.exports = app

