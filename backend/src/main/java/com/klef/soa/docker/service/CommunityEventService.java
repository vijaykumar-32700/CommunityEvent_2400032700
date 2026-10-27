package com.klef.soa.docker.service;

import java.util.List;
import java.util.Optional;

import com.klef.soa.docker.dto.CommunityEventRequestDTO;
import com.klef.soa.docker.dto.CommunityEventResponseDTO;

public interface CommunityEventService {

    CommunityEventResponseDTO addEvent(CommunityEventRequestDTO requestDTO);

    List<CommunityEventResponseDTO> getAllEvents();

    List<CommunityEventResponseDTO> getAllEvents(Boolean completed, String search);

    Optional<CommunityEventResponseDTO> getEventById(Long id);

    CommunityEventResponseDTO updateEvent(Long id, CommunityEventRequestDTO requestDTO);

    void deleteEvent(Long id);

    CommunityEventResponseDTO toggleStatus(Long id);
}
