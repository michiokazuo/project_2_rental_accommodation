package com.project2.service;

import com.project2.entities.dto.MotelRoomDTO;

import java.util.List;

public interface MotelRoomService extends BaseService<MotelRoomDTO>{

    List<MotelRoomDTO> findAllByUser(Integer id, String email) throws Exception;

    List<MotelRoomDTO> findAllByHost(Integer id, String email) throws Exception;
}
