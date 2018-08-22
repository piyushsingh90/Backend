var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var jwt = require('jwt-simple')
var bcrypt = require('bcrypt-nodejs')

var User = require('./models/User.js')
var auth = require('./auth.js')

var app = express()

mongoose.Promise = Promise

var posts = [
    {message : "Hi"},
    {message : "Hello"}
]

app.use(cors())
app.use(bodyParser.json())


app.get('/users',async  (req, res) => {
    try {
        var users = await User.find({}, '-pwd -__v')
        res.status(200).send(users)
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
})

app.get('/profile/:id',async  (req, res) => {
    try {
        var user = await User.findById(req.params.id, '-pwd -__v')
        res.status(200).send(user)
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
})

app.get('/posts', (req, res) => {
    res.send(posts)
})

app.post('/register', auth.register)
app.post('/login', auth.login)

mongoose.connect('mongodb://test:test123@ds121652.mlab.com:21652/mean', {useNewUrlParser: true}, (err) => {
    if (!err)
        console.log('connected to mongoDb')
})

app.listen(process.env.PORT || 3000)
