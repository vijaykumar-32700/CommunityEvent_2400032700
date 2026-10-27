package com.klef.soa.docker.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Data Transfer Object for creating or updating a CommunityEvent (no ID required)")
public class CommunityEventRequestDTO {

    @NotBlank(message = "Event name cannot be blank")
    @Size(min = 3, max = 100, message = "Event name must be between 3 and 100 characters")
    @Schema(description = "Name of the community event", example = "Clean Energy Workshop")
    private String eventName;

    @NotBlank(message = "Venue cannot be blank")
    @Size(min = 3, max = 150, message = "Venue must be between 3 and 150 characters")
    @Schema(description = "Location or venue of the event", example = "Community Hall, Block B")
    private String venue;

    @NotNull(message = "Attendee count is required")
    @Min(value = 1, message = "Attendee count must be at least 1")
    @Max(value = 1000000, message = "Attendee count cannot exceed 1,000,000")
    @Schema(description = "Expected number of attendees", example = "250")
    private Integer attendeeCount;

    @NotNull(message = "Completed status is required")
    @Schema(description = "Whether the event has completed", example = "false")
    private Boolean completed;

    public CommunityEventRequestDTO() {}

    public CommunityEventRequestDTO(String eventName, String venue, Integer attendeeCount, Boolean completed) {
        this.eventName = eventName;
        this.venue = venue;
        this.attendeeCount = attendeeCount;
        this.completed = completed;
    }

    public static CommunityEventRequestDTOBuilder builder() {
        return new CommunityEventRequestDTOBuilder();
    }

    public static class CommunityEventRequestDTOBuilder {
        private String eventName;
        private String venue;
        private Integer attendeeCount;
        private Boolean completed;

        CommunityEventRequestDTOBuilder() {}

        public CommunityEventRequestDTOBuilder eventName(String eventName) {
            this.eventName = eventName;
            return this;
        }

        public CommunityEventRequestDTOBuilder venue(String venue) {
            this.venue = venue;
            return this;
        }

        public CommunityEventRequestDTOBuilder attendeeCount(Integer attendeeCount) {
            this.attendeeCount = attendeeCount;
            return this;
        }

        public CommunityEventRequestDTOBuilder completed(Boolean completed) {
            this.completed = completed;
            return this;
        }

        public CommunityEventRequestDTO build() {
            return new CommunityEventRequestDTO(this.eventName, this.venue, this.attendeeCount, this.completed);
        }
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
