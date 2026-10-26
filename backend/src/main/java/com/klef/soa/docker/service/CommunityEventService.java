package com.klef.soa.docker.service;

import com.klef.soa.docker.dto.CommunityEventRequestDTO;
import com.klef.soa.docker.dto.CommunityEventResponseDTO;

import java.util.List;

/**
 * Service interface defining business operations for CommunityEvent.
 * Student ID: 2400032700 | Name: UMMADI VIJAY KUMAR | Section: S51
 */
public interface CommunityEventService {

    /**
     * Create a new community event. The ID is automatically generated.
     */
    CommunityEventResponseDTO createEvent(CommunityEventRequestDTO requestDTO);

    /**
     * Retrieve all community events, optionally filtered by completion status or search keyword.
     */
    List<CommunityEventResponseDTO> getAllEvents(Boolean completed, String search);

    /**
     * Retrieve a single community event by its ID.
     */
    CommunityEventResponseDTO getEventById(Long id);

    /**
     * Update an existing community event by ID.
     */
    CommunityEventResponseDTO updateEvent(Long id, CommunityEventRequestDTO requestDTO);

    /**
     * Delete a community event by ID.
     */
    void deleteEvent(Long id);

    /**
     * Toggle the completion status of an event.
     */
    CommunityEventResponseDTO toggleStatus(Long id);
}
