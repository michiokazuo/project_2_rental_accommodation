package com.project2.service_impl;

import com.project2.config.AppConfig;
import com.project2.entities.data.AppUser;
import com.project2.repository.AppUserRepository;
import com.project2.repository.MotelRoomRepository;
import com.project2.repository.ReportRepository;
import com.project2.repository.TenantRepository;
import com.project2.service.AppUserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class AppUserService_Impl implements AppUserService {

    private final AppUserRepository appUserRepository;

    private final MotelRoomRepository motelRoomRepository;

    private final TenantRepository tenantRepository;

    private final ReportRepository reportRepository;

    @Override
    public List<AppUser> findAll(String email) throws Exception {
        if (email != null && AppConfig.checkAdmin(email))
            return appUserRepository.findAllByDeletedFalseAndRoleNotLike(AppConfig.roles.get(AppConfig.ADMIN));
        return null;
    }

    @Override
    public AppUser findById(Integer id, String email) throws Exception {
        if (id != null && id > 0)
            return appUserRepository.findByIdAndDeletedFalse(id);
        return null;
    }

    @Override
    public List<AppUser> search_sort(AppUser appUser, String field, Boolean isASC, String email) throws Exception {
        return null;
    }

    @Override
    public AppUser insert(AppUser appUser, String email) throws Exception {
        if (appUser != null) {
            appUser.setDeleted(false);
            return appUserRepository.save(appUser);
        }
        return null;
    }

    @Override
    public AppUser update(AppUser appUser, String email) throws Exception {
        if (email != null && appUser != null
                && (appUser.getId().equals(appUserRepository.findByEmailAndDeletedFalse(email).getId())
                || AppConfig.checkAdmin(email))) {
            appUser.setDeleted(false);
            return appUserRepository.save(appUser);
        }
        return null;
    }

    @Override
    public boolean delete(Integer id, String email) throws Exception {
        return email != null && AppConfig.checkAdmin(email)
                && id != null && id > 0 && appUserRepository.deleteCustom(id) > 0
                && motelRoomRepository.deleteCustomByHost(id) > 0
                && tenantRepository.deleteCustomByIdUser(id) > 0
                && reportRepository.deleteCustomByUser(id) > 0;
    }

    @Override
    public List<AppUser> findAllUserByAdmin(String email, Integer roleId) throws Exception {
        if (email != null && roleId != null && AppConfig.checkAdmin(email))
            return appUserRepository.findAllByDeletedFalseAndRole_Id(roleId);
        return null;
    }

}
