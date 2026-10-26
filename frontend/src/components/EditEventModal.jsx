import React, { useState, useEffect } from 'react';

/**
 * Edit Community Event Modal.
 * Displays auto-generated ID as read-only badge and allows editing other fields.
 * Student ID: 2400032700 | Name: UMMADI VIJAY KUMAR | Section: S51
 */
export default function EditEventModal({ event, onClose, onSave, isSaving }) {
  const [formData, setFormData] = useState({
    eventName: '',
    venue: '',
    attendeeCount: '',
    completed: false,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (event) {
      setFormData({
        eventName: event.eventName || '',
        venue: event.venue || '',
        attendeeCount: event.attendeeCount || '',
        completed: Boolean(event.completed),
      });
      setErrors({});
    }
  }, [event]);

  if (!event) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.eventName || !formData.eventName.trim()) {
      newErrors.eventName = 'Event name is required';
    } else if (formData.eventName.trim().length < 3) {
      newErrors.eventName = 'Event name must be at least 3 characters';
    }

    if (!formData.venue || !formData.venue.trim()) {
      newErrors.venue = 'Venue is required';
    } else if (formData.venue.trim().length < 3) {
      newErrors.venue = 'Venue must be at least 3 characters';
    }

    if (formData.attendeeCount === '' || formData.attendeeCount === null) {
      newErrors.attendeeCount = 'Attendee count is required';
    } else {
      const num = Number(formData.attendeeCount);
      if (isNaN(num) || num < 1) {
        newErrors.attendeeCount = 'Attendee count must be at least 1';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave(event.id, formData);
    }
  };

  return (
    <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '16px' }}>
          <div className="modal-header border-bottom pb-3">
            <div className="d-flex align-items-center gap-2">
              <div className="rounded-circle bg-primary bg-opacity-10 text-primary p-2">
                <i className="bi bi-pencil-square fs-5"></i>
              </div>
              <div>
                <h5 className="modal-title fw-bold text-dark">Edit Community Event</h5>
                <span className="badge-id">Database ID #{event.id} (Read-Only)</span>
              </div>
            </div>
            <button type="button" className="btn-close" onClick={onClose} disabled={isSaving}></button>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="modal-body py-3">
              <div className="mb-3">
                <label className="form-label fw-semibold small text-secondary">
                  Event Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.eventName ? 'is-invalid' : ''}`}
                  value={formData.eventName}
                  onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                  disabled={isSaving}
                  maxLength={100}
                />
                {errors.eventName && <div className="invalid-feedback">{errors.eventName}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold small text-secondary">
                  Venue Location <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.venue ? 'is-invalid' : ''}`}
                  value={formData.venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  disabled={isSaving}
                  maxLength={150}
                />
                {errors.venue && <div className="invalid-feedback">{errors.venue}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold small text-secondary">
                  Expected Attendees <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  className={`form-control ${errors.attendeeCount ? 'is-invalid' : ''}`}
                  min="1"
                  max="1000000"
                  value={formData.attendeeCount}
                  onChange={(e) => setFormData({ ...formData, attendeeCount: e.target.value })}
                  disabled={isSaving}
                />
                {errors.attendeeCount && <div className="invalid-feedback">{errors.attendeeCount}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold small text-secondary">Completion Status</label>
                <div className="p-3 border rounded-3 bg-light d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    <i className={`bi ${formData.completed ? 'bi-check2-circle text-success fs-5' : 'bi-hourglass-split text-primary fs-5'}`}></i>
                    <div>
                      <div className="fw-bold small">{formData.completed ? 'Completed' : 'Upcoming'}</div>
                    </div>
                  </div>
                  <div className="form-check form-switch fs-5 m-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      checked={formData.completed}
                      onChange={(e) => setFormData({ ...formData, completed: e.target.checked })}
                      disabled={isSaving}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer border-top pt-3">
              <button type="button" className="btn btn-outline-secondary px-3" onClick={onClose} disabled={isSaving}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary-custom px-4 d-flex align-items-center gap-2" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status"></span>
                    Saving...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check2"></i>
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
