import { Router } from "express";
import jwt from "jsonwebtoken";

const router = Router();

/**
 * POST /api/auth/signup
 * Mock signup (no DB yet)
 */
router.post("/signup", (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: "Missing fields" });
  }

  return res.json({
    success: true,
    message: "Account created",
  });
});

/**
 * POST /api/auth/login
 * Mock login — returns JWT
 */
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing credentials" });
  }

  const token = jwt.sign(
    { userId: "demo-user", email },
    process.env.JWT_SECRET || "dev_secret",
    { expiresIn: "1d" }
  );

  return res.json({ token });
});

export default router;
