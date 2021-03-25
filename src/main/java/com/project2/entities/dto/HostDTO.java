package com.project2.entities.dto;

import com.project2.entities.data.AppUser;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HostDTO {

    private AppUser host;
    List<MotelRoomDTO> motelRoomDTOList;

}
