// client/src/App.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; // افترض وجود ملف CSS أساسي للتصميم

// رابط الخادم الخلفي (تأكد من مطابقته لمنفذ الخادم لديك)
const API_URL = "http://mern-todo-mpjo.onrender.com/api/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState("");

  // ------------------------------------
  // R: جلب المهام (Read)
  // ------------------------------------
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  // ------------------------------------
  // C: إضافة مهمة (Create)
  // ------------------------------------
  const handleCreateTodo = async (e) => {
    e.preventDefault();
    if (!newTodoText.trim()) return;

    try {
      const response = await axios.post(API_URL, { text: newTodoText });
      // تحديث الحالة بإضافة المهمة الجديدة مباشرة
      setTodos([response.data, ...todos]);
      setNewTodoText(""); // تفريغ حقل الإدخال
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  // ------------------------------------
  // U: تحديث حالة المهمة (Update - Toggle)
  // ------------------------------------
  const handleToggleComplete = async (id) => {
    try {
      // نرسل طلب PUT للتحديث (سيتم تبديل حالة completed في الباك إند)
      const response = await axios.put(`${API_URL}/${id}`);

      // تحديث حالة الواجهة الأمامية (UI State)
      setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  // ------------------------------------
  // D: حذف مهمة (Delete)
  // ------------------------------------
  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      // تحديث الحالة بإزالة المهمة المحذوفة
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="App">
      <h1>قائمة المهام 📝</h1>

      {/* نموذج إضافة مهمة جديدة */}
      <form onSubmit={handleCreateTodo} className="todo-form">
        <input
          type="text"
          placeholder="أضف مهمة جديدة..."
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
        />
        <button type="submit">إضافة</button>
      </form>

      {/* عرض قائمة المهام */}
      <div className="todo-list">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <div
              key={todo._id}
              className={`todo-item ${todo.completed ? "completed" : ""}`}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                opacity: todo.completed ? 0.6 : 1,
              }}
            >
              <span
                className="todo-text"
                onClick={() => handleToggleComplete(todo._id)}
              >
                {todo.text}
              </span>
              <button
                onClick={() => handleDeleteTodo(todo._id)}
                className="delete-btn"
              >
                حذف
              </button>
            </div>
          ))
        ) : (
          <p>لا توجد مهام حاليًا. ابدأ بإضافة واحدة!</p>
        )}
      </div>
    </div>
  );
}

export default App;
