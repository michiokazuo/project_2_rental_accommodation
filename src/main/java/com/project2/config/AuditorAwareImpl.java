package com.project2.config;

import com.project2.entities.data.AppUser;
import com.project2.repository.AppUserRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

@AllArgsConstructor
public class AuditorAwareImpl implements AuditorAware<AppUser> {

    private  final AppUserRepository userRepository;

    @Override
    public Optional<AppUser> getCurrentAuditor() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return Optional.ofNullable(userRepository.findByEmailAndDeletedFalse(username));
    }
}
