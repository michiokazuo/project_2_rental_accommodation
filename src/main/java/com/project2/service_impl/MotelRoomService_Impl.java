package com.project2.service_impl;

import com.project2.config.AppConfig;
import com.project2.convert.Convert;
import com.project2.entities.data.MotelRoom;
import com.project2.entities.data.Report;
import com.project2.entities.data.RoomHasConvenient;
import com.project2.entities.data.Tenant;
import com.project2.entities.dto.MotelRoomDTO;
import com.project2.entities.key.RoomConvenientKey;
import com.project2.repository.*;
import com.project2.service.MotelRoomService;
import com.project2.service.ReportService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class MotelRoomService_Impl implements MotelRoomService {

    private final MotelRoomRepository motelRoomRepository;

    private final ReportRepository reportRepository;

    private final TenantRepository tenantRepository;

    private final RoomHasConvenientRepository roomHasConvenientRepository;

    private final AppUserRepository appUserRepository;

    private final Convert<MotelRoom, MotelRoomDTO> convert;

    @Override
    public List<MotelRoomDTO> findAll(String email) throws Exception {
        List<MotelRoom> motelRooms = motelRoomRepository.findAllByDeletedFalse();
        return convert.toDTORoomNotFullToShowAll(motelRooms, null, email);
    }

    @Override
    public MotelRoomDTO findById(Integer id, String email) throws Exception {
        if (id != null && id > 0) {
            MotelRoom motelRoom = motelRoomRepository.findByIdAndDeletedFalse(id);
            if (motelRoom != null)
                return convert.toDTO(motelRoom, email);
        }
        return null;
    }

    @Override
    public List<MotelRoomDTO> search_sort(MotelRoomDTO motelRoomDTO, String field, Boolean isASC, String email) throws Exception {
        MotelRoom motelRoom = new MotelRoom();
        if (motelRoomDTO != null && motelRoomDTO.getMotelRoom() != null) {
            motelRoom = motelRoomDTO.getMotelRoom();
            motelRoom.setDeleted(false);
        }

        List<MotelRoom> motelRooms = motelRoomRepository.findAll(Example.of(motelRoom, ExampleMatcher.matchingAll()
                .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING)));

//        {val: "1", text: "Dưới 1 triệu"},
//        {val: "2", text: "Từ 1 - 3 triệu"},
//        {val: "3", text: "Từ 3 - 5 triệu"},
//        {val: "4", text: "Trên 5 triệu"}
        if (field != null)
            switch (Integer.parseInt(field)) {
                case 1:
                    motelRooms = motelRooms.stream().filter(r -> r.getPrice() < 1000000).collect(Collectors.toList());
                    break;
                case 2:
                    motelRooms = motelRooms.stream().filter(r -> r.getPrice() >= 1000000 && r.getPrice() < 3000000)
                            .collect(Collectors.toList());
                    break;
                case 3:
                    motelRooms = motelRooms.stream().filter(r -> r.getPrice() >= 3000000 && r.getPrice() < 5000000)
                            .collect(Collectors.toList());
                    break;
                case 4:
                    motelRooms = motelRooms.stream().filter(r -> r.getPrice() >= 5000000).collect(Collectors.toList());
                    break;
                default:
                    break;
            }

        return convert.toDTORoomNotFullToShowAll(motelRooms, null, email);
    }

    @Override
    public MotelRoomDTO insert(MotelRoomDTO motelRoomDTO, String email) throws Exception {
        if (motelRoomDTO != null && email != null && motelRoomDTO.getMotelRoom() != null
                && AppConfig.checkAdmin(email)
                || (Objects.requireNonNull(motelRoomDTO).getMotelRoom().getHost().getEmail().equals(email)
                && AppConfig.checkHost(email))) {
            motelRoomDTO.getMotelRoom().setDeleted(false);
            return findById(motelRoomRepository.save(motelRoomDTO.getMotelRoom()).getId(), email);
        }
        return null;
    }

    @Override
    public MotelRoomDTO update(MotelRoomDTO motelRoomDTO, String email) throws Exception {
        MotelRoomDTO roomDTO = insert(motelRoomDTO, email);
        List<RoomConvenientKey> roomConvenientKeys = roomDTO.getMotelRoom().getConvenientList().stream()
                .map(c -> {
                    if (motelRoomDTO.getMotelRoom().getConvenientList().stream()
                            .filter(cs -> cs.getId().equals(c.getId())).findFirst().orElse(null) == null)
                        return new RoomConvenientKey(roomDTO.getMotelRoom().getId(), c.getId());
                    else return null;
                }).collect(Collectors.toList());
        if (roomHasConvenientRepository.deleteCustomByListKey(roomConvenientKeys) > 0) {
            return findById(motelRoomRepository.save(roomDTO.getMotelRoom()).getId(), email);
        }
        return roomDTO;
    }

    @Override
    public boolean delete(Integer id, String email) throws Exception {
        return id != null && id > 0 && email != null
                && (AppConfig.checkAdmin(email) || (AppConfig.checkHost(email)
                && appUserRepository.findByEmailAndDeletedFalse(email).getId()
                .equals(motelRoomRepository.findByIdAndDeletedFalse(id).getHost().getId())))
                && motelRoomRepository.deleteCustom(id) > 0
                && roomHasConvenientRepository.deleteCustomByRoom(id) > 0
                && tenantRepository.deleteCustomByIdRoom(id) > 0
                && reportRepository.deleteCustomByRoom(id) > 0;
    }

    @Override
    public List<MotelRoomDTO> findAllByUser(Integer id, String email) throws Exception {
        if (id != null && id > 0) {
            List<MotelRoomDTO> rs_user = new ArrayList<>();
            List<Tenant> tenants = tenantRepository
                    .findAllByUserAndDeletedFalse(appUserRepository.findByIdAndDeletedFalse(id));
            for (Tenant t : tenants)
                rs_user.add(convert.toDTO(t.getRoom(), email));
            return rs_user.isEmpty() ? null : rs_user;
        }
        return null;
    }

    @Override
    public List<MotelRoomDTO> findAllByHost(Integer id, String email) throws Exception {
        if (id != null && id > 0) {
            List<MotelRoomDTO> rs = new ArrayList<>();
            List<MotelRoom> motelRooms = motelRoomRepository
                    .findAllByCreateByAndDeletedFalse(appUserRepository.findByIdAndDeletedFalse(id));
            for (MotelRoom room : motelRooms)
                rs.add(convert.toDTO(room, email));
            return rs.isEmpty() ? null : rs;
        }
        return null;
    }

    @Override
    public List<MotelRoomDTO> findRoomPage(Pageable pageable, String email) throws Exception {
        MotelRoom motelRoom = new MotelRoom();
        motelRoom.setDeleted(false);
        List<MotelRoom> motelRooms = motelRoomRepository.findAll(Example.of(motelRoom,
                ExampleMatcher.matchingAll().withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING)),
                pageable.getSort());
        return convert.toDTORoomNotFullToShowAll(motelRooms, pageable.getPageSize(), email);
    }
}
