import { Router } from "express";
import { body, validationResult } from "express-validator";
import { ContactMessage } from "../models/ContactMessage.js";
import { protect } from "../middleware/auth.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendContactEmail } from "../utils/email.js";

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

router.post(
  "/",
  body("name").isString().trim().notEmpty(),
  body("email").isEmail().normalizeEmail(),
  body("message").isString().trim().isLength({ min: 10 }),
  handleValidation,
  asyncHandler(async (req, res) => {
    const saved = await ContactMessage.create({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    });
    let emailStatus = { sent: false };
    try {
      emailStatus = await sendContactEmail(req.body);
    } catch (error) {
      emailStatus = { sent: false, reason: error.message };
    }
    res.status(201).json({
      success: true,
      message: "Message received. I'll get back to you soon.",
      emailSent: emailStatus.sent,
      data: { id: saved._id },
    });
  })
);

router.get(
  "/",
  protect,
  asyncHandler(async (_req, res) => {
    const data = await ContactMessage.find().sort({ createdAt: -1 });
    res.json({ success: true, data });
  })
);

router.delete(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const data = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!data) {
      const err = new Error("Message not found");
      err.status = 404;
      throw err;
    }
    res.json({ success: true, message: "Deleted" });
  })
);

export default router;
