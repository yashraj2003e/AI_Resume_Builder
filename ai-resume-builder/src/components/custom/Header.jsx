import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { UserButton, useUser } from "@clerk/clerk-react";
function Header() {
  const { isSignedIn } = useUser();
  return (
    <div className="px-5 py-3 flex justify-between items-center shadow-lg max-h-[10dvh]">
      <img src="/logo.svg" alt="Logo" width={100} height={100} />
      {isSignedIn ? (
        <div className="flex gap-2">
          <Link to={"/dashboard"}>
            <Button variant="outline">Dashboard</Button>
          </Link>
          <UserButton />
        </div>
      ) : (
        <Link to={"/auth/sign-in"}>
          <Button>Get Started</Button>
        </Link>
      )}
    </div>
  );
}

export default Header;
