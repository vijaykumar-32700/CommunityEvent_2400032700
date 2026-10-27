import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import StatCards from './components/StatCards';
import AddEventForm from './components/AddEventForm';
import EventList from './components/EventList';
import EditEventModal from './components/EditEventModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import ToastAlert from './components/ToastAlert';
import { eventApi } from './services/api';

export default function App() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('events');

  const [editingEvent, setEditingEvent] = useState(null);
  const [isSavingEdit, setIsSavingEdit] = useState(false);
  const [deletingEvent, setDeletingEvent] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success', title = '') => {
    setToast({ message, type, title });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 4500);
  }, []);

  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await eventApi.getAllEvents();
      setEvents(data || []);
    } catch (err) {
      console.error('Failed to fetch events:', err);
      showToast('Unable to connect to the API. Ensure the backend is running.', 'danger', 'Connection Error');
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleCreateEvent = async (formData) => {
    const response = await eventApi.createEvent(formData);
    showToast('Community Event created successfully!', 'success', 'Success');
    await fetchEvents();
    setActiveTab('events');
    return response;
  };

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

  const handleToggleStatus = async (id) => {
    setActionLoadingId(id);
    try {
      const updated = await eventApi.toggleStatus(id);
      showToast(
        `Event marked as ${updated?.completed ? 'Completed' : 'Upcoming'}!`,
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
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="container-fluid px-4 py-4 flex-grow-1" style={{ maxWidth: '1400px' }}>
        <StatCards events={events} />

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

      <ToastAlert toast={toast} onClose={() => setToast(null)} />

      <footer className="app-footer mt-auto">
        <div className="container-fluid px-4 d-flex flex-column flex-md-row align-items-center justify-content-between gap-2">
          <span className="footer-brand">Community<span>Pulse</span></span>
          <span className="footer-stack">Spring Boot 3 &middot; React 18 &middot; Bootstrap 5 &middot; Docker</span>
        </div>
      </footer>
    </div>
  );
}
