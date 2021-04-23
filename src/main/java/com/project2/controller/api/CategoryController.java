package com.project2.controller.api;

import com.project2.entities.data.Category;
import com.project2.service.CategoryService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@AllArgsConstructor
@RequestMapping("api/public/category/*")
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping("find-all")
    public ResponseEntity<Object> findAll(Authentication authentication) {
        try {
            String email = null;
            if (authentication != null)
                email = ((User) authentication.getPrincipal()).getUsername();
            List<Category> categories = categoryService.findAll(email);
            return categories != null && !categories.isEmpty() ? ResponseEntity.ok(categories)
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
            Category category = categoryService.findById(id, email);
            return category != null ? ResponseEntity.ok(category) : ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("admin/insert")
    public ResponseEntity<Object> insert(Authentication authentication, @RequestBody Category category) {
        try {
            String email = null;
            if (authentication != null)
                email = ((User) authentication.getPrincipal()).getUsername();
            Category dto = categoryService.insert(category, email);
            return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("admin/update")
    public ResponseEntity<Object> update(Authentication authentication, @RequestBody Category category) {
        try {
            String email = null;
            if (authentication != null)
                email = ((User) authentication.getPrincipal()).getUsername();
            Category dto = categoryService.update(category, email);
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
            if (categoryService.delete(id, email)) {
                return ResponseEntity.ok("Delete Successful");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.badRequest().build();
    }
}
