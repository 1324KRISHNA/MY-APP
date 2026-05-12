import React from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";

const severityColors = { low: "#10b981", medium: "#f59e0b", high: "#f97316", critical: "#ef4444" };
const severityRadius = { low: 6, medium: 10, high: 14, critical: 18 };

export default function OutbreakMap({ data = [] }) {
  return (
    <div className="glass-card" style={{ overflow: "hidden" }}>
      <h3 style={{ fontFamily: "'Space Grotesk'", fontSize: 18, fontWeight: 600, padding: "20px 20px 0" }}>Outbreak Heatmap</h3>
      <div style={{ height: 400, marginTop: 12 }}>
        <MapContainer center={[20, 0]} zoom={2} style={{ height: "100%", width: "100%" }} scrollWheelZoom={true}>
          <TileLayer attribution='&copy; <a href="https://carto.com/">CARTO</a>' url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
          {data.filter(o => o.latitude && o.longitude).map((o) => (
            <CircleMarker key={o._id} center={[o.latitude, o.longitude]} radius={severityRadius[o.severity] || 8}
              fillColor={severityColors[o.severity] || "#0ea5e9"} fillOpacity={0.6} stroke color={severityColors[o.severity] || "#0ea5e9"} weight={1}>
              <Popup>
                <div style={{ fontSize: 13 }}>
                  <p style={{ fontWeight: 700 }}>{o.disease_name}</p>
                  <p>{o.region}, {o.country}</p>
                  <p>Cases: {o.cases_count?.toLocaleString()}</p>
                  <p>Severity: <span style={{ fontWeight: 600, textTransform: "capitalize" }}>{o.severity}</span></p>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
