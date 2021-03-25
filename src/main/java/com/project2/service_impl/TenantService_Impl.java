package com.project2.service_impl;

import com.project2.config.AppConfig;
import com.project2.entities.data.AppUser;
import com.project2.entities.data.MotelRoom;
import com.project2.entities.data.Tenant;
import com.project2.entities.key.TenantKey;
import com.project2.repository.AppUserRepository;
import com.project2.repository.MotelRoomRepository;
import com.project2.repository.TenantRepository;
import com.project2.service.TenantService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class TenantService_Impl implements TenantService {

    private final TenantRepository tenantRepository;

    private final MotelRoomRepository motelRoomRepository;

    private final AppUserRepository appUserRepository;

    @Override
    public List<Tenant> findAll(String email) throws Exception {
        return tenantRepository.findAllByDeletedFalse();
    }

    @Override
    public Tenant findById(Integer id, String email) throws Exception {
        return null;
    }

    @Override
    public List<Tenant> search_sort(Tenant tenant, String field, Boolean isASC, String email) throws Exception {
        return null;
    }

    @Override
    public Tenant insert(Tenant tenant, String email) throws Exception {
        if (tenant != null && email != null) {
            tenant.setDeleted(false);
            AppUser appUser = appUserRepository.findByIdAndDeletedFalse(tenant.getId().getIdUser());
            MotelRoom motelRoom = motelRoomRepository.findByIdAndDeletedFalse(tenant.getId().getIdRoom());
            if (appUser != null && motelRoom != null
                    && (appUser.getEmail().equals(email) || motelRoom.getCreateBy().getEmail().equals(email))) {
                tenant.setUser(appUser);
                tenant.setRoom(motelRoom);
                return tenantRepository.save(tenant);
            }
        }
        return null;
    }

    @Override
    public Tenant update(Tenant tenant, String email) throws Exception {
        return insert(tenant, email);
    }

    @Override
    public boolean delete(Integer id, String email) throws Exception {
        return false;
    }

    @Override
    public List<Tenant> findAllByIdRoom(Integer roomId) throws Exception {
        if (roomId != null && roomId > 0)
            return tenantRepository.findAllByRoomAndDeletedFalse(motelRoomRepository.findByIdAndDeletedFalse(roomId));
        return null;
    }

    @Override
    public boolean deleteCustom(TenantKey tenantKey, String email) throws Exception {
        if (email != null && tenantKey != null) {
            AppUser appUser = appUserRepository.findByEmailAndDeletedFalse(email);
            return appUser != null && (appUser.getId().equals(tenantKey.getIdUser()) || AppConfig.checkAdmin(email)
                    || (AppConfig.checkHost(email)
                    && appUser.getId()
                    .equals(motelRoomRepository.findByIdAndDeletedFalse(tenantKey.getIdRoom()).getCreateBy().getId())))
                    && tenantRepository.deleteCustom(tenantKey.getIdRoom(), tenantKey.getIdUser()) > 0;
        }
        return false;
    }
}
