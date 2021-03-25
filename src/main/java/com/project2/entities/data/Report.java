package com.project2.entities.data;

import com.project2.entities.key.ReportKey;
import lombok.*;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "report")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Report extends Base {

    @EmbeddedId
    private ReportKey id;

    @Id
    @Column(name = "id_cmt", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idCmt;

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

    @Column(name = "rate", nullable = false)
    private Integer rate;

    @Column(name = "comment", nullable = false)
    private String comment;

}
