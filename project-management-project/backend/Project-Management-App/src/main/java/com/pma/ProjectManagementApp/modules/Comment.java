package com.pma.ProjectManagementApp.modules;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer commentID;
    private String comment;
    private Date commentDate;

    @ManyToOne
    @JoinColumn(name = "userID")
    private User userCom;

    @ManyToOne
    @JoinColumn(name = "activityID")
    private Activity activityC;
}