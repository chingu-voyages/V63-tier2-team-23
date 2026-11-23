"use client";
import Button from "@/components/Button/Button";
import Field from "@/components/Field/Field";
import Text from "@/components/Text/Text";
import Link from "next/link";
import { useAuth } from "@/libs/auth/useAuth";
import { Credentials } from "@/libs/auth/AuthProvider";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const { session, signUp } = useAuth();
  const { push } = useRouter();
  const [error, setError] = useState(false);

  async function handleSubmit(formData: FormData) {
    const form = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
      confirmPassword: string;
    };

    const response = await signUp({
      email: form.email,
      password: form.password,
    } as Credentials);

    if (response.error === "user_already_exists") {
      setError(true);
    }
  }

  if (session !== null) {
    push("/events");
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="flex h-20 flex-col justify-center px-6 tablet:px-12">
        <Text type="subheadline" className="text-primary">
          event planner
        </Text>
      </header>
      <main className="justify-center gap-16 p-6 tablet:p-12 desktop:flex">
        <div className="hidden w-120 flex-col items-start gap-6 rounded-xlarge bg-secondary p-10 desktop:flex">
          <Text type="caption" className="text-on-secondary">
            A LITTLE PLANNING. A GREAT EVENT.
          </Text>
          <Text type="display" className="text-on-secondary">
            Bring people together.&nbsp;
          </Text>
          <Text type="body" className="text-on-secondary">
            Create it. Make it happen.
          </Text>
        </div>
        <div className="flex flex-col gap-6 tablet:w-120 tablet:rounded-large tablet:bg-surface tablet:p-8">
          <div className="flex flex-col gap-y-2">
            <h1>
              <Text type="title" className="text-on-surface">
                Create your account
              </Text>
            </h1>
            <Text type="body" className="text-on-surface-variant">
              Start planning your first event.
            </Text>
          </div>
          <form className="flex flex-col gap-5" action={handleSubmit}>
            <div className="flex flex-col gap-2">
              <Field
                label="Email"
                required
                placeholder="you@example.com"
                className="w-full"
                id="email"
                name="email"
                error={error}
              />
              {error && (
                <Text type="caption" className="text-error">
                  An account with this email already exists.
                </Text>
              )}
            </div>
            <Field
              label="Password"
              required
              placeholder="Enter password"
              className="w-full"
              id="password"
              name="password"
            />
            <Field
              label="Confirm Password"
              required
              placeholder="Re-enter password"
              className="w-full"
              id="confirmPassword"
              name="confirmPassword"
            />
            <Button variant="primary" type="submit">
              Sign up
            </Button>
          </form>
          <div className="mt-6 flex flex-col gap-1">
            <Text type="body" className="text-on-surface-variant">
              Already have an account?
            </Text>
            <Link href="/login">
              <Text type="label" className="text-primary">
                Log in
              </Text>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
