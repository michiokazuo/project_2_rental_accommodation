package com.project2.controller;

import com.project2.repository.AppUserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@AllArgsConstructor
public class MainController {

    private final AppUserRepository appUserRepository;

    @GetMapping(value = {"/", "/nguoi-thue"})
    public String home() {
        return "redirect:/trang-chu";
    }

    @GetMapping("/trang-chu")
    public String homePage() {
        return "home";
    }

    @GetMapping(value = "/dang-nhap")
    public String loginPage(Authentication authentication) {
        if (authentication != null) {
            String email = ((User) authentication.getPrincipal()).getUsername();
            if (appUserRepository.findByEmailAndDeletedFalse(email) != null)
                return "redirect:/trang-chu";
        }
        return "login";
    }

    @GetMapping("/tin-tuc")
    public String news() {
        return "news";
    }

    @GetMapping("/lien-he")
    public String contact() {
        return "contact";
    }

    @GetMapping("/thong-tin-thue")
    public String detailRent() {
        return "detail-rent";
    }

    @GetMapping("/tim-kiem")
    public String searchRent() {
        return "search-rent";
    }

    @GetMapping("/thong-tin-ca-nhan")
    public String userInformation() {
        return "info-user";
    }

}
