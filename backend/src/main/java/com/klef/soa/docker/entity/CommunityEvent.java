package com.klef.soa.docker.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * JPA Entity representing CommunityEvent for Exam Assignment.
 * Student ID: 2400032700 | Name: UMMADI VIJAY KUMAR | Section: S51
 */
@Entity
@Table(name = "community_events")
public class CommunityEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "event_name", nullable = false, length = 150)
    private String eventName;

    @Column(name = "venue", nullable = false, length = 200)
    private String venue;

    @Column(name = "attendee_count", nullable = false)
    private Integer attendeeCount;

    @Column(name = "completed", nullable = false)
    private Boolean completed;

    // Default No-Args Constructor (Required by JPA)
    public CommunityEvent() {
    }

    // All-Args Constructor
    public CommunityEvent(Long id, String eventName, String venue, Integer attendeeCount, Boolean completed) {
        this.id = id;
        this.eventName = eventName;
        this.venue = venue;
        this.attendeeCount = attendeeCount;
        this.completed = completed;
    }

    // Constructor without ID (for creation before auto-generation)
    public CommunityEvent(String eventName, String venue, Integer attendeeCount, Boolean completed) {
        this.eventName = eventName;
        this.venue = venue;
        this.attendeeCount = attendeeCount;
        this.completed = completed;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public String getVenue() {
        return venue;
    }

    public void setVenue(String venue) {
        this.venue = venue;
    }

    public Integer getAttendeeCount() {
        return attendeeCount;
    }

    public void setAttendeeCount(Integer attendeeCount) {
        this.attendeeCount = attendeeCount;
    }

    public Boolean getCompleted() {
        return completed;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }

    @Override
    public String toString() {
        return "CommunityEvent{" +
                "id=" + id +
                ", eventName='" + eventName + '\'' +
                ", venue='" + venue + '\'' +
                ", attendeeCount=" + attendeeCount +
                ", completed=" + completed +
                '}';
    }
}
