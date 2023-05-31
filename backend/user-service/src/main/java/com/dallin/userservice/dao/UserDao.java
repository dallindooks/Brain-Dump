package com.dallin.userservice.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.dallin.userservice.model.User;

public interface UserDao extends JpaRepository<User, Integer>{
    
    @Query("SELECT u FROM User u WHERE u.username = :username")
    public Optional<User> findUserByUsername(@Param("username")String username);

}
