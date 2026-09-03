import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    role: { type: String, required: true },
    location: { type: String, default: "" },
    startDate: { type: String, required: true },
    endDate: { type: String, default: "Present" },
    current: { type: Boolean, default: false },
    bullets: { type: [String], default: [] },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Experience = mongoose.model("Experience", experienceSchema);
