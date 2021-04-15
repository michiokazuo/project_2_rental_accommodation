package com.project2.service;

import com.project2.entities.dto.AdminDTO;

public interface AdminService {
    AdminDTO findAll(String email) throws Exception;
}
