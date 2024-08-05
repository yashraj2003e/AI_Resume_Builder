import { SignIn } from "@clerk/clerk-react";

function SignInPage() {
  return (
    <div className="flex justify-center items-center h-[100dvh]">
      <SignIn routing="/" />
    </div>
  );
}

export default SignInPage;
