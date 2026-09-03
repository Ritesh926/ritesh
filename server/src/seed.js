import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import { User } from "./models/User.js";
import { Profile } from "./models/Profile.js";
import { SkillCategory } from "./models/SkillCategory.js";
import { Experience } from "./models/Experience.js";
import { Project } from "./models/Project.js";
import { Certification } from "./models/Certification.js";
import { Education } from "./models/Education.js";

dotenv.config();

async function seed() {
  await connectDb();

  const email = process.env.ADMIN_EMAIL || "admin@ritesh.dev";
  const password = process.env.ADMIN_PASSWORD || "Admin@12345";

  const existingAdmin = await User.findOne({ email });
  if (!existingAdmin) {
    await User.create({ email, password });
    console.log(`Admin user created: ${email}`);
  } else {
    console.log(`Admin already exists: ${email}`);
  }

  await Profile.findOneAndUpdate(
    {},
    {
      name: "Ritesh Kumar",
      designation: "Full Stack Developer | MERN & .NET Technologies",
      roles: ["Full Stack Developer", "MERN Developer", ".NET Developer"],
      tagline:
        "I build reliable web products with MERN and ASP.NET Core — from APIs and admin panels to polished, responsive UIs.",
      bio: "Full Stack Developer based in Mohali, Punjab. I work across the MERN stack and .NET (ASP.NET Core, C#, Web API) to ship production features: authentication, multi-tenant systems, dashboards, and integrations. I care about clean architecture, clear UX, and code that is easy to maintain.",
      location: "Mohali, Punjab",
      educationQuickFact: "BCA, Gulzar Group of Institutions · SGPA 8.39",
      email: "kumarritesh26579@gmail.com",
      phone: "+91 8409586058",
      linkedin: "https://linkedin.com/in/riteshkumar",
      github: "https://github.com/Ritesh926",
      photoUrl: "",
      resumeUrl: "",
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  const skillCount = await SkillCategory.countDocuments();
  if (skillCount === 0) {
    await SkillCategory.insertMany([
      {
        name: "Languages",
        order: 1,
        skills: [
          { name: "JavaScript", level: 90 },
          { name: "TypeScript", level: 75 },
          { name: "C#", level: 82 },
          { name: "SQL", level: 80 },
          { name: "HTML / CSS", level: 92 },
        ],
      },
      {
        name: "Backend & .NET",
        order: 2,
        skills: [
          { name: "Node.js", level: 88 },
          { name: "Express.js", level: 90 },
          { name: "ASP.NET Core", level: 84 },
          { name: "Web API", level: 86 },
          { name: "REST APIs", level: 90 },
        ],
      },
      {
        name: "Frontend",
        order: 3,
        skills: [
          { name: "React.js", level: 90 },
          { name: "Tailwind CSS", level: 88 },
          { name: "Redux / Context", level: 80 },
          { name: "Vite", level: 85 },
        ],
      },
      {
        name: "Databases & Tools",
        order: 4,
        skills: [
          { name: "MongoDB", level: 88 },
          { name: "Mongoose", level: 86 },
          { name: "SQL Server", level: 78 },
          { name: "Git & GitHub", level: 88 },
          { name: "Postman", level: 85 },
        ],
      },
      {
        name: "Core Architecture",
        order: 5,
        skills: [
          { name: "JWT Auth", level: 88 },
          { name: "MVC / Layered APIs", level: 84 },
          { name: "Multi-tenant design", level: 80 },
          { name: "Cloudinary / file uploads", level: 82 },
        ],
      },
    ]);
  }

  const expCount = await Experience.countDocuments();
  if (expCount === 0) {
    await Experience.insertMany([
      {
        company: "Bhrosa Cab",
        role: "MERN Stack Developer",
        location: "Remote / India",
        startDate: "July 2026",
        endDate: "Present",
        current: true,
        order: 1,
        bullets: [
          "Building and maintaining the Bhrosa Cab platform with React, Node.js, Express, and MongoDB.",
          "Implementing booking flows, role-based access, and admin tooling for operations.",
          "Shipping responsive UI, API integrations, and production-ready CRUD features.",
        ],
      },
      {
        company: "Vineforce IT Services Pvt. Ltd.",
        role: ".NET Software Developer",
        location: "India",
        startDate: "January 2026",
        endDate: "July 2026",
        current: false,
        order: 2,
        bullets: [
          "Developed features with ASP.NET Core, C#, and Web API.",
          "Worked on backend services, data access, and internal business workflows.",
          "Collaborated with the team to deliver maintainable, tested application modules.",
        ],
      },
    ]);
  }

  const projectCount = await Project.countDocuments();
  if (projectCount === 0) {
    await Project.insertMany([
      {
        title: "Bhrosa Cab Platform",
        description:
          "Full-stack cab booking and operations platform: rides, drivers, bookings, and an admin experience built on the MERN stack.",
        techStack: ["React", "Node.js", "Express", "MongoDB", "JWT"],
        liveUrl: "",
        githubUrl: "https://github.com/Ritesh926",
        featured: true,
        order: 1,
        imageUrl: "",
      },
      {
        title: "Hospital Management System (Multi-Tenant)",
        description:
          "Multi-tenant hospital management system covering patients, appointments, staff, and hospital-level isolation with a structured backend.",
        techStack: ["React", "Node.js", "MongoDB", "Multi-tenant"],
        liveUrl: "",
        githubUrl: "https://github.com/Ritesh926",
        featured: true,
        order: 2,
        imageUrl: "",
      },
      {
        title: "Wanderlust Travel Booking Platform",
        description:
          "Travel listing and booking experience inspired by modern stay platforms — listings, reviews, and reservation-oriented UX.",
        techStack: ["Node.js", "Express", "MongoDB", "EJS"],
        liveUrl: "",
        githubUrl: "https://github.com/Ritesh926",
        featured: false,
        order: 3,
        imageUrl: "",
      },
    ]);
  }

  const certCount = await Certification.countDocuments();
  if (certCount === 0) {
    await Certification.insertMany([
      {
        title: "Full Stack Web Development (MERN Stack)",
        issuer: "Apna College",
        date: "2025",
        order: 1,
      },
      {
        title: "AI/ML Virtual Internship",
        issuer: "AICTE & Google for Developers",
        date: "2025",
        order: 2,
      },
      {
        title: "Hackathon Winner — Next Quantum 2.0",
        issuer: "Next Quantum 2.0",
        date: "2025",
        order: 3,
      },
    ]);
  }

  const eduCount = await Education.countDocuments();
  if (eduCount === 0) {
    await Education.create({
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "Gulzar Group of Institutions",
      startYear: "2023",
      endYear: "2026",
      sgpa: "8.39",
      description: "Focused on software development, databases, and full-stack web technologies.",
      order: 1,
    });
  }

  console.log("Seed complete.");
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
