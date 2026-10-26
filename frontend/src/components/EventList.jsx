import React, { useState, useMemo } from 'react';
import EventCard from './EventCard';

/**
 * Event List Component supporting Table & Card Grid Views, Filtering, Searching, and Sorting.
 * Student ID: 2400032700 | Name: UMMADI VIJAY KUMAR | Section: S51
 */
export default function EventList({
  events,
  isLoading,
  onRefresh,
  onEdit,
  onDelete,
  onToggleStatus,
  actionLoadingId,
  onAddNewClick,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('ID_DESC');
  const [viewMode, setViewMode] = useState('TABLE'); // 'TABLE' or 'GRID'

  // Filter & Sort Logic
  const filteredAndSortedEvents = useMemo(() => {
    let result = [...events];

    // Filter by search term
    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase().trim();
      result = result.filter(
        (e) =>
          (e.eventName && e.eventName.toLowerCase().includes(query)) ||
          (e.venue && e.venue.toLowerCase().includes(query))
      );
    }

    // Filter by completion status
    if (statusFilter === 'COMPLETED') {
      result = result.filter((e) => e.completed === true);
    } else if (statusFilter === 'UPCOMING') {
      result = result.filter((e) => e.completed === false);
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'ID_ASC':
          return a.id - b.id;
        case 'ID_DESC':
          return b.id - a.id;
        case 'NAME_ASC':
          return a.eventName.localeCompare(b.eventName);
        case 'ATTENDEES_DESC':
          return b.attendeeCount - a.attendeeCount;
        case 'ATTENDEES_ASC':
          return a.attendeeCount - b.attendeeCount;
        default:
          return b.id - a.id;
      }
    });

    return result;
  }, [events, searchTerm, statusFilter, sortBy]);

  return (
    <div className="custom-card p-4">
      {/* Top Header & View Controls Bar */}
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 pb-3 mb-3 border-bottom">
        <div>
          <div className="d-flex align-items-center gap-2">
            <h5 className="fw-bold mb-0 text-dark">Community Event Records</h5>
            <span className="badge bg-primary rounded-pill small">
              {filteredAndSortedEvents.length} of {events.length}
            </span>
          </div>
          <small className="text-muted">Viewing live records from Spring Boot JPA Database</small>
        </div>

        {/* View Switcher & Action Controls */}
        <div className="d-flex align-items-center gap-2">
          {/* Table / Grid Switch */}
          <div className="btn-group btn-group-sm" role="group">
            <button
              type="button"
              className={`btn ${viewMode === 'TABLE' ? 'btn-primary' : 'btn-outline-secondary'}`}
              onClick={() => setViewMode('TABLE')}
              title="Table View"
            >
              <i className="bi bi-table me-1"></i> Table
            </button>
            <button
              type="button"
              className={`btn ${viewMode === 'GRID' ? 'btn-primary' : 'btn-outline-secondary'}`}
              onClick={() => setViewMode('GRID')}
              title="Card Grid View"
            >
              <i className="bi bi-grid-fill me-1"></i> Grid
            </button>
          </div>

          {/* Refresh Button */}
          <button
            className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1"
            onClick={onRefresh}
            disabled={isLoading}
            title="Refresh records from backend"
          >
            <i className={`bi bi-arrow-clockwise ${isLoading ? 'spin' : ''}`}></i>
            <span className="d-none d-sm-inline">Refresh</span>
          </button>

          {/* Add New Event Button */}
          <button
            className="btn btn-sm btn-primary-custom d-flex align-items-center gap-1"
            onClick={onAddNewClick}
          >
            <i className="bi bi-plus-lg"></i>
            <span>Add Event</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="row g-2 mb-4 bg-light p-3 rounded-3 border">
        {/* Search input */}
        <div className="col-12 col-md-5">
          <div className="input-group input-group-sm">
            <span className="input-group-text bg-white border-end-0 text-muted">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search by event name or venue..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="btn btn-outline-secondary border-start-0 bg-white text-muted"
                type="button"
                onClick={() => setSearchTerm('')}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            )}
          </div>
        </div>

        {/* Status Filter */}
        <div className="col-6 col-md-3">
          <div className="input-group input-group-sm">
            <span className="input-group-text bg-white text-muted">Status</span>
            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">All Statuses</option>
              <option value="UPCOMING">Upcoming Only</option>
              <option value="COMPLETED">Completed Only</option>
            </select>
          </div>
        </div>

        {/* Sort Options */}
        <div className="col-6 col-md-4">
          <div className="input-group input-group-sm">
            <span className="input-group-text bg-white text-muted">Sort By</span>
            <select
              className="form-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="ID_DESC">ID (Newest First)</option>
              <option value="ID_ASC">ID (Oldest First)</option>
              <option value="NAME_ASC">Event Name (A-Z)</option>
              <option value="ATTENDEES_DESC">Attendees (High to Low)</option>
              <option value="ATTENDEES_ASC">Attendees (Low to High)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content Area: Loading, Empty State, or Records */}
      {isLoading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading events...</span>
          </div>
          <div className="text-muted mt-2 small">Fetching records from Spring Boot API...</div>
        </div>
      ) : filteredAndSortedEvents.length === 0 ? (
        <div className="text-center py-5 px-3">
          <div className="rounded-circle bg-light p-3 d-inline-flex mb-3 text-muted">
            <i className="bi bi-inbox fs-1"></i>
          </div>
          <h5 className="fw-bold text-dark">No Community Events Found</h5>
          <p className="text-muted small mx-auto" style={{ maxWidth: '420px' }}>
            {searchTerm || statusFilter !== 'ALL'
              ? 'No events match your current filter and search criteria. Try resetting filters.'
              : 'There are currently no community event records in the database. Add your first event to get started!'}
          </p>
          {searchTerm || statusFilter !== 'ALL' ? (
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('ALL');
              }}
            >
              Reset Filters
            </button>
          ) : (
            <button className="btn btn-sm btn-primary-custom" onClick={onAddNewClick}>
              + Create First Community Event
            </button>
          )}
        </div>
      ) : viewMode === 'TABLE' ? (
        /* TABLE VIEW */
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr className="text-secondary small">
                <th scope="col" style={{ width: '80px' }}>ID</th>
                <th scope="col">EVENT NAME</th>
                <th scope="col">VENUE</th>
                <th scope="col" className="text-end">ATTENDEES</th>
                <th scope="col" className="text-center">STATUS</th>
                <th scope="col" className="text-end" style={{ width: '180px' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedEvents.map((event) => {
                const isCompleted = Boolean(event.completed);
                const isActionBusy = actionLoadingId === event.id;

                return (
                  <tr key={event.id} className="fade-in">
                    {/* Auto-generated ID */}
                    <td>
                      <span className="badge-id">#{event.id}</span>
                    </td>

                    {/* Event Name */}
                    <td>
                      <div className="fw-bold text-dark">{event.eventName}</div>
                    </td>

                    {/* Venue */}
                    <td>
                      <div className="d-flex align-items-center gap-1 text-secondary small">
                        <i className="bi bi-geo-alt-fill text-danger"></i>
                        <span>{event.venue}</span>
                      </div>
                    </td>

                    {/* Attendees */}
                    <td className="text-end">
                      <span className="badge bg-light text-dark border fw-semibold px-2 py-1">
                        <i className="bi bi-people-fill text-primary me-1"></i>
                        {Number(event.attendeeCount).toLocaleString()}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="text-center">
                      <span className={isCompleted ? 'badge-completed' : 'badge-upcoming'}>
                        <i className={`bi ${isCompleted ? 'bi-check-circle-fill' : 'bi-clock-fill'}`}></i>
                        {isCompleted ? 'Completed' : 'Upcoming'}
                      </span>
                    </td>

                    {/* Action Buttons */}
                    <td className="text-end">
                      <div className="btn-group btn-group-sm" role="group">
                        {/* Status Toggle Button */}
                        <button
                          type="button"
                          className={`btn ${isCompleted ? 'btn-outline-secondary' : 'btn-outline-success'}`}
                          onClick={() => onToggleStatus(event.id)}
                          disabled={isActionBusy}
                          title={isCompleted ? 'Mark as Upcoming' : 'Mark as Completed'}
                        >
                          <i className={`bi ${isCompleted ? 'bi-arrow-counterclockwise' : 'bi-check-lg'}`}></i>
                        </button>

                        {/* Edit Button */}
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={() => onEdit(event)}
                          disabled={isActionBusy}
                          title="Edit event"
                        >
                          <i className="bi bi-pencil"></i>
                        </button>

                        {/* Delete Button */}
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => onDelete(event)}
                          disabled={isActionBusy}
                          title="Delete event"
                        >
                          <i className="bi bi-trash3"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        /* CARD GRID VIEW */
        <div className="row g-3">
          {filteredAndSortedEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleStatus={onToggleStatus}
              isActionLoading={actionLoadingId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
