"use client";

import { useMe } from "@/features/auth/hooks/useAuth";

export default function DashboardPage() {
  const { data: user } = useMe();

  const stats = [
    {
      title: "Total Users",
      value: "2,543",
      change: "+12.5%",
      positive: true,
      icon: "👥",
    },
    {
      title: "Active Sessions",
      value: "1,234",
      change: "+5.2%",
      positive: true,
      icon: "🔥",
    },
    {
      title: "Revenue",
      value: "$45,231",
      change: "+18.3%",
      positive: true,
      icon: "💰",
    },
    {
      title: "Bounce Rate",
      value: "23.4%",
      change: "-2.1%",
      positive: true,
      icon: "📉",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      user: "John Doe",
      action: "Created new account",
      time: "2 minutes ago",
    },
    {
      id: 2,
      user: "Jane Smith",
      action: "Updated profile",
      time: "15 minutes ago",
    },
    { id: 3, user: "Bob Johnson", action: "Logged in", time: "1 hour ago" },
    {
      id: 4,
      user: "Alice Williams",
      action: "Changed password",
      time: "2 hours ago",
    },
    {
      id: 5,
      user: "Charlie Brown",
      action: "Uploaded document",
      time: "3 hours ago",
    },
  ];

  return (
    <div>
      {/* Welcome Section */}
      <div className="card" style={{ marginBottom: "2rem" }}>
        <div style={{ padding: "1.5rem" }}>
          <h1
            style={{
              fontSize: "1.875rem",
              fontWeight: "700",
              marginBottom: "0.5rem",
            }}
          >
            Welcome back, {user?.username}! 👋
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>
            Here&apos;s what&apos;s happening with your application today.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-header">
              <h3 className="stat-title">{stat.title}</h3>
              <span className="stat-icon">{stat.icon}</span>
            </div>
            <p className="stat-value">{stat.value}</p>
            <p
              className={`stat-change ${stat.positive ? "positive" : "negative"}`}
            >
              {stat.change} from last month
            </p>
          </div>
        ))}
      </div>

      {/* Dashboard Grid */}
      <div className="dashboard-grid">
        {/* Recent Activity */}
        <div className="dashboard-card col-span-8">
          <div className="card-header">
            <h2 className="card-title">Recent Activity</h2>
          </div>
          <div className="card-body">
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "1rem",
                    background: "var(--bg-secondary)",
                    borderRadius: "var(--border-radius)",
                  }}
                >
                  <div>
                    <p style={{ fontWeight: "600", marginBottom: "0.25rem" }}>
                      {activity.user}
                    </p>
                    <p
                      style={{
                        fontSize: "0.875rem",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {activity.action}
                    </p>
                  </div>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--text-tertiary)",
                    }}
                  >
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="dashboard-card col-span-4">
          <div className="card-header">
            <h2 className="card-title">Quick Actions</h2>
          </div>
          <div className="card-body">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <button className="btn btn-primary" style={{ width: "100%" }}>
                ➕ Create User
              </button>
              <button className="btn btn-secondary" style={{ width: "100%" }}>
                📊 View Reports
              </button>
              <button className="btn btn-secondary" style={{ width: "100%" }}>
                ⚙️ Settings
              </button>
              <button className="btn btn-secondary" style={{ width: "100%" }}>
                📧 Send Notification
              </button>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="dashboard-card col-span-6">
          <div className="card-header">
            <h2 className="card-title">System Status</h2>
          </div>
          <div className="card-body">
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "0.5rem",
                  }}
                >
                  <span style={{ fontSize: "0.875rem", fontWeight: "500" }}>
                    CPU Usage
                  </span>
                  <span
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    45%
                  </span>
                </div>
                <div
                  style={{
                    height: "8px",
                    background: "var(--bg-tertiary)",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: "45%",
                      height: "100%",
                      background: "var(--color-primary)",
                    }}
                  />
                </div>
              </div>

              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "0.5rem",
                  }}
                >
                  <span style={{ fontSize: "0.875rem", fontWeight: "500" }}>
                    Memory
                  </span>
                  <span
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    68%
                  </span>
                </div>
                <div
                  style={{
                    height: "8px",
                    background: "var(--bg-tertiary)",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: "68%",
                      height: "100%",
                      background: "var(--color-warning)",
                    }}
                  />
                </div>
              </div>

              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "0.5rem",
                  }}
                >
                  <span style={{ fontSize: "0.875rem", fontWeight: "500" }}>
                    Storage
                  </span>
                  <span
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    82%
                  </span>
                </div>
                <div
                  style={{
                    height: "8px",
                    background: "var(--bg-tertiary)",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: "82%",
                      height: "100%",
                      background: "var(--color-error)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Users */}
        <div className="dashboard-card col-span-6">
          <div className="card-header">
            <h2 className="card-title">Top Users</h2>
          </div>
          <div className="card-body">
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {[
                {
                  name: "Alice Johnson",
                  activity: "245 actions",
                  avatar: "👩",
                },
                { name: "Bob Smith", activity: "189 actions", avatar: "👨" },
                { name: "Carol White", activity: "156 actions", avatar: "👩" },
                { name: "David Brown", activity: "134 actions", avatar: "👨" },
              ].map((user, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: "var(--bg-tertiary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.5rem",
                    }}
                  >
                    {user.avatar}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: "600", marginBottom: "0.125rem" }}>
                      {user.name}
                    </p>
                    <p
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {user.activity}
                    </p>
                  </div>
                  <span
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "700",
                      color: "var(--text-tertiary)",
                    }}
                  >
                    #{index + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
