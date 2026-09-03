import { useEffect, useState } from "react";
import { deleteMessage, getMessages } from "../../api/services";
import { ConfirmModal } from "../../components/ui/Modal";
import { EmptyState } from "../../components/ui/Primitives";

export default function MessagesPage() {
  const [items, setItems] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  const load = () => getMessages().then((res) => setItems(res.data || []));
  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold">Messages</h2>
      <div className="mt-6 space-y-3">
        {items.length === 0 ? <EmptyState title="No messages yet" hint="Public contact form submissions appear here." /> : null}
        {items.map((item) => (
          <article key={item._id} className="glass rounded-2xl p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-cyan">{item.email}</p>
              </div>
              <button type="button" className="text-sm text-rose-400" onClick={() => setDeleteId(item._id)}>
                Delete
              </button>
            </div>
            <p className="mt-3 text-sm text-slate-300">{item.message}</p>
            <p className="mt-2 text-xs text-slate-500">{new Date(item.createdAt).toLocaleString()}</p>
          </article>
        ))}
      </div>
      <ConfirmModal
        open={Boolean(deleteId)}
        title="Delete message"
        message="This cannot be undone."
        onClose={() => setDeleteId(null)}
        onConfirm={async () => {
          await deleteMessage(deleteId);
          setDeleteId(null);
          load();
        }}
      />
    </div>
  );
}
