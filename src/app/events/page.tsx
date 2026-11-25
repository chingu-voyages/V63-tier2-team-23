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
        <div className="flex min-h-22 w-full flex-wrap items-center justify-between gap-3 pr-8 pl-5">
          <Text type="subheadline" className="shrink-0 text-primary">
            event planner
          </Text>

          <nav aria-label="Main navigation" className="flex items-center gap-8">
            <a href="/events" aria-current="page" className="text-label text-on-surface-variant">
              My events
            </a>

            <Button
              variant="text"
              type="button"
              onClick={handleLogout}
              disabled={isSigningOut}
              className="bg-transparent p-0! text-on-surface-variant disabled:opacity-60"
            >
              {isSigningOut ? "Logging out..." : "Log out"}
            </Button>
          </nav>
        </div>
      </header>

      <main className="w-full px-6 pt-6 pb-12 tablet:px-12 tablet:pt-12 desktop:px-22">
        <section aria-labelledby="events-heading">
          <Text type="label" className="mb-2 block tracking-wide text-primary uppercase">
            Your workspace
          </Text>

          <h1 id="events-heading">
            <Text type="title" className="block text-on-background">
              My events
            </Text>
          </h1>

          <Text type="body" className="mt-1 block text-on-surface-variant">
            Make space for something good.
          </Text>

          <div className="mt-6 rounded-large border border-outline-variant bg-surface p-6 tablet:p-12">
            <h2>
              <Text type="headline" className="block text-on-surface">
                Your first event starts here.
              </Text>
            </h2>

            <Text type="body" className="mt-4 block text-on-surface-variant">
              You haven&rsquo;t created any events yet.
            </Text>

            <Button
              variant="primary"
              type="button"
              className="mt-4 h-12 w-full px-3.5 tablet:w-auto"
            >
              Create your first event
            </Button>
          </div>

          {error && <Feedback type="error" message={error} role="alert" className="mt-4" />}
        </section>
      </main>
    </div>
  );
}
