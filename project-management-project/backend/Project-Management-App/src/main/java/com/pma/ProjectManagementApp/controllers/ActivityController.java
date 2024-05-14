package com.pma.ProjectManagementApp.controllers;

import com.pma.ProjectManagementApp.models.ActivityDto;
import com.pma.ProjectManagementApp.modules.Activity;
import com.pma.ProjectManagementApp.services.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ActivityController {
    @Autowired
    private ActivityService service;

    @GetMapping("/activities")
    public List<ActivityDto> getActivities(){
        return service.getActivity();
    }

    @DeleteMapping("/activities")
    public void deleteActivity(@RequestParam Integer id){
        service.deleteActivity(id);
    }
    @PostMapping("/")

    @GetMapping("/activities/{projectId}")
    public List<ActivityDto> getTasksByProjectId(@PathVariable Integer projectId) {
        return service.getActivityById(projectId);
    }
}