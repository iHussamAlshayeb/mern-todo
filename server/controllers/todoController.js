// controllers/todoController.js

const Todo = require("../models/Todo");

// ------------------- (R) - Read -------------------
// جلب جميع المهام
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ timestamp: -1 }); // جلب وفرز حسب الأحدث
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ------------------- (C) - Create -------------------
// إضافة مهمة جديدة
const createTodo = async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ message: "Todo text is required" });
  }
  const newTodo = new Todo({ text });
  try {
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo); // 201: Created
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ------------------- (U) - Update -------------------
// تحديث حالة الإنجاز (Toggle)
const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    // تبديل حالة الإنجاز
    todo.completed = !todo.completed;
    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ------------------- (D) - Delete -------------------
// حذف مهمة
const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
