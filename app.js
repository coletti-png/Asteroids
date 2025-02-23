
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const User = require("./Models/Player.js");
const { register } = require("module");
const app = express();
const port = process.env.port||3000;
app.use(express.static(path.join(__dirname, "public")));
//Set up middleware to parse json requests
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));



//MongoDB connection setup
const mongoURI = "mongodb://localhost:27017/AsteroidsGame";
mongoose.connect(mongoURI);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error"));
db.once("open", ()=>{
    console.log("Connected to MongoDB Database");
});

//routes
app.get("/", function(req,res){res.sendFile(path.join(__dirname,"index.html"));});
  
  
    // Gets Highscore
  app.get("/highscores", async (req, res) => {
    try {
      const username = await Player.find();
      res.json(username);
    } catch (err) {
      res.status(500).json({ error: "Failed to get high scores." });
    }
  });
  
  app.post("/addNewPlayer", async (req, res) => {
    try {
      const { username, highscore } = req.body;
      const existingPlayer = await Player.findOne({ username });
  
      if (existingPlayer) {
        return res.send("Error: Username already taken");
      }
  
  
      const newPlayer = new Player({username, highscore});
      await newPlayer.save();
  
      res.redirect("/highScore.html");
    } catch (err) {
      res.status(500).send("Error registering new player");
    }
  });





// Start the server
app.listen(port, ()=>{console.log(`Server is running on port ${port}`);});
module.exports = app;