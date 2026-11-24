"use client";
import { useState, type FormEvent, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/libs/auth/useAuth";
import type { Credentials } from "@/libs/auth/AuthProvider";
import Text from "@/components/Text/Text";
import Field from "@/components/Field/Field";
import Feedback from "@/components/Feedback/Feedback";
import Button from "@/components/Button/Button";

export default function LoginPage() {
  const { session, signIn } = useAuth();
  const { push } = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    password: "",
  });
  const [authError, setAuthError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAuthError("");

    const newErrors = {
      email: email.trim() === "" ? "Enter your email address." : "",
      password: password.trim() === "" ? "Enter your password." : "",
    };

    setFieldErrors(newErrors);
    if (newErrors.email || newErrors.password) {
      return;
    }
    setIsSubmitting(true);

    const response = await signIn({ email, password } as Credentials);

    setIsSubmitting(false);

    if (response.error) {
      setAuthError("Invalid email or password.");
      return;
    }
    push("/events");
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
            A LITTLE PLANNING, GREAT EVENT.
          </Text>
          <Text type="display" className="text-on-secondary">
            Your next event start here.&nbsp;
          </Text>
          <Text type="body" className="text-on-secondary">
            Create it, make it happend.
          </Text>
        </div>

        <div className="flex flex-col gap-6 tablet:w-120 tablet:rounded-large tablet:bg-surface tablet:p-8 desktop:w-140">
          <div className="flex flex-col gap-2">
            <h1>
              <Text type="title" className="text-on-surface">
                Welcome back
              </Text>
            </h1>
            <Text type="body" className="text-on-surface-variant">
              Log in to manage your events
            </Text>
          </div>

          {authError && <Feedback type="error" message={authError} />}

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <Field
                id="email"
                name="email"
                type="text"
                label="Email"
                placeholder="you@example.com"
                className="w-full"
                value={email}
                error={Boolean(fieldErrors.email)}
                required
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setEmail(e.target.value);
                  if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: "" });
                }}
              />
              {fieldErrors.email && (
                <Text type="caption" className="text-error">
                  {fieldErrors.email}
                </Text>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Field
                id="password"
                name="password"
                label="Password"
                placeholder="Enter password"
                className="w-full"
                value={password}
                error={Boolean(fieldErrors.password)}
                required
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setPassword(e.target.value);
                  if (fieldErrors.password) setFieldErrors({ ...fieldErrors, password: "" });
                }}
              />
              {fieldErrors.password && (
                <Text type="caption" className="text-error">
                  {fieldErrors.password}
                </Text>
              )}
            </div>
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Logging in ..." : "Log in"}
            </Button>
          </form>
          <div className="mt-6 flex flex-col gap-1">
            <Text type="body" className="text-on-surface-variant">
              New to Event Planner?
            </Text>
            <Link href="/signup" className="text-primary">
              Create an account
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
