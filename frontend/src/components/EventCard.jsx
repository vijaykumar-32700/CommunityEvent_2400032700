import React from 'react';

/**
 * Event Card Component for grid display.
 * Student ID: 2400032700 | Name: UMMADI VIJAY KUMAR | Section: S51
 */
export default function EventCard({ event, onEdit, onDelete, onToggleStatus, isActionLoading }) {
  const isCompleted = Boolean(event.completed);

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="custom-card h-100 p-3 d-flex flex-column justify-content-between position-relative">
        <div>
          {/* Header row: ID badge & Status badge */}
          <div className="d-flex align-items-center justify-content-between mb-2">
            <span className="badge-id" title="Auto-generated Primary Key ID">
              ID #{event.id}
            </span>
            <span className={isCompleted ? 'badge-completed' : 'badge-upcoming'}>
              <i className={`bi ${isCompleted ? 'bi-check-circle-fill' : 'bi-clock-fill'}`}></i>
              {isCompleted ? 'Completed' : 'Upcoming'}
            </span>
          </div>

          {/* Event Title */}
          <h5 className="fw-bold text-dark mb-2 mt-1" style={{ fontSize: '1.05rem', lineHeight: '1.35' }}>
            {event.eventName}
          </h5>

          {/* Details list */}
          <div className="d-flex flex-column gap-2 my-3 text-secondary small">
            <div className="d-flex align-items-center gap-2">
              <i className="bi bi-geo-alt-fill text-danger fs-6"></i>
              <span className="text-truncate" title={event.venue}>
                {event.venue}
              </span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <i className="bi bi-people-fill text-primary fs-6"></i>
              <span>
                <strong className="text-dark">{Number(event.attendeeCount).toLocaleString()}</strong> Expected Attendees
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons Footer */}
        <div className="pt-3 border-top mt-2 d-flex align-items-center justify-content-between gap-1">
          {/* Quick Toggle Status */}
          <button
            className={`btn btn-sm ${isCompleted ? 'btn-outline-secondary' : 'btn-outline-success'} d-flex align-items-center gap-1`}
            onClick={() => onToggleStatus(event.id)}
            disabled={isActionLoading === event.id}
            title={isCompleted ? 'Mark as Upcoming' : 'Mark as Completed'}
          >
            <i className={`bi ${isCompleted ? 'bi-arrow-counterclockwise' : 'bi-check-lg'}`}></i>
            <span className="small">{isCompleted ? 'Reopen' : 'Done'}</span>
          </button>

          <div className="d-flex align-items-center gap-1">
            {/* Edit Button */}
            <button
              className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1"
              onClick={() => onEdit(event)}
              disabled={isActionLoading === event.id}
              title="Edit event details"
            >
              <i className="bi bi-pencil-square"></i>
              <span className="small">Edit</span>
            </button>

            {/* Delete Button */}
            <button
              className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
              onClick={() => onDelete(event)}
              disabled={isActionLoading === event.id}
              title="Delete event"
            >
              <i className="bi bi-trash3-fill"></i>
              <span className="small">Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
