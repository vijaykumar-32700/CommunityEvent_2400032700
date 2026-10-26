package com.klef.soa.docker;

import com.klef.soa.docker.entity.CommunityEvent;
import com.klef.soa.docker.repository.CommunityEventRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

/**
 * Main Spring Boot Application Entry Point.
 * Base Package: com.klef.soa.docker
 * Student ID: 2400032700 | Name: UMMADI VIJAY KUMAR | Section: S51
 * Entity: CommunityEvent (id, eventName, venue, attendeeCount, completed)
 */
@SpringBootApplication
public class CommunityEventApplication {

    private static final Logger logger = LoggerFactory.getLogger(CommunityEventApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(CommunityEventApplication.class, args);
        logger.info("==================================================================");
        logger.info(" Community Event Management Backend Started Successfully!");
        logger.info(" Student: UMMADI VIJAY KUMAR | ID: 2400032700 | Section: S51");
        logger.info(" Swagger UI: http://localhost:8080/swagger-ui.html");
        logger.info(" API Docs:   http://localhost:8080/v3/api-docs");
        logger.info(" H2 Console: http://localhost:8080/h2-console");
        logger.info("==================================================================");
    }

    /**
     * Seeds initial community events into the database on startup
     * if the database is currently empty.
     */
    @Bean
    public CommandLineRunner initDatabase(CommunityEventRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                logger.info("Pre-populating initial sample Community Events...");
                List<CommunityEvent> initialEvents = List.of(
                        new CommunityEvent(
                                "Green Earth Tree Plantation Drive",
                                "KL University Green Grounds, Guntur",
                                450,
                                true
                        ),
                        new CommunityEvent(
                                "Annual Tech Innovation Symposium 2026",
                                "Main Convention Center, Hall 1",
                                1250,
                                false
                        ),
                        new CommunityEvent(
                                "Community Health & Blood Donation Camp",
                                "City Health Center Wellness Pavilion",
                                320,
                                true
                        ),
                        new CommunityEvent(
                                "Youth Cyber Security & AI Workshop",
                                "Tech Innovation Hub, Seminar Room 3",
                                200,
                                false
                        )
                );
                repository.saveAll(initialEvents);
                logger.info("Successfully seeded {} sample community events.", initialEvents.size());
            }
        };
    }
}
