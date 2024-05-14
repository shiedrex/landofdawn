import Link from "next/link";
import React from "react";
import { ModeToggle } from "./ModeToggle";
import Image from "next/image";
import logo from "../assets/logo.png";

function Navbar() {
  return (
    <nav className="w-full sticky flex items-center justify-between max-w-2xl mx-auto px-4 py-2 top-0 bg-primary">
      <Link href="/" className="font-bold text-3xl flex items-center">
        <Image
          src={logo}
          alt="logo"
          width={50}
          height={50}
          className="bg-black rounded-full p-1.5"
        />
      </Link>
      <ModeToggle />
    </nav>
  );
}

export default Navbar;
