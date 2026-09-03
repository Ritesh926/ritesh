import { Router } from "express";
import { body, validationResult } from "express-validator";
import { Profile } from "../models/Profile.js";
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
    const profile = await Profile.findOne();
    res.json({ success: true, data: profile });
  })
);

router.get(
  "/resume",
  asyncHandler(async (_req, res) => {
    const profile = await Profile.findOne();
    if (!profile?.resumeUrl) {
      const err = new Error("Resume not uploaded yet");
      err.status = 404;
      throw err;
    }
    profile.resumeViews += 1;
    await profile.save();
    res.json({ success: true, url: profile.resumeUrl, views: profile.resumeViews });
  })
);

router.put(
  "/",
  protect,
  body("name").optional().isString().trim().notEmpty(),
  handleValidation,
  asyncHandler(async (req, res) => {
    const allowed = [
      "name",
      "designation",
      "roles",
      "tagline",
      "bio",
      "location",
      "educationQuickFact",
      "email",
      "phone",
      "linkedin",
      "github",
    ];
    const updates = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    }
    if (typeof updates.roles === "string") {
      updates.roles = updates.roles
        .split(",")
        .map((r) => r.trim())
        .filter(Boolean);
    }
    const profile = await Profile.findOneAndUpdate({}, updates, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    });
    res.json({ success: true, data: profile });
  })
);

router.put(
  "/photo",
  protect,
  upload.single("file"),
  asyncHandler(async (req, res) => {
    if (!req.file) {
      const err = new Error("Photo file is required");
      err.status = 400;
      throw err;
    }
    const url = await persistUpload(req.file);
    const profile = await Profile.findOneAndUpdate(
      {},
      { photoUrl: url },
      { new: true, upsert: true }
    );
    res.json({ success: true, data: profile });
  })
);

router.put(
  "/resume",
  protect,
  upload.single("file"),
  asyncHandler(async (req, res) => {
    if (!req.file) {
      const err = new Error("Resume PDF is required");
      err.status = 400;
      throw err;
    }
    const url = await persistUpload(req.file);
    const profile = await Profile.findOneAndUpdate(
      {},
      { resumeUrl: url },
      { new: true, upsert: true }
    );
    res.json({ success: true, data: profile });
  })
);

export default router;
