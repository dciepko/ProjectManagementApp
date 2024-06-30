package com.pma.ProjectManagementApp.services;

import com.pma.ProjectManagementApp.modules.Activity;
import com.pma.ProjectManagementApp.modules.Notification;
import com.pma.ProjectManagementApp.repos.NotificationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service class providing operations related to notifications.
 */
@Service
public class NotificationService {
    @Autowired
    private NotificationRepo repo;

    /**
     * Retrieves notifications for a specific user by user ID.
     *
     * @param id User ID for which notifications are to be retrieved
     * @return List of notifications filtered by the user ID and unread status
     */
    public List<Notification> getNotificationsById(Integer id) {
        List<Notification> notifications = repo.findAll();

        List<Notification> filteredNotifications = notifications.stream()
                .filter(notification -> notification.getUserNotification().getUserID().equals(id) && !notification.getIsRead())
                .collect(Collectors.toList());

        return filteredNotifications;
    }

    /**
     * Retrieves all notifications from the repository.
     *
     * @return List of all notifications
     */
    public List<Notification> getAllNotifications() {
        List<Notification> notifications = repo.findAll();
        return notifications;
    }

    /**
     * Marks a notification as read based on the notification ID.
     *
     * @param notificationID ID of the notification to be marked as read
     * @throws RuntimeException if the notification with the specified ID is not found
     */
    public void editNotification(Integer notificationID) {
        Notification existingNotification = repo.findById(notificationID)
                .orElseThrow(() -> new RuntimeException("Notification not found with id: " + notificationID));

        existingNotification.setIsRead(true);

        repo.save(existingNotification);
    }
}
