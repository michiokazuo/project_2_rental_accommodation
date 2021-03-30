package com.project2.entities.data;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "create_by")
    @CreatedBy
    private AppUser createBy;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "modify_by")
    @LastModifiedBy
    private AppUser modifyBy;

    @Column(name = "deleted")
    private Boolean deleted;
}
