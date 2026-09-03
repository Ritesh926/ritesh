import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
  {
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    startYear: { type: String, default: "" },
    endYear: { type: String, default: "" },
    sgpa: { type: String, default: "" },
    description: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Education = mongoose.model("Education", educationSchema);
