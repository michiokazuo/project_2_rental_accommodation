package com.project2.service;

import com.project2.entities.data.Tenant;
import com.project2.entities.key.TenantKey;

import java.util.List;

public interface TenantService extends BaseService<Tenant>{

    List<Tenant> findAllByIdRoom(Integer roomId, String email) throws Exception;

    List<Tenant> findAllByIdUser(Integer userId, String email) throws Exception;

    List<Tenant> findAllByIdHost(Integer hostId, String email) throws Exception;

    List<Tenant> findAllReqByIdHost(Integer hostId, String email) throws Exception;

    boolean deleteCustom(TenantKey tenantKey, String email) throws Exception;

}
