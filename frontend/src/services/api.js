/**
 * API Service for CommunityEvent Full-Stack Application
 * Student ID: 2400032700 | Name: UMMADI VIJAY KUMAR | Section: S51
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

async function handleResponse(response) {
  if (!response.ok) {
    let errorData = null;
    try {
      errorData = await response.json();
    } catch {
      // Non-JSON response
    }

    const errorMessage =
      errorData?.message ||
      (errorData?.errors
        ? Object.entries(errorData.errors).map(([field, msg]) => `${field}: ${msg}`).join(', ')
        : `Request failed with status ${response.status}`);

    const error = new Error(errorMessage);
    error.status = response.status;
    error.fieldErrors = errorData?.errors || {};
    throw error;
  }

  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return await response.json();
  }
  return await response.text();
}

export const eventApi = {
  // Check backend service health
  async checkHealth() {
    try {
      const response = await fetch(`${API_BASE_URL}/`, {
        method: 'GET',
        headers: { 'Accept': 'text/plain, application/json' },
      });
      return response.ok;
    } catch {
      return false;
    }
  },

  // Display all community events
  async getAllEvents(params = {}) {
    const response = await fetch(`${API_BASE_URL}/displayall`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });
    let list = await handleResponse(response);
    if (!Array.isArray(list)) list = [];

    // Client-side filtering if search or completed filter is specified
    if (params.search && params.search.trim()) {
      const term = params.search.trim().toLowerCase();
      list = list.filter(
        (e) =>
          e.eventName?.toLowerCase().includes(term) ||
          e.venue?.toLowerCase().includes(term)
      );
    }
    if (params.completed !== undefined && params.completed !== '') {
      const isComp = String(params.completed) === 'true';
      list = list.filter((e) => Boolean(e.completed) === isComp);
    }
    return list;
  },

  // Get single event by ID (from displayall)
  async getEventById(id) {
    const list = await this.getAllEvents();
    return list.find((e) => String(e.id) === String(id)) || null;
  },

  // Add new community event
  async createEvent(eventData) {
    const payload = {
      eventName: eventData.eventName.trim(),
      venue: eventData.venue.trim(),
      attendeeCount: parseInt(eventData.attendeeCount, 10),
      completed: Boolean(eventData.completed),
    };

    const response = await fetch(`${API_BASE_URL}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    return await handleResponse(response);
  },

  // Update existing community event
  async updateEvent(id, eventData) {
    const payload = {
      eventName: eventData.eventName.trim(),
      venue: eventData.venue.trim(),
      attendeeCount: parseInt(eventData.attendeeCount, 10),
      completed: Boolean(eventData.completed),
    };

    const response = await fetch(`${API_BASE_URL}/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    return await handleResponse(response);
  },

  // Delete community event
  async deleteEvent(id) {
    const response = await fetch(`${API_BASE_URL}/delete/${id}`, {
      method: 'DELETE',
      headers: { 'Accept': 'application/json, text/plain' },
    });
    return await handleResponse(response);
  },

  // Toggle event completion status
  async toggleStatus(id, currentEvent) {
    const event = currentEvent || (await this.getEventById(id));
    if (!event) throw new Error(`Event #${id} not found`);
    const payload = {
      eventName: event.eventName,
      venue: event.venue,
      attendeeCount: event.attendeeCount,
      completed: !Boolean(event.completed),
    };
    return await this.updateEvent(id, payload);
  },
};
