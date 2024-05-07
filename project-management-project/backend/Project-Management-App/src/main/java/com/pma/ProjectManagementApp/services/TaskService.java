package com.pma.ProjectManagementApp.services;

import com.pma.ProjectManagementApp.modules.Task;
import com.pma.ProjectManagementApp.modules.User;
import com.pma.ProjectManagementApp.repos.TaskRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    @Autowired
    private TaskRepo taskRepo;
    public List<Task> getTasks(){
        return taskRepo.findAll();
    }

    public void addTask(Task newTask) {
        taskRepo.save(newTask);
    }
}
