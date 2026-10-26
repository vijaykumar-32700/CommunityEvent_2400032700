package com.klef.soa.docker.service.impl;

import com.klef.soa.docker.configuration.ResourceNotFoundException;
import com.klef.soa.docker.dto.CommunityEventRequestDTO;
import com.klef.soa.docker.dto.CommunityEventResponseDTO;
import com.klef.soa.docker.entity.CommunityEvent;
import com.klef.soa.docker.repository.CommunityEventRepository;
import com.klef.soa.docker.service.CommunityEventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service implementation containing core business logic for CommunityEvent.
 * Student ID: 2400032700 | Name: UMMADI VIJAY KUMAR | Section: S51
 */
@Service
@Transactional
public class CommunityEventServiceImpl implements CommunityEventService {

    private final CommunityEventRepository repository;

    @Autowired
    public CommunityEventServiceImpl(CommunityEventRepository repository) {
        this.repository = repository;
    }

    @Override
    public CommunityEventResponseDTO createEvent(CommunityEventRequestDTO requestDTO) {
        // Map DTO to Entity. ID is intentionally omitted so DB generates it.
        CommunityEvent entity = new CommunityEvent(
                requestDTO.getEventName().trim(),
                requestDTO.getVenue().trim(),
                requestDTO.getAttendeeCount(),
                requestDTO.getCompleted()
        );

        CommunityEvent savedEntity = repository.save(entity);
        return mapToResponseDTO(savedEntity);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CommunityEventResponseDTO> getAllEvents(Boolean completed, String search) {
        List<CommunityEvent> events;

        if (search != null && !search.trim().isEmpty()) {
            events = repository.findByEventNameContainingIgnoreCaseOrVenueContainingIgnoreCase(
                    search.trim(), search.trim()
            );
            if (completed != null) {
                events = events.stream()
                        .filter(e -> e.getCompleted().equals(completed))
                        .collect(Collectors.toList());
            }
        } else if (completed != null) {
            events = repository.findByCompleted(completed);
        } else {
            events = repository.findAll();
        }

        return events.stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public CommunityEventResponseDTO getEventById(Long id) {
        CommunityEvent event = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Community event not found with ID: " + id));
        return mapToResponseDTO(event);
    }

    @Override
    public CommunityEventResponseDTO updateEvent(Long id, CommunityEventRequestDTO requestDTO) {
        CommunityEvent existingEvent = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Community event not found with ID: " + id));

        existingEvent.setEventName(requestDTO.getEventName().trim());
        existingEvent.setVenue(requestDTO.getVenue().trim());
        existingEvent.setAttendeeCount(requestDTO.getAttendeeCount());
        existingEvent.setCompleted(requestDTO.getCompleted());

        CommunityEvent updatedEvent = repository.save(existingEvent);
        return mapToResponseDTO(updatedEvent);
    }

    @Override
    public void deleteEvent(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Cannot delete: Community event not found with ID: " + id);
        }
        repository.deleteById(id);
    }

    @Override
    public CommunityEventResponseDTO toggleStatus(Long id) {
        CommunityEvent existingEvent = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Community event not found with ID: " + id));

        existingEvent.setCompleted(!Boolean.TRUE.equals(existingEvent.getCompleted()));
        CommunityEvent updatedEvent = repository.save(existingEvent);
        return mapToResponseDTO(updatedEvent);
    }

    // Helper method to convert Entity to Response DTO
    private CommunityEventResponseDTO mapToResponseDTO(CommunityEvent entity) {
        return new CommunityEventResponseDTO(
                entity.getId(),
                entity.getEventName(),
                entity.getVenue(),
                entity.getAttendeeCount(),
                entity.getCompleted()
        );
    }
}
