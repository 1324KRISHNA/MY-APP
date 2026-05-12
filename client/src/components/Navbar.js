import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { path: "/", label: "Home", icon: "🏠" },
  { path: "/dashboard", label: "Dashboard", icon: "📊" },
  { path: "/report", label: "Report Case", icon: "📝" },
  { path: "/about", label: "About", icon: "ℹ️" },
];

export default function Navbar({ user, onLogout }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 50,
      background: "rgba(255,255,255,0.85)", backdropFilter: "blur(16px)",
      borderBottom: "1px solid var(--color-border)", padding: "0 24px"
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", color: "inherit" }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--color-primary)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: 18 }}>O</div>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 20 }}>OutbreakWatch</span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 4 }} className="desktop-nav">
          {navItems.map(({ path, label }) => (
            <Link key={path} to={path} style={{
              padding: "8px 16px", borderRadius: 8, textDecoration: "none", fontSize: 14, fontWeight: 500,
              background: location.pathname === path ? "var(--color-primary)" : "transparent",
              color: location.pathname === path ? "white" : "var(--color-text)"
            }}>{label}</Link>
          ))}
          {user ? (
            <button onClick={onLogout} className="btn-outline" style={{ marginLeft: 8, padding: "6px 16px" }}>Sign Out</button>
          ) : (
            <Link to="/login"><button className="btn-primary" style={{ marginLeft: 8, padding: "6px 16px" }}>Sign In</button></Link>
          )}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ display: "none", background: "none", border: "none", fontSize: 24, cursor: "pointer" }}
          className="mobile-toggle"
        >{mobileOpen ? "✕" : "☰"}</button>
      </div>

      {mobileOpen && (
        <div style={{ padding: "0 16px 16px", borderTop: "1px solid var(--color-border)" }} className="mobile-menu">
          {navItems.map(({ path, label, icon }) => (
            <Link key={path} to={path} onClick={() => setMobileOpen(false)} style={{
              display: "block", padding: "10px 12px", borderRadius: 8, textDecoration: "none",
              background: location.pathname === path ? "var(--color-primary)" : "transparent",
              color: location.pathname === path ? "white" : "var(--color-text)", marginTop: 4, fontWeight: 500
            }}>{icon} {label}</Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
