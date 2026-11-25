"use client";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { supabase } from "./supabase";

const SupabaseClientContext = createContext<SupabaseClient | null>(supabase);

function useSupabaseClient() {
  const client = useContext(SupabaseClientContext);

  if (!client) {
    throw new Error("useSupabaseClient must be used within SupabaseClientProvider");
  }
  return client;
}

const { Provider } = SupabaseClientContext;

export function SupabaseClientProvider({ children }: { children: ReactNode }) {
  const client = useSupabaseClient();

  return <Provider value={client}>{children}</Provider>;
}

export { useSupabaseClient, SupabaseClientContext };
