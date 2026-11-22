"use client";
import { useContext } from "react";
import { AuthContext } from "@/libs/auth/AuthProvider";

export function useAuth() {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return { ...auth };
}
