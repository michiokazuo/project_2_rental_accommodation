package com.project2.config;

import com.project2.entities.data.AppUser;
import com.project2.entities.data.Role;
import com.project2.repository.AppUserRepository;
import com.project2.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;

@Component
public class AppConfig {
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private AppUserRepository appUserRepository;

    @Value("${role.admin}")
    private String adminRole;

    @Value("${role.user}")
    private String userRole;

    @Value("${role.host}")
    private String hostRole;

    public static final String ADMIN = "admin";

    public static final String USER = "user";

    public static final String HOST = "host";

    public static HashMap<String, Role> roles = new HashMap<>();

    @Value("${role.admin}")
    private void setRole(String adminRole) {
        List<Role> roleList = roleRepository.findAll();
        for (Role role : roleList) {
            if (role.getName().equals(adminRole))
                roles.put(ADMIN, role);
            if (role.getName().equals(userRole))
                roles.put(USER, role);
            if (role.getName().equals(hostRole))
                roles.put(HOST, role);
        }
    }

    public boolean checkAdmin(String email) {
        AppUser appUser = appUserRepository.findByEmailAndDeletedFalse(email);
        return appUser != null && appUser.getRole().getName()
                .equals(roles.get(ADMIN).getName());
    }

    public boolean checkUser(String email) {
        AppUser appUser = appUserRepository.findByEmailAndDeletedFalse(email);
        return appUser != null && appUser.getRole().getName()
                .equals(roles.get(USER).getName());
    }

    public boolean checkHost(String email) {
        AppUser appUser = appUserRepository.findByEmailAndDeletedFalse(email);
        return appUser != null && appUser.getRole().getName()
                .equals(roles.get(HOST).getName());
    }

}
