# Ritesh Kumar — Dynamic Portfolio + Admin CMS

Production-style MERN portfolio: public site is fully driven by MongoDB, and `/admin` is a JWT-protected CMS so you can change profile, skills, experience, projects, certificates, education, resume, and photos without editing code.

## Stack

- **Frontend:** React (Vite) + Tailwind CSS + Framer Motion + React Router
- **Backend:** Node.js + Express + Mongoose
- **Auth:** JWT (admin only)
- **Uploads:** Cloudinary when env vars are set, otherwise local `server/uploads`
- **Email:** Nodemailer when SMTP is set; messages are always stored in MongoDB

## Folder structure

```
client/   React app (public site + admin panel)
server/   Express API
```

## 1. MongoDB Atlas

1. Create a cluster and a database user.
2. Allow your IP (or `0.0.0.0/0` for local development).
3. Copy the connection string.

## 2. Backend setup

```bash
cd server
copy .env.example .env
```

On macOS/Linux use `cp .env.example .env`.

Edit `server/.env`:

- `MONGODB_URI` — Atlas URI (replace username, password, cluster)
- `JWT_SECRET` — long random string
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — first admin (used by seed)
- Optional: Cloudinary keys
- Optional: SMTP keys for contact emails

```bash
npm install
npm run seed
npm run dev
```

API: `http://localhost:5000`  
Health: `http://localhost:5000/api/health`

Default admin after seed (unless you changed env):

- Email: `admin@ritesh.dev`
- Password: `Admin@12345`

Change this password from **Admin → Password** after first login.

Seed is idempotent for content: it creates the admin if missing and inserts starter resume data only when collections are empty. Profile fields are upserted.

## 3. Frontend setup

```bash
cd client
copy .env.example .env
npm install
npm run dev
```

Vite runs at `http://localhost:5173` and proxies `/api` and `/uploads` to the backend.

## 4. What the public site loads from the API

Hero, about, skills, experience, projects, certifications, education, contact details, social links, resume download, and resume view counts.

## 5. Admin panel

Open `http://localhost:5173/admin/login`.

You can:

- Edit name, tagline, bio, animated roles, contact, socials
- Upload profile photo and resume PDF
- CRUD skill categories and skills
- CRUD experience, projects (with image + featured flag), certificates (image/PDF), education
- Read/delete contact messages
- See dashboard counts including resume views

Writes require a Bearer JWT. Public `GET` routes do not.

## 6. Contact form

Messages are saved to MongoDB. If `SMTP_HOST`, `SMTP_USER`, and `SMTP_PASS` are set, Nodemailer also sends email to `CONTACT_TO`.

## 7. Deployment

**API (Render / Railway / any Node host)**

- Root: `server`
- Start: `npm start`
- Set the same env vars as `.env.example`
- Set `CLIENT_URL` to your frontend origin for CORS

**Frontend (Vercel / Netlify)**

- Root: `client`
- Build: `npm run build`
- Output: `dist`
- Set `VITE_API_URL` to `https://YOUR-API-HOST/api`
- Set `VITE_API_ORIGIN` to `https://YOUR-API-HOST` so `/uploads/...` images resolve

`client/vercel.json` already rewrites to `index.html` for React Router.

## 8. Scripts (repo root)

```bash
npm run install:all
npm run seed
npm run dev:server
npm run dev:client
```

Run the last two in two terminals.
