package com.pma.ProjectManagementApp.modules;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Entity
public class Milestone{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer milestoneID;
    private Date actualDate;
    private String description;

    @ManyToOne
    @JoinColumn(name = "projectID")
    @JsonIgnore
    private Project project;
}