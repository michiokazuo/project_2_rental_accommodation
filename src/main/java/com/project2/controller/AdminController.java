package com.project2.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("admin/*")
public class AdminController {

    @GetMapping(value = {"/", "quan-ly"})
    public String home() {
        return "redirect:trang-chu";
    }

    @GetMapping("trang-chu")
    public String homePage() {
        return "/admin/admin-home";
    }

    @GetMapping("thong-tin-ca-nhan")
    public String infoAdmin() {
        return "/admin/admin-info";
    }

    @GetMapping("tro-cho-thue")
    public String roomRenter() {
        return "/admin/admin-all-room";
    }

    @GetMapping("chi-tiet-thue")
    public String detailRenterOfRoom() {
        return "/admin/admin-renter-of-room";
    }

    @GetMapping("nguoi-thue")
    public String renter() {
        return "/admin/admin-renter";
    }

    @GetMapping(value = "phong-thue")
    public String renterRoom() {
        return "/admin/admin-room-of-rent";
    }

    @GetMapping("chu-tro")
    public String hostInfo() {
        return "/admin/admin-host";
    }

    @GetMapping("phong-so-huu")
    public String ownRoom() {
        return "/admin/admin-host-has-room";
    }

    @GetMapping("danh-muc")
    public String category() {
        return "/admin/admin-category";
    }

    @GetMapping("tien-ich")
    public String convenient() {
        return "/admin/admin-convenient";
    }

    @GetMapping("thong-ke")
    public String statistic() {
        return "/admin/admin-statistic";
    }
}
