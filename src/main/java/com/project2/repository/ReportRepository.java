package com.project2.repository;

import com.project2.entities.data.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ReportRepository extends JpaRepository<Report, Integer>, JpaSpecificationExecutor<Report> {

    List<Report> findAllByDeletedFalse();

    Report findByIdCmtAndDeletedIsFalse(Integer id);

    @Query("select r from Report r where r.deleted = true and r.room.id = ?1")
    List<Report> findAllByIdRoom(Integer roomId);

    @Query("update Report e set e.deleted = true where e.idCmt = ?1")
    @Modifying
    @Transactional
    int deleteCustom(Integer idCmt);

    @Query("update Report e set e.deleted = true where e.room.id = ?1")
    @Modifying
    @Transactional
    int deleteCustomByRoom(Integer idRoom);

    @Query("update Report e set e.deleted = true where e.user.id = ?1")
    @Modifying
    @Transactional
    int deleteCustomByUser(Integer idUser);

    @Query("update Report e set e.rate = ?3 where e.user.id = ?1 and e.room.id = ?2")
    @Modifying
    @Transactional
    int updateStatus(Integer id_user, Integer id_room, Integer status);

}