import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, register } from "../api";

export default function Login({ setUser }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState("signin");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res;
      if (tab === "signin") {
        res = await login({ email: form.email, password: form.password });
      } else {
        res = await register(form);
      }
      localStorage.setItem("token", res.data.token);
      setUser(res.data);
      toast.success(tab === "signin" ? "Signed in!" : "Account created!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "0 auto", padding: "64px 24px" }}>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div style={{ width: 56, height: 56, borderRadius: 16, background: "var(--color-primary)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", color: "white", fontWeight: 700, fontSize: 24 }}>O</div>
        <h1 style={{ fontFamily: "'Space Grotesk'", fontSize: 24, fontWeight: 700 }}>Welcome</h1>
        <p style={{ fontSize: 14, color: "var(--color-text-muted)" }}>Sign in to report and track outbreaks</p>
      </div>

      <div className="glass-card" style={{ padding: 24 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, marginBottom: 24, background: "#f1f5f9", borderRadius: 8, padding: 4 }}>
          {["signin", "signup"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: "8px 0", borderRadius: 6, border: "none", fontWeight: 500, cursor: "pointer", fontSize: 14,
              background: tab === t ? "white" : "transparent", color: tab === t ? "var(--color-text)" : "var(--color-text-muted)",
              boxShadow: tab === t ? "0 1px 3px rgba(0,0,0,0.1)" : "none"
            }}>{t === "signin" ? "Sign In" : "Sign Up"}</button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {tab === "signup" && (
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 4 }}>Name</label>
              <input className="form-input" value={form.name} onChange={e => update("name", e.target.value)} required />
            </div>
          )}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 4 }}>Email</label>
            <input className="form-input" type="email" value={form.email} onChange={e => update("email", e.target.value)} required />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 4 }}>Password</label>
            <input className="form-input" type="password" value={form.password} onChange={e => update("password", e.target.value)} required minLength={6} />
          </div>
          <button type="submit" className="btn-primary" style={{ width: "100%" }} disabled={loading}>
            {loading ? "Please wait..." : tab === "signin" ? "Sign In" : "Create Account"}
          </button>
        </form>

        {tab === "signin" && (
          <p style={{ fontSize: 12, color: "var(--color-text-muted)", marginTop: 16, textAlign: "center" }}>
            Demo: admin@outbreak.com / admin123
          </p>
        )}
      </div>
    </div>
  );
}
