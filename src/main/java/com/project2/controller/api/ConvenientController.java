package com.project2.controller.api;

import com.project2.entities.data.Convenient;
import com.project2.service.ConvenientService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@AllArgsConstructor
@RequestMapping("api/public/convenient/*")
public class ConvenientController {

    private final ConvenientService convenientService;

    @GetMapping("find-all")
    public ResponseEntity<Object> findAll(Authentication authentication) {
        try {
            String email = null;
            if (authentication != null)
                email = ((User) authentication.getPrincipal()).getUsername();
            List<Convenient> convenientList = convenientService.findAll(email);
            return convenientList != null && !convenientList.isEmpty() ? ResponseEntity.ok(convenientList)
                    : ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("find-by-id/{id}")
    public ResponseEntity<Object> findById(Authentication authentication, @PathVariable("id") Integer id) {
        try {
            String email = null;
            if (authentication != null)
                email = ((User) authentication.getPrincipal()).getUsername();
            Convenient convenient = convenientService.findById(id, email);
            return convenient != null ? ResponseEntity.ok(convenient) : ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("admin/insert")
    public ResponseEntity<Object> insert(Authentication authentication, @RequestBody Convenient convenient) {
        try {
            String email = null;
            if (authentication != null)
                email = ((User) authentication.getPrincipal()).getUsername();
            Convenient dto = convenientService.insert(convenient, email);
            return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("admin/update")
    public ResponseEntity<Object> update(Authentication authentication, @RequestBody Convenient convenient) {
        try {
            String email = null;
            if (authentication != null)
                email = ((User) authentication.getPrincipal()).getUsername();
            Convenient dto = convenientService.update(convenient, email);
            return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("admin/delete/{id}")
    public ResponseEntity<Object> delete(Authentication authentication, @PathVariable("id") Integer id) {
        try {
            String email = null;
            if (authentication != null)
                email = ((User) authentication.getPrincipal()).getUsername();
            if (convenientService.delete(id, email)) {
                return ResponseEntity.ok("Delete Successful");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.badRequest().build();
    }
}
