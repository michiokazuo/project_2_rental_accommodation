package com.project2.service;

import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.Part;
import java.util.Collection;
import java.util.List;

public interface FileService {

    List<String> uploadFiles(MultipartFile[] multipartFiles) throws Exception;
}
