package com.project2.phong;

import com.project2.config.AppConfig;
import lombok.AllArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
@AllArgsConstructor
public class PhongApplication {

    public static void main(String[] args) {
        SpringApplication.run(PhongApplication.class, args);
    }

}
