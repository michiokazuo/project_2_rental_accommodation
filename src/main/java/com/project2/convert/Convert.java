package com.project2.convert;

import java.util.List;

public interface Convert<Main, DTO> {
    DTO toDTO(Main main, String email) throws Exception;

    List<DTO> toDTORoomNotFullToShowAll(List<Main> main, Integer sizePages , String email) throws Exception;
}
