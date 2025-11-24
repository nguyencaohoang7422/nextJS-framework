"use client";

import { useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  lastLogin: string;
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Admin",
    status: "active",
    lastLogin: "2 hours ago",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    role: "User",
    status: "active",
    lastLogin: "1 day ago",
  },
  {
    id: "3",
    name: "Carol White",
    email: "carol@example.com",
    role: "User",
    status: "active",
    lastLogin: "3 days ago",
  },
  {
    id: "4",
    name: "David Brown",
    email: "david@example.com",
    role: "Manager",
    status: "inactive",
    lastLogin: "1 week ago",
  },
  {
    id: "5",
    name: "Eve Davis",
    email: "eve@example.com",
    role: "User",
    status: "active",
    lastLogin: "5 hours ago",
  },
];

export default function UsersPage() {
  const [users] = useState<User[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole =
      filterRole === "all" ||
      user.role.toLowerCase() === filterRole.toLowerCase();
    return matchesSearch && matchesRole;
  });

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
              marginBottom: "1rem",
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
                Users Management
              </h1>
              <p
                style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}
              >
                Manage your application users
              </p>
            </div>
            <button className="btn btn-primary">➕ Add User</button>
          </div>

          {/* Filters */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <input
              type="text"
              className="form-input"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ flex: "1", minWidth: "250px" }}
            />
            <select
              className="form-input"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              style={{ minWidth: "150px" }}
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="user">User</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid" style={{ marginBottom: "2rem" }}>
        <div className="stat-card">
          <div className="stat-header">
            <h3 className="stat-title">Total Users</h3>
            <span className="stat-icon">👥</span>
          </div>
          <p className="stat-value">{users.length}</p>
        </div>
        <div className="stat-card">
          <div className="stat-header">
            <h3 className="stat-title">Active Users</h3>
            <span className="stat-icon">✅</span>
          </div>
          <p className="stat-value">
            {users.filter((u) => u.status === "active").length}
          </p>
        </div>
        <div className="stat-card">
          <div className="stat-header">
            <h3 className="stat-title">Admins</h3>
            <span className="stat-icon">👑</span>
          </div>
          <p className="stat-value">
            {users.filter((u) => u.role === "Admin").length}
          </p>
        </div>
        <div className="stat-card">
          <div className="stat-header">
            <h3 className="stat-title">Inactive</h3>
            <span className="stat-icon">⏸️</span>
          </div>
          <p className="stat-value">
            {users.filter((u) => u.status === "inactive").length}
          </p>
        </div>
      </div>

      {/* Users Table */}
      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Status</th>
                <th>Last Login</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    style={{
                      textAlign: "center",
                      padding: "2rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div>
                        <p
                          style={{
                            fontWeight: "600",
                            marginBottom: "0.125rem",
                          }}
                        >
                          {user.name}
                        </p>
                        <p
                          style={{
                            fontSize: "0.75rem",
                            color: "var(--text-secondary)",
                          }}
                        >
                          {user.email}
                        </p>
                      </div>
                    </td>
                    <td>
                      <span
                        style={{
                          padding: "0.25rem 0.75rem",
                          borderRadius: "9999px",
                          fontSize: "0.75rem",
                          fontWeight: "500",
                          background:
                            user.role === "Admin"
                              ? "#dbeafe"
                              : user.role === "Manager"
                                ? "#fef3c7"
                                : "#f3f4f6",
                          color:
                            user.role === "Admin"
                              ? "#1e40af"
                              : user.role === "Manager"
                                ? "#92400e"
                                : "#374151",
                        }}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <span
                        style={{
                          padding: "0.25rem 0.75rem",
                          borderRadius: "9999px",
                          fontSize: "0.75rem",
                          fontWeight: "500",
                          background:
                            user.status === "active" ? "#d1fae5" : "#fee2e2",
                          color:
                            user.status === "active" ? "#065f46" : "#991b1b",
                        }}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td
                      style={{
                        fontSize: "0.875rem",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {user.lastLogin}
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button className="btn btn-sm btn-ghost">✏️</button>
                        <button className="btn btn-sm btn-ghost">🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
