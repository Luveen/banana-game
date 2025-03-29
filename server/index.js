const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const BalloongameModel = require('./models/balloongame');

// const { response } = require('express');


const app = express();
app.use(express.json());
app.use(cors());

//creating connection with MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/balloongame");

app.post("/login", (req, res) => {
    const {username, password} = req.body;
    BalloongameModel.findOne({username: username})
    .then(user => {
      if(user){
        if(user.password === password){
          res.json("Sucessfully logged in");
        } else {
          res.json("Invalid credentials");
        }
      } else {
        res.json("User does not exist");
      }
    })
});


app.post("/register", (req, res) => {
    BalloongameModel.create(req.body)
    .then(signup => res.json(signup))
    .catch(err => res.json(err))
})
    

app.listen(3001, () => {
    console.log("Server is running ons s 5173");
});