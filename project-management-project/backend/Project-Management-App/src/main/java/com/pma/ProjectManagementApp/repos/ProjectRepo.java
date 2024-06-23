package com.pma.ProjectManagementApp.repos;

import com.pma.ProjectManagementApp.modules.Activity;
import com.pma.ProjectManagementApp.modules.Project;
import com.pma.ProjectManagementApp.modules.StatusTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepo extends JpaRepository<Project, Integer> {
    List<Project> findByWorkspaceWorkspaceID(Integer id);

//    @Query(value = "SELECT * FROM projects WHERE workspace_id = :workspaceId", nativeQuery = true)
//    List<Project> findByWorkspaceWorkspaceID(@Param("workspaceId") Integer workspaceId);

//    @Query(value = "SELECT * FROM project WHERE project_id = :projectId", nativeQuery = true)
//    List<Project> getProjectById(@Param("projectId") Integer projectId);
//
//    @Query("SELECT p FROM Project p WHERE p.project_id = :projectId")
//    List<Project> getProjectByIdJpql(@Param("projectId") Integer projectId);
    Project findByProjectID(Integer id);
}