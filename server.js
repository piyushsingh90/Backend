var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')

var User = require('./models/User.js')

var app = express()

var posts = [
    {message : "Hi"},
    {message : "Hello"}
]

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/posts', (req, res) => {
    res.send(posts)
})

app.post('/register', (req, res) => {
    var userData = req.body;
    
    var user = new User(userData)
    user.save((err, result) => {
        if (err)
        console.log('Error while saving user')

        
        res.sendStatus(200)
    })

})

mongoose.connect('mongodb://test:test123@ds121652.mlab.com:21652/mean', {useNewUrlParser: true}, (err) => {
    if (!err)
        console.log('connected to mongoDb')
})

app.listen(3000)
