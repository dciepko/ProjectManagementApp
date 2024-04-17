package com.pma.ProjectManagementApp.controllers;

import com.pma.ProjectManagementApp.modules.Activity;
import com.pma.ProjectManagementApp.services.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ActivityController {
    @Autowired
    private ActivityService service;

    @GetMapping("/activities")
    public List<Activity> getActivities(){
        return service.getActivity();
    }

    @DeleteMapping("/activities")
    public void deleteActivity(@RequestParam Integer id){
        service.deleteActivity(id);
    }
}