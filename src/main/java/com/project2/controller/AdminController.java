package com.project2.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("admin/*")
public class AdminController {

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

    @GetMapping("/du-an")
    public String project() {

        return "project";
    }

    @GetMapping("/nhan-vien")
    public String employee() {

        return "employee";
    }

    @GetMapping("/thong-ke")
    public String statistic() {

        return "statistic";
    }

    @GetMapping("/du-an/cong-viec-thanh-phan")
    public String taskOfProject() {

        return "task_of_project";
    }

    @GetMapping(value = {"/nhan-vien/tien-do-ca-nhan", "cong-viec-ca-nhan"})
    public String employeeProgress() {

        return "employee_progress";
    }

    @GetMapping("/thong-tin-ca-nhan")
    public String userInformation() {

        return "user_infor";
    }

    @GetMapping("/danh-gia")
    public String evaluationEmployee() {

        return "evaluation_employee";
    }
}
