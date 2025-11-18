const mongoose = require('mongoose');
const { Schema } = mongoose;

const lastWinnerSchema = new Schema({
    name: { type: String, required: true },
    totalScore: { type: Number },
    percent: { type: Number },
});

const LastWinner = mongoose.models.LastWinner || mongoose.model('LastWinner', lastWinnerSchema);
module.exports = LastWinner;