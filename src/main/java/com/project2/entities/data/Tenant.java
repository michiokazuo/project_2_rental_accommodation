package com.project2.entities.data;

import com.project2.entities.key.TenantKey;
import lombok.*;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "tenant")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Tenant extends Base {

    @EmbeddedId
    private TenantKey id;

    /**
     * FK_USER
     */
    @ManyToOne
    @MapsId("idUser")
    @JoinColumn(name = "id_user")
    private AppUser user;

    /**
     * FK_ROOM
     */
    @ManyToOne
    @MapsId("idRoom")
    @JoinColumn(name = "id_room")
    private MotelRoom room;

    /**
     * sign to rent
     */
    @Column(name = "status", nullable = false)
    private Boolean status;

}
