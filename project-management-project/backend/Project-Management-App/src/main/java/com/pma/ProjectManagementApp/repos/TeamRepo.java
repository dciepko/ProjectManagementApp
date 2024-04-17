package com.pma.ProjectManagementApp.repos;

import com.pma.ProjectManagementApp.modules.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamRepo extends JpaRepository<Team, Integer> {
}
