import { json } from "@remix-run/node";
import { Outlet, useLoaderData, useRevalidator } from "@remix-run/react";
import { createBrowserClient } from "@supabase/ssr";
import { useEffect, useState } from "react";

import { createServerClient } from "~/utils/supabase.server";

import type { LoaderFunctionArgs } from "@remix-run/node";

// this uses Pathless Layout Routes [1] to wrap up all our Supabase logic

// [1] https://remix.run/docs/en/v1/guides/routing#pathless-layout-routes

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // environment variables may be stored somewhere other than
  // `process.env` in runtimes other than node
  // we need to pipe these Supabase environment variables to the browser
  const env = {
    SUPABASE_URL: process.env.SUPABASE_URL!,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
  };

  // We can retrieve the session on the server and hand it to the client.
  // This is used to make sure the session is available immediately upon rendering
  const response = new Response();

  const supabase = createServerClient({ request });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // in order for the set-cookie header to be set,
  // headers must be returned as part of the loader response
  return json(
    {
      env,
      session,
      user,
    },
    {
      headers: response.headers,
    },
  );
};

export default function App() {
  const { env, session, user } = useLoaderData<typeof loader>();
  const { revalidate } = useRevalidator();

  // it is important to create a single instance of Supabase
  // to use across client components - outlet context 👇
  const [supabase] = useState(() =>
    createBrowserClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY),
  );

  const serverAccessToken = session?.access_token;

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (
        session?.access_token !== serverAccessToken &&
        event !== "INITIAL_SESSION"
      ) {
        // server and client are out of sync.
        revalidate();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [serverAccessToken, supabase, revalidate]);

  return (
    <>
      <Outlet context={{ supabase, session, user }} />
    </>
  );
}
