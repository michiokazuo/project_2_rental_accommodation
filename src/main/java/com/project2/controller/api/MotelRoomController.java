package com.project2.controller.api;

import com.project2.entities.dto.MotelRoomDTO;
import com.project2.service.MotelRoomService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@Controller
@AllArgsConstructor
@RequestMapping("api/public/motel-room/*")
public class MotelRoomController {

    private final MotelRoomService motelRoomService;

    @GetMapping("find-all")
    public ResponseEntity<Object> findAll(Authentication authentication) {
        try {
            String email = null;
            if (authentication != null)
                email = ((User) authentication.getPrincipal()).getUsername();
            List<MotelRoomDTO> motelRoomDTOS = motelRoomService.findAll(email);
            return motelRoomDTOS != null ? ResponseEntity.ok(motelRoomDTOS) : ResponseEntity.noContent().build();
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
            MotelRoomDTO motelRoomDTO = motelRoomService.findById(id, email);
            return motelRoomDTO != null ? ResponseEntity.ok(motelRoomDTO) : ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("find-all-by-user/{id}")
    public ResponseEntity<Object> findAllByUser(Authentication authentication, @PathVariable("id") Integer id) {
        try {
            String email = null;
            if (authentication != null)
                email = ((User) authentication.getPrincipal()).getUsername();
            List<MotelRoomDTO> motelRoomDTOS = motelRoomService.findAllByUser(id, email);
            return motelRoomDTOS != null ? ResponseEntity.ok(motelRoomDTOS) : ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("find-all-by-host/{id}")
    public ResponseEntity<Object> findAllByHost(Authentication authentication, @PathVariable("id") Integer id) {
        try {
            String email = null;
            if (authentication != null)
                email = ((User) authentication.getPrincipal()).getUsername();
            List<MotelRoomDTO> motelRoomDTOS = motelRoomService.findAllByHost(id, email);
            return motelRoomDTOS != null ? ResponseEntity.ok(motelRoomDTOS) : ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

//    @GetMapping("search-sort")
//    public ResponseEntity<Object> search_sort(Authentication authentication,
//                                              @RequestParam(name = "name", required = false) String name,
//                                              @RequestParam(name = "createDate", required = false) Date createDate,
//                                              @RequestParam(name = "status", required = false) Byte status,
//                                              @RequestParam(name = "field", required = false) String field,
//                                              @RequestParam(name = "isASC", required = false) Boolean isASC,
//                                              @RequestParam(name = "idProject", required = false) Integer idProject) {
//
//        try {
//            String email = null;
//            if (authentication != null)
//                email = ((User) authentication.getPrincipal()).getUsername();
//            List<MotelRoomDTO> motelRoomDTOS = motelRoomService.search_sort();
//            return motelRoomDTOS != null ? ResponseEntity.ok(motelRoomDTOS) : ResponseEntity.noContent().build();
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.badRequest().build();
//        }
//    }

    @PostMapping("insert")
    public ResponseEntity<Object> insert(Authentication authentication, @RequestBody MotelRoomDTO roomDTO) {
        try {
            String email = null;
            if (authentication != null)
                email = ((User) authentication.getPrincipal()).getUsername();
            MotelRoomDTO dto = motelRoomService.insert(roomDTO, email);
            return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("update")
    public ResponseEntity<Object> update(Authentication authentication, @RequestBody MotelRoomDTO roomDTO) {
        try {
            String email = null;
            if (authentication != null)
                email = ((User) authentication.getPrincipal()).getUsername();
            MotelRoomDTO dto = motelRoomService.update(roomDTO, email);
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
            if (motelRoomService.delete(id, email)) {
                return ResponseEntity.ok("Delete Successful");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.badRequest().build();
    }
}
