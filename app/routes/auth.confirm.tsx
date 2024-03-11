import { redirect, type LoaderFunctionArgs } from "@remix-run/node";

import { createServerClient } from "utils/supabase.server";

import { type EmailOtpType } from "@supabase/supabase-js";

export async function loader({ request }: LoaderFunctionArgs) {
  const requestUrl = new URL(request.url);
  const token_hash = requestUrl.searchParams.get("token_hash");
  const type = requestUrl.searchParams.get("type") as EmailOtpType | null;
  const next = requestUrl.searchParams.get("next") || "/";
  const headers = new Headers();

  if (token_hash && type) {
    const supabase = createServerClient({ request });

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (!error) {
      return redirect(next, { headers });
    }
  }

  // return the user to an error page with instructions
  return redirect("/auth/auth-code-error", { headers });
}
