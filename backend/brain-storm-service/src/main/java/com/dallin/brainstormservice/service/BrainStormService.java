package com.dallin.brainstormservice.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dallin.brainstormservice.dao.BrainStormDao;
import com.dallin.brainstormservice.dao.IdeaDAO;
import com.dallin.brainstormservice.model.BrainStorm;
import com.dallin.brainstormservice.model.Idea;

@Service
public class BrainStormService {

    private final BrainStormDao brainStormDao;
    private final IdeaDAO ideaDAO;

    @Autowired
    public BrainStormService(BrainStormDao brainStormDao, IdeaDAO ideaDAO) {
        this.brainStormDao = brainStormDao;
        this.ideaDAO = ideaDAO;
    }

    public BrainStorm addBrainStorm(BrainStorm brainStorm) {
        return brainStormDao.save(brainStorm);
    }

    public BrainStorm updateBrainStorm(BrainStorm brainStorm) {
        BrainStorm updatedBrainStorm = findBrainStormById(brainStorm.getId());
        updatedBrainStorm = brainStorm;
        return brainStormDao.save(updatedBrainStorm);
    }

    public void deleteBrainStorm (BrainStorm brainStorm) {
        brainStormDao.delete(brainStorm);
    }

    public BrainStorm findBrainStormById(Integer Id) {
        return brainStormDao.findById(Id).get();
    }

    public List<BrainStorm> getAllBrainStormsByUserId(Integer userId) {
        return brainStormDao.getAllBrainStormsByUserId(userId);
    }

    public Idea addIdea(Idea idea) {
        return ideaDAO.save(idea);
    }

    public void deleteIdea(Idea idea) {
        ideaDAO.delete(idea);
    }


    public List<Idea> getAllIdeasByBrainStorm(Integer brainStormId) {
        BrainStorm brainStorm = findBrainStormById(brainStormId);
        return ideaDAO.getAllIdeasByBrainStorm(brainStorm);
    }

    public Idea updateIdea(Idea idea) {
        Idea updateIdea = ideaDAO.findById(idea.getId()).get();
        BrainStorm updateIdeaBrainStorm = updateIdea.getBrainStorm();
        updateIdea = idea;
        updateIdea.setBrainStorm(updateIdeaBrainStorm);
        return ideaDAO.save(updateIdea);
    }
    
}
