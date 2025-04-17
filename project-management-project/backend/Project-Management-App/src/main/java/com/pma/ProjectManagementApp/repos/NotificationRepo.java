package com.pma.ProjectManagementApp.repos;

import com.pma.ProjectManagementApp.modules.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepo extends JpaRepository<Notification, Integer> {
}
