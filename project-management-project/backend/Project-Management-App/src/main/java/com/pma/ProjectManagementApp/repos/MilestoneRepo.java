package com.pma.ProjectManagementApp.repos;

import com.pma.ProjectManagementApp.modules.Milestone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MilestoneRepo extends JpaRepository<Milestone, Integer> {
}
