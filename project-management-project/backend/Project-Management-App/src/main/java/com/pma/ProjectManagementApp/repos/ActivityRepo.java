package com.pma.ProjectManagementApp.repos;

import com.pma.ProjectManagementApp.modules.Activity;
import com.pma.ProjectManagementApp.modules.Project;
import com.pma.ProjectManagementApp.modules.StatusTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActivityRepo extends JpaRepository<Activity, Integer> {
    List<Activity> findByActivityProjectProjectID(Integer id);
    void deleteByTableA(StatusTable statusTable);
    void deleteByActivityProject(Project project);
}