import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    designation: { type: String, default: "Full Stack Developer | MERN & .NET Technologies" },
    roles: { type: [String], default: ["Full Stack Developer", "MERN Developer", ".NET Developer"] },
    tagline: { type: String, default: "" },
    bio: { type: String, default: "" },
    location: { type: String, default: "" },
    educationQuickFact: { type: String, default: "" },
    photoUrl: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    github: { type: String, default: "" },
    resumeUrl: { type: String, default: "" },
    resumeViews: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Profile = mongoose.model("Profile", profileSchema);
