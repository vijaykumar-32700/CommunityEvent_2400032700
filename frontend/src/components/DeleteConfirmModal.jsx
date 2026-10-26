import React from 'react';

/**
 * Delete Confirmation Modal.
 * Student ID: 2400032700 | Name: UMMADI VIJAY KUMAR | Section: S51
 */
export default function DeleteConfirmModal({ event, onClose, onConfirm, isDeleting }) {
  if (!event) return null;

  return (
    <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '16px' }}>
          <div className="modal-header border-bottom pb-3">
            <div className="d-flex align-items-center gap-2">
              <div className="rounded-circle bg-danger bg-opacity-10 text-danger p-2">
                <i className="bi bi-exclamation-triangle-fill fs-5"></i>
              </div>
              <h5 className="modal-title fw-bold text-dark">Confirm Delete</h5>
            </div>
            <button type="button" className="btn-close" onClick={onClose} disabled={isDeleting}></button>
          </div>

          <div className="modal-body py-4">
            <p className="text-secondary mb-3">
              Are you sure you want to delete this community event permanently from the database?
            </p>
            <div className="p-3 bg-light border rounded-3">
              <div className="d-flex align-items-center justify-content-between mb-1">
                <span className="badge-id">ID #{event.id}</span>
                <span className="badge bg-secondary">{event.venue}</span>
              </div>
              <h6 className="fw-bold text-dark mb-0">{event.eventName}</h6>
              <small className="text-muted">{Number(event.attendeeCount).toLocaleString()} Expected Attendees</small>
            </div>
            <div className="text-danger small mt-3">
              <i className="bi bi-info-circle me-1"></i>
              This action cannot be undone.
            </div>
          </div>

          <div className="modal-footer border-top pt-3">
            <button type="button" className="btn btn-outline-secondary px-3" onClick={onClose} disabled={isDeleting}>
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger px-4 d-flex align-items-center gap-2"
              onClick={() => onConfirm(event.id)}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status"></span>
                  Deleting...
                </>
              ) : (
                <>
                  <i className="bi bi-trash3-fill"></i>
                  Delete Record
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
