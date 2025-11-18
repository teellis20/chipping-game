const mongoose = require('mongoose');
const { Schema } = mongoose;

const playerSchema = new Schema({
    name: { type: String, required: true, unique: true },
    totalScore: { type: Number, default: 0 },
    percent: { type: Number, default: 0 },
});

const Player = mongoose.models.Player || mongoose.model('Player', playerSchema);
module.exports = Player;