package com.project2.service;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface BaseService<T> {

    List<T> findAll(String email) throws Exception;

    T findById(Integer id, String email) throws Exception;

    List<T> search_sort(T t, String field, Boolean isASC, String email) throws Exception;

    @Modifying
    @Transactional(rollbackFor = Exception.class)
    T insert(T t, String email) throws Exception;

    @Modifying
    @Transactional(rollbackFor = Exception.class)
    T update(T t, String email) throws Exception;

    @Modifying
    @Transactional(rollbackFor = Exception.class)
    boolean delete(Integer id, String email) throws Exception;

}
