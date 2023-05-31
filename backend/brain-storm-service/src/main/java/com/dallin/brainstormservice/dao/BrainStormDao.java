package com.dallin.brainstormservice.dao;

import com.dallin.brainstormservice.model.BrainStorm;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BrainStormDao extends JpaRepository<BrainStorm, Integer>{
    public List<BrainStorm> getAllBrainStormsByUserId(Integer userId);
}
