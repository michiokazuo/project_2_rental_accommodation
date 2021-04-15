package com.project2.service_impl;

import com.project2.config.AppConfig;
import com.project2.convert.Convert;
import com.project2.entities.data.AppUser;
import com.project2.entities.data.MotelRoom;
import com.project2.entities.data.Tenant;
import com.project2.entities.dto.AdminDTO;
import com.project2.entities.dto.HostDTO;
import com.project2.entities.dto.MotelRoomDTO;
import com.project2.entities.dto.UserDTO;
import com.project2.repository.MotelRoomRepository;
import com.project2.repository.TenantRepository;
import com.project2.service.AdminService;
import com.project2.service.AppUserService;
import com.project2.service.MotelRoomService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class AdminService_Impl implements AdminService {

    private final AppConfig appConfig;

    private final AppUserService appUserService;

    private final MotelRoomRepository motelRoomRepository;

    private final TenantRepository tenantRepository;

    private final Convert<MotelRoom, MotelRoomDTO> convert;

    @Override
    public AdminDTO findAll(String email) throws Exception {
        if (email != null && appConfig.checkAdmin(email)) {
            List<MotelRoomDTO> adminRoom = new ArrayList<>();
            List<MotelRoom> motelRooms = motelRoomRepository.findAllByDeletedFalse();
            if (motelRooms != null && !motelRooms.isEmpty())
                for (MotelRoom room : motelRooms)
                    adminRoom.add(convert.toDTO(room, email));

            List<UserDTO> userDTOS = new ArrayList<>();
            List<AppUser> userList = appUserService.findAllUserByAdmin(email,
                    AppConfig.roles.get(AppConfig.USER).getId());
            if (userList != null && !userList.isEmpty())
                for (AppUser u : userList)
                    if (u != null)
                        userDTOS.add(UserDTO.builder().user(u)
                                .rented(Math.toIntExact(tenantRepository.count(Example.of(Tenant.builder()
                                        .user(u).build()))))
                                .build());

            List<HostDTO> hostDTOS = new ArrayList<>();
            List<AppUser> hostList = appUserService.findAllUserByAdmin(email,
                    AppConfig.roles.get(AppConfig.HOST).getId());
            if (userList != null && !userList.isEmpty())
                for (AppUser u : hostList)
                    if (u != null)
                        hostDTOS.add(HostDTO.builder().host(u)
                                .owned(Math.toIntExact(motelRoomRepository.count(Example.of(MotelRoom.builder()
                                        .host(u).build()))))
                                .build());

            return AdminDTO.builder()
                    .userList(userDTOS)
                    .hostList(hostDTOS)
                    .motelRoomDTOS(adminRoom)
                    .hostHasRoom(motelRoomRepository.hostHasRoom().size())
                    .roomHasReq(tenantRepository.roomHasReq().size())
                    .userRentRoom(tenantRepository.userRentRoom().size())
                    .build();
        }
        return null;
    }
}
