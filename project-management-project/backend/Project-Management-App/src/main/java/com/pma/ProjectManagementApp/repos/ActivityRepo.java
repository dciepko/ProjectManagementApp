package com.pma.ProjectManagementApp.repos;

import com.pma.ProjectManagementApp.modules.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActivityRepo extends JpaRepository<Activity, Integer> {
}
