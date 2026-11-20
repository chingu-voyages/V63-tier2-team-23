import type { SupabaseClient } from "@supabase/supabase-js";
import { createContext, useContext } from "react";
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

export { Provider as SupabaseClientProvider, useSupabaseClient, SupabaseClientContext };
