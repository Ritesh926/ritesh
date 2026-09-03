import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export async function protect(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) {
      const err = new Error("Not authorized");
      err.status = 401;
      throw err;
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      const err = new Error("User not found");
      err.status = 401;
      throw err;
    }
    req.user = user;
    next();
  } catch (error) {
    error.status = error.status || 401;
    error.message = error.status === 401 ? error.message : "Invalid token";
    next(error);
  }
}
