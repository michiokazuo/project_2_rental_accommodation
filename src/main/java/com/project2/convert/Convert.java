package com.project2.convert;

import java.util.List;

public interface Convert<Main, DTO> {
    DTO toDTO(Main main, String email) throws Exception;

    List<DTO> toDTOToShowAll(List<Main> main, Integer sizePages , boolean isNotFull, String email) throws Exception;
}
