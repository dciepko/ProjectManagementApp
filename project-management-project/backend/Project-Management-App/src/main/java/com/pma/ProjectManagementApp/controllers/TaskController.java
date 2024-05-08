package com.pma.ProjectManagementApp.controllers;

import com.pma.ProjectManagementApp.modules.Project;
import com.pma.ProjectManagementApp.modules.Task;
import com.pma.ProjectManagementApp.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TaskController {
    @Autowired
    private TaskService service;
    @GetMapping("/tasks")
    public List<Task> getTasks(){
        return service.getTasks();
    }

    @PostMapping("/tasks")
    public void addTask(@RequestBody Task task){
        service.addTask(task);
    }
}
