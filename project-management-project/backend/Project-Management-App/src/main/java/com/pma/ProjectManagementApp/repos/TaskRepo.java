package com.pma.ProjectManagementApp.repos;

import com.pma.ProjectManagementApp.modules.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepo extends JpaRepository<Task, Integer> {
}
