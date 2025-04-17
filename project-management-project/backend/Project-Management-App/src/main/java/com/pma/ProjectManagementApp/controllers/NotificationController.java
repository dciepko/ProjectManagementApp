package com.pma.ProjectManagementApp.controllers;

import com.pma.ProjectManagementApp.modules.Notification;
import com.pma.ProjectManagementApp.services.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller class for handling Notification related HTTP requests.
 */
@RestController
public class NotificationController {
    @Autowired
    private NotificationService service;

    /**
     * Retrieves notifications for a specific user.
     *
     * @param id User ID for which notifications are to be retrieved.
     * @return List of Notification objects for the specified user.
     */
    @GetMapping("/notifications/{id}")
    public List<Notification> getNotificationsById(@PathVariable Integer id) {
        return service.getNotificationsById(id);
    }

    /**
     * Retrieves all notifications from the system.
     *
     * @return List of all Notification objects in the system.
     */
    @GetMapping("/notifications")
    public List<Notification> getAllNotifications() {
        return service.getAllNotifications();
    }

    /**
     * Marks a notification as read.
     *
     * @param notificationID ID of the notification to be updated.
     */
    @PutMapping("/notifications/{notificationID}")
    public void updateNotification(@PathVariable Integer notificationID) {
        service.editNotification(notificationID);
    }
}
