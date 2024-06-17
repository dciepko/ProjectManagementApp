package com.pma.ProjectManagementApp.services;

import com.pma.ProjectManagementApp.modules.Project;
import com.pma.ProjectManagementApp.modules.StatusTable;
import com.pma.ProjectManagementApp.repos.ActivityRepo;
import com.pma.ProjectManagementApp.repos.ProjectRepo;
import com.pma.ProjectManagementApp.repos.StatusTableRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StatusTableService {
    @Autowired
    StatusTableRepo repo;
    @Autowired
    ProjectRepo projectRepo;
    @Autowired
    ActivityRepo activityRepo;

    public void editStatusTable(Integer id, StatusTable newStatusTable) {
        StatusTable editedStatusTable = repo.findById(id).get();
        if(editedStatusTable!=null) {
            editedStatusTable.setTableName(newStatusTable.getTableName());
            editedStatusTable.setTableColor(newStatusTable.getTableColor());
            repo.save(editedStatusTable);
        }
    }

    public void deleteStatusTableById(Integer tableID) {
        StatusTable statusTable = repo.findById(tableID).orElseThrow(() -> new IllegalArgumentException("StatusTable with ID " + tableID + " does not exist"));

        activityRepo.deleteByTableA(statusTable);  // usuwam aktywnosci bo nie beda potrzebne jak nie ma boarda do ktorego byly przypisane

        Project project = statusTable.getProject();  // nie usuwam projektu ale biore z jego listy tablic te konkretna tablice i ja usuwam
        if (project != null) {
            project.getTables().remove(statusTable);
            projectRepo.save(project);
        }

        repo.deleteById(tableID);
    }

    public void deleteUser(Integer id) {
        repo.deleteById(id);
    }
}
