import React from "react";
import { Link } from "react-router-dom";

const features = [
  { icon: "🌍", title: "Global Tracking", desc: "Monitor outbreaks across every region with real-time interactive maps." },
  { icon: "📊", title: "Visual Analytics", desc: "Charts and graphs that make complex epidemiological data easy to understand." },
  { icon: "⚠️", title: "Severity Alerts", desc: "Instant classification of outbreaks by severity for rapid response." },
  { icon: "🛡️", title: "Verified Reports", desc: "Community-reported cases verified by health authorities for accuracy." },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, rgba(14,165,233,0.05), transparent, rgba(16,185,129,0.05))", padding: "80px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(14,165,233,0.1)", padding: "6px 16px", borderRadius: 20, fontSize: 14, fontWeight: 500, color: "var(--color-primary)", marginBottom: 24 }}>
            <span className="animate-pulse-glow">🔬</span> Real-time Disease Surveillance
          </div>
          <h1 style={{ fontFamily: "'Space Grotesk'", fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 700, lineHeight: 1.1, marginBottom: 24 }}>
            Track Disease <span style={{ background: "linear-gradient(90deg, var(--color-primary), var(--color-secondary))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Outbreaks</span> Worldwide
          </h1>
          <p style={{ fontSize: 18, color: "var(--color-text-muted)", maxWidth: 560, margin: "0 auto 32px", lineHeight: 1.7 }}>
            A comprehensive dashboard for monitoring, analyzing, and reporting disease outbreaks across different regions. Stay informed. Stay prepared.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/dashboard"><button className="btn-primary" style={{ fontSize: 16, padding: "12px 28px" }}>Open Dashboard →</button></Link>
            <Link to="/report"><button className="btn-outline" style={{ fontSize: 16, padding: "12px 28px" }}>Report a Case</button></Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 24 }}>
          {features.map(({ icon, title, desc }) => (
            <div key={title} className="glass-card" style={{ padding: 24, transition: "box-shadow 0.2s" }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(14,165,233,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 16 }}>{icon}</div>
              <h3 style={{ fontFamily: "'Space Grotesk'", fontSize: 18, fontWeight: 600 }}>{title}</h3>
              <p style={{ fontSize: 14, color: "var(--color-text-muted)", marginTop: 8, lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid var(--color-border)", padding: 32, textAlign: "center", fontSize: 14, color: "var(--color-text-muted)" }}>
        © {new Date().getFullYear()} OutbreakWatch — Disease Surveillance Dashboard
      </footer>
    </div>
  );
}
