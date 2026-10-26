package com.klef.soa.docker.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;

/**
 * Standardized generic API response wrapper.
 * Student ID: 2400032700 | Name: UMMADI VIJAY KUMAR | Section: S51
 */
@Schema(description = "Generic API response wrapper")
public class ApiResponseDTO<T> {

    @Schema(description = "Indicates whether the request was successful", example = "true")
    private boolean success;

    @Schema(description = "Human-readable response message", example = "Community event created successfully")
    private String message;

    @Schema(description = "Payload data")
    private T data;

    @Schema(description = "Timestamp of the response")
    private LocalDateTime timestamp;

    public ApiResponseDTO() {
        this.timestamp = LocalDateTime.now();
    }

    public ApiResponseDTO(boolean success, String message, T data) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.timestamp = LocalDateTime.now();
    }

    public static <T> ApiResponseDTO<T> success(String message, T data) {
        return new ApiResponseDTO<>(true, message, data);
    }

    public static <T> ApiResponseDTO<T> error(String message) {
        return new ApiResponseDTO<>(false, message, null);
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
