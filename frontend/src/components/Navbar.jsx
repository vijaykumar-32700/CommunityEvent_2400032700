import React from 'react';

/**
 * Navbar component displaying branding, student credentials, and backend connectivity status.
 * Student ID: 2400032700 | Name: UMMADI VIJAY KUMAR | Section: S51
 */
export default function Navbar({ isBackendOnline, checkingHealth, onRefresh, activeTab, setActiveTab }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm py-2" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)' }}>
      <div className="container-fluid px-4">
        {/* Brand Name & Icon */}
        <a className="navbar-brand d-flex align-items-center gap-2 fw-bold fs-5" href="#" onClick={(e) => { e.preventDefault(); setActiveTab('events'); }}>
          <div className="rounded-3 bg-primary p-2 d-flex align-items-center justify-content-center text-white" style={{ width: '38px', height: '38px' }}>
            <i className="bi bi-calendar2-check-fill fs-5"></i>
          </div>
          <div>
            <span className="text-white">Community</span>
            <span className="text-primary ms-1" style={{ color: '#818cf8' }}>Pulse</span>
            <span className="badge bg-secondary ms-2 text-uppercase fs-6" style={{ fontSize: '0.65rem' }}>SOA Exam Task</span>
          </div>
        </a>

        {/* Navbar toggler for mobile */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Content */}
        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Navigation Items */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-3 gap-1">
            <li className="nav-item">
              <button
                className={`btn btn-sm ${activeTab === 'events' ? 'btn-primary' : 'btn-outline-light border-0'} d-flex align-items-center gap-2`}
                onClick={() => setActiveTab('events')}
              >
                <i className="bi bi-grid-1x2-fill"></i>
                Dashboard & Records
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`btn btn-sm ${activeTab === 'add' ? 'btn-primary' : 'btn-outline-light border-0'} d-flex align-items-center gap-2`}
                onClick={() => setActiveTab('add')}
              >
                <i className="bi bi-plus-circle-fill"></i>
                + Add Community Event
              </button>
            </li>
            <li className="nav-item">
              <a
                className="btn btn-sm btn-outline-warning border-0 d-flex align-items-center gap-2 text-warning"
                href="http://localhost:8080/swagger-ui.html"
                target="_blank"
                rel="noreferrer"
                title="Open OpenAPI / Swagger Documentation"
              >
                <i className="bi bi-journal-code"></i>
                Swagger UI
                <i className="bi bi-box-arrow-up-right" style={{ fontSize: '0.75rem' }}></i>
              </a>
            </li>
          </ul>

          {/* Right Side: Student Credentials Badge & Backend Status */}
          <div className="d-flex flex-wrap align-items-center gap-2 mt-2 mt-lg-0">
            {/* Student Credential Pill */}
            <div className="badge d-flex align-items-center gap-2 py-2 px-3 text-start" style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
              <i className="bi bi-person-badge-fill text-warning fs-6"></i>
              <div>
                <div className="text-white fw-bold" style={{ fontSize: '0.8rem' }}>UMMADI VIJAY KUMAR</div>
                <div className="text-muted" style={{ fontSize: '0.7rem' }}>ID: <span className="text-info fw-bold">2400032700</span> | Sec: <span className="text-warning fw-bold">S51</span></div>
              </div>
            </div>

            {/* Backend Connectivity Status */}
            <div
              className={`badge d-flex align-items-center gap-2 py-2 px-3 ${
                isBackendOnline ? 'bg-success text-white' : 'bg-danger text-white'
              }`}
              style={{ fontSize: '0.78rem' }}
              title={isBackendOnline ? 'Backend API is connected on port 8080' : 'Backend API is currently offline. Ensure Spring Boot is running.'}
            >
              <span
                className="spinner-grow spinner-grow-sm"
                style={{ width: '8px', height: '8px', display: checkingHealth ? 'inline-block' : 'none' }}
              ></span>
              <i className={`bi ${isBackendOnline ? 'bi-cloud-check-fill' : 'bi-cloud-slash-fill'}`}></i>
              <span>{isBackendOnline ? 'API Connected (8080)' : 'API Offline'}</span>
              <button
                className="btn btn-link btn-sm text-white p-0 ms-1"
                onClick={onRefresh}
                title="Check connection again"
                style={{ textDecoration: 'none' }}
              >
                <i className={`bi bi-arrow-clockwise ${checkingHealth ? 'spin' : ''}`}></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
