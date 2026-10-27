import React from 'react';

export default function Navbar({ activeTab, setActiveTab }) {
  return (
    <nav className="app-navbar sticky-top">
      <div className="container-fluid px-4 d-flex align-items-center justify-content-between" style={{ height: '64px' }}>

        {/* Brand */}
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

        {/* Nav Links */}
        <div className="nav-links d-flex align-items-center gap-2">
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
    </nav>
  );
}
