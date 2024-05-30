package com.pma.ProjectManagementApp.services;

import com.pma.ProjectManagementApp.modules.StatusTable;
import com.pma.ProjectManagementApp.repos.StatusTableRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StatusTableService {
    @Autowired
    StatusTableRepo repo;

    public void editStatusTable(Integer id, StatusTable newStatusTable) {
        StatusTable editedStatusTable = repo.findById(id).get();
        if(editedStatusTable!=null) {
            editedStatusTable.setTableName(newStatusTable.getTableName());
            editedStatusTable.setTableColor(newStatusTable.getTableColor());
            repo.save(editedStatusTable);
        }
    }

    public void deleteUser(Integer id) {
        repo.deleteById(id);
    }
}
