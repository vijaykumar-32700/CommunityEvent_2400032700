/**
 * API Service for CommunityEvent Full-Stack Application
 * Student ID: 2400032700 | Name: UMMADI VIJAY KUMAR | Section: S51
 */

// In development, Vite proxies /api to http://localhost:8080.
// In Docker production, Nginx reverse proxies /api to backend:8080.
// Or if VITE_API_BASE_URL is set, uses that absolute URL.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/events';

/**
 * Helper to parse backend error responses cleanly
 */
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
      (errorData?.fieldErrors
        ? Object.entries(errorData.fieldErrors).map(([field, msg]) => `${field}: ${msg}`).join(', ')
        : `Request failed with status ${response.status}: ${response.statusText}`);

    const error = new Error(errorMessage);
    error.status = response.status;
    error.fieldErrors = errorData?.fieldErrors || {};
    throw error;
  }

  // Handle empty 204 No Content
  if (response.status === 204) {
    return null;
  }

  return await response.json();
}

export const eventApi = {
  /**
   * Health check / ping backend
   */
  async checkHealth() {
    try {
      const response = await fetch(`${API_BASE_URL}`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
      });
      return response.ok;
    } catch {
      return false;
    }
  },

  /**
   * Fetch all events with optional filters
   */
  async getAllEvents(params = {}) {
    const url = new URL(API_BASE_URL, window.location.origin);
    if (params.completed !== undefined && params.completed !== '') {
      url.searchParams.append('completed', params.completed);
    }
    if (params.search && params.search.trim()) {
      url.searchParams.append('search', params.search.trim());
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    return await handleResponse(response);
  },

  /**
   * Fetch single event by ID
   */
  async getEventById(id) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });
    return await handleResponse(response);
  },

  /**
   * Create new event.
   * NOTE: ID is deliberately not included in the payload. Backend generates ID.
   */
  async createEvent(eventData) {
    const payload = {
      eventName: eventData.eventName,
      venue: eventData.venue,
      attendeeCount: parseInt(eventData.attendeeCount, 10),
      completed: Boolean(eventData.completed),
    };

    const response = await fetch(`${API_BASE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    return await handleResponse(response);
  },

  /**
   * Update existing event by ID
   */
  async updateEvent(id, eventData) {
    const payload = {
      eventName: eventData.eventName,
      venue: eventData.venue,
      attendeeCount: parseInt(eventData.attendeeCount, 10),
      completed: Boolean(eventData.completed),
    };

    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    return await handleResponse(response);
  },

  /**
   * Delete an event by ID
   */
  async deleteEvent(id) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
      },
    });
    return await handleResponse(response);
  },

  /**
   * Toggle event completion status
   */
  async toggleStatus(id) {
    const response = await fetch(`${API_BASE_URL}/${id}/toggle-status`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
      },
    });
    return await handleResponse(response);
  },
};
