package com.project2.service_impl;

import com.project2.config.AppConfig;
import com.project2.entities.data.AppUser;
import com.project2.entities.data.MotelRoom;
import com.project2.entities.data.Tenant;
import com.project2.entities.key.TenantKey;
import com.project2.repository.AppUserRepository;
import com.project2.repository.MotelRoomRepository;
import com.project2.repository.TenantRepository;
import com.project2.service.SendEmailService;
import com.project2.service.TenantService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class TenantService_Impl implements TenantService {

    private final TenantRepository tenantRepository;

    private final MotelRoomRepository motelRoomRepository;

    private final AppUserRepository appUserRepository;

    private final SendEmailService sendEmailService;

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
            tenant.setStatus(false);
            AppUser appUser = appUserRepository.findByIdAndDeletedFalse(tenant.getId().getIdUser());
            MotelRoom motelRoom = motelRoomRepository.findByIdAndDeletedFalse(tenant.getId().getIdRoom());
            if (appUser != null && motelRoom != null
                    && (appUser.getEmail().equals(email) || motelRoom.getHost().getEmail().equals(email))) {
                tenant.setUser(appUser);
                tenant.setRoom(motelRoom);
                return tenantRepository.save(tenant);
            }
        }
        return null;
    }

    @Override
    public Tenant update(Tenant tenant, String email) throws Exception {
        Tenant rs = null;
        Tenant currentTenant = tenantRepository.findByIdAndDeletedFalse(tenant.getId());
        if (currentTenant != null && !currentTenant.getStatus() && tenant.getStatus()) {
            int personIn = Math.toIntExact(tenantRepository.count(Example.of(Tenant.builder()
                    .room(currentTenant.getRoom()).status(true).build())));
            if (personIn < currentTenant.getRoom().getMaxPerson()) {
                tenant.setDeleted(false);
                rs = insert(tenant, email);
                if (rs != null) personIn++;
            }
            if (personIn >= currentTenant.getRoom().getMaxPerson()) {
                List<Tenant> tenants = tenantRepository.findAllByRoomAndDeletedFalse(currentTenant.getRoom());
                List<TenantKey> tenantKeys = new ArrayList<>();
                List<String> emails = new ArrayList<>();
                for (Tenant t : tenants) {
                    if (!t.getStatus()) {
                        tenantKeys.add(t.getId());
                        emails.add(t.getUser().getEmail());
                    }
                }
                if (tenantRepository.deleteCustomByListKey(tenantKeys) > 0) {
                    sendEmailService.sendHtmlMail((String[]) emails.toArray(), "Yêu cầu thuê bị từ chối",
                            "Yêu cầu này của bạn: " + currentTenant.getRoom().getTitle() +
                                    " thuộc ông/bà " + currentTenant.getRoom().getHost().getName() +
                                    " đã bị từ chối do đủ người. Mong bạn thông cảm và tìm trọ phù hợp hơn.");
                }
            }
        }
        return rs;
    }

    @Override
    public boolean delete(Integer id, String email) throws Exception {
        return false;
    }

    @Override
    public List<Tenant> findAllByIdRoom(Integer roomId, String email) throws Exception {
        if (roomId != null && roomId > 0)
            return tenantRepository.findAllByRoomAndDeletedFalse(motelRoomRepository.findByIdAndDeletedFalse(roomId));
        return null;
    }

    @Override
    public List<Tenant> findAllByIdUser(Integer userId, String email) throws Exception {
        if (userId != null && userId > 0)
            return tenantRepository.findAllByUserAndDeletedFalse(appUserRepository.findByIdAndDeletedFalse(userId));
        return null;
    }

    @Override
    public boolean deleteCustom(TenantKey tenantKey, String email) throws Exception {
        if (email != null && tenantKey != null) {
            AppUser appUser = appUserRepository.findByEmailAndDeletedFalse(email);
            return appUser != null && (appUser.getId().equals(tenantKey.getIdUser()) || AppConfig.checkAdmin(email)
                    || (AppConfig.checkHost(email)
                    && appUser.getId()
                    .equals(motelRoomRepository.findByIdAndDeletedFalse(tenantKey.getIdRoom()).getHost().getId())))
                    && tenantRepository.deleteCustom(tenantKey.getIdRoom(), tenantKey.getIdUser()) > 0;
        }
        return false;
    }
}
