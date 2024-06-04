package com.pma.ProjectManagementApp.services;

import com.pma.ProjectManagementApp.modules.Workspace;
import com.pma.ProjectManagementApp.repos.WorkspaceRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkspaceService {
    @Autowired
    private WorkspaceRepo repo;

    public List<Workspace> getWorkspaces() {
        return repo.findAll();
    }
}
