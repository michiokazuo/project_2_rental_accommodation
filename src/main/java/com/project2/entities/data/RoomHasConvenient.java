package com.project2.entities.data;

import com.project2.entities.key.RoomConvenientKey;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "room_has_convenient")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomHasConvenient extends Base {

    @EmbeddedId
    private RoomConvenientKey id;
    /**
     * FK_ROOM
     */
    @ManyToOne
    @MapsId("idRoom")
    @JoinColumn(name = "id_room")
    private MotelRoom room;

    /**
     * FK_CONVENIENT
     */
    @ManyToOne
    @MapsId("idConvenient")
    @JoinColumn(name = "id_convenient")
    private Convenient convenient;

}
