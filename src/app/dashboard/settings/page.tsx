"use client";

import { toast } from "@/shared/lib/toast";
import { useState } from "react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "My Framework",
    siteDescription: "A modern Next.js framework",
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
    language: "en",
    timezone: "UTC",
    theme: "light",
  });

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  const handleChange = (key: string, value: string | boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div>
      {/* Header */}
      <div className="card" style={{ marginBottom: "2rem" }}>
        <div style={{ padding: "1.5rem" }}>
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: "700",
              marginBottom: "0.25rem",
            }}
          >
            Settings
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
            Manage your application settings and preferences
          </p>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* General Settings */}
        <div className="dashboard-card col-span-6">
          <div className="card-header">
            <h2 className="card-title">General Settings</h2>
          </div>
          <div className="card-body">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              <div className="form-group">
                <label className="form-label">Site Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={settings.siteName}
                  onChange={(e) => handleChange("siteName", e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Site Description</label>
                <textarea
                  className="form-input"
                  rows={3}
                  value={settings.siteDescription}
                  onChange={(e) =>
                    handleChange("siteDescription", e.target.value)
                  }
                />
              </div>

              <div className="form-group">
                <label className="form-label">Language</label>
                <select
                  className="form-input"
                  value={settings.language}
                  onChange={(e) => handleChange("language", e.target.value)}
                >
                  <option value="en">English</option>
                  <option value="vi">Tiếng Việt</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Timezone</label>
                <select
                  className="form-input"
                  value={settings.timezone}
                  onChange={(e) => handleChange("timezone", e.target.value)}
                >
                  <option value="UTC">UTC</option>
                  <option value="Asia/Ho_Chi_Minh">Asia/Ho Chi Minh</option>
                  <option value="America/New_York">America/New York</option>
                  <option value="Europe/London">Europe/London</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="dashboard-card col-span-6">
          <div className="card-header">
            <h2 className="card-title">Notifications</h2>
          </div>
          <div className="card-body">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <p style={{ fontWeight: "600", marginBottom: "0.25rem" }}>
                    Email Notifications
                  </p>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    Receive email notifications for important updates
                  </p>
                </div>
                <label
                  style={{
                    position: "relative",
                    display: "inline-block",
                    width: "48px",
                    height: "24px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={(e) =>
                      handleChange("emailNotifications", e.target.checked)
                    }
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      cursor: "pointer",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: settings.emailNotifications
                        ? "var(--color-primary)"
                        : "var(--bg-tertiary)",
                      borderRadius: "24px",
                      transition: "0.3s",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        content: "",
                        height: "18px",
                        width: "18px",
                        left: settings.emailNotifications ? "26px" : "3px",
                        bottom: "3px",
                        background: "white",
                        borderRadius: "50%",
                        transition: "0.3s",
                      }}
                    />
                  </span>
                </label>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <p style={{ fontWeight: "600", marginBottom: "0.25rem" }}>
                    Push Notifications
                  </p>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    Receive push notifications on your device
                  </p>
                </div>
                <label
                  style={{
                    position: "relative",
                    display: "inline-block",
                    width: "48px",
                    height: "24px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={settings.pushNotifications}
                    onChange={(e) =>
                      handleChange("pushNotifications", e.target.checked)
                    }
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      cursor: "pointer",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: settings.pushNotifications
                        ? "var(--color-primary)"
                        : "var(--bg-tertiary)",
                      borderRadius: "24px",
                      transition: "0.3s",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        content: "",
                        height: "18px",
                        width: "18px",
                        left: settings.pushNotifications ? "26px" : "3px",
                        bottom: "3px",
                        background: "white",
                        borderRadius: "50%",
                        transition: "0.3s",
                      }}
                    />
                  </span>
                </label>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <p style={{ fontWeight: "600", marginBottom: "0.25rem" }}>
                    Weekly Reports
                  </p>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    Receive weekly summary reports via email
                  </p>
                </div>
                <label
                  style={{
                    position: "relative",
                    display: "inline-block",
                    width: "48px",
                    height: "24px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={settings.weeklyReports}
                    onChange={(e) =>
                      handleChange("weeklyReports", e.target.checked)
                    }
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      cursor: "pointer",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: settings.weeklyReports
                        ? "var(--color-primary)"
                        : "var(--bg-tertiary)",
                      borderRadius: "24px",
                      transition: "0.3s",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        content: "",
                        height: "18px",
                        width: "18px",
                        left: settings.weeklyReports ? "26px" : "3px",
                        bottom: "3px",
                        background: "white",
                        borderRadius: "50%",
                        transition: "0.3s",
                      }}
                    />
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="dashboard-card col-span-12">
          <div className="card-header">
            <h2 className="card-title">Appearance</h2>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label className="form-label">Theme</label>
              <div
                style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}
              >
                {["light", "dark", "auto"].map((theme) => (
                  <label
                    key={theme}
                    style={{
                      flex: 1,
                      padding: "1rem",
                      border: `2px solid ${settings.theme === theme ? "var(--color-primary)" : "var(--border-color)"}`,
                      borderRadius: "var(--border-radius)",
                      cursor: "pointer",
                      textAlign: "center",
                      transition: "all 0.2s",
                      background:
                        settings.theme === theme
                          ? "var(--bg-tertiary)"
                          : "transparent",
                    }}
                  >
                    <input
                      type="radio"
                      name="theme"
                      value={theme}
                      checked={settings.theme === theme}
                      onChange={(e) => handleChange("theme", e.target.value)}
                      style={{ display: "none" }}
                    />
                    <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                      {theme === "light"
                        ? "☀️"
                        : theme === "dark"
                          ? "🌙"
                          : "🔄"}
                    </div>
                    <p
                      style={{ fontWeight: "600", textTransform: "capitalize" }}
                    >
                      {theme}
                    </p>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div
        style={{
          marginTop: "2rem",
          display: "flex",
          justifyContent: "flex-end",
          gap: "1rem",
        }}
      >
        <button className="btn btn-secondary">Cancel</button>
        <button className="btn btn-primary" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  );
}
