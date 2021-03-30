package com.project2.entities.dto;

import com.project2.entities.data.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MotelRoomDTO {

    private MotelRoom motelRoom;
    private List<Tenant> tenantList;
    private Integer personAsk;
    private Integer personIn;
    private List<Report> reportList;
    private Integer countReport;
    private Integer countRated;
    private Float ratings;

}
