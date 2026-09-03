import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { sendContact } from "../../api/services";
import { FadeIn, SectionHeading } from "../ui/Primitives";

export function Contact({ profile }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    try {
      const res = await sendContact(form);
      setStatus(res.message);
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus(error.response?.data?.message || "Could not send message.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="py-20">
      <div className="section-wrap">
        <SectionHeading eyebrow="Let's talk" title="Contact" subtitle="Send a message — it is stored in the admin panel and emailed if SMTP is configured." />
        <div className="grid gap-8 lg:grid-cols-2">
          <FadeIn className="space-y-4">
            <div className="glass hover-box flex items-center gap-3.5 rounded-2xl p-4">
              <Mail className="text-cyan" size={18} />
              <a
                href={`mailto:${profile?.email}`}
                className="font-medium text-slate-800 dark:text-slate-200 hover:text-cyan transition-colors"
              >
                {profile?.email}
              </a>
            </div>
            <div className="glass hover-box flex items-center gap-3.5 rounded-2xl p-4">
              <Phone className="text-cyan" size={18} />
              <a
                href={`tel:${profile?.phone}`}
                className="font-medium text-slate-800 dark:text-slate-200 hover:text-cyan transition-colors"
              >
                {profile?.phone}
              </a>
            </div>
            <div className="glass hover-box flex items-center gap-3.5 rounded-2xl p-4">
              <MapPin className="text-cyan" size={18} />
              <span className="font-medium text-slate-800 dark:text-slate-200">{profile?.location}</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <form onSubmit={onSubmit} className="glass hover-box space-y-4 rounded-3xl p-6 sm:p-8">
              <input
                required
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                required
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <textarea
                required
                minLength={10}
                rows={5}
                placeholder="Message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
              <button
                disabled={loading}
                className="w-full rounded-full bg-accent py-2.5 text-sm font-medium text-white shadow-glow transition-all duration-200 hover:brightness-110 active:scale-95 disabled:opacity-60"
                type="submit"
              >
                {loading ? "Sending..." : "Send message"}
              </button>
              {status ? <p className="text-sm text-cyan">{status}</p> : null}
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
