var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var jwt = require('jwt-simple')
var bcrypt = require('bcrypt-nodejs')

var User = require('./models/User.js')
var Post = require('./models/Post.js')
var auth = require('./auth.js')

var app = express()

mongoose.Promise = Promise

app.use(cors())
app.use(bodyParser.json())

app.get('/users', auth.checkAuthenticated, async  (req, res) => {
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

app.get('/posts/:id', async (req, res) => {
    try {
        var author = req.params.id;
        var posts =await  Post.find({author});
        res.status(200).send(posts);
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
})

app.post('/post', auth.checkAuthenticated, (req, res) => {
    var postData = req.body;
    postData.author = req.userId;

    var post = new Post(postData)

    post.save((err, result) => {
        if (err){
            
        console.log('Error while saving post')
        res.status(500).send('Saving Post Error')
        }
        
        res.sendStatus(200)
    })
})


mongoose.connect('mongodb://test:test123@ds121652.mlab.com:21652/mean', {useNewUrlParser: true}, (err) => {
    if (!err)
        console.log('connected to mongoDb')
})

app.use('/auth', auth.router)
app.listen(process.env.PORT || 3000)
