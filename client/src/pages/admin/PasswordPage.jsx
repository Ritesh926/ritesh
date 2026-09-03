import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function PasswordPage() {
  const { updatePassword } = useAuth();
  const [currentPassword, setCurrent] = useState("");
  const [newPassword, setNew] = useState("");
  const [status, setStatus] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("");
    try {
      await updatePassword({ currentPassword, newPassword });
      setStatus("Password updated.");
      setCurrent("");
      setNew("");
    } catch (error) {
      setStatus(error.response?.data?.message || "Could not update password.");
    }
  }

  return (
    <div className="max-w-md">
      <h2 className="text-2xl font-semibold">Change password</h2>
      <form onSubmit={onSubmit} className="mt-6 space-y-3">
        <input type="password" minLength={8} value={currentPassword} onChange={(e) => setCurrent(e.target.value)} placeholder="Current password" required />
        <input type="password" minLength={8} value={newPassword} onChange={(e) => setNew(e.target.value)} placeholder="New password" required />
        <button className="rounded-full bg-accent px-5 py-2 text-sm" type="submit">
          Update
        </button>
      </form>
      {status ? <p className="mt-3 text-sm text-cyan">{status}</p> : null}
    </div>
  );
}
