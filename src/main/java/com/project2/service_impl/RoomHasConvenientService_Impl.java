package com.project2.service_impl;

import com.project2.config.AppConfig;
import com.project2.entities.data.AppUser;
import com.project2.entities.data.Convenient;
import com.project2.entities.data.MotelRoom;
import com.project2.entities.data.RoomHasConvenient;
import com.project2.entities.key.RoomConvenientKey;
import com.project2.repository.AppUserRepository;
import com.project2.repository.ConvenientRepository;
import com.project2.repository.MotelRoomRepository;
import com.project2.repository.RoomHasConvenientRepository;
import com.project2.service.RoomHasConvenientService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class RoomHasConvenientService_Impl implements RoomHasConvenientService {

    private final RoomHasConvenientRepository roomHasConvenientRepository;

    private final MotelRoomRepository motelRoomRepository;

    private final ConvenientRepository convenientRepository;

    private final AppUserRepository appUserRepository;

    @Override
    public List<RoomHasConvenient> findAll(String email) throws Exception {
        return roomHasConvenientRepository.findAllByDeletedFalse();
    }

    @Override
    public RoomHasConvenient findById(Integer id, String email) throws Exception {
        return null;
    }

    @Override
    public List<RoomHasConvenient> search_sort(RoomHasConvenient roomHasConvenient, String field, Boolean isASC
            , String email) throws Exception {
        return null;
    }

    @Override
    public RoomHasConvenient insert(RoomHasConvenient roomHasConvenient, String email) throws Exception {
        if (roomHasConvenient != null && email != null) {
            roomHasConvenient.setDeleted(false);
            MotelRoom motelRoom = motelRoomRepository.findByIdAndDeletedFalse(roomHasConvenient.getId().getIdRoom());
            if (motelRoom != null && motelRoom.getCreateBy().getEmail().equals(email)) {
                roomHasConvenient.setRoom(motelRoom);
                Convenient convenient = convenientRepository
                        .findByIdAndDeletedFalse(roomHasConvenient.getId().getIdConvenient());
                if (convenient != null) {
                    roomHasConvenient.setConvenient(convenient);
                    return roomHasConvenientRepository.save(roomHasConvenient);
                }
            }
        }
        return null;
    }

    @Override
    public RoomHasConvenient update(RoomHasConvenient roomHasConvenient, String email) throws Exception {
        return insert(roomHasConvenient, email);
    }

    @Override
    public boolean delete(Integer idRoom, String email) throws Exception {
        return false;
    }

    @Override
    public List<RoomHasConvenient> findAllByRoom(Integer id, String email) throws Exception {
        if (id != null && id > 0)
            return roomHasConvenientRepository
                    .findByRoomAndDeletedFalse(motelRoomRepository.findByIdAndDeletedFalse(id));
        return null;
    }

    @Override
    public boolean deleteCustom(RoomConvenientKey roomConvenientKey, String email) throws Exception {
        if (email != null && roomConvenientKey != null) {
            AppUser appUser = appUserRepository.findByEmailAndDeletedFalse(email);
            return appUser != null && (AppConfig.checkAdmin(email)
                    || (AppConfig.checkHost(email)
                    && appUser.getId().equals(motelRoomRepository
                    .findByIdAndDeletedFalse(roomConvenientKey.getIdRoom()).getCreateBy().getId())))
                    && roomHasConvenientRepository
                    .deleteCustom(roomConvenientKey.getIdRoom(), roomConvenientKey.getIdConvenient()) > 0;
        }
        return false;
    }
}
