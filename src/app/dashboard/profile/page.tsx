"use client";

import { useMe } from "@/features/auth/hooks/useAuth";
import { toast } from "@/shared/lib/toast";
import { useState } from "react";

export default function ProfilePage() {
  const { data: user } = useMe();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.firstname || user?.username || "",
    email: user?.username || "",
    phone: "+84 123 456 789",
    bio: "Full-stack developer passionate about building great products.",
    location: "Ho Chi Minh City, Vietnam",
    website: "https://example.com",
  });

  const handleSave = () => {
    toast.success("Profile updated successfully!");
    setIsEditing(false);
  };

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div>
      {/* Header */}
      <div className="card" style={{ marginBottom: "2rem" }}>
        <div style={{ padding: "1.5rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  marginBottom: "0.25rem",
                }}
              >
                Profile
              </h1>
              <p
                style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}
              >
                Manage your personal information
              </p>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancel" : "✏️ Edit Profile"}
            </button>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Profile Info */}
        <div className="dashboard-card col-span-8">
          <div className="card-header">
            <h2 className="card-title">Personal Information</h2>
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
                <label className="form-label">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    className="form-input"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                  />
                ) : (
                  <p
                    style={{
                      padding: "0.625rem 0",
                      color: "var(--text-primary)",
                    }}
                  >
                    {formData.name}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    className="form-input"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                ) : (
                  <p
                    style={{
                      padding: "0.625rem 0",
                      color: "var(--text-primary)",
                    }}
                  >
                    {formData.email}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    className="form-input"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                  />
                ) : (
                  <p
                    style={{
                      padding: "0.625rem 0",
                      color: "var(--text-primary)",
                    }}
                  >
                    {formData.phone}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Bio</label>
                {isEditing ? (
                  <textarea
                    className="form-input"
                    rows={4}
                    value={formData.bio}
                    onChange={(e) => handleChange("bio", e.target.value)}
                  />
                ) : (
                  <p
                    style={{
                      padding: "0.625rem 0",
                      color: "var(--text-primary)",
                    }}
                  >
                    {formData.bio}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Location</label>
                {isEditing ? (
                  <input
                    type="text"
                    className="form-input"
                    value={formData.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                  />
                ) : (
                  <p
                    style={{
                      padding: "0.625rem 0",
                      color: "var(--text-primary)",
                    }}
                  >
                    {formData.location}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Website</label>
                {isEditing ? (
                  <input
                    type="url"
                    className="form-input"
                    value={formData.website}
                    onChange={(e) => handleChange("website", e.target.value)}
                  />
                ) : (
                  <p style={{ padding: "0.625rem 0" }}>
                    <a
                      href={formData.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {formData.website}
                    </a>
                  </p>
                )}
              </div>

              {isEditing && (
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    justifyContent: "flex-end",
                  }}
                >
                  <button
                    className="btn btn-secondary"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                  <button className="btn btn-primary" onClick={handleSave}>
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <div className="dashboard-card col-span-4">
          <div className="card-body">
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem",
                  fontSize: "3rem",
                  color: "white",
                }}
              >
                {(user?.firstname || user?.username)?.charAt(0).toUpperCase()}
              </div>

              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "700",
                  marginBottom: "0.25rem",
                }}
              >
                {user?.firstname || user?.username}
              </h3>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "0.875rem",
                  marginBottom: "1.5rem",
                }}
              >
                {user?.username}
              </p>

              <div
                style={{
                  padding: "1rem",
                  background: "var(--bg-secondary)",
                  borderRadius: "var(--border-radius)",
                  marginBottom: "1rem",
                }}
              >
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--text-secondary)",
                    marginBottom: "0.5rem",
                  }}
                >
                  Member Since
                </p>
                <p style={{ fontWeight: "600" }}>January 2024</p>
              </div>

              <div
                style={{
                  padding: "1rem",
                  background: "var(--bg-secondary)",
                  borderRadius: "var(--border-radius)",
                }}
              >
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--text-secondary)",
                    marginBottom: "0.5rem",
                  }}
                >
                  Last Login
                </p>
                <p style={{ fontWeight: "600" }}>2 hours ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="dashboard-card col-span-12">
          <div className="card-header">
            <h2 className="card-title">Security</h2>
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
                    Password
                  </p>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    Last changed 3 months ago
                  </p>
                </div>
                <button className="btn btn-secondary">Change Password</button>
              </div>

              <div className="divider" />

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <p style={{ fontWeight: "600", marginBottom: "0.25rem" }}>
                    Two-Factor Authentication
                  </p>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    Add an extra layer of security to your account
                  </p>
                </div>
                <button className="btn btn-secondary">Enable 2FA</button>
              </div>

              <div className="divider" />

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <p style={{ fontWeight: "600", marginBottom: "0.25rem" }}>
                    Active Sessions
                  </p>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    Manage your active sessions across devices
                  </p>
                </div>
                <button className="btn btn-secondary">View Sessions</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
