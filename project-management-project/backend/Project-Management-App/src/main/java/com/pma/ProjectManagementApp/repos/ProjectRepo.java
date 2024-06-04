package com.pma.ProjectManagementApp.repos;

import com.pma.ProjectManagementApp.modules.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepo extends JpaRepository<Project, Integer> {
    List<Project> findByWorkspaceWorkspaceID(Integer id);

}
