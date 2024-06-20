package com.pma.ProjectManagementApp.repos;

import com.pma.ProjectManagementApp.modules.Project;
import com.pma.ProjectManagementApp.modules.Workspace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkspaceRepo extends JpaRepository<Workspace, Integer> {
    void deleteByWsProject(Project project);
}