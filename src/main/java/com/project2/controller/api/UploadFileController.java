package com.project2.controller.api;

import com.project2.service.FileService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("api/public/file/*")
@AllArgsConstructor
public class UploadFileController {

    private final FileService fileService;

    @PostMapping("upload-file")
    public ResponseEntity<List<String>> uploadFile(@RequestParam("files") MultipartFile[] multipartFiles) {
        try {
            List<String> files = fileService.uploadFiles(multipartFiles);
            return files != null ? ResponseEntity.ok(files) : ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }
}
