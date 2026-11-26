"use client";
import type { Metadata } from "next";
import "./globals.css";
import { inter, manrope } from "@/app/fonts";
import { SupabaseClientProvider } from "@/libs/supabase/SupabaseClientProvider";
import { AuthProvider } from "@/libs/auth/AuthProvider";
import StoreProvider from "@/store/StoreProvider";

export const metadata: Metadata = {
  title: "Event Planner",
  description: "Plan and manage your events",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.className} ${manrope.className}`}>
      <body>
        <StoreProvider>
          <SupabaseClientProvider>
            <AuthProvider>{children}</AuthProvider>
          </SupabaseClientProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
