package com.project2.controller.api;

import com.project2.entities.data.AppUser;
import com.project2.entities.data.Role;
import com.project2.repository.AppUserRepository;
import com.project2.repository.RoleRepository;
import com.project2.service.AppUserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@Controller
@AllArgsConstructor
@RequestMapping("api/public/user/*")
public class AppUserController {

    private final AppUserService appUserService;

    private final RoleRepository roleRepository;

    @GetMapping("find-all")
    public ResponseEntity<Object> findAll(Authentication authentication) {
        try {
            String email = null;
            if (authentication != null)
                email = ((User) authentication.getPrincipal()).getUsername();
            List<AppUser> appUsers = appUserService.findAll(email);
            return appUsers != null && !appUsers.isEmpty() ? ResponseEntity.ok(appUsers)
                    : ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping(value = {"find-by-id/{id}", "find-by-id"})
    public ResponseEntity<Object> findById(Authentication authentication,
                                           @PathVariable(name = "id", required = false) Integer id) {
        try {
            String email = null;
            if (authentication != null)
                email = ((User) authentication.getPrincipal()).getUsername();
            AppUser appUser = appUserService.findById(id, email);
            return appUser != null ? ResponseEntity.ok(appUser) : ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

//    @GetMapping("search-sort")
//    public ResponseEntity<Object> search_sort(@RequestParam(name = "name", required = false) String name,
//                                              @RequestParam(name = "field", required = false) String field,
//                                              @RequestParam(name = "isASC", required = false) Boolean isASC) {
//
//        try {
//            String email = null;
//            if (authentication != null)
//                email = ((User) authentication.getPrincipal()).getUsername();
//            List<AppUser> appUsers = appUserService.search_sort();
//            return appUsers != null ? ResponseEntity.ok(appUsers) : ResponseEntity.noContent().build();
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.badRequest().build();
//        }
//    }

    @PostMapping("insert")
    public ResponseEntity<Object> insert(@RequestBody AppUser appUser, Authentication authentication) {
        try {
            String email = null;
            if (authentication != null)
                email = ((User) authentication.getPrincipal()).getUsername();
            AppUser dto = appUserService.insert(appUser, email);
            return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("update")
    public ResponseEntity<Object> update(@RequestBody AppUser appUser, Authentication authentication) {

        try {
            String email = null;
            if (authentication != null)
                email = ((User) authentication.getPrincipal()).getUsername();
            AppUser dto = appUserService.update(appUser, email);
            return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<Object> delete(Authentication authentication, @PathVariable("id") Integer id) {
        try {
            String email = null;
            if (authentication != null)
                email = ((User) authentication.getPrincipal()).getUsername();
            if (appUserService.delete(id, email)) {
                return ResponseEntity.ok("Delete Successful");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return ResponseEntity.badRequest().build();
    }

    @GetMapping("role")
    public ResponseEntity<Object> allRoles() {
        try {
            List<Role> roles = roleRepository.findAll();
            return ResponseEntity.ok(roles);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }
}
