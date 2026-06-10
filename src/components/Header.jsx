import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Sun, Moon, LogOut, LayoutDashboard, Menu, X } from "lucide-react";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Load theme and auth state
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
    const auth = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(auth);

    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("storage"));
    setMenuOpen(false);
    navigate("/");
  };

  const getFormattedDate = () => {
    const d = new Date();
    const weekday = d.toLocaleDateString("en-US", { weekday: "long" }).toUpperCase();
    const day = d.getDate();
    const month = d.toLocaleDateString("en-US", { month: "long" }).toUpperCase();
    const year = d.getFullYear();
    return `${weekday}, ${day} ${month} ${year}`;
  };

  const navLinks = [
    { to: "/", label: "Top stories", end: true },
    { to: "/articles", label: "Articles" },
    { to: "/blogs", label: "Blogs" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      <header className="border-b border-rule bg-background dark:bg-black transition-colors" style={{ position: "relative", zIndex: 50 }}>
        {/* Top Bar */}
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
          {/* Date — hidden on mobile */}
          <div className="tag-label text-muted-foreground" style={{ display: "none" }} id="header-date">
            {getFormattedDate()}
          </div>
          <div className="tag-label text-muted-foreground" style={{ fontSize: "0.65rem" }}
            ref={el => { if (el) el.style.display = window.innerWidth >= 640 ? "block" : "none"; }}
          />

          {/* Logo */}
          <Link
            to="/"
            className="serif font-bold tracking-tight text-foreground hover:opacity-90"
            style={{ fontSize: "1.4rem", letterSpacing: "-0.02em", flexShrink: 0 }}
          >
            ORBIT<span className="text-accent-red">·</span>DISPATCH
          </Link>

          {/* Right controls */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            {/* Theme toggle — always visible */}
            <button
              onClick={toggleTheme}
              style={{ padding: "0.3rem", border: "1px solid var(--rule)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", borderRadius: "3px", color: "var(--foreground)" }}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Sign in button — hidden on mobile (shown inside hamburger drawer) */}
            <div className="header-desktop-auth">
              {isLoggedIn ? (
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Link
                    to="/dashboard"
                    className="tag-label"
                    style={{ border: "1px solid var(--accent-red)", background: "var(--accent-red)", color: "white", padding: "0.35rem 0.9rem", display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.7rem" }}
                  >
                    <LayoutDashboard size={12} />
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="tag-label"
                    style={{ border: "1px solid var(--rule)", background: "transparent", color: "var(--foreground)", padding: "0.35rem 0.9rem", display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.7rem", cursor: "pointer" }}
                  >
                    <LogOut size={12} />
                    Sign out
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="tag-label"
                  style={{ border: "1px solid var(--foreground)", color: "var(--foreground)", padding: "0.4rem 1.2rem", fontSize: "0.7rem", letterSpacing: "0.08em", transition: "all 0.2s" }}
                >
                  SIGN IN
                </Link>
              )}
            </div>

            {/* Hamburger — only on mobile */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="header-hamburger"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--foreground)", padding: "0.2rem", alignItems: "center" }}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Desktop Nav Bar */}
        <nav className="border-t border-rule header-desktop-nav">
          <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-2 text-sm" style={{ overflowX: "auto" }}>
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `font-medium transition-colors ${isActive ? "text-accent-red" : "text-muted-foreground hover:text-accent-red"}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Overlay */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 998,
          }}
        />
      )}

      {/* Mobile Drawer */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100%",
          width: "min(80vw, 280px)",
          background: "var(--background)",
          borderLeft: "1px solid var(--rule)",
          zIndex: 999,
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
          display: "flex",
          flexDirection: "column",
          padding: "1.5rem 1.5rem",
          overflowY: "auto",
        }}
      >
        {/* Drawer Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <span style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: "1.1rem", color: "var(--foreground)" }}>
            ORBIT<span style={{ color: "var(--accent-red)" }}>·</span>DISPATCH
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--foreground)", display: "flex" }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Nav Links */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setMenuOpen(false)}
              style={({ isActive }) => ({
                fontFamily: "var(--font-serif)",
                fontSize: "1.25rem",
                fontWeight: 600,
                color: isActive ? "var(--accent-red)" : "var(--foreground)",
                padding: "0.75rem 0",
                borderBottom: "1px solid var(--rule)",
                textDecoration: "none",
                display: "block",
              })}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Drawer Auth */}
        <div style={{ marginTop: "2rem" }}>
          {isLoggedIn ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <Link
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", background: "var(--accent-red)", color: "white", padding: "0.75rem 1rem", fontFamily: "var(--font-mono)", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.08em", textDecoration: "none" }}
              >
                <LayoutDashboard size={13} />
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", background: "transparent", border: "1px solid var(--rule)", color: "var(--foreground)", padding: "0.75rem 1rem", fontFamily: "var(--font-mono)", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.08em", cursor: "pointer" }}
              >
                <LogOut size={13} />
                Sign out
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              style={{ display: "block", textAlign: "center", border: "1px solid var(--foreground)", color: "var(--foreground)", padding: "0.75rem 1rem", fontFamily: "var(--font-mono)", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.08em", textDecoration: "none" }}
            >
              SIGN IN
            </Link>
          )}
        </div>

        {/* Date at bottom */}
        <div style={{ marginTop: "auto", paddingTop: "2rem", fontFamily: "var(--font-mono)", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted-foreground)" }}>
          {getFormattedDate()}
        </div>
      </div>

      {/* Header responsive CSS */}
      <style>{`
        .header-desktop-auth { display: flex; }
        .header-hamburger { display: none; }
        .header-desktop-nav { display: block; }

        @media (max-width: 768px) {
          .header-desktop-auth { display: none !important; }
          .header-hamburger { display: flex !important; }
          .header-desktop-nav { display: none !important; }
        }
      `}</style>
    </>
  );
}
