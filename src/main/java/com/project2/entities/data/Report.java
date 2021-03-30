package com.project2.entities.data;

import lombok.*;

import javax.persistence.*;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "report")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Report extends Base {

    @Id
    @Column(name = "id_cmt", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idCmt;

    /**
     * FK_USER
     */
    @ManyToOne
    @JoinColumn(name = "id_user")
    private AppUser user;

    /**
     * FK_ROOM
     */
    @ManyToOne
    @JoinColumn(name = "id_room")
    private MotelRoom room;

    @Column(name = "rate", nullable = false)
    private Integer rate;

    @Column(name = "comment", nullable = false)
    private String comment;

}
