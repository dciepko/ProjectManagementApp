package com.pma.ProjectManagementApp.controllers;

import com.pma.ProjectManagementApp.models.ActivityDto;
import com.pma.ProjectManagementApp.modules.Activity;
import com.pma.ProjectManagementApp.services.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller class for handling HTTP requests related to activities.
 */
@RestController
public class ActivityController {
    @Autowired
    private ActivityService service;

    /**
     * Endpoint to retrieve all activities.
     *
     * @return List of ActivityDto objects representing activities
     */
    @GetMapping("/activities")
    public List<ActivityDto> getActivities(){
        return service.getActivity();
    }

    /**
     * Endpoint to delete an activity by its ID.
     *
     * @param id ID of the activity to delete
     */
    @DeleteMapping("/activities")
    public void deleteActivity(@RequestParam Integer id){
        service.deleteActivityById(id);
    }

    /**
     * Endpoint to add a new activity.
     *
     * @param activityDto ActivityDto object containing activity details
     * @return Activity object representing the added activity
     */
    @PostMapping("/activities")
    public Activity addActivity(@RequestBody ActivityDto activityDto){
        return service.addActivity(activityDto);
    }

    /**
     * Endpoint to retrieve activities by project ID.
     *
     * @param projectId ID of the project to fetch activities for
     * @return List of ActivityDto objects representing activities of the specified project
     */
    @GetMapping("/activities/{projectId}")
    public List<ActivityDto> getTasksByProjectId(@PathVariable Integer projectId) {
        return service.getActivityById(projectId);
    }

    /**
     * Endpoint to update an activity.
     *
     * @param activityId ID of the activity to update
     * @param activityDto Updated ActivityDto object containing new activity details
     * @return ActivityDto object representing the updated activity
     */
    @PutMapping("/activities/{activityId}")
    public ActivityDto updateActivity(@PathVariable Integer activityId, @RequestBody ActivityDto activityDto) {
        return service.updateActivity(activityId, activityDto);
    }
}
