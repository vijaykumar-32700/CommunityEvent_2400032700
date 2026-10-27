package com.klef.soa.docker.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
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

    public CommunityEvent() {}

    public CommunityEvent(Long id, String eventName, String venue, Integer attendeeCount, Boolean completed) {
        this.id = id;
        this.eventName = eventName;
        this.venue = venue;
        this.attendeeCount = attendeeCount;
        this.completed = completed;
    }

    public CommunityEvent(String eventName, String venue, Integer attendeeCount, Boolean completed) {
        this.eventName = eventName;
        this.venue = venue;
        this.attendeeCount = attendeeCount;
        this.completed = completed;
    }

    public static CommunityEventBuilder builder() {
        return new CommunityEventBuilder();
    }

    public static class CommunityEventBuilder {
        private Long id;
        private String eventName;
        private String venue;
        private Integer attendeeCount;
        private Boolean completed;

        CommunityEventBuilder() {}

        public CommunityEventBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public CommunityEventBuilder eventName(String eventName) {
            this.eventName = eventName;
            return this;
        }

        public CommunityEventBuilder venue(String venue) {
            this.venue = venue;
            return this;
        }

        public CommunityEventBuilder attendeeCount(Integer attendeeCount) {
            this.attendeeCount = attendeeCount;
            return this;
        }

        public CommunityEventBuilder completed(Boolean completed) {
            this.completed = completed;
            return this;
        }

        public CommunityEvent build() {
            return new CommunityEvent(this.id, this.eventName, this.venue, this.attendeeCount, this.completed);
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
