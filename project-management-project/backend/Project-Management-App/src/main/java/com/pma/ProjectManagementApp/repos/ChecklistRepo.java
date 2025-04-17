package com.pma.ProjectManagementApp.repos;

import com.pma.ProjectManagementApp.modules.Checklist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChecklistRepo extends JpaRepository<Checklist, Integer> {
}
