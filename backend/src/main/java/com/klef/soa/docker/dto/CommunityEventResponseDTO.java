package com.klef.soa.docker.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Data Transfer Object for CommunityEvent responses")
public class CommunityEventResponseDTO {

    @Schema(description = "Auto-generated unique identifier", example = "1")
    private Long id;

    @Schema(description = "Name of the community event", example = "Clean Energy Workshop")
    private String eventName;

    @Schema(description = "Event venue / location", example = "Community Hall, Block B")
    private String venue;

    @Schema(description = "Total number of attendees", example = "250")
    private Integer attendeeCount;

    @Schema(description = "Event completion status", example = "false")
    private Boolean completed;

    public CommunityEventResponseDTO() {}

    public CommunityEventResponseDTO(Long id, String eventName, String venue, Integer attendeeCount, Boolean completed) {
        this.id = id;
        this.eventName = eventName;
        this.venue = venue;
        this.attendeeCount = attendeeCount;
        this.completed = completed;
    }

    public static CommunityEventResponseDTOBuilder builder() {
        return new CommunityEventResponseDTOBuilder();
    }

    public static class CommunityEventResponseDTOBuilder {
        private Long id;
        private String eventName;
        private String venue;
        private Integer attendeeCount;
        private Boolean completed;

        CommunityEventResponseDTOBuilder() {}

        public CommunityEventResponseDTOBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public CommunityEventResponseDTOBuilder eventName(String eventName) {
            this.eventName = eventName;
            return this;
        }

        public CommunityEventResponseDTOBuilder venue(String venue) {
            this.venue = venue;
            return this;
        }

        public CommunityEventResponseDTOBuilder attendeeCount(Integer attendeeCount) {
            this.attendeeCount = attendeeCount;
            return this;
        }

        public CommunityEventResponseDTOBuilder completed(Boolean completed) {
            this.completed = completed;
            return this;
        }

        public CommunityEventResponseDTO build() {
            return new CommunityEventResponseDTO(this.id, this.eventName, this.venue, this.attendeeCount, this.completed);
        }
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
