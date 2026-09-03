import mongoose from "mongoose";

const skillItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    level: { type: Number, min: 0, max: 100, default: 80 },
    icon: { type: String, default: "" },
  },
  { _id: true }
);

const skillCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    order: { type: Number, default: 0 },
    skills: { type: [skillItemSchema], default: [] },
  },
  { timestamps: true }
);

export const SkillCategory = mongoose.model("SkillCategory", skillCategorySchema);
