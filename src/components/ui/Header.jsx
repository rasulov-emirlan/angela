import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="h-18 w-full bg-slate-900">
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
