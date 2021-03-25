package com.project2.entities.dto;

import com.project2.entities.data.AppUser;
import com.project2.entities.data.MotelRoom;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {

    private AppUser user;
    private List<MotelRoom> motelRoomList;

}
