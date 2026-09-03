import { Router } from "express";
import { body, validationResult } from "express-validator";
import { Education } from "../models/Education.js";
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

router.get(
  "/",
  asyncHandler(async (_req, res) => {
    const data = await Education.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data });
  })
);

router.post(
  "/",
  protect,
  body("degree").isString().trim().notEmpty(),
  body("institution").isString().trim().notEmpty(),
  handleValidation,
  asyncHandler(async (req, res) => {
    const data = await Education.create(req.body);
    res.status(201).json({ success: true, data });
  })
);

router.put(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const data = await Education.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!data) {
      const err = new Error("Education not found");
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
    const data = await Education.findByIdAndDelete(req.params.id);
    if (!data) {
      const err = new Error("Education not found");
      err.status = 404;
      throw err;
    }
    res.json({ success: true, message: "Deleted" });
  })
);

export default router;
