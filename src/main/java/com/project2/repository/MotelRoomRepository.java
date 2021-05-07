package com.project2.repository;

import com.project2.entities.data.AppUser;
import com.project2.entities.data.MotelRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface MotelRoomRepository extends JpaRepository<MotelRoom, Integer>, JpaSpecificationExecutor<MotelRoom> {

    List<MotelRoom> findAllByDeletedFalse();

    MotelRoom findByIdAndDeletedFalse(Integer id);

    List<MotelRoom> findAllByHostAndDeletedFalse(AppUser appUser);

    @Query("update MotelRoom e set e.deleted = true where e.id = ?1")
    @Modifying
    @Transactional
    int deleteCustom(Integer id);

    @Query("update MotelRoom e set e.deleted = true where e.host.id = ?1")
    @Modifying
    @Transactional
    int deleteCustomByHost(Integer id);

    @Query("select distinct e.host.id from MotelRoom e where e.deleted = false")
    @Modifying
    @Transactional
    List<Integer> hostHasRoom();

    @Query("update MotelRoom e set e.category.id = 0 where e.category.id = ?1")
    @Modifying
    @Transactional
    int updateByCategory(Integer id);

}