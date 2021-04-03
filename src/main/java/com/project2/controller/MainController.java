package com.project2.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    @GetMapping("/")
    public String home() {
        return "redirect:/trang-chu";
    }

    @GetMapping("/trang-chu")
    public String homePage() {
        return "home";
    }

    @GetMapping(value = "/dang-nhap")
    public String loginPage() {
        return "login";
    }

    @GetMapping(value = "/nguoi-thue")
    public String userHomePage() {
        return "home";
    }

    @GetMapping(value = "/chu-tro")
    public String hostHomePage() {
        return "/host/host_home";
    }

    @GetMapping(value = "/quan-ly")
    public String adminHomePage() {
        return "/admin/admin_home";
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
        return "search_rent";
    }

    @GetMapping("/thong-tin-ca-nhan")
    public String userInformation() {
        return "info-user";
    }

    @GetMapping("/du-an/cong-viec-thanh-phan")
    public String taskOfProject() {
        return "task_of_project";
    }

    @GetMapping(value = {"/nhan-vien/tien-do-ca-nhan", "cong-viec-ca-nhan"})
    public String employeeProgress() {
        return "employee_progress";
    }

}
