const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB database
mongoose.connect('mongodb://127.0.0.1:27017/Lab17', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB database');
});

// Define Mongoose schema and model
const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  mobile: String,
  address: String
});
const Student = mongoose.model('Student', studentSchema);

// Set up middleware
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().none());

// Define routes
app.get('/', function(req, res){
  res.render('form');
});

app.post('/submit', function(req, res){
  const studentData = new Student({
    name: req.body.name,
    age: req.body.age,
    mobile: req.body.mobile,
    address: req.body.address
  });

  studentData.save()
    .then(function(){
      res.send('Data saved successfully');
    })
    .catch(function(err){
      console.log(err);
      res.send('Error occurred while saving data to database');
    });
});

// Start server
app.listen(4000, function(){
  console.log('Server started on port 4000');
});