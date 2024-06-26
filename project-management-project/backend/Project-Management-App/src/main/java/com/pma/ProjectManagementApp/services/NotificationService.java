package com.pma.ProjectManagementApp.services;

import com.pma.ProjectManagementApp.modules.Notification;
import com.pma.ProjectManagementApp.repos.NotificationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificationService {
    @Autowired
    private NotificationRepo repo;

    public List<Notification> getNotificationsById(Integer id) {
        List<Notification> notifications = repo.findAll();

        List<Notification> filteredNotifications = notifications.stream()
                .filter(notification -> notification.getUserNotification().getUserID().equals(id) && !notification.getIsRead())
                .collect(Collectors.toList());

        return filteredNotifications;
    }

    public List<Notification> getAllNotifications() {
        List<Notification> notifications = repo.findAll();

        return notifications;
    }
}
