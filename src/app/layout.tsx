import type { Metadata } from "next";
import "./globals.css";
import { inter, manrope } from "@/app/fonts";

export const metadata: Metadata = {
  title: "Event Planner",
  description: "Plan and manage your events",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.className} ${manrope.className}`}>
      <body>{children}</body>
    </html>
  );
}
