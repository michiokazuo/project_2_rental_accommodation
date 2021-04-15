package com.project2.repository;

import com.project2.entities.data.AppUser;
import com.project2.entities.data.MotelRoom;
import com.project2.entities.data.Tenant;
import com.project2.entities.key.TenantKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface TenantRepository extends JpaRepository<Tenant, TenantKey>, JpaSpecificationExecutor<Tenant> {

    List<Tenant> findAllByDeletedFalse();

    List<Tenant> findAllByRoomAndDeletedFalse(MotelRoom room);

    List<Tenant> findAllByRoomAndDeletedFalseAndStatusFalse(MotelRoom room);

    List<Tenant> findAllByUserAndDeletedFalse(AppUser appUser);

    Tenant findByIdAndDeletedFalse(TenantKey tenantKey);

    Boolean existsByIdAndDeletedFalse(TenantKey tenantKey);

    @Query("select distinct e.user.id from Tenant e where e.deleted = false")
    @Modifying
    @Transactional
    List<Integer> userRentRoom();

    @Query("select distinct e.room.id from Tenant e where e.deleted = false")
    @Modifying
    @Transactional
    List<Integer> roomHasReq();

    @Query("select t FROM Tenant t where t.deleted = false and t.room.host.id = ?1 and t.status = true")
    @Modifying
    @Transactional
    List<Tenant> findAllByIdHostRented(Integer id);

    @Query("select t FROM Tenant t where t.deleted = false and t.room.host.id = ?1 and t.status = false")
    List<Tenant> findAllReqByIdHost(Integer id);

    @Query("update Tenant t set t.deleted = true where t.id.idRoom = ?1 and t.id.idUser = ?2")
    @Modifying
    @Transactional
    int deleteCustom(Integer idRoom, Integer idUser);

    @Query("update Tenant t set t.deleted = true where t.id.idUser = ?1")
    @Modifying
    @Transactional
    int deleteCustomByIdUser(Integer idUser);

    @Query("update Tenant t set t.deleted = true where t.id.idRoom = ?1")
    @Modifying
    @Transactional
    int deleteCustomByIdRoom(Integer idRoom);

    @Query("update Tenant e set e.deleted = true where e.id = ?1")
    @Modifying
    @Transactional
    int deleteCustomByKey(TenantKey tenantKey);

    @Query("update Tenant e set e.deleted = true where e.id in ?1")
    @Modifying
    @Transactional
    int deleteCustomByListKey(List<TenantKey> tenantKeys);
}