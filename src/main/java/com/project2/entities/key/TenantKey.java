package com.project2.entities.key;

import java.io.Serializable;
import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TenantKey implements Serializable {

    @Column(name = "id_user")
    private Integer idUser;

    @Column(name = "id_room")
    private Integer idRoom;

}