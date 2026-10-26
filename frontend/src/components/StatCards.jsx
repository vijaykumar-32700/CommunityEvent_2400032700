import React from 'react';

/**
 * Metric Summary Cards highlighting real-time event analytics.
 * Student ID: 2400032700 | Name: UMMADI VIJAY KUMAR | Section: S51
 */
export default function StatCards({ events }) {
  const total = events.length;
  const completed = events.filter((e) => e.completed).length;
  const upcoming = total - completed;
  const totalAttendees = events.reduce((sum, e) => sum + (Number(e.attendeeCount) || 0), 0);
  const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="row g-3 mb-4">
      {/* Total Events */}
      <div className="col-12 col-sm-6 col-lg-3">
        <div className="stat-card">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <span className="text-muted fw-semibold small text-uppercase">Total Events</span>
            <div className="stat-icon-wrapper" style={{ background: '#eef2ff', color: '#4f46e5' }}>
              <i className="bi bi-calendar-event"></i>
            </div>
          </div>
          <div className="d-flex align-items-baseline gap-2">
            <h3 className="fw-bold mb-0 text-dark">{total}</h3>
            <span className="badge bg-light text-secondary border small">All Records</span>
          </div>
          <div className="text-muted small mt-2">Managed in Database</div>
        </div>
      </div>

      {/* Completed Events */}
      <div className="col-12 col-sm-6 col-lg-3">
        <div className="stat-card">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <span className="text-muted fw-semibold small text-uppercase">Completed</span>
            <div className="stat-icon-wrapper" style={{ background: '#ecfdf5', color: '#10b981' }}>
              <i className="bi bi-check2-circle"></i>
            </div>
          </div>
          <div className="d-flex align-items-baseline gap-2">
            <h3 className="fw-bold mb-0 text-dark">{completed}</h3>
            <span className="badge bg-success-subtle text-success border border-success-subtle small">
              {completionPercentage}% Done
            </span>
          </div>
          <div className="progress mt-2" style={{ height: '5px' }}>
            <div
              className="progress-bar bg-success"
              role="progressbar"
              style={{ width: `${completionPercentage}%` }}
              aria-valuenow={completionPercentage}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="col-12 col-sm-6 col-lg-3">
        <div className="stat-card">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <span className="text-muted fw-semibold small text-uppercase">Upcoming</span>
            <div className="stat-icon-wrapper" style={{ background: '#eff6ff', color: '#3b82f6' }}>
              <i className="bi bi-hourglass-split"></i>
            </div>
          </div>
          <div className="d-flex align-items-baseline gap-2">
            <h3 className="fw-bold mb-0 text-dark">{upcoming}</h3>
            <span className="badge bg-primary-subtle text-primary border border-primary-subtle small">Active</span>
          </div>
          <div className="text-muted small mt-2">Awaiting execution</div>
        </div>
      </div>

      {/* Total Expected Attendees */}
      <div className="col-12 col-sm-6 col-lg-3">
        <div className="stat-card">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <span className="text-muted fw-semibold small text-uppercase">Total Attendees</span>
            <div className="stat-icon-wrapper" style={{ background: '#fdf4ff', color: '#a855f7' }}>
              <i className="bi bi-people-fill"></i>
            </div>
          </div>
          <div className="d-flex align-items-baseline gap-2">
            <h3 className="fw-bold mb-0 text-dark">{totalAttendees.toLocaleString()}</h3>
            <span className="badge bg-purple-subtle text-purple small" style={{ background: '#fae8ff', color: '#9333ea' }}>People</span>
          </div>
          <div className="text-muted small mt-2">Combined Reach</div>
        </div>
      </div>
    </div>
  );
}
