package com.pma.ProjectManagementApp.services;

import com.pma.ProjectManagementApp.modules.Activity;
import com.pma.ProjectManagementApp.modules.Project;
import com.pma.ProjectManagementApp.modules.StatusTable;
import com.pma.ProjectManagementApp.repos.ActivityRepo;
import com.pma.ProjectManagementApp.repos.ProjectRepo;
import com.pma.ProjectManagementApp.repos.StatusTableRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Service class that handles business logic related to status tables.
 */
@Service
public class StatusTableService {

    @Autowired
    StatusTableRepo repo;

    @Autowired
    ProjectRepo projectRepo;

    @Autowired
    ActivityService activityService;

    /**
     * Edits an existing status table.
     *
     * @param id ID of the status table to be edited
     * @param newStatusTable Updated StatusTable object
     */
    public void editStatusTable(Integer id, StatusTable newStatusTable) {
        StatusTable editedStatusTable = repo.findById(id).get();
        if(editedStatusTable != null) {
            editedStatusTable.setTableName(newStatusTable.getTableName());
            editedStatusTable.setTableColor(newStatusTable.getTableColor());
            repo.save(editedStatusTable);
        }
    }

    /**
     * Deletes a status table by its ID, handling associated activities and updating project.
     *
     * @param tableID ID of the status table to be deleted
     */
    @Transactional
    public void deleteStatusTableById(Integer tableID) {
        StatusTable statusTable = repo.findById(tableID).orElseThrow(() -> new IllegalArgumentException("StatusTable with ID " + tableID + " does not exist"));

        List<Activity> activities = statusTable.getActivitiesTab();

        if (activities != null && !activities.isEmpty()) {
            List<Activity> activitiesCopy = new ArrayList<>(activities);
            for (Activity activity : activitiesCopy) {
                activityService.deleteActivityById(activity.getActivityID());
            }
        }

        Project project = statusTable.getProject();
        if (project != null){
            project.getTables().remove(statusTable);
            projectRepo.save(project);
        }

        repo.deleteById(tableID);
    }

    /**
     * Deletes a status table by its ID.
     *
     * @param id ID of the status table to be deleted
     */
    public void deleteUser(Integer id) {
        repo.deleteById(id);
    }
}
