'use client';

import { useAuth } from '@/features/auth/hooks/useAuth';

export default function DashboardPage() {
  const { data: user } = useAuth();

  const stats = [
    {
      title: 'Total Users',
      value: '2,543',
      change: '+12.5%',
      positive: true,
      icon: '👥',
    },
    {
      title: 'Active Sessions',
      value: '1,234',
      change: '+5.2%',
      positive: true,
      icon: '🔥',
    },
    {
      title: 'Revenue',
      value: '$45,231',
      change: '+18.3%',
      positive: true,
      icon: '💰',
    },
    {
      title: 'Bounce Rate',
      value: '23.4%',
      change: '-2.1%',
      positive: true,
      icon: '📉',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      user: 'John Doe',
      action: 'Created new account',
      time: '2 minutes ago',
    },
    {
      id: 2,
      user: 'Jane Smith',
      action: 'Updated profile',
      time: '15 minutes ago',
    },
    { id: 3, user: 'Bob Johnson', action: 'Logged in', time: '1 hour ago' },
    {
      id: 4,
      user: 'Alice Williams',
      action: 'Changed password',
      time: '2 hours ago',
    },
    {
      id: 5,
      user: 'Charlie Brown',
      action: 'Uploaded document',
      time: '3 hours ago',
    },
  ];

  return (
    <>
      <section aria-labelledby="welcome-heading" className="card">
        <div style={{ padding: '1.5rem' }}>
          <h1 id="welcome-heading">Welcome back, {user?.username}! 👋</h1>
          <p>Heres whats happening with your application today.</p>
        </div>
      </section>

      <section aria-label="Statistics Overview" className="stats-grid">
        {stats.map((stat, index) => (
          <article key={index} className="stat-card">
            {/* ... */}
          </article>
        ))}
      </section>

      <section aria-label="Dashboard Widgets" className="dashboard-grid">
        <article className="dashboard-card col-span-8">
          <header className="card-header">
            <h2 className="card-title">Recent Activity</h2>
          </header>
          {/* ... */}
        </article>
        {/* More widgets */}
      </section>
    </>
  );
}
