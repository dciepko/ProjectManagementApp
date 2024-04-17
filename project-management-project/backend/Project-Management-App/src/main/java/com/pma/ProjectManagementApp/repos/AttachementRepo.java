package com.pma.ProjectManagementApp.repos;

import com.pma.ProjectManagementApp.modules.Attachement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AttachementRepo extends JpaRepository<Attachement, Integer> {
}
