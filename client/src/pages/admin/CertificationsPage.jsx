import { useEffect, useState } from "react";
import { deleteCertification, getCertifications, saveCertification } from "../../api/services";
import { ConfirmModal, Modal } from "../../components/ui/Modal";
import { EmptyState } from "../../components/ui/Primitives";

const blank = { title: "", issuer: "", date: "", credentialUrl: "", file: null };

export default function CertificationsPage() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(blank);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const load = () => getCertifications().then((res) => setItems(res.data || []));
  useEffect(() => {
    load();
  }, []);

  function openEdit(item) {
    setEditing(item?._id || null);
    setForm(
      item
        ? {
            title: item.title,
            issuer: item.issuer,
            date: item.date || "",
            credentialUrl: item.credentialUrl || "",
            file: null,
          }
        : blank
    );
    setOpen(true);
  }

  async function onSubmit(e) {
    e.preventDefault();
    await saveCertification(form, editing);
    setOpen(false);
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Certifications</h2>
        <button className="rounded-full bg-accent px-4 py-2 text-sm" type="button" onClick={() => openEdit(null)}>
          Add
        </button>
      </div>
      <div className="mt-6 space-y-3">
        {items.length === 0 ? <EmptyState title="No certifications yet" /> : null}
        {items.map((item) => (
          <div key={item._id} className="glass flex flex-wrap items-center justify-between gap-3 rounded-2xl p-4">
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-slate-400">
                {item.issuer} · {item.date}
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
      <Modal open={open} title={editing ? "Edit certificate" : "Add certificate"} onClose={() => setOpen(false)}>
        <form onSubmit={onSubmit} className="space-y-3">
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Title" required />
          <input value={form.issuer} onChange={(e) => setForm({ ...form, issuer: e.target.value })} placeholder="Issuer" required />
          <input value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} placeholder="Date" />
          <input value={form.credentialUrl} onChange={(e) => setForm({ ...form, credentialUrl: e.target.value })} placeholder="Credential URL" />
          <input type="file" accept="image/*,application/pdf" onChange={(e) => setForm({ ...form, file: e.target.files[0] })} />
          <button className="rounded-full bg-accent px-4 py-2 text-sm" type="submit">
            Save
          </button>
        </form>
      </Modal>
      <ConfirmModal
        open={Boolean(deleteId)}
        title="Delete certificate"
        message="Remove this certificate from the public site?"
        onClose={() => setDeleteId(null)}
        onConfirm={async () => {
          await deleteCertification(deleteId);
          setDeleteId(null);
          load();
        }}
      />
    </div>
  );
}
