import { Router } from "express";
import { Project } from "../models/Project.js";
import { Certification } from "../models/Certification.js";
import { Experience } from "../models/Experience.js";
import { Education } from "../models/Education.js";
import { SkillCategory } from "../models/SkillCategory.js";
import { ContactMessage } from "../models/ContactMessage.js";
import { Profile } from "../models/Profile.js";
import { protect } from "../middleware/auth.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.get(
  "/",
  protect,
  asyncHandler(async (_req, res) => {
    const [projects, certificates, experience, education, skills, messages, profile] =
      await Promise.all([
        Project.countDocuments(),
        Certification.countDocuments(),
        Experience.countDocuments(),
        Education.countDocuments(),
        SkillCategory.countDocuments(),
        ContactMessage.countDocuments(),
        Profile.findOne(),
      ]);

    res.json({
      success: true,
      data: {
        projects,
        certificates,
        experience,
        education,
        skillCategories: skills,
        messages,
        resumeViews: profile?.resumeViews || 0,
      },
    });
  })
);

export default router;
