package com.project2.controller.api;

import com.project2.entities.data.AppUser;
import com.project2.service.AppUserService;
import com.project2.service.SendEmailService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("api/public/mail/*")
@AllArgsConstructor
public class MailController {

    private final SendEmailService sendEmailService;

    private final AppUserService appUserService;

    @PostMapping("notify")
    public ResponseEntity<String> notify(@RequestParam("emails") String emails,
                                         @RequestParam("header") String header,
                                         @RequestParam("content") String content) {
        try {
            System.out.println(emails + "\n" + header + "\n" + content);
            if (sendEmailService.sendHtmlMail(emails.split(" "), header, content))
                return ResponseEntity.ok("Notify Complete");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.noContent().build();
    }

    @PostMapping("forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestParam("email") String email) {
        AppUser appUser = null;
        try {
            String newPassword = UUID.randomUUID().toString().substring(0, 8);
            appUser = appUserService.updatePassword(email, newPassword);
            notify(email, "Mật khẩu mới", "Mật khẩu mới của bạn là : " + newPassword
                    + ". Hãy giữ mật khẩu cẩn thận tránh tiết lộ thông tin cá nhân.");
        } catch (Exception e) {
            appUser = null;
            e.printStackTrace();
        }
        return appUser != null ? ResponseEntity.ok("Get your password form your email") : ResponseEntity.badRequest().build();
    }

}
