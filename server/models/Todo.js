// models/Todo.js
const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  // نص المهمة (مطلوب)
  text: {
    type: String,
    required: true,
    trim: true, // لإزالة المسافات البيضاء الزائدة
  },
  // حالة الإنجاز (القيمة الافتراضية هي False)
  completed: {
    type: Boolean,
    default: false,
  },
  // تاريخ إنشاء المهمة
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Todo", TodoSchema);
