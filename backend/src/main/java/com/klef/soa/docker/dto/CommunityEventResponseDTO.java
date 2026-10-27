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
}
