package com.project2.controller.api;

import com.project2.entities.data.Tenant;
import com.project2.entities.key.TenantKey;
import com.project2.service.TenantService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Controller
@AllArgsConstructor
@RequestMapping("api/public/tenant/*")
public class TenantController {

    private final TenantService tenantService;

    @GetMapping("find-by-user/{id}")
    public ResponseEntity<Object> findAllByUser(Authentication authentication, @PathVariable("id") Integer id) {
        try {
            String email = null;
            if (authentication != null)
                email = ((User) authentication.getPrincipal()).getUsername();
            List<Tenant> motelRoomDTOS = tenantService.findAllByIdUser(id, email);
            return motelRoomDTOS != null && !motelRoomDTOS.isEmpty() ? ResponseEntity.ok(motelRoomDTOS)
                    : ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("find-by-host/{id}")
    public ResponseEntity<Object> findAllByHost(Authentication authentication, @PathVariable("id") Integer id) {
        try {
            String email = null;
            if (authentication != null)
                email = ((User) authentication.getPrincipal()).getUsername();
            List<Tenant> motelRoomDTOS = tenantService.findAllByIdHost(id, email);
            return motelRoomDTOS != null && !motelRoomDTOS.isEmpty() ? ResponseEntity.ok(motelRoomDTOS)
                    : ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("find-req-by-host/{id}")
    public ResponseEntity<Object> findReqByHost(Authentication authentication, @PathVariable("id") Integer id) {
        try {
            String email = null;
            if (authentication != null)
                email = ((User) authentication.getPrincipal()).getUsername();
            List<Tenant> motelRoomDTOS = tenantService.findAllReqByIdHost(id, email);
            return motelRoomDTOS != null && !motelRoomDTOS.isEmpty() ? ResponseEntity.ok(motelRoomDTOS)
                    : ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("insert")
    public ResponseEntity<Object> insert(Authentication authentication, @RequestBody Tenant tenant) {
        try {
            String email = null;
            if (authentication != null)
                email = ((User) authentication.getPrincipal()).getUsername();
            Tenant dto = tenantService.insert(tenant, email);
            return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("update")
    public ResponseEntity<Object> update(Authentication authentication, @RequestBody Tenant tenant) {
        try {
            String email = null;
            if (authentication != null)
                email = ((User) authentication.getPrincipal()).getUsername();
            Tenant dto = tenantService.update(tenant, email);
            return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("delete")
    public ResponseEntity<Object> delete(Authentication authentication, @RequestBody TenantKey tenantKey) {
        try {
            String email = null;
            if (authentication != null)
                email = ((User) authentication.getPrincipal()).getUsername();
            if (tenantService.deleteCustom(tenantKey, email)) {
                return ResponseEntity.ok("Delete Successful");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.badRequest().build();
    }
}
