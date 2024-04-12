import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="flex items-center justify-center w-full h-screen">
      <SignUp />
    </main>
  );
}
