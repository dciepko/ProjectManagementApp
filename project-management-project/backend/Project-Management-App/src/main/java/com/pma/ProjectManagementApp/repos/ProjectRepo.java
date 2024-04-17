package com.pma.ProjectManagementApp.repos;

import com.pma.ProjectManagementApp.modules.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepo extends JpaRepository<Project, Integer> {
}
