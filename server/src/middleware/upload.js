import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import { cloudinary, isCloudinaryConfigured } from "../config/cloudinary.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadDir = path.join(__dirname, "../../uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const safe = file.originalname.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9._-]/g, "");
    cb(null, `${Date.now()}-${safe}`);
  },
});

const allowed = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
]);

export const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (allowed.has(file.mimetype)) cb(null, true);
    else cb(new Error("Only images and PDF files are allowed"));
  },
});

export async function persistUpload(file) {
  if (!file) return null;
  if (isCloudinaryConfigured()) {
    const resource_type = file.mimetype === "application/pdf" ? "raw" : "image";
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "ritesh-portfolio",
      resource_type,
    });
    fs.unlink(file.path, () => {});
    return result.secure_url;
  }
  return `/uploads/${file.filename}`;
}
