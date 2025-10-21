import bcrypt from "bcrypt";
import express from 'express';
import db from '../db/index.js';
const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    await db.query("INSERT INTO users (email, password) VALUES ($1, $2)", [email, hashed]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Пользователь уже существует" });
  }
});

export default router;
