package com.pma.ProjectManagementApp.repos;

import com.pma.ProjectManagementApp.modules.StatusTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StatusTableRepo extends JpaRepository<StatusTable, Integer> {
}
