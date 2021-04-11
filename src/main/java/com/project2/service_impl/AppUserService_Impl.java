package com.project2.service_impl;

import com.project2.config.AppConfig;
import com.project2.entities.data.AppUser;
import com.project2.repository.AppUserRepository;
import com.project2.repository.MotelRoomRepository;
import com.project2.repository.ReportRepository;
import com.project2.repository.TenantRepository;
import com.project2.service.AppUserService;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class AppUserService_Impl implements AppUserService {

    private final AppConfig appConfig;

    private final AppUserRepository appUserRepository;

    private final MotelRoomRepository motelRoomRepository;

    private final TenantRepository tenantRepository;

    private final ReportRepository reportRepository;

    private final BCryptPasswordEncoder passwordEncoder;

    @Override
    public List<AppUser> findAll(String email) throws Exception {
        if (email != null && appConfig.checkAdmin(email))
            return appUserRepository.findAllByDeletedFalseAndRoleNotLike(AppConfig.roles.get(AppConfig.ADMIN));
        return null;
    }

    @Override
    public AppUser findById(Integer id, String email) throws Exception {
        if (id != null && id > 0)
            return appUserRepository.findByIdAndDeletedFalse(id);
        if (email != null)
            return appUserRepository.findByEmailAndDeletedFalse(email);
        return null;
    }

    @Override
    public List<AppUser> search_sort(AppUser appUser, String field, Boolean isASC, String email) throws Exception {
        return null;
    }

    @Override
    public AppUser insert(AppUser appUser, String email) throws Exception {
        if (appUser != null && !appUserRepository.existsByEmailAndDeletedFalseOrPhoneAndDeletedFalse(appUser.getEmail(),
                        appUser.getPhone())) {

            appUser.setDeleted(false);
            appUser.setPassword(passwordEncoder.encode(appUser.getPassword()));
            System.out.println(appUser);
            return appUserRepository.save(appUser);
        }
        return null;
    }

    @Override
    public AppUser update(AppUser appUser, String email) throws Exception {
        if (email != null && appUser != null
                && (appUser.getId().equals(appUserRepository.findByEmailAndDeletedFalse(email).getId())
                || appConfig.checkAdmin(email))) {
            AppUser user = appUserRepository.findByIdAndDeletedFalse(appUser.getId());
            List<AppUser> appUserList = appUserRepository.findByPhoneAndDeletedFalse(appUser.getPhone());
            if (user == null || !user.getEmail().equals(appUser.getEmail())) return null;

            if (appUserList != null && appUserList.size() > 1) return null;
            appUser.setDeleted(false);
            appUser.setPassword(passwordEncoder.encode(appUser.getPassword()));
            return appUserRepository.save(appUser);
        }
        return null;
    }

    @Override
    public boolean delete(Integer id, String email) throws Exception {
        return email != null && appConfig.checkAdmin(email)
                && id != null && id > 0 && appUserRepository.deleteCustom(id) >= 0
                && motelRoomRepository.deleteCustomByHost(id) >= 0
                && tenantRepository.deleteCustomByIdUser(id) >= 0
                && reportRepository.deleteCustomByUser(id) >= 0;
    }

    @Override
    public List<AppUser> findAllUserByAdmin(String email, Integer roleId) throws Exception {
        if (email != null && roleId != null && appConfig.checkAdmin(email))
            return appUserRepository.findAllByDeletedFalseAndRole_Id(roleId);
        return null;
    }

    @Override
    public AppUser updatePassword(String email, String password) throws Exception {
        AppUser user = appUserRepository.findByEmailAndDeletedFalse(email);
        if (user != null) {
            user.setPassword(passwordEncoder.encode(password));
            user = appUserRepository.save(user);
        }
        return user;
    }

}
