package com.project2.controller.api;

import com.project2.entities.data.AppUser;
import com.project2.repository.AppUserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public/login-process/*")
@AllArgsConstructor
public class LoginController {

    private final AppUserRepository appUserRepository;

    @GetMapping("success")
    public ResponseEntity<AppUser> loginSuccess(Authentication authentication){
        AppUser result = null;
        try {
            result = appUserRepository.findByEmailAndDeletedFalse(((User) authentication.getPrincipal()).getUsername());
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return result != null ? ResponseEntity.ok(result) : ResponseEntity.badRequest().build();
    }

    @GetMapping("fail")
    public ResponseEntity<Object> loginFail(){
        return ResponseEntity.badRequest().build();
    }
}
