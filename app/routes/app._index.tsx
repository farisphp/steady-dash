import { LoaderFunctionArgs } from "@remix-run/node";
import { useOutletContext } from "@remix-run/react";
import { SupabaseClient, User } from "@supabase/supabase-js";

import { privatePageProtector } from "utils/auth.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await privatePageProtector(request, "/app/login");

  return null;
};

export default function Index() {
  const { user, supabase } = useOutletContext<{
    user: User | null;
    supabase: SupabaseClient;
  }>();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Dashboard App</h1>
      <span>{user?.email || "Not authenticated"}</span>
      <button onClick={handleLogout}>LOGOUT</button>
    </div>
  );
}
