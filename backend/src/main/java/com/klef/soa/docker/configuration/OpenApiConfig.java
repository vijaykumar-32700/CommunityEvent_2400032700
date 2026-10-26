package com.klef.soa.docker.configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

/**
 * OpenAPI / Swagger Configuration for CommunityEvent Management APIs.
 * Student ID: 2400032700 | Name: UMMADI VIJAY KUMAR | Section: S51
 */
@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI communityEventOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Community Event Management System API")
                        .description("Full-Stack SOA & Docker Exam Project RESTful API for CommunityEvent entity.\n\n" +
                                "**Student Name:** UMMADI VIJAY KUMAR\n\n" +
                                "**Student ID:** 2400032700\n\n" +
                                "**Section:** S51\n\n" +
                                "**Base Package:** com.klef.soa.docker")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("UMMADI VIJAY KUMAR (2400032700)")
                                .email("2400032700@kluniversity.in"))
                        .license(new License().name("Apache 2.0").url("https://springdoc.org")))
                .servers(List.of(
                        new Server().url("http://localhost:8080").description("Local Development / Docker Container Server")
                ));
    }
}
