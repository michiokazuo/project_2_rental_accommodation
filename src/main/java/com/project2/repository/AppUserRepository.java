package com.project2.repository;

import com.project2.entities.data.AppUser;
import com.project2.entities.data.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface AppUserRepository extends JpaRepository<AppUser, Integer>, JpaSpecificationExecutor<AppUser> {

    List<AppUser> findAllByDeletedFalse();

    List<AppUser> findAllByDeletedFalseAndRoleNotLike(Role role);

    AppUser findByIdAndDeletedFalse(Integer idUser);

    AppUser findByEmailAndDeletedFalse(String email);

    List<AppUser> findAllByDeletedFalseAndRole_Id(Integer roleId);

    @Query("update AppUser e set e.deleted = true where e.id = ?1")
    @Modifying
    @Transactional
    int deleteCustom(Integer id);

}