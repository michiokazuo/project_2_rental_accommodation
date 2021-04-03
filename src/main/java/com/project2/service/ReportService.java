package com.project2.service;

import com.project2.entities.data.AppUser;
import com.project2.entities.data.Report;

import java.util.List;

public interface ReportService extends BaseService<Report> {

    List<Report> findAllByRoom(Integer id, String email) throws Exception;

    List<Report> findAllByUser(Integer id, String email) throws Exception;
}
