package com.project2.controller.api;

import com.project2.entities.data.MotelRoom;
import com.project2.entities.dto.MotelRoomDTO;
import com.project2.repository.CategoryRepository;
import com.project2.repository.ConvenientRepository;
import com.project2.repository.RoomHasConvenientRepository;
import com.project2.service.MotelRoomService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@AllArgsConstructor
@RequestMapping("api/public/motel-room/*")
public class MotelRoomController {

    private final MotelRoomService motelRoomService;

    private final ConvenientRepository convenientRepository;

    private final CategoryRepository categoryRepository;

    @GetMapping("find-all")
    public ResponseEntity<Object> findAll(Authentication authentication) {
        try {
            String email = null;
            if (authentication != null)
                email = ((User) authentication.getPrincipal()).getUsername();
            List<MotelRoomDTO> motelRoomDTOS = motelRoomService.findAll(email);
            return motelRoomDTOS != null && !motelRoomDTOS.isEmpty() ? ResponseEntity.ok(motelRoomDTOS)
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
            MotelRoomDTO motelRoomDTO = motelRoomService.findById(id, email);
            return motelRoomDTO != null ? ResponseEntity.ok(motelRoomDTO) : ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("admin/find-all-by-user/{id}")
    public ResponseEntity<Object> findAllByUser(Authentication authentication, @PathVariable("id") Integer id) {
        try {
            String email = null;
            if (authentication != null)
                email = ((User) authentication.getPrincipal()).getUsername();
            List<MotelRoomDTO> motelRoomDTOS = motelRoomService.findAllByUser(id, email);
            return motelRoomDTOS != null && !motelRoomDTOS.isEmpty() ? ResponseEntity.ok(motelRoomDTOS)
                    : ResponseEntity.noContent().build();
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
            return motelRoomDTOS != null && !motelRoomDTOS.isEmpty() ? ResponseEntity.ok(motelRoomDTOS)
                    : ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("admin/find-all-by-admin/{id}")
    public ResponseEntity<Object> findAllByAdmin(Authentication authentication, @PathVariable("id") Integer id) {
        try {
            String email = null;
            if (authentication != null)
                email = ((User) authentication.getPrincipal()).getUsername();
            List<MotelRoomDTO> motelRoomDTOS = motelRoomService.findAllForAdmin(id, email);
            return motelRoomDTOS != null && !motelRoomDTOS.isEmpty() ? ResponseEntity.ok(motelRoomDTOS)
                    : ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("find-new-to-home-page")
    public ResponseEntity<Object> findNewToHome(Authentication authentication, Pageable pageable) {
        try {
            String email = null;
            if (authentication != null)
                email = ((User) authentication.getPrincipal()).getUsername();
            List<MotelRoomDTO> motelRoomDTOS = motelRoomService.findRoomPage(pageable, email);
            return motelRoomDTOS != null && !motelRoomDTOS.isEmpty() ? ResponseEntity.ok(motelRoomDTOS)
                    : ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("search-sort")
    public ResponseEntity<Object> search_sort(Authentication authentication,
                                              @RequestParam(name = "address", required = false) String address,
                                              @RequestParam(name = "max_person", required = false) Integer maxPerson,
                                              @RequestParam(name = "floor", required = false) Integer floor,
                                              @RequestParam(name = "category", required = false) Integer category,
                                              @RequestParam(name = "price", required = false) String price,
                                              @RequestParam(name = "priority", required = false) String priority,
                                              @RequestParam(name = "convenient", required = false) Integer[] convenient) {

        ResponseEntity.ok(address);
        try {
            String email = null;
            if (authentication != null)
                email = ((User) authentication.getPrincipal()).getUsername();
            System.out.println(MotelRoomDTO.builder()
                    .motelRoom(MotelRoom.builder().address(address).maxPerson(maxPerson).floors(floor)
                            .priorityObject(priority)
                            .category(category != null ? categoryRepository.findByIdAndDeletedFalse(category) : null)
                            .build())
                    .convenientList(convenient != null ?
                            convenientRepository.findByIdInAndDeletedFalse(Arrays.asList(convenient)) : null)
                    .build());
            System.out.println(price + " " + email);
            List<MotelRoomDTO> motelRoomDTOS = motelRoomService.search_sort(MotelRoomDTO.builder()
                            .motelRoom(MotelRoom.builder().address(address).maxPerson(maxPerson).floors(floor)
                                    .priorityObject(priority)
                                    .category(category != null ? categoryRepository.findByIdAndDeletedFalse(category) : null)
                                    .build())
                            .convenientList(convenient != null ?
                                    convenientRepository.findByIdInAndDeletedFalse(Arrays.asList(convenient)) : null)
                            .build(),
                    price, null, email);
            return motelRoomDTOS != null && !motelRoomDTOS.isEmpty() ? ResponseEntity.ok(motelRoomDTOS)
                    : ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("host/insert")
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

    @PutMapping("host/update")
    public ResponseEntity<Object> update(Authentication authentication, @RequestBody MotelRoomDTO roomDTO) {
        try {
            String email = null;
            if (authentication != null)
                email = ((User) authentication.getPrincipal()).getUsername();
            System.out.println(roomDTO);
            MotelRoomDTO dto = motelRoomService.update(roomDTO, email);
            return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("admin-host/delete/{id}")
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
