import { useEffect, useState } from "react";
import { createExperience, deleteExperience, getExperience, updateExperience } from "../../api/services";
import { ConfirmModal, Modal } from "../../components/ui/Modal";
import { EmptyState } from "../../components/ui/Primitives";

const blank = {
  company: "",
  role: "",
  location: "",
  startDate: "",
  endDate: "",
  current: false,
  bullets: "",
  order: 0,
};

export default function ExperiencePage() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(blank);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const load = () => getExperience().then((res) => setItems(res.data || []));
  useEffect(() => {
    load();
  }, []);

  function openEdit(item) {
    setEditing(item?._id || null);
    setForm(
      item
        ? {
            company: item.company,
            role: item.role,
            location: item.location || "",
            startDate: item.startDate,
            endDate: item.endDate || "",
            current: Boolean(item.current),
            bullets: (item.bullets || []).join("\n"),
            order: item.order || 0,
          }
        : blank
    );
    setOpen(true);
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (editing) await updateExperience(editing, form);
    else await createExperience(form);
    setOpen(false);
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Experience</h2>
        <button className="rounded-full bg-accent px-4 py-2 text-sm" type="button" onClick={() => openEdit(null)}>
          Add
        </button>
      </div>
      <div className="mt-6 space-y-3">
        {items.length === 0 ? <EmptyState title="No experience entries" /> : null}
        {items.map((item) => (
          <div key={item._id} className="glass flex flex-wrap items-center justify-between gap-3 rounded-2xl p-4">
            <div>
              <p className="font-medium">{item.role}</p>
              <p className="text-sm text-slate-400">
                {item.company} · {item.startDate} — {item.endDate}
              </p>
            </div>
            <div className="flex gap-3 text-sm">
              <button type="button" onClick={() => openEdit(item)}>
                Edit
              </button>
              <button type="button" className="text-rose-400" onClick={() => setDeleteId(item._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <Modal open={open} title={editing ? "Edit experience" : "Add experience"} onClose={() => setOpen(false)}>
        <form onSubmit={onSubmit} className="space-y-3">
          <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Company" required />
          <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="Role" required />
          <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Location" />
          <div className="grid grid-cols-2 gap-3">
            <input value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} placeholder="Start" required />
            <input value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} placeholder="End" />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.current} onChange={(e) => setForm({ ...form, current: e.target.checked })} />
            Current role
          </label>
          <textarea rows={5} value={form.bullets} onChange={(e) => setForm({ ...form, bullets: e.target.value })} placeholder="One bullet per line" />
          <button className="rounded-full bg-accent px-4 py-2 text-sm" type="submit">
            Save
          </button>
        </form>
      </Modal>
      <ConfirmModal
        open={Boolean(deleteId)}
        title="Delete experience"
        message="This entry will be removed from the public timeline."
        onClose={() => setDeleteId(null)}
        onConfirm={async () => {
          await deleteExperience(deleteId);
          setDeleteId(null);
          load();
        }}
      />
    </div>
  );
}
