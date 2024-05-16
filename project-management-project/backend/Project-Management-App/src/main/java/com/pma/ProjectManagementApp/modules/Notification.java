package com.pma.ProjectManagementApp.modules;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer notificationID;
    private Integer targetUserID;
    private String notificationContent;
    private Date notificationDate;

    @ManyToOne
    @JoinColumn(name = "userID")
    private User userNotification;
}
