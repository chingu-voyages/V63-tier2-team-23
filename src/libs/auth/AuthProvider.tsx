"use client";
import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { AuthApiError, Session, User } from "@supabase/supabase-js";
import { useSupabaseClient } from "@/libs/supabase/SupabaseClientProvider";

export type Credentials = {
  email: string;
  password: string;
};

/**
 * Error code for signIn
 * "invalid_credentials"
 *
 * signUp:
 * "user_already_exists"
 *
 * signOut: doesn't return any error
 */
type AuthResponse = {
  data: {
    session: Session | null;
    user: User | null;
  };
  error: AuthApiError["code"] | null;
};

type SignOutResponse = Omit<AuthResponse, "data">;

export type AuthContextType = {
  session: Session | null;
  user: User | null;
  signUp: (credentials: Credentials) => Promise<AuthResponse>;
  signIn: (credentials: Credentials) => Promise<AuthResponse>;
  signOut: () => Promise<SignOutResponse>;
};

const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({ children }: { children: ReactNode }) {
  const client = useSupabaseClient();
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const {
      data: {
        subscription: { unsubscribe },
      },
    } = client.auth.onAuthStateChange((event, authSession) => {
      setSession(authSession);
      setUser(authSession?.user ?? null);

      return () => {
        unsubscribe();
      };
    });
  }, [client]);

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        signUp: async (credentials): Promise<AuthResponse> => {
          const response = await client.auth.signUp(credentials);
          return { ...response, error: response.error?.code || null };
        },
        signIn: async (credentials): Promise<AuthResponse> => {
          const response = await client.auth.signInWithPassword(credentials);
          return { ...response, error: response.error?.code || null };
        },
        signOut: async (): Promise<SignOutResponse> => {
          const response = await client.auth.signOut();
          return { error: response.error?.code || null };
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
