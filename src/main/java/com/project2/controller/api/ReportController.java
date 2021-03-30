package com.project2.controller.api;

import com.project2.entities.data.Report;
import com.project2.entities.dto.MotelRoomDTO;
import com.project2.service.MotelRoomService;
import com.project2.service.ReportService;
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
@RequestMapping("api/public/report/*")
public class ReportController {

    private final ReportService reportService;

    @GetMapping("find-all")
    public ResponseEntity<Object> findAll(Authentication authentication) {
        try {
            String email = null;
            if (authentication != null)
                email = ((User) authentication.getPrincipal()).getUsername();
            List<Report> reports = reportService.findAll(email);
            return reports != null ? ResponseEntity.ok(reports) : ResponseEntity.noContent().build();
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
            Report taskDTO = reportService.findById(id, email);
            return taskDTO != null ? ResponseEntity.ok(taskDTO) : ResponseEntity.noContent().build();
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
//            List<Report> reports = reportService.search_sort();
//            return reports != null ? ResponseEntity.ok(reports) : ResponseEntity.noContent().build();
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.badRequest().build();
//        }
//    }

    @PostMapping("insert")
    public ResponseEntity<Object> insert(Authentication authentication, @RequestBody Report report) {
        try {
            String email = null;
            if (authentication != null)
                email = ((User) authentication.getPrincipal()).getUsername();
            Report dto = reportService.insert(report, email);
            return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("update")
    public ResponseEntity<Object> update(Authentication authentication, @RequestBody Report report) {
        try {
            String email = null;
            if (authentication != null)
                email = ((User) authentication.getPrincipal()).getUsername();
            Report dto = reportService.update(report, email);
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
            if (reportService.delete(id, email)) {
                return ResponseEntity.ok("Delete Successful");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.badRequest().build();
    }
}
