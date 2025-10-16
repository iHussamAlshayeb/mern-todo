// routes/todo.js
const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");

// المسارات الأربعة لعمليات CRUD
router.get("/", todoController.getTodos); // READ all
router.post("/", todoController.createTodo); // CREATE
router.put("/:id", todoController.updateTodo); // UPDATE (Toggle)
router.delete("/:id", todoController.deleteTodo); // DELETE

module.exports = router;
