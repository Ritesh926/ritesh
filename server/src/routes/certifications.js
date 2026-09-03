import { Router } from "express";
import { body, validationResult } from "express-validator";
import { Certification } from "../models/Certification.js";
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

router.get(
  "/",
  asyncHandler(async (_req, res) => {
    const data = await Certification.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data });
  })
);

router.post(
  "/",
  protect,
  upload.single("file"),
  body("title").isString().trim().notEmpty(),
  body("issuer").isString().trim().notEmpty(),
  handleValidation,
  asyncHandler(async (req, res) => {
    const imageUrl = req.file ? await persistUpload(req.file) : req.body.imageUrl || "";
    const data = await Certification.create({
      title: req.body.title,
      issuer: req.body.issuer,
      date: req.body.date || "",
      credentialUrl: req.body.credentialUrl || "",
      imageUrl,
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
    const existing = await Certification.findById(req.params.id);
    if (!existing) {
      const err = new Error("Certification not found");
      err.status = 404;
      throw err;
    }
    if (req.file) existing.imageUrl = await persistUpload(req.file);
    if (req.body.title !== undefined) existing.title = req.body.title;
    if (req.body.issuer !== undefined) existing.issuer = req.body.issuer;
    if (req.body.date !== undefined) existing.date = req.body.date;
    if (req.body.credentialUrl !== undefined) existing.credentialUrl = req.body.credentialUrl;
    if (req.body.order !== undefined) existing.order = req.body.order;
    await existing.save();
    res.json({ success: true, data: existing });
  })
);

router.delete(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const data = await Certification.findByIdAndDelete(req.params.id);
    if (!data) {
      const err = new Error("Certification not found");
      err.status = 404;
      throw err;
    }
    res.json({ success: true, message: "Deleted" });
  })
);

export default router;
