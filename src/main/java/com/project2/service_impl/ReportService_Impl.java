package com.project2.service_impl;

import com.project2.config.AppConfig;
import com.project2.entities.data.AppUser;
import com.project2.entities.data.MotelRoom;
import com.project2.entities.data.Report;
import com.project2.repository.AppUserRepository;
import com.project2.repository.MotelRoomRepository;
import com.project2.repository.ReportRepository;
import com.project2.service.ReportService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ReportService_Impl implements ReportService {

    private final AppConfig appConfig;

    private final ReportRepository reportRepository;

    private final AppUserRepository appUserRepository;

    private final MotelRoomRepository motelRoomRepository;

    @Override
    public List<Report> findAll(String email) throws Exception {
        if (email != null && appConfig.checkAdmin(email))
            return reportRepository.findAllByDeletedFalse();
        return null;
    }

    @Override
    public Report findById(Integer id, String email) throws Exception {
        if (id != null && id > 0)
            return reportRepository.findByIdCmtAndDeletedIsFalse(id);
        return null;
    }

    @Override
    public List<Report> search_sort(Report report, String field, Boolean isASC, String email) throws Exception {
        return null;
    }

    @Override
    public Report insert(Report report, String email) throws Exception {
        if (report != null && email != null) {
            report.setDeleted(false);
            AppUser appUser = appUserRepository.findByIdAndDeletedFalse(report.getUser().getId());
            if (appUser != null && (appUser.getEmail().equals(email) || appConfig.checkAdmin(email))) {
                report.setUser(appUser);
                MotelRoom motelRoom = motelRoomRepository.findByIdAndDeletedFalse(report.getRoom().getId());
                if (motelRoom != null) {
                    report.setRoom(motelRoom);
                    Report updateReport = reportRepository.save(report);
                    if(reportRepository.updateStatus(updateReport.getUser().getId(), updateReport.getRoom().getId(),
                            updateReport.getRate()) >= 0)
                        System.out.println("Update Report Success");
                    return updateReport;
                }
            }
        }
        return null;
    }

    @Override
    public Report update(Report report, String email) throws Exception {
        return insert(report, email);
    }

    @Override
    public boolean delete(Integer id, String email) throws Exception {
        return email != null && id != null && id > 0
                && (findById(id, email).getUser().getEmail().equals(email) || appConfig.checkAdmin(email))
                && reportRepository.deleteCustom(id) >= 0;
    }

    @Override
    public List<Report> findAllByRoom(Integer id, String email) throws Exception {
        if (id != null && id > 0)
            return reportRepository.findAllByIdRoom(id);
        return null;
    }

    @Override
    public List<Report> findAllByUser(Integer id, String email) throws Exception {
        if (id != null && id > 0)
            return reportRepository.findAllByIdUser(id);
        return null;
    }
}
