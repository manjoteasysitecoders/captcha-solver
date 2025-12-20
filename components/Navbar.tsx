"use client";

import { useState } from "react";
import Link from "next/link";
import { navLinks } from "@/constants/navLinks";
import ThemeToggle from "./ui/ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const renderLinks = (isMobile = false) =>
    navLinks.map((link) => (
      <Link
        key={link.title}
        href={link.href}
        {...(link.external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className={`hover:text-foreground transition-colors ${
          isMobile ? "block" : ""
        }`}
        onClick={() => isMobile && setOpen(false)}
      >
        {link.title}
      </Link>
    ));

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-primary">
      <div className="container mx-auto flex h-16 items-center px-4">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-primary-foreground hover:text-foreground transition-colors"
        >
          CAPTCHA Solver
        </Link>

        {/* Desktop Navigation */}
        <nav className="ml-auto hidden lg:flex items-center gap-8 text-sm font-medium text-primary-foreground">
          {renderLinks()}
        </nav>

        <div className="ml-6 hidden lg:flex items-center gap-4">
          <Link
            href="/signin"
            className="rounded-md px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/20"
          >
            Sign in
          </Link>

          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center gap-4 ml-auto text-background">
          <ThemeToggle />
          <button onClick={() => setOpen(!open)}>☰</button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden border-t border-border bg-primary">
          <nav className="flex flex-col gap-4 px-4 py-6 text-sm font-medium text-primary-foreground">
            {renderLinks(true)}

            <Link
              href="/signin"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-md bg-primary-foreground/10 px-4 py-2 text-center"
            >
              Sign in
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
