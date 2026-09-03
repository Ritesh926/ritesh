import { Router } from "express";
import { body, validationResult } from "express-validator";
import { Experience } from "../models/Experience.js";
import { protect } from "../middleware/auth.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

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

function parseBullets(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === "string") {
    return value
      .split("\n")
      .map((b) => b.trim())
      .filter(Boolean);
  }
  return [];
}

router.get(
  "/",
  asyncHandler(async (_req, res) => {
    const data = await Experience.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data });
  })
);

router.post(
  "/",
  protect,
  body("company").isString().trim().notEmpty(),
  body("role").isString().trim().notEmpty(),
  body("startDate").isString().trim().notEmpty(),
  handleValidation,
  asyncHandler(async (req, res) => {
    const data = await Experience.create({
      ...req.body,
      bullets: parseBullets(req.body.bullets),
    });
    res.status(201).json({ success: true, data });
  })
);

router.put(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const payload = { ...req.body };
    if (payload.bullets !== undefined) payload.bullets = parseBullets(payload.bullets);
    const data = await Experience.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });
    if (!data) {
      const err = new Error("Experience not found");
      err.status = 404;
      throw err;
    }
    res.json({ success: true, data });
  })
);

router.delete(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const data = await Experience.findByIdAndDelete(req.params.id);
    if (!data) {
      const err = new Error("Experience not found");
      err.status = 404;
      throw err;
    }
    res.json({ success: true, message: "Deleted" });
  })
);

export default router;
