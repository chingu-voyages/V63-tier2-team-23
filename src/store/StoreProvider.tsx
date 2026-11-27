"use client";
import { useState, type ReactNode } from "react";
import { Provider } from "react-redux";
import { makeStore } from "./index";
import { createClient } from "@supabase/supabase-js";

export default function StoreProvider({ children }: { children: ReactNode }) {
  const [store] = useState(() => {
    const supabaseClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    );

    return makeStore(supabaseClient);
  });

  return <Provider store={store}>{children}</Provider>;
}
