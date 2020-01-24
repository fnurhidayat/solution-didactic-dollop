var User = require('./models/user.js');
var Post = require('./models/post.js');

const express = require('express')
const app = express()
const port = 8000

app.use(express.json());

app.get('/users', function(req, res) { 
  User.all()
    .then(data => {
      res.status(200).json({
        status: true,
        data: data.map(i => i.entity()) // This method isn't that necessary, it only format the output
      });
    })
    .catch(err => {
      res.status(422).json({
        status: false,
        errors: err
      });
    })
})

app.get('/users/:id', function(req, res) {
  User.find(req.params.id)
    .then(data => {
      res.status(422).json({
        status: true,
        data: data.entity() // This method isn't that necessary, it only format the output
      });
    })
    .catch(err => {
      res.status(422).json({
        status: false,
        errors: err
      });
    })
})

app.post('/users', function(req, res) {
  let { name, email, password, password_confirmation } = req.body;
  
  /* Check if the password and its confirmation are the same
   * If not, then it should return error!
   * */
  if (password !== password_confirmation) return res
    .status(400)
    .json({
      status: false,
      errors: 'Password doesn\'t match!'
    })


  // Create user instance  
  let user = new User({ name, email, password, password_confirmation });
  user.save()
    .then(data => {
      res.status(201).json({
        status: true,
        data: data.entity() // This method isn't that necessary, it only formats the output
      });
    })
    .catch(err => {
      res.status(422).json({
        status: false,
        errors: err
      });
    })
})

app.put('/users/:id', function(req, res) {
  User.update(req.params.id, req.body)
    .then(data => {
      res.status(200).json({
        status: true,
        data: data.entity() // This method isn't that necessary, it only formats the output
      });
    })
    .catch(err => {
      res.status(400).json({
        status: false,
        errors: err
      });
    })
})

app.get('/posts', function(req, res) {
  Post.all()
    .then(data => {
      res.status(200).json({
        status: true,
        data: data
      });
    })
    .catch(err => {
      res.status(400).json({
        status: false,
        errors: err
      });
    })
})

app.get('/posts/:id', function(req, res) {
  Post.find(req.params.id)
    .then(data => {
      res.status(422).json({
        status: true,
        data: data // This method isn't that necessary, it only format the output
      });
    })
    .catch(err => {
      res.status(422).json({
        status: false,
        errors: err
      });
    })
})

app.post('/posts', function(req, res) {
  let { title, body } = req.body;

  // Create post instance  
  let post = new Post({ title, body });
  post.save()
    .then(data => {
      res.status(201).json({
        status: true,
        data: data // This method isn't that necessary, it only formats the output
      });
    })
    .catch(err => {
      res.status(422).json({
        status: false,
        errors: err
      });
    })
})

app.put('/posts/:id', function(req, res) {
  Post.update(req.params.id, req.body)
    .then(data => {
      res.status(200).json({
        status: true,
        data: data // This method isn't that necessary, it only formats the output
      });
    })
    .catch(err => {
      res.status(400).json({
        status: false,
        errors: err
      });
    })
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
