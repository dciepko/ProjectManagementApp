package com.pma.ProjectManagementApp.repos;

import com.pma.ProjectManagementApp.modules.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StatusRepo extends JpaRepository<Status, Integer> {
}
