package com.dallin.brainstormservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dallin.brainstormservice.model.BrainStorm;
import com.dallin.brainstormservice.model.Idea;
import com.dallin.brainstormservice.service.BrainStormService;

@RestController
@RequestMapping("/brain-storm")
public class BrainStormController {

    @Autowired
    private BrainStormService brainStormService;

    @PostMapping("/add")
    public ResponseEntity<BrainStorm> createBrainStorm(@RequestBody BrainStorm brainStorm) {
        brainStormService.addBrainStorm(brainStorm);
        return ResponseEntity.status(HttpStatus.CREATED)
                .header("Location", "brain-storm/" + brainStorm.getId())
                .body(brainStorm);
        
    }

    @PutMapping("/update")
    public ResponseEntity<BrainStorm> updateBrainStorm(@RequestBody BrainStorm brainStorm) {
        brainStormService.updateBrainStorm(brainStorm);
        return ResponseEntity.status(HttpStatus.OK)
                .header("Location", "brain-storm/" + brainStorm.getId())
                .body(brainStorm);
    }   

    @GetMapping("/all/{userId}")
    public ResponseEntity<List<BrainStorm>> getAllBrainStormsForUser(@PathVariable Integer userId) {
        List<BrainStorm> brainStormList = brainStormService.getAllBrainStormsByUserId(userId);
        return ResponseEntity.status(HttpStatus.OK)
                .body(brainStormList);
    }
    
    @DeleteMapping("/delete/{brainStormId}")
    public ResponseEntity<Void> deleteBrainStorm(@PathVariable Integer brainStormId) {
        BrainStorm deleteBrainStorm = brainStormService.findBrainStormById(brainStormId);
        brainStormService.deleteBrainStorm(deleteBrainStorm);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/idea/add-idea/{brainStormId}")
    public ResponseEntity<Idea> createIdea(@RequestBody Idea idea, @PathVariable Integer brainStormId) {
        idea.setBrainStorm(brainStormService.findBrainStormById(brainStormId));
        brainStormService.addIdea(idea);
        return ResponseEntity.status(HttpStatus.CREATED)
                .header("Location", "brain-storm/ideas/" + idea.getId())
                .body(idea);
        
    }

    @DeleteMapping("/idea/delete")
    public ResponseEntity<Void> deleteIdea(@RequestBody Idea idea) {
        brainStormService.deleteIdea(idea);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/idea/all/{brainStormId}")
    public ResponseEntity<List<Idea>> getAllIdeasByBrainStorm(@PathVariable Integer brainStormId) {
        List<Idea> ideas = brainStormService.getAllIdeasByBrainStorm(brainStormId);
        return ResponseEntity.status(HttpStatus.OK)
                .body(ideas);
    }

    @PutMapping("/idea/update")
    public ResponseEntity<Idea> updateIdea(@RequestBody Idea idea) {
        brainStormService.updateIdea(idea);
        return ResponseEntity.status(HttpStatus.OK)
                .header("Location", "brain-storm/" + idea.getId())
                .body(idea);
    }   
}
