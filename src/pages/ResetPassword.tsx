// ResetPassword.jsx
import { useEffect, useState } from "react";
import { supabase } from "./supabase";

export default function ResetPassword() {
  const [viewReady, setViewReady] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [status, setStatus] = useState(null);

  useEffect(() => {
    // If the user arrived via the email link, Supabase emits PASSWORD_RECOVERY.
    const { data: sub } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === "PASSWORD_RECOVERY") setViewReady(true);
    });

    // Also handle the case where the session is already established on load.
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session) setViewReady(true);
    })();

    return () => sub.subscription.unsubscribe();
  }, []);

  const onUpdate = async (e) => {
    e.preventDefault();
    setStatus("updating");
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) setStatus(`error:${error.message}`);
    else setStatus("updated");
  };

  if (!viewReady) return <p>Verifying reset link…</p>;

  return (
    <form onSubmit={onUpdate}>
      <input
        type="password"
        placeholder="New password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        minLength={8}
        required
      />
      <button type="submit" disabled={status === "updating"}>
        Set new password
      </button>
      {status === "updated" && <p>Password updated. You’re all set!</p>}
      {status?.startsWith("error:") && <p>{status.slice(6)}</p>}
    </form>
  );
}