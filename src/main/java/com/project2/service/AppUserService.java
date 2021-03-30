package com.project2.service;

import com.project2.entities.data.AppUser;

import java.util.List;

public interface AppUserService extends BaseService<AppUser>{

    List<AppUser> findAllUserByAdmin(String email, Integer roleId) throws Exception;

//    List<AppUser> findAllUserByHost(String email) throws Exception;

    AppUser updatePassword(String email, String password) throws Exception;
}
