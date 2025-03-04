"use client";  // <-- Add this at the top

import { useState } from "react"; 
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // Import icons for hamburger menu

export default function RootLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <html lang="en">
      <body className="min-h-screen">
        <nav className="navbar">
          <div className="logo">
            <Image src="/logo2.png" alt="Logo" width={100} height={50} />
          </div>
          {/* Mobile Menu Toggle */}
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>

          <ul className={`navbar__list ${menuOpen ? "open" : ""}`}>
            <li className="navbar__list__point">
              <Link href="/">Home</Link>
            </li>
            <li className="navbar__list__point">
              <Link href="/messagingApp">Messaging App</Link>
            </li>
            <li className="navbar__list__point">
              <Link href="/team">Team</Link>
            </li>
          </ul>
        </nav>

        <main>{children}</main>
      </body>
    </html>
  );
}
