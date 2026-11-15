import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Event Planner",
  description: "Plan and manage your events",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
