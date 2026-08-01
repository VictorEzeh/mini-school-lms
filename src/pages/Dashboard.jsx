import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Dashboard({ user }) {
  return (
    <>
      <Navbar user={user} />

      <div className="dashboard-page">
        <section className="welcome-banner">
          <div>
            <h1>Welcome Back 👋</h1>
            <p>{user?.email}</p>
          </div>
        </section>

        <section className="stats-grid">
          <div className="stat-card">
            <h3>12</h3>
            <p>Total Assignments</p>
          </div>

          <div className="stat-card">
            <h3>4</h3>
            <p>Due This Week</p>
          </div>

          <div className="stat-card">
            <h3>89%</h3>
            <p>Completion Rate</p>
          </div>
        </section>

        <section className="quick-actions">
          <h2>Quick Actions</h2>

          <div className="action-buttons">
            <Link to="/assignments">View Assignments</Link>
            <Link to="/profile">Profile</Link>
          </div>
        </section>

        <section className="recent-activity">
          <h2>Recent Activity</h2>

          <div className="activity-card">
            <p>📚 New Math Assignment Posted</p>
          </div>

          <div className="activity-card">
            <p>🧪 Science Project Due Friday</p>
          </div>

          <div className="activity-card">
            <p>🎉 Great Job Completing Last Week’s Tasks!</p>
          </div>
        </section>
      </div>
    </>
  );
}

export default Dashboard;