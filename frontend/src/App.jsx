import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import StatCards from './components/StatCards';
import AddEventForm from './components/AddEventForm';
import EventList from './components/EventList';
import EditEventModal from './components/EditEventModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import ToastAlert from './components/ToastAlert';
import { eventApi } from './services/api';

/**
 * Main Application Component for Community Event Management.
 * Student ID: 2400032700 | Name: UMMADI VIJAY KUMAR | Section: S51
 */
export default function App() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isBackendOnline, setIsBackendOnline] = useState(false);
  const [checkingHealth, setCheckingHealth] = useState(false);
  const [activeTab, setActiveTab] = useState('events'); // 'events' or 'add'

  // Modals & Actions
  const [editingEvent, setEditingEvent] = useState(null);
  const [isSavingEdit, setIsSavingEdit] = useState(false);
  const [deletingEvent, setDeletingEvent] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  // Toast notifications
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success', title = '') => {
    setToast({ message, type, title });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 4500);
  }, []);

  // Fetch events from Spring Boot REST API
  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    setCheckingHealth(true);
    try {
      const data = await eventApi.getAllEvents();
      setEvents(data || []);
      setIsBackendOnline(true);
    } catch (err) {
      console.error('Failed to fetch events:', err);
      setIsBackendOnline(false);
      showToast(
        'Unable to connect to Spring Boot API. Please ensure the backend is running on port 8080.',
        'danger',
        'Connection Error'
      );
    } finally {
      setIsLoading(false);
      setCheckingHealth(false);
    }
  }, [showToast]);

  // Initial load
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Create Event Handler
  const handleCreateEvent = async (formData) => {
    const response = await eventApi.createEvent(formData);
    showToast('Community Event created successfully!', 'success', 'Success');
    await fetchEvents();
    setActiveTab('events');
    return response;
  };

  // Update Event Handler
  const handleUpdateEvent = async (id, formData) => {
    setIsSavingEdit(true);
    try {
      await eventApi.updateEvent(id, formData);
      showToast(`Community event #${id} updated successfully!`, 'success', 'Updated');
      setEditingEvent(null);
      await fetchEvents();
    } catch (err) {
      showToast(err.message || 'Failed to update community event', 'danger', 'Update Error');
    } finally {
      setIsSavingEdit(false);
    }
  };

  // Delete Event Handler
  const handleDeleteEvent = async (id) => {
    setIsDeleting(true);
    try {
      await eventApi.deleteEvent(id);
      showToast(`Community event #${id} deleted successfully!`, 'success', 'Deleted');
      setDeletingEvent(null);
      await fetchEvents();
    } catch (err) {
      showToast(err.message || 'Failed to delete community event', 'danger', 'Delete Error');
    } finally {
      setIsDeleting(false);
    }
  };

  // Toggle Completion Status Handler
  const handleToggleStatus = async (id) => {
    setActionLoadingId(id);
    try {
      const response = await eventApi.toggleStatus(id);
      const isNowDone = response?.data?.completed ?? false;
      showToast(
        `Event #${id} marked as ${isNowDone ? 'Completed' : 'Upcoming'}!`,
        'success',
        'Status Changed'
      );
      await fetchEvents();
    } catch (err) {
      showToast(err.message || 'Failed to toggle status', 'danger', 'Error');
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navigation Bar */}
      <Navbar
        isBackendOnline={isBackendOnline}
        checkingHealth={checkingHealth}
        onRefresh={fetchEvents}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="container-fluid px-4 py-4 flex-grow-1" style={{ maxWidth: '1400px' }}>
        {/* Banner Alert when Backend is Offline */}
        {!isBackendOnline && (
          <div className="alert alert-warning border-warning d-flex align-items-center justify-content-between p-3 mb-4 rounded-3 shadow-sm fade-in" role="alert">
            <div className="d-flex align-items-center gap-3">
              <div className="rounded-circle bg-warning bg-opacity-25 p-2 text-warning">
                <i className="bi bi-exclamation-triangle-fill fs-4"></i>
              </div>
              <div>
                <h6 className="alert-heading fw-bold mb-0">Backend API Disconnected</h6>
                <small className="text-secondary">
                  Ensure the Spring Boot backend service is running at <code>http://localhost:8080</code> (or through Docker Compose).
                </small>
              </div>
            </div>
            <button
              className="btn btn-sm btn-outline-dark d-flex align-items-center gap-1"
              onClick={fetchEvents}
              disabled={checkingHealth}
            >
              <i className={`bi bi-arrow-clockwise ${checkingHealth ? 'spin' : ''}`}></i>
              Retry Connection
            </button>
          </div>
        )}

        {/* Dashboard Analytics Stat Cards */}
        <StatCards events={events} />

        {/* Dynamic Section: Add Form or Events Display */}
        {activeTab === 'add' ? (
          <div className="fade-in">
            <AddEventForm
              onEventCreated={handleCreateEvent}
              onCancel={() => setActiveTab('events')}
            />
          </div>
        ) : (
          <div className="fade-in">
            <EventList
              events={events}
              isLoading={isLoading}
              onRefresh={fetchEvents}
              onEdit={setEditingEvent}
              onDelete={setDeletingEvent}
              onToggleStatus={handleToggleStatus}
              actionLoadingId={actionLoadingId}
              onAddNewClick={() => setActiveTab('add')}
            />
          </div>
        )}
      </main>

      {/* Modals */}
      <EditEventModal
        event={editingEvent}
        onClose={() => setEditingEvent(null)}
        onSave={handleUpdateEvent}
        isSaving={isSavingEdit}
      />

      <DeleteConfirmModal
        event={deletingEvent}
        onClose={() => setDeletingEvent(null)}
        onConfirm={handleDeleteEvent}
        isDeleting={isDeleting}
      />

      {/* Floating Toast Notification */}
      <ToastAlert toast={toast} onClose={() => setToast(null)} />

      {/* Footer */}
      <footer className="bg-white border-top py-3 mt-auto">
        <div className="container-fluid px-4 d-flex flex-column flex-md-row align-items-center justify-content-between text-muted small gap-2">
          <div>
            <span className="fw-semibold text-dark">SOA Exam Task: CommunityEvent Full-Stack System</span>
            <span className="mx-2">•</span>
            <span>Student: <strong>UMMADI VIJAY KUMAR</strong> (ID: <strong>2400032700</strong> | Sec: <strong>S51</strong>)</span>
          </div>
          <div className="d-flex align-items-center gap-3">
            <span>Spring Boot 3.2.5</span>
            <span>•</span>
            <span>React 18 + Bootstrap 5</span>
            <span>•</span>
            <span>Docker & Compose</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
