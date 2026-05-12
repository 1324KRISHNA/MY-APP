import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { createOutbreak } from "../api";

export default function ReportCase({ user }) {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    disease_name: "", region: "", country: "", latitude: "", longitude: "",
    cases_count: "", deaths_count: "", recovered_count: "", severity: "low",
    date_reported: new Date().toISOString().split("T")[0], description: ""
  });

  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.disease_name || !form.region || !form.country) {
      toast.error("Please fill required fields"); return;
    }
    setSubmitting(true);
    try {
      await createOutbreak({
        ...form,
        latitude: parseFloat(form.latitude) || 0,
        longitude: parseFloat(form.longitude) || 0,
        cases_count: parseInt(form.cases_count) || 0,
        deaths_count: parseInt(form.deaths_count) || 0,
        recovered_count: parseInt(form.recovered_count) || 0,
      });
      toast.success("Outbreak reported successfully!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit");
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) return (
    <div style={{ textAlign: "center", padding: "80px 24px" }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>📝</div>
      <h2 style={{ fontFamily: "'Space Grotesk'", fontSize: 24, fontWeight: 700 }}>Sign in to Report</h2>
      <p style={{ color: "var(--color-text-muted)", marginTop: 8 }}>You need to be signed in to submit a report.</p>
      <Link to="/login"><button className="btn-primary" style={{ marginTop: 24 }}>Sign In</button></Link>
    </div>
  );

  const Field = ({ label, name, type = "text", required, ...props }) => (
    <div>
      <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 4 }}>{label}{required && " *"}</label>
      <input className="form-input" type={type} value={form[name]} onChange={e => update(name, e.target.value)} required={required} {...props} />
    </div>
  );

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "32px 24px" }}>
      <h1 style={{ fontFamily: "'Space Grotesk'", fontSize: 24, fontWeight: 700 }}>Report New Outbreak</h1>
      <p style={{ fontSize: 14, color: "var(--color-text-muted)", marginBottom: 24 }}>Submit disease outbreak data for monitoring</p>

      <form onSubmit={handleSubmit} className="glass-card" style={{ padding: 24 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <Field label="Disease Name" name="disease_name" required placeholder="e.g. COVID-19" />
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 4 }}>Severity *</label>
            <select className="form-select" value={form.severity} onChange={e => update("severity", e.target.value)}>
              <option value="low">Low</option><option value="medium">Medium</option>
              <option value="high">High</option><option value="critical">Critical</option>
            </select>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <Field label="Region" name="region" required placeholder="e.g. South Asia" />
          <Field label="Country" name="country" required placeholder="e.g. India" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <Field label="Latitude" name="latitude" type="number" step="any" />
          <Field label="Longitude" name="longitude" type="number" step="any" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 16 }}>
          <Field label="Cases" name="cases_count" type="number" />
          <Field label="Deaths" name="deaths_count" type="number" />
          <Field label="Recovered" name="recovered_count" type="number" />
        </div>
        <div style={{ marginBottom: 16 }}><Field label="Date Reported" name="date_reported" type="date" required /></div>
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 4 }}>Description</label>
          <textarea className="form-input" rows={4} value={form.description} onChange={e => update("description", e.target.value)} placeholder="Additional details..." />
        </div>
        <button type="submit" className="btn-primary" style={{ width: "100%" }} disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Report"}
        </button>
      </form>
    </div>
  );
}
