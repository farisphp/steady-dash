import { LoaderFunctionArgs } from "@remix-run/node";
import { useOutletContext } from "@remix-run/react";
import { SupabaseClient } from "@supabase/supabase-js";
import { privateEntryProtector } from "utils/auth.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await privateEntryProtector(request, "/app");

  return null;
};

export default function Login() {
  const { supabase } = useOutletContext<{ supabase: SupabaseClient }>();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: "faris.perwira@gmail.com",
      password: "Vincere#123",
    });

    if (error) {
      alert("ERROR LOGIN, CHECK CONSOLE");
      console.log({ error });
    }
  };

  return <button onClick={handleLogin}>LOGIN</button>;
}
