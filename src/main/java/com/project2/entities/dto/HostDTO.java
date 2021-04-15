package com.project2.entities.dto;

import com.project2.entities.data.AppUser;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HostDTO {
    private AppUser host;
    private Integer owned;
}
