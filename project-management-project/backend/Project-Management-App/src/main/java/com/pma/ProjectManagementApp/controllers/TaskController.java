package com.pma.ProjectManagementApp.controllers;

import com.pma.ProjectManagementApp.modules.Task;
import com.pma.ProjectManagementApp.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller class for handling Task related HTTP requests.
 */
@RestController
public class TaskController {
    @Autowired
    private TaskService service;

    /**
     * Retrieves all tasks.
     *
     * @return List of all Task objects.
     */
    @GetMapping("/tasks")
    public List<Task> getTasks() {
        return service.getTasks();
    }

    /**
     * Adds a new task.
     *
     * @param task Task object containing details of the new task.
     */
    @PostMapping("/tasks")
    public void addTask(@RequestBody Task task) {
        service.addTask(task);
    }
}
