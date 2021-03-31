package com.project2.service;

import com.project2.entities.dto.MotelRoomDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface MotelRoomService extends BaseService<MotelRoomDTO> {

    List<MotelRoomDTO> findAllByUser(Integer id, String email) throws Exception;

    List<MotelRoomDTO> findAllByHost(Integer id, String email) throws Exception;

    List<MotelRoomDTO> findRoomPage(Pageable pageable, String email) throws Exception;
}
