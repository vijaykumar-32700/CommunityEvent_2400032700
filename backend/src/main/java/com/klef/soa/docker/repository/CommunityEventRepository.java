package com.klef.soa.docker.repository;

import com.klef.soa.docker.entity.CommunityEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data JPA Repository for CommunityEvent entity.
 * Student ID: 2400032700 | Name: UMMADI VIJAY KUMAR | Section: S51
 */
@Repository
public interface CommunityEventRepository extends JpaRepository<CommunityEvent, Long> {

    // Filter events by completion status
    List<CommunityEvent> findByCompleted(Boolean completed);

    // Search events by eventName or venue (case-insensitive)
    List<CommunityEvent> findByEventNameContainingIgnoreCaseOrVenueContainingIgnoreCase(String eventName, String venue);
}
