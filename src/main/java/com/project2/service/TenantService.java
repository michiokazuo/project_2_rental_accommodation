package com.project2.service;

import com.project2.entities.data.Tenant;
import com.project2.entities.key.TenantKey;

import java.util.List;

public interface TenantService extends BaseService<Tenant>{

    List<Tenant> findAllByIdRoom(Integer roomId) throws Exception;

    boolean deleteCustom(TenantKey tenantKey, String email) throws Exception;

}
