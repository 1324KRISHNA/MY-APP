import React, { useState, useEffect, useMemo } from "react";
import { io } from "socket.io-client";
import { getOutbreaks, getStats, getTrends } from "../api";
import StatCard from "../components/StatCard";
import Filters from "../components/Filters";
import OutbreakMap from "../components/OutbreakMap";
import OutbreakTable from "../components/OutbreakTable";
import { CasesByRegionChart, SeverityPieChart, TrendLineChart, DiseaseBarChart } from "../components/Charts";

export default function Dashboard() {
  const [outbreaks, setOutbreaks] = useState([]);
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});

  const fetchData = async () => {
    try {
      const [obRes, trendRes] = await Promise.all([getOutbreaks(), getTrends()]);
      setOutbreaks(obRes.data);
      setTrends(trendRes.data);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const socket = io(window.location.hostname === "localhost" ? "http://localhost:5000" : undefined);
    socket.on("outbreak:new", () => fetchData());
    socket.on("outbreak:updated", () => fetchData());
    socket.on("outbreak:deleted", () => fetchData());
    return () => socket.disconnect();
  }, []);

  const filtered = useMemo(() => {
    return outbreaks.filter((o) => {
      if (filters.disease && o.disease_name !== filters.disease) return false;
      if (filters.region && o.region !== filters.region) return false;
      if (filters.severity && o.severity !== filters.severity) return false;
      if (filters.from && o.date_reported < filters.from) return false;
      if (filters.to && o.date_reported > filters.to) return false;
      return true;
    });
  }, [outbreaks, filters]);

  const stats = useMemo(() => ({
    totalCases: filtered.reduce((s, o) => s + (o.cases_count || 0), 0),
    totalDeaths: filtered.reduce((s, o) => s + (o.deaths_count || 0), 0),
    totalRecovered: filtered.reduce((s, o) => s + (o.recovered_count || 0), 0),
    regions: new Set(filtered.map(o => o.region)).size,
  }), [filtered]);

  if (loading) return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
        {[1,2,3,4].map(i => <div key={i} className="glass-card" style={{ height: 100, background: "#e2e8f0", borderRadius: 12 }} />)}
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 24px 64px" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: "'Space Grotesk'", fontSize: 24, fontWeight: 700 }}>Dashboard</h1>
        <p style={{ fontSize: 14, color: "var(--color-text-muted)" }}>Real-time disease outbreak monitoring</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
        <StatCard title="Total Cases" value={stats.totalCases} icon="🦠" color="var(--color-primary)" />
        <StatCard title="Total Deaths" value={stats.totalDeaths} icon="💀" color="var(--color-danger)" />
        <StatCard title="Recovered" value={stats.totalRecovered} icon="💚" color="var(--color-secondary)" />
        <StatCard title="Regions Affected" value={stats.regions} icon="🌍" color="var(--color-accent)" />
      </div>

      <div style={{ marginBottom: 24 }}><Filters data={outbreaks} filters={filters} setFilters={setFilters} /></div>
      <div style={{ marginBottom: 24 }}><OutbreakMap data={filtered} /></div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: 24, marginBottom: 24 }}>
        <CasesByRegionChart data={filtered} />
        <SeverityPieChart data={filtered} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: 24, marginBottom: 24 }}>
        <TrendLineChart trends={trends} />
        <DiseaseBarChart data={filtered} />
      </div>

      <OutbreakTable data={filtered} />
    </div>
  );
}
