package com.pma.ProjectManagementApp.services;

import com.pma.ProjectManagementApp.modules.Task;
import com.pma.ProjectManagementApp.repos.TaskRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service class that handles business logic related to tasks.
 */
@Service
public class TaskService {

    @Autowired
    private TaskRepo taskRepo;

    /**
     * Retrieves all tasks.
     *
     * @return List of all tasks
     */
    public List<Task> getTasks(){
        return taskRepo.findAll();
    }

    /**
     * Adds a new task.
     *
     * @param newTask Task object to be added
     */
    public void addTask(Task newTask) {
        taskRepo.save(newTask);
    }
}
