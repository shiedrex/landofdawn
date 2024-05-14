import Link from "next/link";
import React from "react";
import Image from "next/image";
import logo from "../assets/logo.png";

function Footer() {
  return (
    <footer className="w-full relative flex items-center justify-between max-w-2xl mx-auto px-4 py-5">
      <Link href="/" className="font-bold text-3xl">
        <Image src={logo} alt="logo" width={80} height={80} />
      </Link>
      <div className="text-sm">©2024. All Rights Reserved.</div>
    </footer>
  );
}

export default Footer;
