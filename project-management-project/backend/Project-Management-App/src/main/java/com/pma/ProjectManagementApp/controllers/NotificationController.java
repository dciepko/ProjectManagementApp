package com.pma.ProjectManagementApp.controllers;

import com.pma.ProjectManagementApp.modules.Notification;
import com.pma.ProjectManagementApp.services.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class NotificationController {
    @Autowired
    private NotificationService service;

    @GetMapping("/notifications/{id}")
    public List<Notification> getNotificationsById(@PathVariable Integer id) {
        return service.getNotificationsById(id);
    }
    @GetMapping("/notificatioons")
    public List<Notification> getAllNotifications() {
        return service.getAllNotifications();
    }
}
