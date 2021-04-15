package com.project2.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("host/*")
public class HostController {

    @GetMapping("trang-chu")
    public String homePage() {
        return "/host/host-home";
    }

    @GetMapping(value = {"chu-tro", ""})
    public String hostHomePage() {
        return "redirect:trang-chu";
    }

    @GetMapping("tro-so-huu")
    public String ownerRoom() {
        return "/host/host-has-room";
    }

    @GetMapping(value = {"chi-tiet-thue", "tro-so-huu/chi-tiet-thue"})
    public String detailRenterOfRoom() {
        return "/host/renter-of-room";
    }

    @GetMapping("yeu-cau-moi")
    public String requestNew() {
        return "/host/request-rent";
    }

    @GetMapping("nguoi-thue")
    public String renter() {
        return "/host/renter-of-host";
    }

    @GetMapping("thong-tin-ca-nhan")
    public String hostInformation() {
        return "/host/host-info";
    }

    @GetMapping("thong-ke")
    public String statistic() {
        return "/host/host-statistic";
    }
}
