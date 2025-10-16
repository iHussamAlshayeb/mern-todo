// models/Todo.js
const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Todo", TodoSchema);
