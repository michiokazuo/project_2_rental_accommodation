package com.project2.repository;

import com.project2.entities.data.Convenient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ConvenientRepository extends JpaRepository<Convenient, Integer>, JpaSpecificationExecutor<Convenient> {

    List<Convenient> findAllByDeletedFalse();

    Convenient findByIdAndDeletedFalse(Integer id);

    List<Convenient> findByIdInAndDeletedFalse(List<Integer> ids);

    @Query("update Convenient e set e.deleted = true where e.id = ?1")
    @Modifying
    @Transactional
    int deleteCustom(Integer id);

}