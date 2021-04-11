package com.project2.repository;

import com.project2.entities.data.Convenient;
import com.project2.entities.data.MotelRoom;
import com.project2.entities.data.RoomHasConvenient;
import com.project2.entities.key.RoomConvenientKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface RoomHasConvenientRepository extends JpaRepository<RoomHasConvenient, RoomConvenientKey>
        , JpaSpecificationExecutor<RoomHasConvenient> {

    List<RoomHasConvenient> findAllByDeletedFalse();

    List<RoomHasConvenient> findByRoomAndDeletedFalse(MotelRoom room);

    List<RoomHasConvenient> findByRoom(MotelRoom room);

    List<RoomHasConvenient> findByConvenientInAndDeletedFalse(List<Convenient> convenientList);

    @Query("update RoomHasConvenient e set e.deleted = true where e.id.idRoom = ?1")
    @Modifying
    @Transactional
    int deleteCustomByRoom(Integer id);

    @Query("update RoomHasConvenient e set e.deleted = true where e.id.idRoom = ?1 and e.id.idConvenient = ?2")
    @Modifying
    @Transactional
    int deleteCustom(Integer idRoom, Integer idConvenient);

    @Query("update RoomHasConvenient e set e.deleted = true where e.id = ?1")
    @Modifying
    @Transactional
    int deleteCustomByKey(RoomConvenientKey roomConvenientKey);

    @Query("update RoomHasConvenient e set e.deleted = true where e.id in ?1")
    @Modifying
    @Transactional
    int deleteCustomByListKey(List<RoomConvenientKey> roomConvenientKey);

}