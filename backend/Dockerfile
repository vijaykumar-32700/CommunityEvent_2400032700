# ================================================================
# Multi-Stage Dockerfile — Spring Boot Backend
# Student: UMMADI VIJAY KUMAR | ID: 2400032700 | Section: S51
# Image: vijaykumar04/docker-backend-2400032700
# ================================================================

# Stage 1: Build stage with Maven and OpenJDK 17
FROM maven:3.9.6-eclipse-temurin-17-alpine AS builder
WORKDIR /app

# Copy pom.xml and download dependencies (layer cache optimization)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source code and build production JAR
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Minimal runtime image
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Create a non-root user for container security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser:appgroup

# Copy built JAR from builder stage
COPY --from=builder /app/target/*.jar app.jar

# Expose backend REST API port
EXPOSE 8080

# Health check against the exam-required GET / endpoint
HEALTHCHECK --interval=30s --timeout=5s --start-period=45s --retries=5 \
  CMD wget --quiet --tries=1 --spider http://localhost:8080/ || exit 1

# Execute Spring Boot application
ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "app.jar"]
