import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import { Router } from "express";
import { User } from "../models/User.js";
import { protect } from "../middleware/auth.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

function signToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
}

function handleValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error("Validation failed");
    err.status = 400;
    err.errors = errors.array();
    return next(err);
  }
  next();
}

router.post(
  "/login",
  body("email").isEmail().normalizeEmail(),
  body("password").isString().isLength({ min: 8 }),
  handleValidation,
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      const err = new Error("Invalid email or password");
      err.status = 401;
      throw err;
    }
    res.json({
      success: true,
      token: signToken(user._id),
      user: { id: user._id, email: user.email, role: user.role },
    });
  })
);

router.get(
  "/me",
  protect,
  asyncHandler(async (req, res) => {
    res.json({ success: true, user: req.user });
  })
);

router.put(
  "/password",
  protect,
  body("currentPassword").isString().isLength({ min: 8 }),
  body("newPassword").isString().isLength({ min: 8 }),
  handleValidation,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!(await user.matchPassword(req.body.currentPassword))) {
      const err = new Error("Current password is incorrect");
      err.status = 400;
      throw err;
    }
    user.password = req.body.newPassword;
    await user.save();
    res.json({ success: true, message: "Password updated" });
  })
);

export default router;
