import React from "react";

const techs = [
  { icon: "⚛️", name: "React.js", desc: "Modern UI with real-time updates" },
  { icon: "🟢", name: "Node.js + Express", desc: "RESTful API backend server" },
  { icon: "🍃", name: "MongoDB", desc: "NoSQL database with Mongoose ODM" },
  { icon: "📊", name: "Chart.js", desc: "Interactive data visualization" },
  { icon: "🗺️", name: "Leaflet", desc: "Interactive map with outbreak markers" },
  { icon: "🔌", name: "Socket.IO", desc: "Real-time WebSocket updates" },
];

export default function About() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "64px 24px" }}>
      <h1 style={{ fontFamily: "'Space Grotesk'", fontSize: 28, fontWeight: 700, textAlign: "center" }}>About OutbreakWatch</h1>
      <p style={{ textAlign: "center", color: "var(--color-text-muted)", maxWidth: 600, margin: "16px auto 48px", lineHeight: 1.7 }}>
        OutbreakWatch is a comprehensive MERN stack web dashboard for tracking disease outbreaks across different regions worldwide.
        It provides real-time monitoring, visual analytics, and community-driven case reporting.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24, marginBottom: 48 }}>
        {techs.map(({ icon, name, desc }) => (
          <div key={name} className="glass-card" style={{ padding: 20 }}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>{icon}</div>
            <h3 style={{ fontFamily: "'Space Grotesk'", fontWeight: 600 }}>{name}</h3>
            <p style={{ fontSize: 14, color: "var(--color-text-muted)", marginTop: 4 }}>{desc}</p>
          </div>
        ))}
      </div>

      <div className="glass-card" style={{ padding: 32, textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Space Grotesk'", fontSize: 20, fontWeight: 700, marginBottom: 24 }}>How It Works</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 }}>
          {[
            { n: "1", t: "Report", d: "Health workers and citizens submit outbreak reports with case details and location." },
            { n: "2", t: "Analyze", d: "Data is aggregated and visualized through charts, maps, and trend analysis." },
            { n: "3", t: "Respond", d: "Authorities use insights to coordinate response and allocate resources." },
          ].map(({ n, t, d }) => (
            <div key={n}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(14,165,233,0.1)", color: "var(--color-primary)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto", fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 18 }}>{n}</div>
              <p style={{ fontWeight: 500, marginTop: 12 }}>{t}</p>
              <p style={{ fontSize: 13, color: "var(--color-text-muted)", marginTop: 4, lineHeight: 1.5 }}>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
