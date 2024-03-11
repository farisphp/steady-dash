import { redirect } from "@remix-run/node";

import { createServerClient } from "./supabase.server";

export const pageProtector = async (
  request: Request,
  redirectTo: string,
  type: "PRIVATE" | "PUBLIC",
) => {
  const currentUrl = new URL(request.url);
  if (currentUrl.pathname === redirectTo) return;

  const supabase = createServerClient({ request });
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if ((!user || error) && type === "PRIVATE") throw redirect(redirectTo);

  if (user && type === "PUBLIC") throw redirect(redirectTo);
};
