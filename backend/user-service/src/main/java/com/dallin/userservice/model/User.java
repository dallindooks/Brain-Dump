package com.dallin.userservice.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "\"User\"")
public class User{
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer Id;

    private String firstName;

    private String lastName;

    @Column(unique = true)
    private String username;

    private String email;

    private String password;

}
