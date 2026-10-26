package com.klef.soa.docker.dto;

import io.swagger.v3.oas.annotations.media.Schema;

/**
 * Data Transfer Object for CommunityEvent responses.
 * Contains auto-generated ID along with entity fields.
 * Student ID: 2400032700 | Name: UMMADI VIJAY KUMAR | Section: S51
 */
@Schema(description = "Response payload representing a CommunityEvent")
public class CommunityEventResponseDTO {

    @Schema(description = "Auto-generated database primary key ID", example = "1")
    private Long id;

    @Schema(description = "Name of the community event", example = "Clean Energy & Climate Workshop")
    private String eventName;

    @Schema(description = "Event venue / location", example = "Community Central Auditorium, Hall B")
    private String venue;

    @Schema(description = "Total number of attendees", example = "350")
    private Integer attendeeCount;

    @Schema(description = "Event completion status", example = "false")
    private Boolean completed;

    public CommunityEventResponseDTO() {
    }

    public CommunityEventResponseDTO(Long id, String eventName, String venue, Integer attendeeCount, Boolean completed) {
        this.id = id;
        this.eventName = eventName;
        this.venue = venue;
        this.attendeeCount = attendeeCount;
        this.completed = completed;
    }

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
}
