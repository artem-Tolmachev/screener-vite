import db from '../db/index.js';
import bcrypt from "bcrypt";
import express from 'express';
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
  const user = result.rows[0];

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET, 
      { expiresIn: "1h" }     
    );
    res.json({ success: true, token, user: { id: user.id, email: user.email } });
  } else {
    res.status(401).json({ error: "Неверный логин или пароль" });
  }
});

export default router;