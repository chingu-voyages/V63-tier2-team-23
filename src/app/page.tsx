"use client";
import useAuth from "@/libs/auth/useAuth";
import Button from "@/components/Button/Button";

export default function Home() {
  const { signUp, signIn, signOut } = useAuth();

  return (
    <Button
      type="primary"
      onClick={async () => {
        const response = await signUp({ email: "oduntane360@gmail.com", password: "testing" });
        console.log(response);
      }}
    >
      Create Account
    </Button>
  );
}
