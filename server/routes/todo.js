import express from "express";
const router = express.Router();

router.post("/api/todos", (req, res) => {});
router.get("/api/todos", (req, res) => {});
router.put("/api/todos/:id", (req, res) => {});
router.delete("/api/todos/:id", (req, res) => {});

export default router;
