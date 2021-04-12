package com.project2.service_impl;

import com.project2.service.FileService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@Service
public class FileService_Impl implements FileService {

    @Value("${file.upload}")
    private String pathSaveFile;

    @Value("${path.file}")
    private String pathFile;

    @Override
    public List<String> uploadFiles(MultipartFile[] multipartFiles) throws Exception {
        List<String> listRs = new ArrayList<>();

        try {
            String folder = String.valueOf(new Date().getTime());
            String appPath = pathSaveFile + "/" + folder;
//        File folderUpload = new File(appPath);
            Path folderUpload = Paths.get(appPath);
            if (!Files.exists(folderUpload)) {
                Files.createDirectories(folderUpload);
            }

            for (MultipartFile part : multipartFiles) {
                String pathName = "." + pathFile + "/" + folder + "/" + part.getOriginalFilename();
                Files.copy(part.getInputStream(),
                        folderUpload.resolve(Objects.requireNonNull(part.getOriginalFilename())));
                listRs.add(pathName);
            }

            if (Objects.requireNonNull(folderUpload.toFile().list()).length <= 0) {
                if (folderUpload.toFile().delete())
                    return null;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

        System.out.println("Files: " + listRs);
        return listRs.size() != 0 ? listRs : null;
    }
}
