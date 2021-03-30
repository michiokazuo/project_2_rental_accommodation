package com.project2.config;

import com.project2.entities.data.AppUser;
import com.project2.repository.AppUserRepository;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@Configuration
@EnableJpaAuditing(auditorAwareRef = "auditorProvider")
@AllArgsConstructor
public class PersistentConfig {

    private final AppUserRepository appUserRepository;

    @Bean
    public AuditorAware<AppUser> auditorProvider() {
        return new AuditorAwareImpl(appUserRepository);
    }
}
