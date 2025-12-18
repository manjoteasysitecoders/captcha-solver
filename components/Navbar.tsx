"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { navLinks } from "@/constants/navLinks";
import { Moon, Sun } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const router = useRouter();
  const { status } = useSession(); // 👈 NextAuth session
  const loading = status === "loading";
  const isAuthenticated = status === "authenticated";

  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Restore theme
  useEffect(() => {
    const savedMode = localStorage.getItem("theme");
    if (savedMode === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

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

  async function handleLogout() {
    await signOut({ redirect: false });
    router.push("/");
  }

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
          {!loading && !isAuthenticated ? (
            <Link
              href="/signin"
              className="rounded-md px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/20"
            >
              Sign in
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="rounded-md px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/20"
            >
              Logout
            </button>
          )}

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="rounded-md p-2 text-primary-foreground hover:bg-primary-foreground/20"
          >
            {darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="ml-auto lg:hidden p-2 text-primary-foreground hover:bg-primary-foreground/20"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden border-t border-border bg-primary">
          <nav className="flex flex-col gap-4 px-4 py-6 text-sm font-medium text-primary-foreground">
            {renderLinks(true)}

            {!loading && !isAuthenticated ? (
              <Link
                href="/signin"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-md bg-primary-foreground/10 px-4 py-2 text-center"
              >
                Sign in
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="mt-2 rounded-md bg-primary-foreground/10 px-4 py-2"
              >
                Logout
              </button>
            )}

            <button
              onClick={() => {
                toggleDarkMode();
                setOpen(false);
              }}
              className="mt-2 rounded-md bg-primary-foreground/10 px-4 py-2"
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
