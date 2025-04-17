package com.pma.ProjectManagementApp.modules;

import com.pma.ProjectManagementApp.models.IMainModel;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
public class Attachement implements IMainModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer attachementID;
    private String attachementName;
    private Date date;
    private String attachementUrl;
    private String attachementType;

    @ManyToOne
    @JoinColumn(name = "userID")
    private User userAtt;

    @ManyToOne
    @JoinColumn(name = "activityID")
    private Activity activity;
}