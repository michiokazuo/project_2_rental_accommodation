package com.project2.entities.data;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class Base {

    @Column(name = "create_date")
    @CreatedDate
    private Timestamp createDate;

    @Column(name = "modify_date")
    @LastModifiedDate
    private Timestamp modifyDate;

    @Column(name = "create_by")
    @CreatedBy
    private String createBy;

    @Column(name = "modify_by")
    @LastModifiedBy
    private String modifyBy;

    @Column(name = "deleted")
    private Boolean deleted = false;
}
