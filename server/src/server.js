// server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // لتحميل المتغيرات من .env

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // السماح لـ React بالاتصال
app.use(express.json()); // لقبول بيانات JSON في الطلبات (req.body)

// ------------------------------------
// 1. الاتصال بقاعدة البيانات
// ------------------------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB successfully.");
    // تشغيل الخادم بعد التأكد من الاتصال بقاعدة البيانات
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

// ------------------------------------
// 2. المسارات (Routes)
const todoRoutes = require("../routes/todo"); // استيراد المسارات
app.use("/api/todos", todoRoutes); // استخدام المسارات تحت مسار /api/todos

// ------------------------------------
// مثال: app.use('/api/todos', todoRoutes);
// ------------------------------------
