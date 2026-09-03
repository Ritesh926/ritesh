import { useEffect, useState } from "react";
import { getProfile, updateProfile, uploadPhoto, uploadResume } from "../../api/services";
import { mediaUrl } from "../../api/client";

const empty = {
  name: "",
  designation: "",
  roles: "",
  tagline: "",
  bio: "",
  location: "",
  educationQuickFact: "",
  email: "",
  phone: "",
  linkedin: "",
  github: "",
};

export default function ProfilePage() {
  const [form, setForm] = useState(empty);
  const [profile, setProfile] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    getProfile().then((res) => {
      const p = res.data || {};
      setProfile(p);
      setForm({
        name: p.name || "",
        designation: p.designation || "",
        roles: (p.roles || []).join(", "),
        tagline: p.tagline || "",
        bio: p.bio || "",
        location: p.location || "",
        educationQuickFact: p.educationQuickFact || "",
        email: p.email || "",
        phone: p.phone || "",
        linkedin: p.linkedin || "",
        github: p.github || "",
      });
    });
  }, []);

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  async function onSave(e) {
    e.preventDefault();
    const res = await updateProfile(form);
    setProfile(res.data);
    setStatus("Saved. The public site will show this immediately.");
  }

  async function onFile(kind, file) {
    if (!file) return;
    const res = kind === "photo" ? await uploadPhoto(file) : await uploadResume(file);
    setProfile(res.data);
    setStatus(kind === "photo" ? "Photo updated" : "Resume updated");
  }

  return (
    <div className="max-w-3xl">
      <h2 className="text-2xl font-semibold">Profile</h2>
      <form onSubmit={onSave} className="mt-6 space-y-4">
        <input value={form.name} onChange={set("name")} placeholder="Name" required />
        <input value={form.designation} onChange={set("designation")} placeholder="Designation / role line" />
        <input value={form.roles} onChange={set("roles")} placeholder="Animated roles, comma-separated" />
        <input value={form.tagline} onChange={set("tagline")} placeholder="Tagline" />
        <textarea rows={5} value={form.bio} onChange={set("bio")} placeholder="Bio" />
        <div className="grid gap-4 sm:grid-cols-2">
          <input value={form.location} onChange={set("location")} placeholder="Location" />
          <input value={form.educationQuickFact} onChange={set("educationQuickFact")} placeholder="Education fact" />
          <input value={form.email} onChange={set("email")} placeholder="Email" />
          <input value={form.phone} onChange={set("phone")} placeholder="Phone" />
          <input value={form.linkedin} onChange={set("linkedin")} placeholder="LinkedIn URL" />
          <input value={form.github} onChange={set("github")} placeholder="GitHub URL" />
        </div>
        <button className="rounded-full bg-accent px-5 py-2 text-sm" type="submit">
          Save profile
        </button>
      </form>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <label className="glass block rounded-2xl p-4 text-sm">
          Profile photo
          <input className="mt-3" type="file" accept="image/*" onChange={(e) => onFile("photo", e.target.files[0])} />
          {profile?.photoUrl ? (
            <img src={mediaUrl(profile.photoUrl)} alt="" className="mt-3 h-24 w-24 rounded-full object-cover" />
          ) : null}
        </label>
        <label className="glass block rounded-2xl p-4 text-sm">
          Resume PDF
          <input className="mt-3" type="file" accept="application/pdf" onChange={(e) => onFile("resume", e.target.files[0])} />
          {profile?.resumeUrl ? (
            <a className="mt-3 block text-cyan" href={mediaUrl(profile.resumeUrl)} target="_blank" rel="noreferrer">
              View current resume
            </a>
          ) : (
            <p className="mt-3 text-slate-400">No resume uploaded yet.</p>
          )}
        </label>
      </div>
      {status ? <p className="mt-4 text-sm text-cyan">{status}</p> : null}
    </div>
  );
}
