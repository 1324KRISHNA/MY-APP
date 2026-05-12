import React from "react";

export default function Filters({ data = [], filters, setFilters }) {
  const diseases = [...new Set(data.map(o => o.disease_name))].sort();
  const regions = [...new Set(data.map(o => o.region))].sort();

  const update = (key, value) => setFilters(prev => ({ ...prev, [key]: value }));

  return (
    <div className="glass-card" style={{ padding: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <span style={{ fontSize: 16 }}>🔍</span>
        <h3 style={{ fontFamily: "'Space Grotesk'", fontSize: 14, fontWeight: 600 }}>Filters</h3>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
        <select className="form-select" value={filters.disease || ""} onChange={e => update("disease", e.target.value)}>
          <option value="">All Diseases</option>
          {diseases.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        <select className="form-select" value={filters.region || ""} onChange={e => update("region", e.target.value)}>
          <option value="">All Regions</option>
          {regions.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <select className="form-select" value={filters.severity || ""} onChange={e => update("severity", e.target.value)}>
          <option value="">All Severities</option>
          {["low", "medium", "high", "critical"].map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
        <input type="date" className="form-input" value={filters.from || ""} onChange={e => update("from", e.target.value)} />
        <input type="date" className="form-input" value={filters.to || ""} onChange={e => update("to", e.target.value)} />
      </div>
    </div>
  );
}
