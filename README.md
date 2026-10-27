## 📋 Project Overview

A complete full-stack **Community Event Management System** built as a SOA exam task. Manages community events with full CRUD operations through a modern React frontend and a Spring Boot REST API backend, containerized with Docker and deployed via Docker Compose.

**Entity: `CommunityEvent`**
| Field | Type | Description |
|---|---|---|
| `id` | Long | Auto-generated primary key (not user-entered) |
| `eventName` | String | Name/title of the community event |
| `venue` | String | Location where event is held |
| `attendeeCount` | Integer | Expected/confirmed number of attendees |
| `completed` | Boolean | Whether the event has completed or is upcoming |

---



## 🌐 REST API Endpoints

### Exam-Required Endpoints
| Method | Route | Description |
|---|---|---|
| `GET` | `/` | Health check — returns "CRUD Service is running" |
| `POST` | `/Add` | Add a new community event (ID auto-generated, not in request) |
| `GET` | `/DisplayAll` | Retrieve all community events as JSON list |
| `DELETE` | `/Delete/{id}` | Delete event by ID with confirmation/404 handling |

### Additional Frontend Endpoints
| Method | Route | Description |
|---|---|---|
| `GET` | `/api/events` | Get all events (with optional filter/search params) |
| `GET` | `/api/events/{id}` | Get single event by ID |
| `PUT` | `/api/events/{id}` | Update event by ID |
| `DELETE` | `/api/events/{id}` | Delete event by ID |
| `PATCH` | `/api/events/{id}/toggle-status` | Toggle completion status |

### Swagger UI
Access at: **http://localhost:8080/swagger-ui.html**

---

## 🐳 Docker

### Image Names
- **Backend:** `vijaykumar04/docker-backend-2400032700:latest`
- **Frontend:** `vijaykumar04/docker-frontend-2400032700:latest`

### Run with Docker Compose
```bash
docker-compose up -d
```
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
- Swagger UI: http://localhost:8080/swagger-ui.html
- pgAdmin DB: `community_event_2400032700` on port 5432

---

## 🗄️ Database

- **Database:** PostgreSQL (pgAdmin compatible)
- **DB Name:** `community_event_2400032700`
- **Table:** `community_events`
- Schema auto-created by Hibernate (`ddl-auto=update`)

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Bootstrap 5, Bootstrap Icons, Vite |
| Backend | Spring Boot 3.2.5, Spring Data JPA, Spring Validation |
| Database | PostgreSQL 16 |
| API Docs | SpringDoc OpenAPI / Swagger UI |
| Container | Docker (multi-stage builds), Docker Compose |
| CI/CD | GitHub Actions |

---

## ✅ Validation

**Frontend:** Required fields, min/max length, min/max count, real-time error messages, success/error toasts.
**Backend:** `@NotBlank`, `@Size`, `@Min`, `@Max`, `@NotNull` on DTO fields. `GlobalExceptionHandler` returns structured `400 Bad Request` with field-level error details.

## 🔗 Links

- **GitHub:** https://github.com/vijaykumar-32700/CommunityEvent_2400032700
- **Docker Hub:** https://hub.docker.com/u/vijaykumar04
