import React from "react";
import { ModeToggle } from "./mode-toggle";

function Header() {
  return (
    <header className="z-20 w-full sticky top-0 p-2 backdrop-blur bg-background/50 shadow  ">
      <nav className="hidden md:flex justify-between space-x-2">
        <div className="w-full flex justify-between">
          <h1>Zeno</h1>
        </div>
        <ModeToggle />
      </nav>
    </header>
  );
}

export default Header;
