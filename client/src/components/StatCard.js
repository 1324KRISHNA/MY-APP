import React from "react";

export default function StatCard({ title, value, icon, color = "var(--color-primary)" }) {
  return (
    <div className="glass-card animate-slide-up" style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <p style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-muted)", marginBottom: 4 }}>{title}</p>
          <p style={{ fontFamily: "'Space Grotesk'", fontSize: 28, fontWeight: 700, color }}>{typeof value === "number" ? value.toLocaleString() : value}</p>
        </div>
        <div style={{ width: 42, height: 42, borderRadius: 10, background: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{icon}</div>
      </div>
    </div>
  );
}
