package com.dallin.brainstormservice.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dallin.brainstormservice.model.BrainStorm;
import com.dallin.brainstormservice.model.Idea;

public interface IdeaDAO extends JpaRepository<Idea, Integer>{
    public List<Idea> getAllIdeasByBrainStorm(BrainStorm brainStorm);
}
