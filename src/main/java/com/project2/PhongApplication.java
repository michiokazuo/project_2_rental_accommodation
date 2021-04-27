package com.project2;

import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.transaction.annotation.Transactional;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
@AllArgsConstructor
public class PhongApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(PhongApplication.class, args);
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {
    }

}
