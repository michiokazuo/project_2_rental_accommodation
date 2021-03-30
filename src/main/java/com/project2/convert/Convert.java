package com.project2.convert;

public interface Convert<Main, DTO> {
    DTO toDTO(Main main, String email) throws Exception;
}
