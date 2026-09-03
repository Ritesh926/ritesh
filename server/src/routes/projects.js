import { Router } from "express";
import { body, validationResult } from "express-validator";
import { Project } from "../models/Project.js";
import { protect } from "../middleware/auth.js";
import { upload, persistUpload } from "../middleware/upload.js";
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

function parseTags(value) {
  if (Array.isArray(value)) return value.map((t) => String(t).trim()).filter(Boolean);
  if (typeof value === "string") {
    return value
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  }
  return [];
}

router.get(
  "/",
  asyncHandler(async (_req, res) => {
    const data = await Project.find().sort({ featured: -1, order: 1, createdAt: -1 });
    res.json({ success: true, data });
  })
);

router.post(
  "/",
  protect,
  upload.single("file"),
  body("title").isString().trim().notEmpty(),
  body("description").isString().trim().notEmpty(),
  handleValidation,
  asyncHandler(async (req, res) => {
    const imageUrl = req.file ? await persistUpload(req.file) : req.body.imageUrl || "";
    const data = await Project.create({
      title: req.body.title,
      description: req.body.description,
      techStack: parseTags(req.body.techStack),
      imageUrl,
      liveUrl: req.body.liveUrl || "",
      githubUrl: req.body.githubUrl || "",
      featured: req.body.featured === true || req.body.featured === "true",
      order: req.body.order ?? 0,
    });
    res.status(201).json({ success: true, data });
  })
);

router.put(
  "/:id",
  protect,
  upload.single("file"),
  asyncHandler(async (req, res) => {
    const existing = await Project.findById(req.params.id);
    if (!existing) {
      const err = new Error("Project not found");
      err.status = 404;
      throw err;
    }
    if (req.file) existing.imageUrl = await persistUpload(req.file);
    if (req.body.title !== undefined) existing.title = req.body.title;
    if (req.body.description !== undefined) existing.description = req.body.description;
    if (req.body.techStack !== undefined) existing.techStack = parseTags(req.body.techStack);
    if (req.body.liveUrl !== undefined) existing.liveUrl = req.body.liveUrl;
    if (req.body.githubUrl !== undefined) existing.githubUrl = req.body.githubUrl;
    if (req.body.featured !== undefined) {
      existing.featured = req.body.featured === true || req.body.featured === "true";
    }
    if (req.body.order !== undefined) existing.order = req.body.order;
    await existing.save();
    res.json({ success: true, data: existing });
  })
);

router.delete(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const data = await Project.findByIdAndDelete(req.params.id);
    if (!data) {
      const err = new Error("Project not found");
      err.status = 404;
      throw err;
    }
    res.json({ success: true, message: "Deleted" });
  })
);

export default router;
