import { useEffect, useState } from "react";
import { createEducation, deleteEducation, getEducation, updateEducation } from "../../api/services";
import { ConfirmModal, Modal } from "../../components/ui/Modal";
import { EmptyState } from "../../components/ui/Primitives";

const blank = { degree: "", institution: "", startYear: "", endYear: "", sgpa: "", description: "" };

export default function EducationPage() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(blank);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const load = () => getEducation().then((res) => setItems(res.data || []));
  useEffect(() => {
    load();
  }, []);

  function openEdit(item) {
    setEditing(item?._id || null);
    setForm(item ? { ...blank, ...item } : blank);
    setOpen(true);
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (editing) await updateEducation(editing, form);
    else await createEducation(form);
    setOpen(false);
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Education</h2>
        <button className="rounded-full bg-accent px-4 py-2 text-sm" type="button" onClick={() => openEdit(null)}>
          Add
        </button>
      </div>
      <div className="mt-6 space-y-3">
        {items.length === 0 ? <EmptyState title="No education entries" /> : null}
        {items.map((item) => (
          <div key={item._id} className="glass flex flex-wrap items-center justify-between gap-3 rounded-2xl p-4">
            <div>
              <p className="font-medium">{item.degree}</p>
              <p className="text-sm text-slate-400">
                {item.institution} · SGPA {item.sgpa}
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
      <Modal open={open} title={editing ? "Edit education" : "Add education"} onClose={() => setOpen(false)}>
        <form onSubmit={onSubmit} className="space-y-3">
          <input value={form.degree} onChange={(e) => setForm({ ...form, degree: e.target.value })} placeholder="Degree" required />
          <input value={form.institution} onChange={(e) => setForm({ ...form, institution: e.target.value })} placeholder="Institution" required />
          <div className="grid grid-cols-2 gap-3">
            <input value={form.startYear} onChange={(e) => setForm({ ...form, startYear: e.target.value })} placeholder="Start year" />
            <input value={form.endYear} onChange={(e) => setForm({ ...form, endYear: e.target.value })} placeholder="End year" />
          </div>
          <input value={form.sgpa} onChange={(e) => setForm({ ...form, sgpa: e.target.value })} placeholder="SGPA" />
          <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" />
          <button className="rounded-full bg-accent px-4 py-2 text-sm" type="submit">
            Save
          </button>
        </form>
      </Modal>
      <ConfirmModal
        open={Boolean(deleteId)}
        title="Delete education"
        message="Remove this education entry?"
        onClose={() => setDeleteId(null)}
        onConfirm={async () => {
          await deleteEducation(deleteId);
          setDeleteId(null);
          load();
        }}
      />
    </div>
  );
}
