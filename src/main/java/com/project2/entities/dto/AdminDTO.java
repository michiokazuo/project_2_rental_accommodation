package com.project2.entities.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminDTO {

    private List<UserDTO> userList;
    private List<HostDTO> hostList;
    private List<MotelRoomDTO> motelRoomDTOS;
    private Integer hostHasRoom;
    private Integer roomHasReq;
    private Integer userRentRoom;

}


