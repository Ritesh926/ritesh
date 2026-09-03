import { useEffect } from "react";

export function Modal({ open, title, children, onClose }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4" onClick={onClose}>
      <div
        className="glass w-full max-w-lg rounded-2xl p-6 shadow-glow"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button className="text-slate-400 hover:text-white" onClick={onClose} type="button">
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function ConfirmModal({ open, title, message, onConfirm, onClose }) {
  return (
    <Modal open={open} title={title} onClose={onClose}>
      <p className="text-sm text-slate-300">{message}</p>
      <div className="mt-6 flex justify-end gap-3">
        <button type="button" className="rounded-full border border-white/15 px-4 py-2 text-sm" onClick={onClose}>
          Cancel
        </button>
        <button
          type="button"
          className="rounded-full bg-rose-600 px-4 py-2 text-sm font-medium"
          onClick={onConfirm}
        >
          Delete
        </button>
      </div>
    </Modal>
  );
}
