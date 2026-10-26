import React from 'react';

/**
 * Toast Alert Component for user feedback notifications.
 * Student ID: 2400032700 | Name: UMMADI VIJAY KUMAR | Section: S51
 */
export default function ToastAlert({ toast, onClose }) {
  if (!toast) return null;

  const bgClass =
    toast.type === 'success'
      ? 'bg-success text-white'
      : toast.type === 'danger'
      ? 'bg-danger text-white'
      : toast.type === 'warning'
      ? 'bg-warning text-dark'
      : 'bg-primary text-white';

  const iconClass =
    toast.type === 'success'
      ? 'bi-check-circle-fill'
      : toast.type === 'danger'
      ? 'bi-exclamation-octagon-fill'
      : toast.type === 'warning'
      ? 'bi-exclamation-triangle-fill'
      : 'bi-info-circle-fill';

  return (
    <div
      className="position-fixed bottom-0 end-0 p-3"
      style={{ zIndex: 1090, maxWidth: '420px' }}
    >
      <div className={`toast show align-items-center ${bgClass} border-0 shadow-lg`} role="alert" aria-live="assertive" aria-atomic="true">
        <div className="d-flex">
          <div className="toast-body d-flex align-items-center gap-2">
            <i className={`bi ${iconClass} fs-5`}></i>
            <div>
              {toast.title && <strong className="d-block">{toast.title}</strong>}
              <span>{toast.message}</span>
            </div>
          </div>
          <button
            type="button"
            className={`btn-close ${toast.type !== 'warning' ? 'btn-close-white' : ''} me-2 m-auto`}
            aria-label="Close"
            onClick={onClose}
          ></button>
        </div>
      </div>
    </div>
  );
}
