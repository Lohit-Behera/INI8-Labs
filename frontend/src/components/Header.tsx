import { ModeToggle } from "./mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logo from "../assets/Logo.svg";
import { Button } from "./ui/button";
import { NavLink } from "react-router-dom";
import { Home, SquarePlus } from "lucide-react";

function Header() {
  return (
    <header className="z-20 w-full sticky top-0 p-2 backdrop-blur bg-background/50 shadow  ">
      <nav className="flex justify-between space-x-2">
        <div className="w-full flex justify-between">
          <Avatar>
            <AvatarImage src={Logo} />
            <AvatarFallback>L</AvatarFallback>
          </Avatar>
          <div className="flex my-auto space-x-2">
            <NavLink to="/">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className="font-semibold"
                  size="sm"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Button>
              )}
            </NavLink>
            <NavLink to="/create" className="my-auto">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className="font-semibold "
                  size="sm"
                >
                  <SquarePlus className="mr-0.5 h-4 w-4" />
                  Create Post
                </Button>
              )}
            </NavLink>
          </div>
        </div>
        <ModeToggle />
      </nav>
    </header>
  );
}

export default Header;
