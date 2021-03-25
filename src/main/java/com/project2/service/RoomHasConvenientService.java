package com.project2.service;

import com.project2.entities.data.RoomHasConvenient;
import com.project2.entities.key.RoomConvenientKey;

import java.util.List;

public interface RoomHasConvenientService extends BaseService<RoomHasConvenient>{

    List<RoomHasConvenient> findAllByRoom(Integer id, String email) throws Exception;

    boolean deleteCustom(RoomConvenientKey roomConvenientKey, String email) throws Exception;
}
