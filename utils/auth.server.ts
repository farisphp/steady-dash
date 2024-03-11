import { redirect } from "@remix-run/node";

import { createServerClient } from "./supabase.server";

export const privatePageProtector = async (
  request: Request,
  redirectTo: string
) => {
  const supabase = createServerClient({ request });
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user || error) throw redirect(redirectTo);
};

export const privateEntryProtector = async (
  request: Request,
  redirectTo: string
) => {
  const supabase = createServerClient({ request });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) throw redirect(redirectTo);
};
