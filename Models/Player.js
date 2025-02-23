const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
    username:{type:String, required:true},
    highscore:{type:Number},
});

const Player = mongoose.model("Player", playerSchema, "Player");

module.exports = Player;