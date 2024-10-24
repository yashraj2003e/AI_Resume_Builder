import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { UserButton, useUser } from "@clerk/clerk-react";
function Header() {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  return (
    <div className="px-5 py-3 flex justify-between items-center max-h-[10=dvh]">
      <img
        src="/logo1.png"
        alt="Logo"
        // className="h-50"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      />
      {isSignedIn && (
        <div className="flex gap-2">
          <Link to={"/dashboard"}>
            <Button variant="outline">Dashboard</Button>
          </Link>
          <UserButton />
        </div>
      )}
    </div>
  );
}

export default Header;
