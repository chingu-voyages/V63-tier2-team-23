"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button/Button";
import Feedback from "@/components/Feedback/Feedback";
import Text from "@/components/Text/Text";
import { useAuth } from "@/libs/auth/useAuth";

export default function EventListPage() {
  const { signOut } = useAuth();
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleLogout = async () => {
    if (isSigningOut) return;

    setError(null);
    setIsSigningOut(true);

    try {
      const { error: signOutError } = await signOut();

      if (signOutError) {
        setError("Unable to log out. Please try again.");
        return;
      }

      router.push("/login");
    } catch {
      setError("Unable to log out. Please try again.");
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-outline-variant bg-surface">
        <div className="sm:min-h-[98px] sm:px-6 mx-auto flex min-h-18 max-w-352 flex-wrap items-center justify-between gap-3 px-5 py-4">
          <Text type="subheadline" className="shrink-0 text-primary">
            event planner
          </Text>

          <nav aria-label="Main navigation" className="sm:gap-8 flex items-center gap-3">
            <a href="/events" aria-current="page" className="text-label text-on-surface-variant">
              My events
            </a>

            <Button
              variant="text"
              type="button"
              onClick={handleLogout}
              disabled={isSigningOut}
              className="bg-transparent p-0 text-on-surface-variant disabled:opacity-60"
            >
              {isSigningOut ? "Logging out..." : "Log out"}
            </Button>
          </nav>
        </div>
      </header>

      <main className="sm:px-8 sm:pt-12 mx-auto w-full max-w-303.5 px-5 pt-8 pb-12">
        <section aria-labelledby="events-heading">
          <Text type="label" className="mb-2 block tracking-wide text-primary uppercase">
            Your workspace
          </Text>

          <h1 id="events-heading">
            <Text type="title" className="block text-on-background">
              My events
            </Text>
          </h1>

          <Text type="subheadline" className="mt-2 block text-on-surface-variant">
            Make space for something good.
          </Text>

          <div className="sm:min-h-[257px] sm:px-10 sm:py-[52px] lg:px-[52px] mt-6 min-h-55 rounded-large border border-outline-variant bg-surface px-6 py-8">
            <h2>
              <Text type="headline" className="block text-on-surface">
                Your first event starts here.
              </Text>
            </h2>

            <Text type="subheadline" className="mt-4 block text-on-surface-variant">
              You haven&apos;t created any events yet.
            </Text>

            <Button variant="primary" type="button" className="mt-4 p-4">
              Create your first event
            </Button>
          </div>

          {error && <Feedback type="error" message={error} role="alert" className="mt-4" />}
        </section>
      </main>
    </div>
  );
}
