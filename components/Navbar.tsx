"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { navLinks } from "@/constants/navLinks";
import { Moon, Sun } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  async function checkAuth() {
    try {
      const res = await fetch("/api/auth/me", {
        credentials: "include",
        cache: "no-store",
      });
      const data = await res.json();
      setIsAuthenticated(data.authenticated);
    } catch {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

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
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    await checkAuth();
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
            <>
              <button
                onClick={handleLogout}
                className="rounded-md px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/20"
              >
                Logout
              </button>
            </>
          )}

          {/* Dark/Light Mode Button */}
          <button
            onClick={toggleDarkMode}
            className="rounded-md p-2 text-primary-foreground hover:bg-primary-foreground/20 focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="ml-auto lg:hidden inline-flex items-center justify-center rounded-md p-2 text-primary-foreground hover:bg-primary-foreground/20 focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
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
                className="mt-2 inline-flex items-center justify-center rounded-md bg-primary-foreground/10 px-4 py-2 font-semibold"
              >
                Sign in
              </Link>
            ) : (
              <>
                <button
                  onClick={handleLogout}
                  className="mt-2 inline-flex items-center justify-center rounded-md bg-primary-foreground/10 px-4 py-2 font-semibold"
                >
                  Logout
                </button>
              </>
            )}

            {/* Mobile Dark Mode Toggle */}
            <button
              onClick={() => {
                toggleDarkMode();
                setOpen(false);
              }}
              className="mt-2 inline-flex items-center justify-center rounded-md bg-primary-foreground/10 px-4 py-2 font-semibold"
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
