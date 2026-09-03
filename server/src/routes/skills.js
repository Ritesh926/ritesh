import { Router } from "express";
import { body, validationResult } from "express-validator";
import { SkillCategory } from "../models/SkillCategory.js";
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
    const data = await SkillCategory.find().sort({ order: 1, createdAt: 1 });
    res.json({ success: true, data });
  })
);

router.post(
  "/",
  protect,
  body("name").isString().trim().notEmpty(),
  handleValidation,
  asyncHandler(async (req, res) => {
    const data = await SkillCategory.create({
      name: req.body.name,
      order: req.body.order ?? 0,
      skills: req.body.skills || [],
    });
    res.status(201).json({ success: true, data });
  })
);

router.put(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const data = await SkillCategory.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!data) {
      const err = new Error("Category not found");
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
    const data = await SkillCategory.findByIdAndDelete(req.params.id);
    if (!data) {
      const err = new Error("Category not found");
      err.status = 404;
      throw err;
    }
    res.json({ success: true, message: "Deleted" });
  })
);

router.post(
  "/:id/skills",
  protect,
  body("name").isString().trim().notEmpty(),
  handleValidation,
  asyncHandler(async (req, res) => {
    const category = await SkillCategory.findById(req.params.id);
    if (!category) {
      const err = new Error("Category not found");
      err.status = 404;
      throw err;
    }
    category.skills.push({
      name: req.body.name,
      level: req.body.level ?? 80,
      icon: req.body.icon || "",
    });
    await category.save();
    res.status(201).json({ success: true, data: category });
  })
);

router.put(
  "/:id/skills/:skillId",
  protect,
  asyncHandler(async (req, res) => {
    const category = await SkillCategory.findById(req.params.id);
    if (!category) {
      const err = new Error("Category not found");
      err.status = 404;
      throw err;
    }
    const skill = category.skills.id(req.params.skillId);
    if (!skill) {
      const err = new Error("Skill not found");
      err.status = 404;
      throw err;
    }
    skill.name = req.body.name ?? skill.name;
    skill.level = req.body.level ?? skill.level;
    skill.icon = req.body.icon ?? skill.icon;
    await category.save();
    res.json({ success: true, data: category });
  })
);

router.delete(
  "/:id/skills/:skillId",
  protect,
  asyncHandler(async (req, res) => {
    const category = await SkillCategory.findById(req.params.id);
    if (!category) {
      const err = new Error("Category not found");
      err.status = 404;
      throw err;
    }
    const skill = category.skills.id(req.params.skillId);
    if (!skill) {
      const err = new Error("Skill not found");
      err.status = 404;
      throw err;
    }
    skill.deleteOne();
    await category.save();
    res.json({ success: true, data: category });
  })
);

export default router;
