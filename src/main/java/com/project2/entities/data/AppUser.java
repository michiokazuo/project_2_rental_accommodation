package com.project2.entities.data;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "user")
@NoArgsConstructor
@AllArgsConstructor
public class AppUser extends Base {

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "phone", nullable = false)
    private String phone;

    @ManyToOne
    @JoinColumn(name = "role", referencedColumnName = "id", columnDefinition = "default 1")
    private Role role;

    @Column(name = "avatar", nullable = false)
    private String avatar;

    @Column(name = "job", nullable = false)
    private String job;

    @Column(name = "gender", nullable = false)
    private String gender;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "workplace", nullable = false)
    private String workplace;

    @Column(name = "birthday", nullable = false)
    private Date birthday;

    @Column(name = "home_town", nullable = false)
    private String homeTown;

}
