package com.klef.soa.docker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CommunityEventApplication {

    public static void main(String[] args) {
        SpringApplication.run(CommunityEventApplication.class, args);
        System.out.println("Community Event CRUD Service is Running");
    }

}
