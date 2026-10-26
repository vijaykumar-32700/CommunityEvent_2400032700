package com.klef.soa.docker.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;
import java.util.Map;

/**
 * Standardized error response DTO for validation and runtime exceptions.
 * Student ID: 2400032700 | Name: UMMADI VIJAY KUMAR | Section: S51
 */
@Schema(description = "Structured error payload returned upon invalid requests or errors")
public class ErrorResponseDTO {

    @Schema(description = "Timestamp when error occurred")
    private LocalDateTime timestamp;

    @Schema(description = "HTTP status code", example = "400")
    private int status;

    @Schema(description = "HTTP error title", example = "Bad Request")
    private String error;

    @Schema(description = "Detailed error message", example = "Validation failed for request arguments")
    private String message;

    @Schema(description = "Request URI path", example = "/api/events")
    private String path;

    @Schema(description = "Map of individual field errors for failed validation")
    private Map<String, String> fieldErrors;

    public ErrorResponseDTO() {
        this.timestamp = LocalDateTime.now();
    }

    public ErrorResponseDTO(int status, String error, String message, String path) {
        this.timestamp = LocalDateTime.now();
        this.status = status;
        this.error = error;
        this.message = message;
        this.path = path;
    }

    public ErrorResponseDTO(int status, String error, String message, String path, Map<String, String> fieldErrors) {
        this.timestamp = LocalDateTime.now();
        this.status = status;
        this.error = error;
        this.message = message;
        this.path = path;
        this.fieldErrors = fieldErrors;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public Map<String, String> getFieldErrors() {
        return fieldErrors;
    }

    public void setFieldErrors(Map<String, String> fieldErrors) {
        this.fieldErrors = fieldErrors;
    }
}
