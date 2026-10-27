import React from 'react';

export default function Navbar({ activeTab, setActiveTab }) {
  return (
    <nav className="app-navbar sticky-top">
      <div className="container-fluid px-4 d-flex align-items-center justify-content-between" style={{ height: '64px' }}>

        {/* Left: Brand + Nav Links */}
        <div className="d-flex align-items-center gap-3">
          <a
            className="navbar-brand-custom d-flex align-items-center gap-3"
            href="#"
            onClick={(e) => { e.preventDefault(); setActiveTab('events'); }}
          >
            <div className="brand-icon">
              <i className="bi bi-calendar2-check-fill"></i>
            </div>
            <div className="brand-text">
              <span className="brand-main">Community</span>
              <span className="brand-accent">Pulse</span>
            </div>
          </a>

          {/* Navigation Buttons */}
          <div className="nav-links d-flex align-items-center gap-2 ms-3">
            <button
              className={`nav-btn ${activeTab === 'events' ? 'nav-btn-active' : ''}`}
              onClick={() => setActiveTab('events')}
            >
              <i className="bi bi-grid-1x2-fill"></i>
              <span>Dashboard</span>
            </button>
            <button
              className={`nav-btn ${activeTab === 'add' ? 'nav-btn-active' : ''}`}
              onClick={() => setActiveTab('add')}
            >
              <i className="bi bi-plus-circle-fill"></i>
              <span>Add Event</span>
            </button>
          </div>
        </div>

        {/* Right: Swagger UI Link */}
        <div className="d-flex align-items-center gap-2">
          <a
            href="http://localhost:8080/swagger-ui.html"
            target="_blank"
            rel="noopener noreferrer"
            className="swagger-btn"
            title="Open Swagger REST API Documentation"
          >
            <i className="bi bi-file-earmark-code-fill"></i>
            <span>Swagger UI</span>
            <i className="bi bi-box-arrow-up-right small opacity-75"></i>
          </a>
        </div>

      </div>
    </nav>
  );
}
