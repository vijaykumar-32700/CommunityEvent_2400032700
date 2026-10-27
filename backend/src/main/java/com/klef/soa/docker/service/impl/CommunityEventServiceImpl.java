package com.klef.soa.docker.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.klef.soa.docker.dto.CommunityEventRequestDTO;
import com.klef.soa.docker.dto.CommunityEventResponseDTO;
import com.klef.soa.docker.entity.CommunityEvent;
import com.klef.soa.docker.repository.CommunityEventRepository;
import com.klef.soa.docker.service.CommunityEventService;

@Service
@Transactional
public class CommunityEventServiceImpl implements CommunityEventService {

    @Autowired
    private CommunityEventRepository communityEventRepository;

    @Override
    public CommunityEventResponseDTO addEvent(CommunityEventRequestDTO requestDTO) {
        CommunityEvent entity = CommunityEvent.builder()
                .eventName(requestDTO.getEventName().trim())
                .venue(requestDTO.getVenue().trim())
                .attendeeCount(requestDTO.getAttendeeCount())
                .completed(requestDTO.getCompleted())
                .build();
        entity.setId(null);

        CommunityEvent saved = communityEventRepository.save(entity);
        return mapToResponseDTO(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CommunityEventResponseDTO> getAllEvents() {
        return communityEventRepository.findAll()
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<CommunityEventResponseDTO> getAllEvents(Boolean completed, String search) {
        List<CommunityEvent> events;

        if (search != null && !search.trim().isEmpty()) {
            events = communityEventRepository
                    .findByEventNameContainingIgnoreCaseOrVenueContainingIgnoreCase(search.trim(), search.trim());
            if (completed != null) {
                events = events.stream()
                        .filter(e -> e.getCompleted().equals(completed))
                        .collect(Collectors.toList());
            }
        } else if (completed != null) {
            events = communityEventRepository.findByCompleted(completed);
        } else {
            events = communityEventRepository.findAll();
        }

        return events.stream().map(this::mapToResponseDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<CommunityEventResponseDTO> getEventById(Long id) {
        return communityEventRepository.findById(id).map(this::mapToResponseDTO);
    }

    @Override
    public CommunityEventResponseDTO updateEvent(Long id, CommunityEventRequestDTO requestDTO) {
        return communityEventRepository.findById(id).map(existing -> {
            existing.setEventName(requestDTO.getEventName().trim());
            existing.setVenue(requestDTO.getVenue().trim());
            existing.setAttendeeCount(requestDTO.getAttendeeCount());
            existing.setCompleted(requestDTO.getCompleted());
            CommunityEvent updated = communityEventRepository.save(existing);
            return mapToResponseDTO(updated);
        }).orElse(null);
    }

    @Override
    public boolean deleteEvent(Long id) {
        if (communityEventRepository.existsById(id)) {
            communityEventRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public CommunityEventResponseDTO toggleStatus(Long id) {
        return communityEventRepository.findById(id).map(existing -> {
            existing.setCompleted(!Boolean.TRUE.equals(existing.getCompleted()));
            CommunityEvent updated = communityEventRepository.save(existing);
            return mapToResponseDTO(updated);
        }).orElse(null);
    }

    private CommunityEventResponseDTO mapToResponseDTO(CommunityEvent entity) {
        return CommunityEventResponseDTO.builder()
                .id(entity.getId())
                .eventName(entity.getEventName())
                .venue(entity.getVenue())
                .attendeeCount(entity.getAttendeeCount())
                .completed(entity.getCompleted())
                .build();
    }
}
