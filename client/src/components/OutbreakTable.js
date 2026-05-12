import React from "react";

export default function OutbreakTable({ data = [] }) {
  return (
    <div className="glass-card" style={{ overflow: "hidden" }}>
      <h3 style={{ fontFamily: "'Space Grotesk'", fontSize: 18, fontWeight: 600, padding: "20px 20px 12px" }}>Recent Reports</h3>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--color-border)", background: "#f8fafc" }}>
              {["Disease", "Region", "Country", "Cases", "Deaths", "Severity", "Date"].map(h => (
                <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontWeight: 600, color: "var(--color-text-muted)", fontSize: 12, textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 20).map((o) => (
              <tr key={o._id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "10px 16px", fontWeight: 500 }}>{o.disease_name}</td>
                <td style={{ padding: "10px 16px" }}>{o.region}</td>
                <td style={{ padding: "10px 16px" }}>{o.country}</td>
                <td style={{ padding: "10px 16px", textAlign: "right" }}>{o.cases_count?.toLocaleString()}</td>
                <td style={{ padding: "10px 16px", textAlign: "right" }}>{o.deaths_count?.toLocaleString()}</td>
                <td style={{ padding: "10px 16px" }}><span className={`severity-badge severity-${o.severity}`}>{o.severity}</span></td>
                <td style={{ padding: "10px 16px", color: "var(--color-text-muted)" }}>{new Date(o.date_reported).toLocaleDateString()}</td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr><td colSpan={7} style={{ padding: 32, textAlign: "center", color: "var(--color-text-muted)" }}>No outbreak data found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
