package com.pma.ProjectManagementApp.repos;

import com.pma.ProjectManagementApp.modules.ChecklistElement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChecklistElementRepo extends JpaRepository<ChecklistElement, Integer> {
}
