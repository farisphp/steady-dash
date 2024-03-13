import { Outlet, useOutletContext } from "@remix-run/react";
import { SupabaseClient, User, Session } from "@supabase/supabase-js";

import { AppLayout } from "~/components/layout";

export default function App() {
  const { supabase, session, user } = useOutletContext<{
    supabase: SupabaseClient;
    user: User | null;
    session: Session | null;
  }>();

  return (
    <AppLayout>
      <Outlet context={{ supabase, session, user }} />
    </AppLayout>
  );
}
