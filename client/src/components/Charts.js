import React from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend, Filler } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend, Filler);

const COLORS = ["#0ea5e9", "#10b981", "#f59e0b", "#f97316", "#ef4444", "#8b5cf6", "#ec4899", "#06b6d4"];

function groupBy(data, key, sumKey) {
  const map = {};
  data.forEach((o) => { map[o[key]] = (map[o[key]] || 0) + (o[sumKey] || 0); });
  return Object.entries(map).sort((a, b) => b[1] - a[1]);
}

export function CasesByRegionChart({ data = [] }) {
  const grouped = groupBy(data, "region", "cases_count").slice(0, 10);
  return (
    <div className="glass-card" style={{ padding: 20 }}>
      <h3 style={{ fontFamily: "'Space Grotesk'", fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Cases by Region</h3>
      <Bar data={{
        labels: grouped.map(g => g[0]),
        datasets: [{ label: "Cases", data: grouped.map(g => g[1]), backgroundColor: COLORS.slice(0, grouped.length), borderRadius: 6 }]
      }} options={{ responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }} />
    </div>
  );
}

export function SeverityPieChart({ data = [] }) {
  const map = {};
  data.forEach(o => { map[o.severity] = (map[o.severity] || 0) + 1; });
  const entries = Object.entries(map);
  const sevColors = { low: "#10b981", medium: "#f59e0b", high: "#f97316", critical: "#ef4444" };
  return (
    <div className="glass-card" style={{ padding: 20 }}>
      <h3 style={{ fontFamily: "'Space Grotesk'", fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Severity Distribution</h3>
      <Pie data={{
        labels: entries.map(e => e[0]),
        datasets: [{ data: entries.map(e => e[1]), backgroundColor: entries.map(e => sevColors[e[0]] || "#ccc") }]
      }} options={{ responsive: true }} />
    </div>
  );
}

export function TrendLineChart({ trends = [] }) {
  return (
    <div className="glass-card" style={{ padding: 20 }}>
      <h3 style={{ fontFamily: "'Space Grotesk'", fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Daily Trend</h3>
      <Line data={{
        labels: trends.map(t => t.date),
        datasets: [
          { label: "Cases", data: trends.map(t => t.cases), borderColor: "#0ea5e9", backgroundColor: "rgba(14,165,233,0.1)", fill: true, tension: 0.3 },
          { label: "Deaths", data: trends.map(t => t.deaths), borderColor: "#ef4444", backgroundColor: "rgba(239,68,68,0.1)", fill: true, tension: 0.3 }
        ]
      }} options={{ responsive: true, scales: { y: { beginAtZero: true } } }} />
    </div>
  );
}

export function DiseaseBarChart({ data = [] }) {
  const grouped = groupBy(data, "disease_name", "cases_count").slice(0, 8);
  return (
    <div className="glass-card" style={{ padding: 20 }}>
      <h3 style={{ fontFamily: "'Space Grotesk'", fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Cases by Disease</h3>
      <Bar data={{
        labels: grouped.map(g => g[0]),
        datasets: [{ label: "Cases", data: grouped.map(g => g[1]), backgroundColor: "#10b981", borderRadius: 6 }]
      }} options={{ responsive: true, indexAxis: "y", plugins: { legend: { display: false } } }} />
    </div>
  );
}
